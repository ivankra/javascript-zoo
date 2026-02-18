# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

CONFORMANCE_CMD = "$(ROOT_DIR)/conformance/run.sh" -j 1 -o conformance.txt /dist/topchetoeu $(ROOT_DIR)/conformance/es[1-5]

$(eval $(call build_engine,topchetoeu,Dockerfile))
