# CodeWM2 Animation Notes

Small Manim companion animations for the second CodeWM paper.

The connected video is now a curated Paper 1 -> Paper 2 story, not the old
video with a new tail appended. The storyboard records which old scenes still
matter and which ones are cut from the main narrative. The current narrative
ends on the Phase 9 VICReg result with a full-val audit (N=5000) and a
foundation-model head-to-head: stabilize target, supervise loops, regularize
readout, and show the 1.3M specialist ties-or-beats 125M general code
encoders on edit retrieval.

Read `storyboard.md` before changing scene order.

## Render

```bash
cd video
python3 -m pip install -r requirements.txt
./render_story.sh -ql
```

Use `-qh` when a scene is ready for a final render.

This machine currently has Manim on `/usr/bin/python3`, while Homebrew
Python does not. The render script defaults to `/usr/bin/python3`; override
with `PYTHON=/path/to/python ./render_all.sh -ql` if needed.

`render_all.sh` is kept as a compatibility wrapper around `render_story.sh`.

## Review Each Scene In Isolation

Render low quality, then extract review frames:

```bash
cd video
./render_story.sh -ql
./review_frames.sh 480p15
```

Review `video/review_frames/480p15/<scene>/frame_25.png`,
`frame_50.png`, and `frame_75.png` for clipping, text collision, stale claims,
and unclear focus before rendering high quality.

## Scene Manifest

The final order lives in `scene_manifest.yml`:

1. `scene01_code_evolves.py`
2. `scene02_state_pipeline.py`
3. `scene03_training_survives.py`
4. `scene04_stable_not_enough.py`
5. `scene05_signal_lives_early.py`
6. `scene06_delta_fails.py`
7. `scene07_aux_pred_contract.py`
8. `scene08_current_recipe.py`
8b. `scene08b_foundation_bench.py`
9. `scene09_closing.py`

## Archival Append Script

`stitch_connected.sh` is intentionally no longer the default workflow. It only
exists to reproduce the old append-style artifact:

```bash
cd video
./render_all.sh -ql
./stitch_connected.sh
```

By default this uses:

```text
/Users/eren/Documents/ai/codewm-paper-public/video/final_480p15.mp4
```

Override paths when needed:

```bash
OLD_VIDEO=/path/to/old.mp4 NEW_VIDEO=final_480p15.mp4 OUT=connected.mp4 ./stitch_connected.sh
```
