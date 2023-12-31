import 'dart:math';

import 'package:flame/components.dart';
import 'package:flame/events.dart';
import 'package:flame_forge2d/flame_forge2d.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:physics_scene_engine/shared/widgets/ball.dart';
import 'package:physics_scene_engine/shared/widgets/rect.dart';
import 'package:physics_scene_engine/shared/widgets/theme/theme_colors.dart';

class OOPInActionMainScene extends Forge2DGame with KeyboardEvents {
  final ThemeColors colors;

  OOPInActionMainScene(this.colors);

  @override
  Color backgroundColor() {
    return colors.base;
  }

  @override
  Future<void> onLoad() async {
    await super.onLoad();

    world.gravity = Vector2(0, 60);
    world.add(Rect(
      drawPoss: Vector2(-100, 30),
      widht: 500,
      height: 5,
      bodyPaint: Paint()..color = colors.overlay0,
    ));
  }

  @override
  KeyEventResult onKeyEvent(
    RawKeyEvent event,
    Set<LogicalKeyboardKey> keysPressed,
  ) {
    if (keysPressed.contains(LogicalKeyboardKey.space)) {
      world.add(_spawnRandomBall());
    }

    return KeyEventResult.handled;
  }

  Ball _spawnRandomBall() {
    Vector2 randomPosition() {
      final random = Random();
      const maxRange = 50;
      final hasSinal = random.nextBool();
      final x = hasSinal
          ? -random.nextDouble() * maxRange
          : random.nextDouble() * maxRange;
      return Vector2(x, -30);
    }

    final ballPosition = randomPosition();

    return Ball(
      initialPosition: ballPosition,
      radius: 4,
      restitution: 0.3,
      friction: 0.1,
      bodyPaint: Paint()..color = colors.blue,
    );
  }
}
