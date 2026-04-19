#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "This script is archival only: it appends an old full video to a new one."
echo "For the real connected story, use ./render_story.sh -ql."

OLD_VIDEO="${OLD_VIDEO:-/Users/eren/Documents/ai/codewm-paper-public/video/final_480p15.mp4}"
NEW_VIDEO="${NEW_VIDEO:-final_480p15.mp4}"
OUT="${OUT:-final_connected_480p15.mp4}"

if [ ! -f "$OLD_VIDEO" ]; then
    echo "Missing old video: $OLD_VIDEO"
    exit 1
fi

if [ ! -f "$NEW_VIDEO" ]; then
    echo "Missing new video: $NEW_VIDEO"
    echo "Run ./render_all.sh -ql first."
    exit 1
fi

CONCAT_FILE="concat_connected_480p15.txt"
{
    echo "file '$OLD_VIDEO'"
    echo "file '$NEW_VIDEO'"
} > "$CONCAT_FILE"

ffmpeg -y -f concat -safe 0 -i "$CONCAT_FILE" -c copy "$OUT"
echo "Done: $OUT"
