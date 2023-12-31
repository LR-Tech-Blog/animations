import 'package:flame_forge2d/flame_forge2d.dart';
import 'package:flutter/material.dart';

class Ball extends BodyComponent {
  final Vector2? _initialPosition;
  final double radius;
  final double restitution;
  final double friction;
  final double density;
  final double mass;
  final Paint? bodyPaint;

  Ball(
      {required this.radius,
      this.restitution = 1,
      this.friction = 1,
      this.density = 1,
      this.mass = 1,
      this.bodyPaint,
      Vector2? initialPosition})
      : _initialPosition = initialPosition,
        super(paint: bodyPaint);

  @override
  Future<void> onLoad() async {
    await super.onLoad();
    body.setMassData(MassData()..mass = mass);
  }

  @override
  Body createBody() {
    final bodyDef = BodyDef(
      position: _initialPosition ?? Vector2.zero(),
      type: BodyType.dynamic,
    );

    final shape = CircleShape()..radius = radius;
    final fixtureDef = FixtureDef(
      shape,
      restitution: restitution,
      friction: friction,
      density: density,
    );

    return world.createBody(bodyDef)..createFixture(fixtureDef);
  }
}
