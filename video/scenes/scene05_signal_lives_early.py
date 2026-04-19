"""Scene 05: measured transition signal decay by loop."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from manim import *  # noqa: F403

from utils.layout import footer, title_block
from utils.style import BG, BLUE, FONT, GREEN, LINE, MUTED, RED, TEXT, YELLOW


class SignalLivesEarly(Scene):
    def construct(self):
        self.camera.background_color = BG
        head = title_block(
            "Transition signal lives early",
            "Loop-wise probes show the state delta being compressed away.",
        )
        self.play(FadeIn(head, shift=DOWN * 0.1), run_time=0.7)

        loops = [("loop 1", 0.123, GREEN), ("loop 2", 0.055, YELLOW), ("loop 3", 0.028, BLUE), ("loop 6", 0.010, RED)]
        axis = NumberLine(
            x_range=[0, 0.13, 0.02],
            length=6.4,
            include_numbers=True,
            decimal_number_config={"num_decimal_places": 2},
            color=LINE,
            font_size=17,
        ).shift(DOWN * 2.35)
        axis_label = Text("||delta z|| / ||z||", font=FONT, font_size=16, color=MUTED).next_to(axis, DOWN, buff=0.22)
        self.play(Create(axis), FadeIn(axis_label), run_time=0.6)

        rows = VGroup()
        for i, (label, ratio, color) in enumerate(loops):
            y = 1.35 - i * 0.58
            name = Text(label, font=FONT, font_size=20, color=TEXT).move_to(LEFT * 3.9 + UP * y)
            bar = Rectangle(
                width=max(0.18, ratio / 0.13 * 5.8),
                height=0.24,
                fill_color=color,
                fill_opacity=0.85,
                stroke_color=color,
                stroke_width=1,
            ).next_to(name, RIGHT, buff=0.35)
            value = Text(f"{ratio:.3f}", font=FONT, font_size=18, color=color).next_to(bar, RIGHT, buff=0.2)
            rows.add(VGroup(name, bar, value))

        self.play(LaggedStart(*[FadeIn(row, shift=RIGHT * 0.15) for row in rows], lag_ratio=0.15), run_time=1.4)
        callout = Text("12x compression across loops", font=FONT, font_size=25, color=RED, weight=BOLD)
        callout.next_to(rows, DOWN, buff=0.45)
        self.play(FadeIn(callout, shift=UP * 0.1), run_time=0.6)
        self.wait(0.8)

        close = footer("Aux losses protect the loops; the readout still needs its own check.", color=YELLOW)
        self.play(FadeOut(rows), FadeOut(axis), FadeOut(axis_label), FadeOut(callout), FadeIn(close, shift=UP * 0.1), run_time=0.8)
        self.wait(1.0)
