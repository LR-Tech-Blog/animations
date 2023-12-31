import 'package:flame/game.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:physics_scene_engine/projects/oop_in_action/main_scene.dart';
import 'package:physics_scene_engine/shared/widgets/theme/theme_colors.dart';

void main() {
  const isDarkMode = false;
  final ThemeColors colors = getTheme(isDarkMode: isDarkMode);
  final OOPInActionMainScene scene = OOPInActionMainScene(colors);

  runApp(GameWidget(game: scene));
}
