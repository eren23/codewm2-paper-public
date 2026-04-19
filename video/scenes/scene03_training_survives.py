"""Scene 03: Paper 1 stabilization result."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from manim import *  # noqa: F403

from utils.layout import footer, title_block
from utils.style import BG, BLUE, FONT, GREEN, LINE, MUTED, RED, TEXT, YELLOW


class TrainingSurvives(Scene):
    def construct(self):
        self.camera.background_color = BG
        head = title_block("Paper 1: make training survive", "The failure was target collapse under a target that moved too fast.")
        self.play(FadeIn(head, shift=DOWN * 0.1), run_time=0.7)

        left = self._panel("EMA 0.996", RED, "copy -> 0.999", "collapse near 700 steps")
        right = self._panel("EMA 0.99999", GREEN, "copy stays healthy", "stable to 15K steps")
        left.move_to(LEFT * 3.2 + DOWN * 0.05)
        right.move_to(RIGHT * 3.2 + DOWN * 0.05)
        self.play(FadeIn(left, shift=RIGHT * 0.15), FadeIn(right, shift=LEFT * 0.15), run_time=0.8)

        self._draw_curve(left, collapses=True)
        self._draw_curve(right, collapses=False)

        mechanism = VGroup(
            Text("mechanism:", font=FONT, font_size=20, color=MUTED),
            Text("1 / (1 - 0.996) ~= 250 steps", font=FONT, font_size=24, color=TEXT, weight=BOLD),
        ).arrange(RIGHT, buff=0.22)
        mechanism.to_edge(DOWN, buff=0.95)
        self.play(FadeIn(mechanism, shift=UP * 0.1), run_time=0.7)
        self.wait(0.8)

        close = footer("Static target gives us a regime worth probing.", color=YELLOW)
        self.play(FadeOut(mechanism), FadeIn(close, shift=UP * 0.1), run_time=0.6)
        self.wait(1.0)

    def _panel(self, title: str, color, line1: str, line2: str) -> VGroup:
        box = RoundedRectangle(width=5.3, height=3.85, corner_radius=0.08, stroke_color=color, fill_color="#141B18", fill_opacity=1)
        label = Text(title, font=FONT, font_size=22, color=color, weight=BOLD).next_to(box, UP, buff=0.2)
        note1 = Text(line1, font=FONT, font_size=17, color=TEXT).move_to(box.get_bottom() + UP * 0.72)
        note2 = Text(line2, font=FONT, font_size=17, color=color, weight=BOLD).next_to(note1, DOWN, buff=0.15)
        return VGroup(box, label, note1, note2)

    def _draw_curve(self, panel: VGroup, *, collapses: bool):
        box = panel[0]
        x0 = box.get_left()[0] + 0.55
        x1 = box.get_right()[0] - 0.55
        y0 = box.get_bottom()[1] + 1.4
        y1 = box.get_top()[1] - 0.55
        axes = VGroup(
            Line([x0, y0, 0], [x1, y0, 0], color=LINE, stroke_width=2),
            Line([x0, y0, 0], [x0, y1, 0], color=LINE, stroke_width=2),
        )
        pts = []
        for i in range(7):
            t = i / 6
            x = x0 + t * (x1 - x0)
            if collapses:
                y = y0 + (0.35 + 0.5 * min(t * 2, 1) - 0.72 * max(t - 0.45, 0) / 0.55) * (y1 - y0)
            else:
                y = y0 + (0.25 + 0.66 * (1 - pow(1 - t, 2))) * (y1 - y0)
            pts.append([x, y, 0])
        curve = VMobject(color=RED if collapses else GREEN, stroke_width=4)
        curve.set_points_smoothly(pts)
        self.play(Create(axes), run_time=0.35)
        self.play(Create(curve), run_time=1.0)
