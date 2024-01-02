import {
  Rect,
  Txt,
  makeScene2D,
  Gradient,
  Line,
  CubicBezier,
} from "@motion-canvas/2d";
import {
  Vector2,
  all,
  createRef,
  easeInCubic,
  easeInOutCubic,
  easeOutCubic,
  map,
  sequence,
  tween,
  useScene,
  waitFor,
} from "@motion-canvas/core";
import { getColorTheme } from "../shared/styles";
import { CodeBlock, lines } from "@motion-canvas/2d/lib/components/CodeBlock";
import { bookClass, bookExternalInterface } from "../code";

export default makeScene2D(function* (view) {
  const theme = useScene().variables.get<boolean>("darkMode", false);
  const isDarkMode = theme();
  const colors = getColorTheme(isDarkMode);
  const size = useScene().getSize();

  view.add(<Rect width={size.width} height={size.height} fill={colors.Base} />);

  const bookRef = createRef<Rect>();
  const bookCodeRef = createRef<CodeBlock>();
  view.add(
    <Rect
      ref={bookRef}
      layout
      fill={colors.Overlay0}
      x={-1200}
      padding={20}
      radius={12}
      zIndex={2}
    >
      <CodeBlock ref={bookCodeRef} language="java" code={bookClass} />
    </Rect>
  );

  yield* tween(0.6, (value) =>
    bookRef().x(map(-1200, -500, easeOutCubic(value)))
  );

  yield* sequence(
    1,
    bookCodeRef().selection(lines(4, 6), 0.6),
    bookCodeRef().selection(lines(4, 10), 0.6)
  );
  yield* waitFor(0.5);

  const externalInterfaceRef = createRef<Rect>();
  view.add(
    <Rect
      ref={externalInterfaceRef}
      layout
      fill={colors.Overlay1}
      direction={"column"}
      alignItems={"center"}
      radius={12}
      padding={20}
      x={-500}
      zIndex={1}
    >
      <Txt fontFamily={"JetBrains Mono"} fill={colors.Text}>
        Visível
      </Txt>
      <CodeBlock
        language="java"
        code={bookExternalInterface}
        alignSelf={"center"}
      />
    </Rect>
  );

  yield* tween(1, (value) =>
    externalInterfaceRef().x(map(-500, 300, easeOutCubic(value)))
  );
  yield* waitFor(0.5);

  const gredientRectRef = createRef<Rect>();
  const worldTextRef = createRef<Txt>();
  view.add(
    <>
      <Rect
        ref={gredientRectRef}
        fill={
          new Gradient({
            from: { x: 0, y: 0 },
            to: { x: 1000, y: 0 },
            stops: [
              { offset: 1, color: colors.Blue },
              { offset: 0, color: colors.Base },
            ],
          })
        }
        width={1500}
        height={size.height}
        x={2000}
        zIndex={0}
      />
      <Txt
        ref={worldTextRef}
        x={1200}
        fill={colors.Text}
        fontFamily={"JetBrains Mono"}
        fontSize={102}
        zIndex={1}
      >
        Mundo
      </Txt>
    </>
  );

  yield* sequence(
    0.3,
    tween(1, (value) => bookRef().x(map(-500, -1500, easeInCubic(value)))),
    all(
      tween(1, (value) =>
        externalInterfaceRef().x(map(300, -500, easeInOutCubic(value)))
      ),
      externalInterfaceRef().scale(1, 0).to(1.3, 1)
    ),
    tween(0.6, (value) =>
      gredientRectRef().x(map(2000, 250, easeOutCubic(value)))
    ),
    tween(0.6, (value) => worldTextRef().x(map(1200, 700, easeOutCubic(value))))
  );
  bookRef().remove();

  const worldLineRef0 = createRef<Line>();
  const worldLineRef1 = createRef<Line>();
  const worldLineRef2 = createRef<Line>();
  view.add(
    <>
      <CubicBezier
        ref={worldLineRef1}
        stroke={colors.Red}
        lineWidth={15}
        endArrow
        end={0}
        p0={[1000, -250]}
        p1={[870, -398]}
        p2={[2, -373]}
        p3={[-133, -182]}
      />
      <Line
        ref={worldLineRef0}
        stroke={colors.Green}
        lineWidth={15}
        endArrow
        end={0}
        points={[Vector2.right.scale(1000), Vector2.left.scale(150)]}
        zIndex={0}
      />
      <CubicBezier
        ref={worldLineRef2}
        stroke={colors.Blue}
        lineWidth={15}
        endArrow
        end={0}
        p0={[1000, 250]}
        p1={[870, 398]}
        p2={[2, 373]}
        p3={[-133, 182]}
      />
    </>
  );

  yield* sequence(
    0.2,
    tween(1, (value) => worldLineRef0().end(map(0, 1, easeOutCubic(value)))),
    tween(1, (value) => worldLineRef1().end(map(0, 1, easeOutCubic(value)))),
    tween(1, (value) => worldLineRef2().end(map(0, 1, easeOutCubic(value))))
  );

  yield* waitFor(1.5);
});
