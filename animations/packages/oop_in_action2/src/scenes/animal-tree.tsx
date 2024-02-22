import { CubicBezier, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  createRef,
  createRefArray,
  createSignal,
  easeInCubic,
  easeInOutCubic,
  easeOutCubic,
  makeRef,
  map,
  range,
  sequence,
  tween,
  useScene,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { getColorTheme } from "../shared/styles";
import { popUp } from "../shared/reanimations";

export default makeScene2D(function* (view) {
  const theme = useScene().variables.get<boolean>("darkMode", false);
  const isDarkMode = theme();
  const colors = getColorTheme(isDarkMode);
  const size = useScene().getSize();

  view.add(<Rect width={size.width} height={size.height} fill={colors.Base} />);

  const paddingSignal = createSignal(20);
  const fontSizeSignal = createSignal(38);
  const rectsRefs = createRefArray<Rect>();

  const fishAnimals = (
    <Rect layout direction={"column"} gap={100}>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Peixe"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Peixe-espada"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Peixe-palhaço"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Tubarão"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
    </Rect>
  );
  const amphibiansAnimals = (
    <Rect layout direction={"column"} gap={100}>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Anfíbios"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Axolote"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Sapo"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Salamandra"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
    </Rect>
  );
  const reptilesAnimals = (
    <Rect layout direction={"column"} gap={100}>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Répteis"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Lagarto"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Jacaré"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Serpente"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
    </Rect>
  );
  const birdsAnimals = (
    <Rect layout direction={"column"} gap={100}>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Ave"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Papagaio"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Beija-flor"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Corvo"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
    </Rect>
  );
  const mammalsAnimals = (
    <Rect layout direction={"column"} gap={100}>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Mamífero"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Macaco"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Urso"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
      >
        <Txt
          text={"Gato"}
          grow={1}
          textAlign={"center"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal}
          fill={colors.Text}
        />
      </Rect>
    </Rect>
  );

  const firstOrderRelationLineRef = createRefArray<CubicBezier>();
  view.add(
    <CubicBezier
      ref={firstOrderRelationLineRef}
      stroke={colors.Overlay2}
      lineWidth={10}
      p0={[-90, -420]}
      p1={[-400, -420]}
      p2={[-590, -420]}
      p3={[-590, -200]}
      endArrow
      end={0}
    />
  );
  view.add(
    <CubicBezier
      ref={firstOrderRelationLineRef}
      stroke={colors.Overlay2}
      lineWidth={10}
      p0={[-90, -380]}
      p1={[-250, -380]}
      p2={[-277, -300]}
      p3={[-277, -200]}
      endArrow
      end={0}
    />
  );
  view.add(
    <CubicBezier
      ref={firstOrderRelationLineRef}
      stroke={colors.Overlay2}
      lineWidth={10}
      p0={[36, -380]}
      p1={[36, -380]}
      p2={[36, -300]}
      p3={[36, -200]}
      endArrow
      end={0}
    />
  );
  view.add(
    <CubicBezier
      ref={firstOrderRelationLineRef}
      stroke={colors.Overlay2}
      lineWidth={10}
      p0={[90, -420]}
      p1={[550, -420]}
      p2={[660, -420]}
      p3={[660, -200]}
      endArrow
      end={0}
    />
  );
  view.add(
    <CubicBezier
      ref={firstOrderRelationLineRef}
      stroke={colors.Overlay2}
      lineWidth={10}
      p0={[92, -380]}
      p1={[370, -380]}
      p2={[350, -260]}
      p3={[350, -200]}
      endArrow
      end={0}
    />
  );

  const secondOrderRelationLineRef: CubicBezier[] = [];
  view.add(
    <>
      {range(5).map((_, index) => (
        <CubicBezier
          ref={makeRef(secondOrderRelationLineRef, index)}
          stroke={colors.Overlay2}
          lineWidth={10}
          p0={[-590 + 313 * index, -120]}
          p1={[-590 + 313 * index, -79]}
          p2={[-590 + 313 * index, -50]}
          p3={[-590 + 313 * index, -20]}
          endArrow
          end={0}
        />
      ))}
    </>
  );

  const thirdOrderRelationLineRef: CubicBezier[] = [];
  view.add(
    <>
      {range(5).map((_, index) => (
        <CubicBezier
          ref={makeRef(thirdOrderRelationLineRef, index)}
          stroke={colors.Overlay2}
          lineWidth={20}
          p0={[-590 + 313 * index, 26]}
          p1={[-590 + 313 * index, 210]}
          p2={[-590 + 313 * index, 400]}
          p3={[-590 + 313 * index, 400]}
          end={0}
        />
      ))}
    </>
  );

  const diagramRef = createRef<Rect>();
  view.add(
    <Rect
      ref={diagramRef}
      layout
      direction={"column"}
      justifyContent={"center"}
      gap={150}
    >
      <Rect
        ref={rectsRefs}
        layout
        padding={paddingSignal}
        radius={12}
        fill={colors.Overlay2}
        alignSelf={"center"}
      >
        <Txt
          text={"Animal"}
          fontFamily={"JetBrains Mono"}
          fontSize={fontSizeSignal() + 5}
          fill={colors.Text}
        />
      </Rect>
      <Rect layout direction={"row"} gap={50}>
        {fishAnimals}
        {amphibiansAnimals}
        {reptilesAnimals}
        {birdsAnimals}
        {mammalsAnimals}
      </Rect>
    </Rect>
  );
  for (const ref of rectsRefs) {
    ref.opacity(0);
    ref.scale(0);
  }

  yield* sequence(0.1, ...rectsRefs.map((ref) => popUp(ref)));
  yield* sequence(
    0.3,
    ...firstOrderRelationLineRef.map((ref) =>
      tween(0.4, (value) => ref.end(map(0, 1, easeInOutCubic(value))))
    )
  );
  yield* sequence(
    0.1,
    ...secondOrderRelationLineRef.map((ref) =>
      tween(0.4, (value) => ref.end(map(0, 1, easeInOutCubic(value))))
    )
  );
  yield* sequence(
    0.1,
    ...thirdOrderRelationLineRef.map((ref) =>
      tween(0.4, (value) => ref.end(map(0, 1, easeInOutCubic(value))))
    )
  );
  yield* waitFor(1)

  yield* sequence(
    0.3,
    ...firstOrderRelationLineRef.map((ref) =>
      tween(0.4, (value) => ref.start(map(0, 1, easeInOutCubic(value))))
    )
  );
  yield* sequence(
    0.1,
    ...secondOrderRelationLineRef.map((ref) =>
      tween(0.4, (value) => ref.start(map(0, 1, easeInOutCubic(value))))
    )
  );
  yield* sequence(
    0.1,
    ...thirdOrderRelationLineRef.map((ref) =>
      tween(0.4, (value) => ref.start(map(0, 1, easeInOutCubic(value))))
    )
  );

  const concreateDelimiterRef = createRef<Rect>();
  view.add(
    <Rect
      ref={concreateDelimiterRef}
      layout
      fill={colors.Rosewater}
      opacity={0.3}
      stroke={colors.Red}
      lineWidth={5}
      width={2000}
      height={550}
      lineDash={[10]}
      y={210}
      x={-2000}
      justifyContent={"start"}
      alignItems={"center"}
      padding={60}
      clip
    >
      <Txt
        text={"Concreto"}
        textAlign={"center"}
        fontFamily={"JetBrains Mono"}
        fontSize={52}
        fill={colors.Mantle}
      />
    </Rect>
  );
  const abstractDelimiterRef = createRef<Rect>();
  view.add(
    <Rect
      ref={abstractDelimiterRef}
      layout
      fill={colors.Peach}
      opacity={0.3}
      stroke={colors.Blue}
      lineWidth={5}
      width={2000}
      height={400}
      lineDash={[10]}
      y={-265}
      x={-2000}
      justifyContent={"start"}
      alignItems={"center"}
      padding={60}
      clip
    >
      <Txt
        text={"Abstrato"}
        textAlign={"center"}
        fontFamily={"JetBrains Mono"}
        fontSize={52}
        fill={colors.Mantle}
      />
    </Rect>
  );

  yield* sequence(
    0.5,
    tween(1, (value) =>
      diagramRef().x(map(0, 150, easeInOutCubic(value)))
    ),
    tween(1, (value) =>
    concreateDelimiterRef().x(map(-2000, 0, easeOutCubic(value)))
  ),
  tween(1, (value) =>
    abstractDelimiterRef().x(map(-2000, 0, easeOutCubic(value)))
  )
  )

  yield* waitUntil("end");
});
