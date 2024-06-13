BUILD_DIR=dist
SRC_DIR=src

.PHONY: build clean test

build: $(BUILD_DIR)/h.js

clean:
	@rm -rf $(BUILD_DIR)

test: build
	node --enable-source-maps --test $(shell find $(BUILD_DIR) -name '*.test.js')

$(BUILD_DIR)/h.js: $(shell find $(SRC_DIR) -name '*.ts')
	yarn tsc

node_modules: package.json yarn.lock
	yarn && touch $@
