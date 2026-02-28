# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-rust
FROM $BASE

ARG REPO=https://github.com/rust-js/rjs.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

# Earliest rust nightly with arm64 support
RUN rustup toolchain install nightly-2016-05-31 --profile minimal && rustup override set nightly-2016-05-31

# Keep using the old lockfile, but patch some breakages in legacy crates
RUN cargo fetch

RUN sed -i 's/fn decode<D: Decoder>(d: &mut D) -> Result<Self, D::Error>;/fn decode<D: Decoder>(d: \&mut D) -> Result<Self, D::Error> where Self: Sized;/' /root/.cargo/registry/src/*/rustc-serialize-0.3.15/src/serialize.rs && \
    sed -i 's/fn construct_range(low: Self, high: Self) -> Range<Self>;/fn construct_range(low: Self, high: Self) -> Range<Self> where Self: Sized;/' /root/.cargo/registry/src/*/rand-0.3.8/src/distributions/range.rs && \
    sed -i 's/fn sample_range<R: Rng>(r: &Range<Self>, rng: &mut R) -> Self;/fn sample_range<R: Rng>(r: \&Range<Self>, rng: \&mut R) -> Self where Self: Sized;/' /root/.cargo/registry/src/*/rand-0.3.8/src/distributions/range.rs && \
    sed -E -i '/^pub trait (Num|Zero|One|Signed|CheckedAdd|CheckedSub|CheckedMul|CheckedDiv|NumCast):/ s/^pub trait ([^:]+):/pub trait \1: Sized +/' /root/.cargo/registry/src/*/num-0.1.25/src/traits.rs && \
    sed -E -i '/^pub trait (Datelike|Timelike) \{/ s/^pub trait ([^{ ]+) \{/pub trait \1: Sized {/' /root/.cargo/registry/src/*/chrono-0.2.14/src/lib.rs

# Patch Rust breakages in rjs repo
RUN sed -i 's/let mut indent = -1;/let mut indent = !0usize;/' src/contrib/test262.rs && \
    sed -i 's/if indent == -1 {/if indent == !0usize {/' src/contrib/test262.rs && \
    sed -i 's/Expr::Missing(..)/Expr::Missing/' src/syntax/ast/visitor.rs && \
    sed -i 's/Expr::This(..)/Expr::This/' src/syntax/ast/visitor.rs && \
    sed -i 's/let ptr = unsafe { map(ptr::null(), size) };/let ptr = unsafe { let raw = mmap(ptr::null_mut(), size as size_t, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANON, -1, 0); if raw == MAP_FAILED { ptr::null_mut() } else { raw as ptr_t } };/' src/gc/os.rs && \
    sed -i 's/unsafe { unmap(self.ptr, self.size) };/unsafe { if munmap(self.ptr as *mut c_void, self.size as size_t) == -1 { panic!("error in munmap"); } };/' src/gc/os.rs

COPY engines/rust-js/main.rs src/main.rs

RUN cargo build --release --bin rjs

COPY build/dist.py ./
RUN ./dist.py /dist/rust-js --binary=/src/target/release/rjs --license=README.md
