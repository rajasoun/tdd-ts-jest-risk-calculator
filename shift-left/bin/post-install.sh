#!/usr/bin/env bash

set -e

if [ "$SKIP_POST_INSTALL" == "yes" ]; then
    echo "Skipping postinstall routine for CI Server"
    exit 0
else # DevContainer
    # node shift-left/bin/check-version.js &&
    npm --prefix ./shift-left install && husky install
fi
