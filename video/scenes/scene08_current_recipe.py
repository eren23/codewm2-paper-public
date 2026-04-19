"""Scene 08: VICReg current recipe and results."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from manim import *  # noqa: F403

from utils.layout import bullet_list, footer, title_block
from utils.style import BG, BLUE, FONT, GREEN, LINE, MUTED, ORANGE, PURPLE, RED, TEXT, YELLOW


class CurrentRecipe(Scene):
    def construct(self):
        self.camera.background_color = BG
        head = title_block("VICReg repairs the readout", "Batch-128 probe looked strong — full-val tells the honest story.")
        self.play(FadeIn(head, shift=DOWN * 0.1), run_time=0.7)

        left = self._panel("Architecture", [
            "encoder loops = 3",
            "aux_pred on loops 1,2",
            "EMA target = 0.99999",
            "predictor maps online -> target",
        ], GREEN)
        right = self._panel("Readout guard", [
            "WM_REG_MODE=vicreg",
            "variance hinge",
            "covariance decorrelation",
            "rank and KNN reported",
        ], BLUE)
        VGroup(left, right).arrange(RIGHT, buff=0.55).move_to(DOWN * 0.1)
        self.play(FadeIn(left, shift=RIGHT * 0.1), FadeIn(right, shift=LEFT * 0.1), run_time=0.9)
        self.wait(1.4)
        self.play(FadeOut(left), FadeOut(right), run_time=0.5)

        batch_label = Text("batch-128 probe (screen, 2K steps)", font=FONT, font_size=18, color=MUTED)
        batch_chips = VGroup(
            self._metric("lift", "+1.06", YELLOW),
            self._metric("rank", "53.5", GREEN),
            self._metric("KNN@5", "0.41", BLUE),
        ).arrange(RIGHT, buff=0.25)
        full_label = Text("full-val N=5000 (step 28K, SOTA)", font=FONT, font_size=18, color=ORANGE, weight=BOLD)
        full_chips = VGroup(
            self._metric("eff_rank", "53.29", GREEN),
            self._metric("KNN@5", "0.058", BLUE),
            self._metric("KNN@50", "0.261", BLUE),
        ).arrange(RIGHT, buff=0.25)
        metrics = VGroup(batch_label, batch_chips, full_label, full_chips).arrange(DOWN, buff=0.3)
        metrics.move_to(DOWN * 0.1)
        self.play(FadeIn(metrics, shift=UP * 0.1), run_time=0.8)
        self.wait(1.6)

        proxy = bullet_list([
            "14x KNN@5 vs pre-VICReg baseline",
            "25x eff_rank vs pre-VICReg baseline",
            "58x random KNN@5 (full-val N=5000)",
            "overfits past 28K: KNN@1 drops 0.0142 -> 0.0026 by 44K",
            "encoder rank healthy across seeds (53-64/128)",
            "predictor rank collapsed everywhere (5-6/128)",
        ], font_size=17, max_width=8.3)
        proxy.move_to(DOWN * 0.2)
        label = Text("VICReg vs pre-VICReg (full-val N=5000)", font=FONT, font_size=24, color=ORANGE, weight=BOLD).next_to(proxy, UP, buff=0.35)
        self.play(
            FadeOut(metrics),
            FadeIn(label),
            FadeIn(proxy, shift=UP * 0.1),
            run_time=0.8,
        )
        close = footer("Encoder is fixed. Predictor is the next bottleneck.", color=PURPLE)
        self.play(FadeIn(close, shift=UP * 0.1), run_time=0.6)
        self.wait(2.0)

    def _panel(self, title: str, items: list[str], color) -> VGroup:
        box = RoundedRectangle(width=5.6, height=3.35, corner_radius=0.08, stroke_color=color, fill_color="#141B18", fill_opacity=1)
        title_mob = Text(title, font=FONT, font_size=23, color=color, weight=BOLD).move_to(box.get_top() + DOWN * 0.42)
        bullets = bullet_list(items, font_size=16, max_width=4.55)
        bullets.move_to(box.get_center() + DOWN * 0.22)
        return VGroup(box, title_mob, bullets)

    def _metric(self, label: str, value: str, color) -> VGroup:
        box = RoundedRectangle(width=2.55, height=1.1, corner_radius=0.08, stroke_color=color, fill_color="#141B18", fill_opacity=1)
        label_mob = Text(label, font=FONT, font_size=13, color=MUTED).move_to(box.get_top() + DOWN * 0.24)
        value_mob = Text(value, font=FONT, font_size=24, color=color, weight=BOLD).move_to(box.get_center() + DOWN * 0.08)
        return VGroup(box, label_mob, value_mob)
