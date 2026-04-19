# Connected CodeWM Video Storyboard

This is not an append of Paper 2 after Paper 1. The final video is a curated
Paper 1 -> Paper 2 argument: stabilization first, representation geometry
second, readout repair third.

## Scene Decisions

| Old/New source | Verdict | New role |
| --- | --- | --- |
| Old scene01 code evolves | Keep/adapt | Opening concrete state-transition problem. |
| Old scene02 AST tokenization | Keep/adapt | Source -> AST -> token -> latent pipeline. |
| Old scene03 JEPA architecture | Rewrite | Stable architecture, then flag final-loop readout as suspect. |
| Old scene04 latent geometry | Partial only | Keep "stable prediction is not enough" as the bridge to discriminability. |
| Old scene05 EMA/collapse | Keep/adapt | Paper 1 foundation: static target makes training survive. |
| Old scene06 retrieval | Rewrite | Lift/readout-collapse caveat: high lift can be non-discriminative. |
| Old scene07 quantization | Cut from main | Deployment appendix, not part of the Paper 2 story. |
| Old scene08 deployment | Cut from main | Deployment appendix, not part of the Paper 2 story. |
| Old scene09 future | Replace | Stale: the next paper is geometry/deep supervision, not downstream tasks. |
| New bridge scene | Cut | A bridge is unnecessary once the whole video is reordered. |
| New signal scene | Keep/adapt | Core Paper 2 mechanism: early-loop signal decay and preserved intermediates. |
| Phase 9 full-val audit | Fold in | Dual chip grid inside scene08 — batch-128 vs full-val at step 28K. |
| Phase 9 foundation bench | New scene08b | CodeWM 1.3M ties-or-beats UnixCoder + CodeBERT on edit retrieval. |

## Final Story

1. `scene01_code_evolves`: code changes define a state trajectory.
2. `scene02_state_pipeline`: snapshots become latent states.
3. `scene03_training_survives`: Paper 1 made the training regime stable.
4. `scene04_stable_not_enough`: stable final-loop readout can still hide deltas.
5. `scene05_signal_lives_early`: early loops carry the signal; aux preserves intermediates.
6. `scene06_delta_fails`: the lift metric is gameable when the readout collapses.
7. `scene07_aux_pred_contract`: aux-pred makes intermediate depths predictive.
8. `scene08_current_recipe`: VICReg is the current readout-repair recipe.
8b. `scene08b_foundation_bench`: tiny specialist ties-or-beats 100x larger general code encoders on edit retrieval. Honest framing: competitive, not uniformly dominant. +0.030 MRR on moderate criteria, statistical tie on strictest.
9. `scene09_closing`: stabilize target, supervise loops, regularize readout. NEW: cross-seed variance is real (2-3x KNN@5 gap). Predictor collapse (eff_rank 5-6/128) is the next bottleneck. Encoder is fixed; predictor is not.

## Claim Discipline

- Say "portable recipe to test", not "guaranteed to generalize".
- Keep Paper 1 claims as foundation, not as the main contribution of this video.
- Keep direct delta prediction as a real negative result.
- Say "lift plus rank plus KNN", not lift alone.
- Full-val audit (N=5000) closes the loop: batch-128 probe inflates KNN 12x; report both.
- Peak KNN@5=5.80% is a SINGLE-SEED peak. Cross-seed variance is 2-3x. Say so explicitly.
- Drop any "reproduces across seeds" claim — batch-128 lift agreement doesn't track full-val retrieval.
- Predictor eff_rank is 5-6/128 everywhere — name this as the next bottleneck.
- Closest prior art: Temporal Straightening (arXiv 2603.12231) — VICReg ≈ discrete curvature penalty.
- JEPA-Reasoner (arXiv 2512.19171) — deep supervision = "supervision on latent chain-of-thought".
