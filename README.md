# CodeWM2 Paper & Video

Follow-up preprint and Manim companion for the Code World Models research.

**Paper**: "From Early-Loop Signal to Readout Repair: Deep Supervision and VICReg in Tiny JEPA Code Models"

**Paper 1**: ["Diagnosing and Fixing Encoder Collapse in Tiny JEPA Code Transition Models"](https://eren23.github.io/codewm-paper-public/)

**Landing page**: <https://eren23.github.io/codewm2-paper-public/>
— includes the full video, the abstract, key results, and pointers to every source repo.

**Quick links**: [Paper PDF](paper/main.pdf) · [Video (1080p60)](video/final_story_1080p60.mp4) · [Video (480p15)](video/final_story_480p15.mp4)

## Citation

Use the BibTeX block on the [landing page](https://eren23.github.io/codewm2-paper-public/#cite) or GitHub's citation metadata from [`CITATION.cff`](CITATION.cff).

## Structure

```
paper/          LaTeX source (~8 sections + 4 appendices)
  main.tex      Entry point
  main.pdf      Rendered paper
  sections/     8 sections (intro, background, geometry, architecture,
                experiments, negative_results, discussion, conclusion)
  appendix/     4 appendices (hyperparameters, ablation_log,
                geometry_probes, kernelwm)
  figures/      TikZ figures (scaling curve)
  references.bib

video/          Manim scenes (10 scenes, curated Paper 1 → Paper 2 story)
  scenes/       scene01–09 Python files (including scene08b)
  utils/        Shared style constants and layout helpers
  final_story_1080p60.mp4  Full-quality render
  final_story_480p15.mp4   Light-quality render
  render_story.sh

docs/           GitHub Pages landing (static HTML, no build step)
```

## Build

### Paper

```bash
# Requires: pdflatex, bibtex
cd paper && make
```

### Video

```bash
cd video
pip install -r requirements.txt

# Render single scene (low quality for testing)
python3 -m manim render scenes/scene05_signal_lives_early.py SignalLivesEarly -ql

# Render all scenes (high quality) and concatenate
chmod +x render_story.sh && ./render_story.sh
```

## Source Repos

- [Synapse](https://github.com/eren23/synapse) — Zero-dependency inference engine (Rust/Zig/WASM)
- [Crucible](https://github.com/eren23/crucible) — Training orchestration platform
- [Crucible Community Tap](https://github.com/eren23/crucible-community-tap) — Architecture plugins used for the sweeps

## Training Runs

All runs reported in the paper are logged to Weights & Biases:

<https://wandb.ai/eren23/crucible-code-wm/workspace?nw=nwusereren23>

## License

MIT — see [`LICENSE`](LICENSE).
