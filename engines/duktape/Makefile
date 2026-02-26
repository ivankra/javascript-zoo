# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

CONFORMANCE_CMD = "$(ROOT_DIR)/conformance/run.sh" --next -j 8 -o conformance.txt /dist/duktape && \
	"$(ROOT_DIR)/conformance/run.sh" --next -j 8 -o duktape_babel.conformance /dist/mujs_babel /dist/duktape

$(eval $(call build_engine,duktape,Dockerfile))
$(eval $(call build_engine,duktape_clang,Dockerfile,--build-arg BASE=jsz-clang))
