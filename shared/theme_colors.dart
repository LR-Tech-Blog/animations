import 'dart:ui';

import 'package:physics_scene_engine/shared/widgets/theme/dark_theme_colors.dart';
import 'package:physics_scene_engine/shared/widgets/theme/light_theme_colors.dart';

ThemeColors getTheme({bool isDarkMode = false}) {
  return isDarkMode ? DarkThemeColors() : LightThemeColors();
}

abstract class ThemeColors {
  Color get rosewater;
  Color get mauve;
  Color get red;
  Color get maroon;
  Color get peach;
  Color get yellow;
  Color get green;
  Color get blue;
  Color get lavender;
  Color get text;
  Color get subtext1;
  Color get subtext0;
  Color get overlay2;
  Color get overlay1;
  Color get overlay0;
  Color get surface2;
  Color get surface1;
  Color get surface0;
  Color get base;
  Color get mantle;
  Color get crust;
}
