#!/usr/bin/env bash
set -euo pipefail
npm --prefix backend ci
npm --prefix backend test
npm --prefix frontend ci
npm --prefix frontend test -- --run
npm --prefix frontend run build
