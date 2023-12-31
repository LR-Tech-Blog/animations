import { Rect } from "@motion-canvas/2d";
import {
  ThreadGenerator,
  tween,
  sequence,
  map,
  easeInOutCubic,
} from "@motion-canvas/core";

export function* popUp(
  rect: Rect,
  scale: number = 1,
  opacity: number = 1
): ThreadGenerator {
  yield* sequence(
    0.2,
    tween(0.4, (value) => rect.scale(map(0, scale, easeInOutCubic(value)))),
    tween(0.4, (value) => rect.opacity(map(0, opacity, easeInOutCubic(value))))
  );
}

export function* pulseStroke(
  rect: Rect,
  pulseValue: number,
  timeToBack: number = 0.2
): ThreadGenerator {
  yield* sequence(
    timeToBack,
    rect.lineWidth(0, 0).to(pulseValue, 0.3),
    rect.lineWidth(pulseValue, 0).to(0, 0.3)
  );
}
