#!/bin/bash
set -e
cd "$(dirname "$0")"

QUALITY_DIR="${1:-480p15}"
MANIFEST="${MANIFEST:-scene_manifest.yml}"
OUT_DIR="${OUT_DIR:-review_frames/$QUALITY_DIR}"

mkdir -p "$OUT_DIR"

SCENES=$(awk '/^[[:space:]]*file:/ {print $2}' "$MANIFEST")
for scene in $SCENES; do
    basename=$(basename "$scene" .py)
    mp4=$(find "media/videos/$basename/$QUALITY_DIR/" -maxdepth 1 -name "*.mp4" 2>/dev/null \
        | xargs -I{} stat -f "%m %N" {} 2>/dev/null \
        | sort -rn | head -1 | awk '{print $2}')

    if [ -z "$mp4" ]; then
        echo "Skipping $basename: no $QUALITY_DIR render"
        continue
    fi

    scene_out="$OUT_DIR/$basename"
    mkdir -p "$scene_out"
    duration=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$mp4")

    for pct in 0.25 0.50 0.75; do
        ts=$(awk -v d="$duration" -v p="$pct" 'BEGIN { printf "%.3f", d * p }')
        label=$(awk -v p="$pct" 'BEGIN { printf "%02d", p * 100 }')
        ffmpeg -y -ss "$ts" -i "$mp4" -frames:v 1 "$scene_out/frame_${label}.png" >/dev/null 2>&1
    done
    echo "Wrote review frames for $basename"
done
