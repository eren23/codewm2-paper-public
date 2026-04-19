"""Scene 06: high lift can hide readout collapse."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from manim import *  # noqa: F403

from utils.layout import footer, title_block
from utils.style import BG, BLUE, FONT, GREEN, LINE, MUTED, ORANGE, RED, TEXT, YELLOW


class DeltaFails(Scene):
    def construct(self):
        self.camera.background_color = BG
        head = title_block("Lift was not enough", "The model can score well while the readout collapses.")
        self.play(FadeIn(head, shift=DOWN * 0.1), run_time=0.7)

        headline = VGroup(
            Text("loops3-auxpred", font=FONT, font_size=25, color=TEXT, weight=BOLD),
            Text("lift > +1.0", font=FONT, font_size=39, color=YELLOW, weight=BOLD),
            Text("looked like the breakthrough", font=FONT, font_size=18, color=MUTED),
        ).arrange(DOWN, buff=0.16)
        headline.move_to(UP * 1.15)
        self.play(FadeIn(headline, shift=DOWN * 0.1), run_time=0.8)
        self.wait(0.45)

        cards = VGroup(
            self._metric("rank (batch-128)", "1.95 / 128", RED),
            self._metric("KNN@1 (batch-128)", "0.04", RED),
            self._metric("wrong targets", "cos 0.89", ORANGE),
        ).arrange(RIGHT, buff=0.35)
        cards.move_to(DOWN * 0.55)
        self.play(LaggedStart(*[FadeIn(card, shift=UP * 0.12) for card in cards], lag_ratio=0.15), run_time=0.95)
        self.wait(0.5)

        verdict = Text("The predictor found the target subspace, not the right example.", font=FONT, font_size=21, color=RED, weight=BOLD)
        verdict.to_edge(DOWN, buff=1.05)
        self.play(FadeIn(verdict, shift=UP * 0.1), run_time=0.65)
        self.wait(0.7)

        self.play(FadeOut(verdict), run_time=0.25)
        close = footer("Every lift claim needs rank, KNN, and a full-val check beside it.", color=YELLOW)
        self.play(FadeIn(close, shift=UP * 0.1), run_time=0.55)
        self.wait(2.0)

    def _metric(self, label: str, value: str, color) -> VGroup:
        box = RoundedRectangle(width=3.65, height=1.75, corner_radius=0.08, stroke_color=color, fill_color="#141B18", fill_opacity=1)
        label_mob = Text(label, font=FONT, font_size=18, color=MUTED).move_to(box.get_top() + DOWN * 0.38)
        value_mob = Text(value, font=FONT, font_size=29, color=color, weight=BOLD).move_to(box.get_center() + DOWN * 0.02)
        return VGroup(box, label_mob, value_mob)
