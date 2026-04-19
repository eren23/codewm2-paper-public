#!/bin/bash
set -e
cd "$(dirname "$0")"

exec ./render_story.sh "$@"
