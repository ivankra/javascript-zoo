#!/bin/bash
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

set -e -o pipefail

PUSHDEST="docker.io/ivankra/javascript-zoo"

DOCKER="$(command -v podman 2>/dev/null || echo docker)"
DOCKER_ARCH="$(uname -m | sed -e 's/aarch64/arm64/; s/x86_64/amd64/')"

ARCHS="arm64 amd64"
ARCHS=$(echo "$ARCHS" | sed -e "s/\b$DOCKER_ARCH\b//"; echo $DOCKER_ARCH)

if [[ -z "$TAG" ]]; then
  TAG=$(date +%Y%m%d)
  echo "Using tag $TAG"
fi

set -x -e -o pipefail

for arch in $ARCHS; do
  (cd ../dist; tar -c "$arch") >"../dist/$arch.tar"

  $DOCKER build \
      -f base-runtime.Dockerfile \
      -t "jsz-runtime:$arch" \
      --build-arg BASE=debian:stable \
      --platform "linux/$arch" \
      .

  $DOCKER build \
      -f hub.Dockerfile \
      -t "jsz-hub:$arch" \
      --build-arg "BASE=jsz-runtime:$arch" \
      --build-arg "TAG=$TAG" \
      --platform "linux/$arch" \
      ..
done

$DOCKER login docker.io

for tag in $TAG latest; do
  for arch in $ARCHS; do
    $DOCKER push "localhost/jsz-hub:$arch" "$PUSHDEST:$tag-$arch"
  done
  $DOCKER image rm -f "$PUSHDEST:$tag" || true
  $DOCKER manifest rm "$PUSHDEST:$tag" || true
  $DOCKER manifest create "$PUSHDEST:$tag" $(for arch in $ARCHS; do echo "$PUSHDEST:$tag-$arch"; done)
  $DOCKER manifest push "$PUSHDEST:$tag" "$PUSHDEST:$tag"
done

echo OK
