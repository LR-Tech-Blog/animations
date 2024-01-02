import { Circle, Rect, Txt, Video, makeScene2D } from "@motion-canvas/2d";
import {
  CodeBlock,
  insert,
  remove,
} from "@motion-canvas/2d/lib/components/CodeBlock";
import { circleJavaClass } from "../code";
import { getColorTheme } from "../shared/styles";
import {
  DEFAULT,
  all,
  createRef,
  createSignal,
  easeInCubic,
  easeInOutCubic,
  easeOutCubic,
  easeOutQuart,
  loop,
  map,
  sequence,
  tween,
  useScene,
  waitFor,
} from "@motion-canvas/core";
import objectDemoLight from "../../videos/object_demo_light.mp4";
import objectDemoDark from "../../videos/object_demo_dark.mp4";

import { popUp, pulseStroke } from "../shared/reanimations";

export default makeScene2D(function* (view) {
  const theme = useScene().variables.get<boolean>("darkMode", false);
  const isDarkMode = theme();
  const colors = getColorTheme(isDarkMode);
  const size = useScene().getSize();

  view.add(<Rect width={size.width} height={size.height} fill={colors.Base} />);

  const codeCircleRef = createRef<Circle>();
  const codeRectRef = createRef<Rect>();
  const codeRef = createRef<CodeBlock>();
  const codeCircleTitle = createRef<Txt>();

  const scaleSignal = createSignal(1);

  view.add(
    <>
      <Circle
        ref={codeCircleRef}
        scale={scaleSignal}
        width={850}
        height={850}
        stroke={colors.Overlay0}
        lineWidth={3}
        lineDash={[10, 10]}
        x={-1500}
      />
      <Rect
        ref={codeRectRef}
        x={codeCircleRef().x}
        y={codeCircleRef().y}
        scale={scaleSignal}
        fill={colors.Overlay0}
        radius={12}
        zIndex={1}
      >
        <CodeBlock
          ref={codeRef}
          language="java"
          code={circleJavaClass}
          fontFamily={"Jetbrains Mono"}
        />
      </Rect>
      <Txt
        ref={codeCircleTitle}
        fontFamily={"Jetbrains Mono"}
        fill={colors.Text}
        scale={scaleSignal}
        x={codeCircleRef().x}
        y={codeCircleRef().y() - 300}
      >
        Modelo
      </Txt>
    </>
  );

  yield* tween(1, (value) =>
    codeCircleRef().x(map(-1500, 0, easeOutQuart(value)))
  );

  const instantiationRectRef = createRef<Rect>();

  view.add(
    <Rect
      layout
      alignContent={"center"}
      justifyContent={"center"}
      direction={"column"}
      ref={instantiationRectRef}
      x={500}
      fill={colors.Overlay0}
      radius={12}
      padding={20}
      scale={0}
      opacity={0}
      stroke={colors.Blue}
    >
      <Txt
        textAlign={"center"}
        fontFamily={"Jetbrains Mono"}
        fill={colors.Text}
      >
        Instanciar
      </Txt>
      <CodeBlock
        language="java"
        code={"new Circle()"}
        fontFamily={"Jetbrains Mono"}
        fontSize={60}
      />
    </Rect>
  );

  yield* waitFor(0.5);

  yield* sequence(
    0.4,
    all(
      scaleSignal(1, 0.2).to(0.9, 1),
      codeCircleRef().x(0, 0).to(-500, 0.8),
      codeCircleRef().opacity(1, 0).to(0, 0.8)
    ),
    popUp(instantiationRectRef())
  );

  yield* waitFor(1);

  yield* all(
    scaleSignal(0.9, 0).to(0.7, 0.3),
    tween(0.5, (value) =>
      codeCircleRef().y(map(0, -300, easeInOutCubic(value)))
    ),
    tween(0.5, (value) =>
      codeCircleRef().x(map(-500, -600, easeInOutCubic(value)))
    ),
    codeCircleTitle().opacity(1, 0).to(0, 0.3),

    tween(0.5, (value) =>
      instantiationRectRef().x(map(500, 0, easeInOutCubic(value)))
    )
  );

  const newExplanationRectRef = createRef<Rect>();
  view.add(
    <Rect
      layout
      ref={newExplanationRectRef}
      y={200}
      fill={colors.Overlay0}
      radius={12}
      padding={20}
      scale={0}
      opacity={0}
    >
      <Txt fontFamily={"Jetbrains Mono"} fill={colors.Text}>
        Usado para criar um novo objeto
      </Txt>
    </Rect>
  );

  yield* popUp(newExplanationRectRef());
  yield* waitFor(1.3);
  yield* sequence(
    0.2,
    tween(0.4, (value) =>
      newExplanationRectRef().y(map(200, 600, easeInCubic(value)))
    ),
    tween(0.4, (value) =>
      instantiationRectRef().x(map(0, -600, easeInOutCubic(value)))
    )
  );
  newExplanationRectRef().remove();

  const objectDemoRef = createRef<Video>();
  const objectTextRef = createRef<Txt>();
  view.add(
    <>
      <Txt
        ref={objectTextRef}
        fontFamily={"Jetbrains Mono"}
        fill={colors.Text}
        x={350}
        y={-200}
        fontSize={60}
        opacity={0}
      >
        Objetos
      </Txt>
      <Video
        ref={objectDemoRef}
        src={isDarkMode ? objectDemoDark : objectDemoLight}
        x={350}
        radius={12}
        shadowBlur={30}
        shadowColor={colors.Crust}
        scale={0}
        opacity={0}
        stroke={colors.Blue}
      />
    </>
  );

  yield* popUp(objectDemoRef(), 0.8, 1);
  yield* all(
    tween(0.5, (value) =>
      objectTextRef().y(map(-200, -350, easeOutCubic(value)))
    ),
    objectTextRef().opacity(0, 0).to(1, 0)
  );

  objectDemoRef().play();
  if (isDarkMode) {
    yield* initialPulseTakeDark(instantiationRectRef(), objectDemoRef());
  } else {
    yield* initialPulseTakeLight(instantiationRectRef(), objectDemoRef());
  }

  const atributeTextRef = createRef<Txt>();
  view.add(
    <Txt
      ref={atributeTextRef}
      fontFamily={"Jetbrains Mono"}
      fill={colors.Text}
      opacity={0}
      fontSize={60}
      zIndex={0}
      x={codeRectRef().x}
    >
      Atributos
    </Txt>
  );

  yield* all(
    loop(13, () => pulseBoth(instantiationRectRef(), objectDemoRef())),
    tween(0.5, (value) =>
      instantiationRectRef().y(map(0, -300, easeInOutCubic(value)))
    ),
    tween(0.5, (value) =>
      codeCircleRef().y(map(-300, 0, easeInOutCubic(value)))
    ),
    scaleSignal(0.7, 0).to(1, 0.5),
    sequence(
      0.5,
      codeRef().edit(0.4)`${remove("public class Circle {")}
${remove("public String ")}color;
${remove("public int ")}radius;
${remove("public int ")}possitionX;
${remove("public int ")}possitionY;
  ${remove("}")}`,
      all(
        tween(0.5, (value) =>
          codeRectRef().width(map(0, 650, easeOutCubic(value)))
        ),
        tween(0.5, (value) =>
          codeRectRef().height(map(0, 300, easeOutCubic(value)))
        )
      ),
      codeRef().edit(0.4)`
color${insert(' = "blue"')};
radius${insert(" = 3")};
possitionX${insert(" = randomX")};
possitionY${insert(" = -100")};`,
      codeRef().selection(DEFAULT, 0.3),
      all(
        atributeTextRef().opacity(0, 0).to(1, 0),
        tween(0.5, (value) =>
          atributeTextRef().y(map(0, 250, easeOutCubic(value)))
        )
      )
    )
  );
});

function* pulseBoth(rect1: Rect, rect2: Rect) {
  const instantiationRectStrokeMaxPulse = 7;
  const objectDemoStrokeMaxPulse = 30;

  yield* all(
    pulseStroke(rect1, instantiationRectStrokeMaxPulse),
    pulseStroke(rect2, objectDemoStrokeMaxPulse)
  );
}

function* initialPulseTakeLight(
  instantiationRectRef: Rect,
  objectDemoRef: Rect
) {
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
  yield* waitFor(1.5);
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
  yield* waitFor(1);
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
  yield* waitFor(0.7);
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
  yield* waitFor(0.4);
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
  yield* waitFor(0.3);
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
}
function* initialPulseTakeDark(
  instantiationRectRef: Rect,
  objectDemoRef: Rect
) {
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
  yield* waitFor(2.1);
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
  yield* waitFor(1.6);
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
  yield* waitFor(1.6);
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
  yield* waitFor(1);
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
  yield* waitFor(0.3);
  yield* pulseBoth(instantiationRectRef, objectDemoRef);
}
