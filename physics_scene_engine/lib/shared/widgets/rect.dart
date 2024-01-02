import 'dart:ui';

import 'package:flame_forge2d/flame_forge2d.dart';

class Rect extends BodyComponent {
  final Vector2 drawPoss;
  final double widht;
  final double height;
  final Paint? bodyPaint;

  Rect(
      {required this.drawPoss, this.widht = 1, this.height = 1, this.bodyPaint})
      : assert(widht > 0 && height > 0),
        super(paint: bodyPaint);

  @override
  Body createBody() {
    final points = [
      Vector2(drawPoss.x, drawPoss.y),
      Vector2(drawPoss.x, drawPoss.y + height),
      Vector2(drawPoss.x + widht, drawPoss.y),
      Vector2(drawPoss.x + widht, drawPoss.y + height),
    ];

    final shape = PolygonShape()..set(points);
    final fixtureDef = FixtureDef(shape, friction: 0.3);
    final bodyDef = BodyDef(
      position: Vector2.zero(),
    );

    return world.createBody(bodyDef)..createFixture(fixtureDef);
  }
}
