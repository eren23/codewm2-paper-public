"""Scene 09: closing synthesis."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from manim import *  # noqa: F403

from utils.layout import bullet_list, footer, title_block
from utils.style import BG, BLUE, FONT, GREEN, ORANGE, TEXT, YELLOW


class ClosingSynthesis(Scene):
    def construct(self):
        self.camera.background_color = BG
        head = title_block("What changed", "From one win to a stricter, honest recipe.")
        self.play(FadeIn(head, shift=DOWN * 0.1), run_time=0.7)

        columns = VGroup(
            self._column("Stabilize", [
                "near-static target",
                "copy baseline diagnostic",
                "training survives",
            ], GREEN),
            self._column("Supervise", [
                "early loops keep signal",
                "aux_pred trains reuse",
                "raw deltas stay negative",
            ], BLUE),
            self._column("Regularize", [
                "lift can be gamed",
                "VICReg restores rank",
                "KNN joins the metric set",
            ], ORANGE),
        ).arrange(RIGHT, buff=0.35)
        columns.move_to(DOWN * 0.05)
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.1) for c in columns], lag_ratio=0.18), run_time=1.2)
        self.wait(0.8)

        # Phase 2: cross-seed honesty + predictor bottleneck
        self.play(*[FadeOut(c) for c in columns], FadeOut(head), run_time=0.5)
        head2 = title_block("What remains", "Encoder is fixed. Predictor is not.")
        self.play(FadeIn(head2, shift=DOWN * 0.1), run_time=0.7)

        findings = VGroup(
            self._column("Cross-seed", [
                "peak KNN@5=5.8% is one seed",
                "other seeds trail by 2-3x",
                "honest variance reported",
            ], YELLOW),
            self._column("Encoder: fixed", [
                "eff_rank 53-64 across seeds",
                "VICReg readout repair works",
                "consistent, not lucky",
            ], GREEN),
            self._column("Predictor: stuck", [
                "eff_rank 5-6/128 everywhere",
                "the next bottleneck",
                "not yet regularized",
            ], RED),
        ).arrange(RIGHT, buff=0.35)
        findings.move_to(DOWN * 0.05)
        self.play(LaggedStart(*[FadeIn(f, shift=UP * 0.1) for f in findings], lag_ratio=0.18), run_time=1.2)

        close = footer("The encoder predicts and stays discriminative. The predictor does not — yet.", color=YELLOW)
        self.play(FadeIn(close, shift=UP * 0.1), run_time=0.7)
        self.wait(2.0)

    def _column(self, title: str, items: list[str], color) -> VGroup:
        box = RoundedRectangle(width=4.1, height=3.55, corner_radius=0.08, stroke_color=color, fill_color="#141B18", fill_opacity=1)
        header = Text(title, font=FONT, font_size=22, color=color, weight=BOLD).move_to(box.get_top() + DOWN * 0.38)
        bullets = bullet_list(items, font_size=14, max_width=3.35)
        bullets.move_to(box.get_center() + DOWN * 0.16)
        return VGroup(box, header, bullets)
