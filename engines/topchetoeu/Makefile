# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

CONFORMANCE_CMD = "$(ROOT_DIR)/conformance/run.sh" -j 1 -o conformance.txt /dist/topchetoeu $(ROOT_DIR)/conformance/es[1-5]

# Toolchain problems on other arch; build artifact itself is universal
SUPPORTED_ARCHS = arm64 amd64

$(eval $(call build_engine,topchetoeu,Dockerfile))
