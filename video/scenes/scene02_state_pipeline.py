"""Scene 02: source to latent state pipeline."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from manim import *  # noqa: F403

from utils.layout import footer, title_block
from utils.style import BG, BLUE, FONT, GREEN, LINE, MUTED, ORANGE, TEXT, YELLOW


class StatePipeline(Scene):
    def construct(self):
        self.camera.background_color = BG
        head = title_block("The state representation", "CodeWM turns a code snapshot into a 128d latent state.")
        self.play(FadeIn(head, shift=DOWN * 0.1), run_time=0.7)

        stages = [
            ("source", ["def f(x):", "if x:", "return g(x)"], GREEN),
            ("AST", ["FuncDef", "If", "Call"], ORANGE),
            ("tokens", ["BOS", "Func", "If", "Call", "EOS"], YELLOW),
            ("z_t", ["128 dims", "pooled", "normalized"], BLUE),
        ]

        groups = VGroup()
        for i, (name, rows, color) in enumerate(stages):
            x = -5.25 + i * 3.5
            box = RoundedRectangle(
                width=2.6,
                height=2.25,
                corner_radius=0.08,
                stroke_color=color,
                fill_color="#141B18",
                fill_opacity=1,
                stroke_width=2,
            ).move_to(RIGHT * x)
            label = Text(name, font=FONT, font_size=22, color=color, weight=BOLD).next_to(box, UP, buff=0.18)
            body = VGroup(*[Text(row, font=FONT, font_size=15, color=TEXT) for row in rows]).arrange(DOWN, buff=0.16)
            body.move_to(box)
            groups.add(VGroup(box, label, body))

        arrows = VGroup()
        for left, right in zip(groups[:-1], groups[1:]):
            arrows.add(Arrow(left[0].get_right(), right[0].get_left(), buff=0.18, color=LINE, stroke_width=3))

        self.play(LaggedStart(*[FadeIn(g, shift=UP * 0.12) for g in groups], lag_ratio=0.2), run_time=1.3)
        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.2), run_time=0.9)

        delta = VGroup(
            Text("edit action", font=FONT, font_size=18, color=MUTED),
            Arrow(LEFT * 1.2, RIGHT * 1.2, color=BLUE, stroke_width=4),
            Text("z_t -> z_{t+1}", font=FONT, font_size=18, color=BLUE),
        ).arrange(RIGHT, buff=0.25)
        delta.to_edge(DOWN, buff=0.95)
        self.play(FadeIn(delta, shift=UP * 0.15), run_time=0.7)
        self.wait(0.8)

        close = footer("Paper 1 made this train stably. Paper 2 asks where the transition signal lives.", color=YELLOW)
        self.play(FadeOut(delta), FadeIn(close, shift=UP * 0.15), run_time=0.7)
        self.wait(1.0)
