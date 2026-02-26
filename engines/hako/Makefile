# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

include ../../build/build.mk

$(eval $(call build_engine,hako,Dockerfile))
$(eval $(call build_engine,hako_go,hako_go.Dockerfile,--build-arg REV=6255dec9e627aeb01cab73d2df932d6b8e0b2cb6))
$(eval $(call build_engine,hako_wamr,hako_wamr.Dockerfile,--build-arg REV=243663f4fc03daa51b97b15882ebf815f2eb70ce))
$(eval $(call build_engine,hako_wasmtime_go,hako_wasmtime_go.Dockerfile))
