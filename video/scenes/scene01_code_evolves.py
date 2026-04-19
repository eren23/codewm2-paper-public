"""Scene 01: code evolves, so state has dynamics."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from manim import *  # noqa: F403

from utils.layout import footer, title_block
from utils.style import BG, BLUE, FONT, GREEN, LINE, MUTED, ORANGE, TEXT, YELLOW


class CodeEvolves(Scene):
    def construct(self):
        self.camera.background_color = BG

        head = title_block(
            "Code is a state machine",
            "A commit changes source, structure, and the next latent state.",
        )
        self.play(FadeIn(head, shift=DOWN * 0.1), run_time=0.7)

        code_versions = [
            ("v0", ["def parse_int(s):", "    return int(s)"], "minimal parse"),
            ("v1", ["def parse_int(s):", "    if not s:", "        return 0", "    return int(s)"], "+ guard clause"),
            (
                "v2",
                [
                    "def parse_int(s):",
                    "    if not s:",
                    "        return 0",
                    "    try:",
                    "        return int(s)",
                    "    except ValueError:",
                    "        return 0",
                ],
                "+ try / except",
            ),
        ]
        ast_versions = [
            (
                ["Module", "FuncDef", "args", "Return", "Call int"],
                [(0, 1), (1, 2), (1, 3), (3, 4)],
                {
                    0: UP * 1.35,
                    1: UP * 0.58,
                    2: LEFT * 1.15 + DOWN * 0.2,
                    3: RIGHT * 0.8 + DOWN * 0.2,
                    4: RIGHT * 0.8 + DOWN * 0.98,
                },
            ),
            (
                ["Module", "FuncDef", "args", "If", "Return 0", "Return", "Call int"],
                [(0, 1), (1, 2), (1, 3), (3, 4), (1, 5), (5, 6)],
                {
                    0: UP * 1.48,
                    1: UP * 0.72,
                    2: LEFT * 1.55,
                    3: LEFT * 0.25,
                    4: LEFT * 0.25 + DOWN * 0.78,
                    5: RIGHT * 1.25,
                    6: RIGHT * 1.25 + DOWN * 0.78,
                },
            ),
            (
                ["Module", "FuncDef", "args", "If", "Return 0", "Try", "Call int", "Except", "Return 0"],
                [(0, 1), (1, 2), (1, 3), (3, 4), (1, 5), (5, 6), (5, 7), (7, 8)],
                {
                    0: UP * 1.55,
                    1: UP * 0.82,
                    2: LEFT * 1.9 + UP * 0.05,
                    3: LEFT * 0.85 + UP * 0.05,
                    4: LEFT * 0.85 + DOWN * 0.72,
                    5: RIGHT * 0.85 + UP * 0.05,
                    6: RIGHT * 0.35 + DOWN * 0.82,
                    7: RIGHT * 1.6 + DOWN * 0.82,
                    8: RIGHT * 1.6 + DOWN * 1.52,
                },
            ),
        ]

        code_box = RoundedRectangle(
            width=5.45,
            height=4.25,
            corner_radius=0.08,
            stroke_color=LINE,
            fill_color="#141B18",
            fill_opacity=1,
        ).move_to(LEFT * 3.25 + DOWN * 0.1)
        ast_box = RoundedRectangle(
            width=5.45,
            height=4.25,
            corner_radius=0.08,
            stroke_color=LINE,
            fill_color="#141B18",
            fill_opacity=1,
        ).move_to(RIGHT * 3.25 + DOWN * 0.1)

        labels = VGroup(
            Text("source", font=FONT, font_size=17, color=MUTED).next_to(code_box, UP, buff=0.18),
            Text("AST sketch", font=FONT, font_size=17, color=MUTED).next_to(ast_box, UP, buff=0.18),
        )

        self.play(Create(code_box), Create(ast_box), FadeIn(labels), run_time=0.7)

        current = VGroup()
        colors = [TEXT, GREEN, ORANGE]
        for idx, ((version, code_lines, edit_label), ast_spec) in enumerate(zip(code_versions, ast_versions)):
            version_label = Text(version, font=FONT, font_size=24, color=colors[idx], weight=BOLD)
            version_label.move_to(code_box.get_corner(UL) + RIGHT * 0.42 + DOWN * 0.36, aligned_edge=LEFT)
            edit_mob = Text(edit_label, font=FONT, font_size=15, color=colors[idx])
            edit_mob.move_to(code_box.get_corner(UL) + RIGHT * 1.18 + DOWN * 0.41, aligned_edge=LEFT)
            code_mob = self._code_block(code_lines, idx, code_box)

            ast = self._ast_tree(ast_spec, colors[idx]).move_to(ast_box.get_center() + DOWN * 0.1)
            next_group = VGroup(version_label, edit_mob, code_mob, ast)
            if current:
                self.play(FadeOut(current, shift=LEFT * 0.2), run_time=0.35)
            self.play(FadeIn(next_group, shift=RIGHT * 0.18), run_time=0.7)
            current = next_group
            self.wait(1.0 if idx == len(code_versions) - 1 else 0.45)

        path = VGroup()
        dots = VGroup()
        dot_labels = VGroup()
        for label, x, color in [("v0", -2.1, TEXT), ("v1", 0.0, GREEN), ("v2", 2.1, ORANGE)]:
            dot = Dot(point=DOWN * 2.75 + RIGHT * x, radius=0.08, color=color)
            dots.add(dot)
            dot_labels.add(Text(label, font=FONT, font_size=16, color=color).next_to(dot, DOWN, buff=0.13))
        path.add(Line(dots[0], dots[1], color=BLUE, stroke_width=3), Line(dots[1], dots[2], color=BLUE, stroke_width=3), dots, dot_labels)
        caption = footer("The model is asked to learn this trajectory.", color=YELLOW)
        self.play(FadeOut(current), FadeOut(code_box), FadeOut(ast_box), FadeOut(labels), run_time=0.5)
        self.play(FadeIn(path), FadeIn(caption), run_time=0.8)
        self.wait(1.0)

    def _code_block(self, lines: list[str], version_idx: int, code_box: RoundedRectangle) -> VGroup:
        changed_lines = {
            0: set(),
            1: {1, 2},
            2: {3, 4, 5, 6},
        }[version_idx]
        rows = VGroup()
        origin = code_box.get_corner(UL) + RIGHT * 0.55 + DOWN * 1.05
        for i, line in enumerate(lines):
            color = GREEN if i in changed_lines and version_idx == 1 else ORANGE if i in changed_lines else TEXT
            text = Text(line, font=FONT, font_size=16, color=color)
            text.move_to(origin + DOWN * i * 0.38, aligned_edge=LEFT)
            rows.add(text)
        return rows

    def _ast_tree(self, spec, color) -> VGroup:
        labels, edges, positions = spec
        nodes = VGroup()
        node_by_index = {}
        for i, label in enumerate(labels):
            box = RoundedRectangle(
                width=1.08,
                height=0.34,
                corner_radius=0.06,
                stroke_color=color,
                fill_color="#17211E",
                fill_opacity=1,
                stroke_width=1.5,
            )
            text = Text(label, font=FONT, font_size=10, color=TEXT)
            if text.width > 0.92:
                text.scale_to_fit_width(0.92)
            node = VGroup(box, text).move_to(positions[i])
            nodes.add(node)
            node_by_index[i] = node
        connectors = VGroup()
        for src, dst in edges:
            connectors.add(Line(node_by_index[src].get_bottom(), node_by_index[dst].get_top(), color=LINE, stroke_width=2))
        return VGroup(connectors, nodes)
