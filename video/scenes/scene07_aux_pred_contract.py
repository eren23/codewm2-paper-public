"""Scene 07: predictive auxiliary losses change the contract."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from manim import *  # noqa: F403

from utils.layout import footer, title_block
from utils.style import BG, BLUE, FONT, GREEN, LINE, MUTED, RED, TEXT, YELLOW


class AuxPredContract(Scene):
    def construct(self):
        self.camera.background_color = BG
        head = title_block("Deep supervision changes the contract", "Every supervised recursion depth must remain predictive.")
        self.play(FadeIn(head, shift=DOWN * 0.1), run_time=0.7)

        blocks = VGroup()
        names = ["input", "loop 1", "loop 2", "loop 3"]
        for i, name in enumerate(names):
            box = RoundedRectangle(width=1.45, height=0.72, corner_radius=0.08, stroke_color=GREEN if i else LINE, fill_color="#141B18", fill_opacity=1)
            label = Text(name, font=FONT, font_size=17, color=TEXT).move_to(box)
            blocks.add(VGroup(box, label))
        blocks.arrange(RIGHT, buff=0.75)
        blocks.move_to(DOWN * 0.15)

        arrows = VGroup()
        for left, right in zip(blocks[:-1], blocks[1:]):
            arrows.add(Arrow(left.get_right(), right.get_left(), buff=0.12, color=LINE, stroke_width=3))

        self.play(FadeIn(blocks), LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.18), run_time=1.0)

        final_arrow = Arrow(blocks[-1].get_top(), blocks[-1].get_top() + UP * 1.0, buff=0.06, color=BLUE, stroke_width=3)
        final_label = Text("final pred", font=FONT, font_size=15, color=BLUE).next_to(final_arrow, UP, buff=0.08)
        before = Text("Before: only the final loop gets prediction loss.", font=FONT, font_size=18, color=MUTED).next_to(head, DOWN, buff=0.15)
        self.play(FadeIn(before), GrowArrow(final_arrow), FadeIn(final_label), run_time=0.8)

        warning = footer("Loops 1 and 2 can still lose transition geometry.", color=RED)
        self.play(FadeIn(warning, shift=UP * 0.1), run_time=0.5)
        self.wait(0.65)

        aux = VGroup()
        labels = VGroup()
        for idx in [1, 2]:
            arrow = Arrow(blocks[idx].get_top(), blocks[idx].get_top() + UP * 1.0, buff=0.06, color=YELLOW, stroke_width=3)
            label = Text("aux pred", font=FONT, font_size=15, color=YELLOW).next_to(arrow, UP, buff=0.08)
            aux.add(arrow)
            labels.add(label)

        after = Text("After: intermediate loops must also predict.", font=FONT, font_size=18, color=GREEN).next_to(head, DOWN, buff=0.15)
        self.play(FadeOut(warning), Transform(before, after), LaggedStart(*[GrowArrow(a) for a in aux], lag_ratio=0.18), LaggedStart(*[FadeIn(l) for l in labels], lag_ratio=0.18), run_time=1.1)

        config = VGroup(
            Text("WM_AUX_LOOPS=1,2", font=FONT, font_size=15, color=YELLOW),
            Text("WM_AUX_TYPE=pred", font=FONT, font_size=15, color=YELLOW),
            Text("WM_LAMBDA_AUX=0.3", font=FONT, font_size=15, color=YELLOW),
        ).arrange(RIGHT, buff=0.34)
        config.to_edge(DOWN, buff=0.82)
        self.play(FadeIn(config, shift=UP * 0.1), run_time=0.7)
        self.wait(0.6)

        close = footer("Aux losses fix the loop contract; VICReg fixes the readout contract.", color=GREEN)
        self.play(FadeOut(config), FadeIn(close, shift=UP * 0.1), run_time=0.7)
        self.wait(1.0)
