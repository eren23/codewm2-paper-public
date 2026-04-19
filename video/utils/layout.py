"""Small layout helpers for reviewable Manim scenes.

The video is built scene-by-scene at low resolution first, so the helpers
favor fixed regions and bounded text over clever auto-layout.
"""

from __future__ import annotations

from manim import DOWN, LEFT, RIGHT, UP, VGroup, Text, config

from utils.style import FONT, MUTED, TEXT


def fit_text(
    value: str,
    *,
    font_size: int,
    color=TEXT,
    weight=None,
    max_width: float | None = None,
) -> Text:
    kwargs = {"font": FONT, "font_size": font_size, "color": color}
    if weight is not None:
        kwargs["weight"] = weight
    mob = Text(value, **kwargs)
    if max_width is not None and mob.width > max_width:
        mob.scale_to_fit_width(max_width)
    return mob


def title_block(title: str, subtitle: str | None = None) -> VGroup:
    title_mob = fit_text(title, font_size=34, weight="BOLD", max_width=12.2)
    title_mob.to_edge(UP, buff=0.42)
    if subtitle is None:
        return VGroup(title_mob)
    subtitle_mob = fit_text(subtitle, font_size=18, color=MUTED, max_width=11.2)
    subtitle_mob.next_to(title_mob, DOWN, buff=0.16)
    return VGroup(title_mob, subtitle_mob)


def footer(value: str, *, color=TEXT) -> Text:
    mob = fit_text(value, font_size=19, color=color, weight="BOLD", max_width=11.4)
    mob.to_edge(DOWN, buff=0.48)
    return mob


def bullet_list(items: list[str], *, font_size: int = 18, color=TEXT, max_width: float = 5.6) -> VGroup:
    rows = VGroup()
    for item in items:
        bullet = fit_text("*", font_size=font_size, color=color, weight="BOLD")
        text = fit_text(item, font_size=font_size, color=color, max_width=max_width)
        row = VGroup(bullet, text).arrange(RIGHT, buff=0.18, aligned_edge=UP)
        rows.add(row)
    rows.arrange(DOWN, aligned_edge=LEFT, buff=0.22)
    return rows


def safe_top_y() -> float:
    return config.frame_y_radius - 0.45


def safe_bottom_y() -> float:
    return -config.frame_y_radius + 0.45
