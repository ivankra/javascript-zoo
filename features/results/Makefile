all: run table

run:
	time run-all.sh

BINARIES = $(shell run-all.sh --print)

run-parallel: $(patsubst %,%.txt,$(BINARIES))

define rules
$(1).txt: .PHONY
	./run-all.sh --only "$(1)"
endef

$(foreach var,$(BINARIES),$(eval $(call rules,$(var))))

table:
	./table.py

.PHONY:
