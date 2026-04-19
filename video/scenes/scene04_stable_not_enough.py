"""Scene 04: stable training is not the same as best readout."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from manim import *  # noqa: F403

from utils.layout import footer, title_block
from utils.style import BG, BLUE, FONT, GREEN, LINE, MUTED, RED, TEXT, YELLOW


class StableNotEnough(Scene):
    def construct(self):
        self.camera.background_color = BG
        head = title_block("Stable is not enough", "Once the model trains, the next question is where to read the transition.")
        self.play(FadeIn(head, shift=DOWN * 0.1), run_time=0.7)

        encoder = self._stack("shared encoder", ["loop 1", "loop 2", "loop 3", "loop 6"], GREEN).move_to(LEFT * 3.0)
        predictor = self._stack("predictor", ["block", "block", "looped"], BLUE).move_to(RIGHT * 3.2)
        arrow = Arrow(encoder.get_right(), predictor.get_left(), buff=0.2, color=LINE, stroke_width=3)
        readout = Text("old habit: read the final loop", font=FONT, font_size=20, color=YELLOW)
        readout.next_to(encoder, DOWN, buff=0.42)

        self.play(FadeIn(encoder), GrowArrow(arrow), FadeIn(predictor), run_time=1.0)
        self.play(FadeIn(readout, shift=UP * 0.1), run_time=0.6)
        self.wait(0.5)

        smooth = VGroup(
            Text("good for stability", font=FONT, font_size=19, color=GREEN),
            Text("bad for tiny deltas", font=FONT, font_size=19, color=RED),
        ).arrange(DOWN, buff=0.24)
        smooth.to_edge(DOWN, buff=1.0)
        self.play(FadeIn(smooth, shift=UP * 0.1), run_time=0.7)
        self.wait(0.8)

        marker = SurroundingRectangle(encoder[1][-1], color=RED, buff=0.08, stroke_width=3)
        question = footer("If the endpoint is smoothed, check the loops and the readout.", color=YELLOW)
        self.play(Create(marker), FadeOut(smooth), FadeIn(question, shift=UP * 0.1), run_time=0.8)
        self.wait(1.0)

    def _stack(self, title: str, rows: list[str], color) -> VGroup:
        header = Text(title, font=FONT, font_size=22, color=color, weight=BOLD)
        cells = VGroup()
        for row in rows:
            rect = RoundedRectangle(width=2.3, height=0.48, corner_radius=0.07, stroke_color=color, fill_color="#141B18", fill_opacity=1)
            text = Text(row, font=FONT, font_size=16, color=TEXT).move_to(rect)
            cells.add(VGroup(rect, text))
        cells.arrange(DOWN, buff=0.14)
        header.next_to(cells, UP, buff=0.2)
        return VGroup(header, cells)
