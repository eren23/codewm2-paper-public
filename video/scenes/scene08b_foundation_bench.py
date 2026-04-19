"""Scene 08b: Head-to-head vs code foundation models."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from manim import *  # noqa: F403

from utils.layout import bullet_list, footer, title_block
from utils.style import BG, BLUE, FONT, GREEN, MUTED, ORANGE, PURPLE, TEXT, YELLOW


class FoundationBench(Scene):
    def construct(self):
        self.camera.background_color = BG
        head = title_block(
            "Paper-grade head-to-head vs UnixCoder",
            "Edit retrieval - 1000 queries x 5000 gallery - step 28K",
        )
        self.play(FadeIn(head, shift=DOWN * 0.1), run_time=0.7)

        codewm = self._column(
            "CodeWM (ours)", "1.3M params", [
                ("MRR joint", "0.790"),
                ("MRR cos@0.9", "0.742"),
                ("MRR cos@0.95", "0.662"),
                ("CPU", "8.4 ms"),
            ], GREEN, highlight=True,
        )
        unix = self._column(
            "UnixCoder-base", "125.9M (100x)", [
                ("MRR joint", "0.760"),
                ("MRR cos@0.9", "0.736"),
                ("MRR cos@0.95", "0.671"),
                ("CPU", "83.7 ms (10x slower)"),
            ], BLUE,
        )
        delta = self._column(
            "delta (ours - Unix)", "positive = CodeWM wins", [
                ("MRR joint", "+0.030"),
                ("MRR cos@0.9", "+0.006"),
                ("MRR cos@0.95", "-0.009"),
                ("R@1 joint", "+0.059"),
            ], ORANGE,
        )

        cols = VGroup(codewm, unix, delta).arrange(RIGHT, buff=0.35).move_to(UP * 0.05)
        self.play(
            FadeIn(codewm, shift=UP * 0.1),
            FadeIn(unix, shift=UP * 0.1),
            FadeIn(delta, shift=UP * 0.1),
            run_time=0.9,
        )
        self.wait(1.0)

        punch = Text(
            "1.3M matches 125M at 10x lower latency - moderate win, tie on strictest.",
            font=FONT, font_size=20, color=YELLOW, weight=BOLD,
        )
        punch.to_edge(DOWN, buff=1.1)
        self.play(FadeIn(punch, shift=UP * 0.1), run_time=0.7)
        self.wait(0.8)

        close = footer(
            "Edit retrieval is a different task from general code embedding.",
            color=PURPLE,
        )
        self.play(FadeIn(close, shift=UP * 0.1), run_time=0.6)
        self.wait(2.0)

    def _column(self, title: str, params: str, rows: list[tuple[str, str]], color, highlight: bool = False) -> VGroup:
        box = RoundedRectangle(
            width=3.7, height=4.4, corner_radius=0.08,
            stroke_color=color,
            stroke_width=4 if highlight else 2,
            fill_color="#141B18", fill_opacity=1,
        )
        title_mob = Text(title, font=FONT, font_size=20, color=color, weight=BOLD)
        params_mob = Text(params, font=FONT, font_size=14, color=MUTED)
        header = VGroup(title_mob, params_mob).arrange(DOWN, buff=0.08)
        header.move_to(box.get_top() + DOWN * 0.5)

        row_mobs = []
        for label, value in rows:
            label_mob = Text(label, font=FONT, font_size=15, color=MUTED)
            value_mob = Text(value, font=FONT, font_size=18, color=TEXT, weight=BOLD)
            row = VGroup(label_mob, value_mob).arrange(DOWN, buff=0.04)
            row_mobs.append(row)
        rows_group = VGroup(*row_mobs).arrange(DOWN, buff=0.22)
        rows_group.move_to(box.get_center() + DOWN * 0.35)
        return VGroup(box, header, rows_group)
