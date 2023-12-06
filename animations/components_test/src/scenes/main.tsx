import { Circle, Rect, Node, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  easeInOutQuart,
  easeInOutQuint,
  makeRef,
  map,
  range,
  sequence,
  tween,
  useRandom,
  useScene,
  waitFor,
} from "@motion-canvas/core";
import { getColorTheme } from "../styles";

export default makeScene2D(function* (view) {
  const theme = useScene().variables.get<boolean>("darkMode", false);
  const sceneSize = useScene().getSize();
  const colors = getColorTheme(theme());
  view.add(
    <Rect width={sceneSize.x} height={sceneSize.y} fill={colors.Base} />
  );

  const circles: Circle[] = [];
  const random = useRandom()
  const circleColors: string[] = [colors.Red, colors.Green, colors.Blue, colors.Yellow, colors.Mauve];
  const circleRandomFill: string[] = [];
  const circleCount = 5;

  view.add(
    <Node
      x={-600}
      y={300}
    >
      {
        range(circleCount).map((i) => (
          <Circle
            ref={makeRef(circles, i)}
            width={200}
            height={200}
            x={300 * i}
            fill={colors.Red}
            shadowBlur={50}
          />
        ))
      }
    </Node>
  );
  
  yield* all(
    sequence(
      0.1,
      ...circles.map((circle) => tween(1, (value) => circle.position.y(map(0, -600, easeInOutQuint(value))))
    )),
    ...circles.map((circle, i) => {
      const color: string = circleColors[random.nextInt(0, circleColors.length)]
      circleRandomFill[i] = color;
      return circle.fill(colors.Red, 0).to(color, 1)
    }),
  )
  yield* all(
    sequence(
      0.1,
      ...circles.map((circle) => tween(1, (value) => circle.position.y(map(-600, 0, easeInOutQuint(value)))),
      )),
      ...circles.map((circle, i) => {
        const color: string = circleRandomFill[i]
        return circle.fill(color, 0).to(colors.Red, 1)
      }),
  )
});
