#!/usr/bin/env bash

# Use the Unofficial Bash Strict Mode
# @see http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail

# Normalize current directory
cd "${BASH_SOURCE%/*}" || exit

# Cross-platform `sed` based on https://stackoverflow.com/a/38595160
sedi () {
  if sed --version >/dev/null 2>&1; then
    sed -i -- "$@"
  else
    sed -i '' "$@"
  fi
}

# HACK: remove unwanted references to @types/node
sedi 's|\(^/// <reference types="node"[ ]*/>\)|//\1|' ../node_modules/@types/styled-components/index.d.ts
