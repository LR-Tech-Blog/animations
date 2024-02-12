import { CubicBezier, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { CodeBlock, edit } from "@motion-canvas/2d/lib/components/CodeBlock";
import {
  DEFAULT,
  all,
  chain,
  createRef,
  easeInCubic,
  easeInOutCubic,
  easeOutCubic,
  map,
  sequence,
  tween,
  useScene,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { getColorTheme } from "../shared/styles";
import {
  animalClass,
  aveClassBody,
  aveClassDeclaration,
  galinhaClassBody,
  galinhaClassDeclaration,
} from "../code";
import { popUp } from "../shared/reanimations";

export default makeScene2D(function* (view) {
  const theme = useScene().variables.get<boolean>("darkMode", false);
  const isDarkMode = theme();
  const colors = getColorTheme(isDarkMode);
  const size = useScene().getSize();

  view.add(<Rect width={size.width} height={size.height} fill={colors.Base} />);

  const animalClassCodeRef = createRef<Rect>();

  view.add(
    <Rect
      ref={animalClassCodeRef}
      layout
      padding={30}
      radius={12}
      fill={colors.Overlay2}
      scale={0}
      opacity={0}
    >
      <CodeBlock
        language="java"
        fontFamily={"JetBrains Mono"}
        code={animalClass}
      />
    </Rect>
  );
  yield* popUp(animalClassCodeRef());

  const relationLineRef = createRef<CubicBezier>();
  view.add(
    <CubicBezier
      ref={relationLineRef}
      stroke={colors.Overlay2}
      lineWidth={10}
      end={0}
      p0={[0, -560]}
      p1={[0, 600]}
      p2={[0, 600]}
      p3={[0, 600]}
      endArrow
    />
  );

  yield* chain(
    waitFor(2),
    sequence(
      0.5,
      tween(1, (value) =>
        animalClassCodeRef().y(map(0, -1000, easeInCubic(value)))
      ),
      tween(0.5, (value) =>
        relationLineRef().end(map(0, 1, easeInOutCubic(value)))
      )
    )
  );
  animalClassCodeRef().remove();

  const aveClassDeclarationRef = createRef<Rect>();
  const aveClassDeclarationCodeRef = createRef<CodeBlock>();
  view.add(
    <Rect
      ref={aveClassDeclarationRef}
      layout
      padding={30}
      radius={12}
      fill={colors.Overlay2}
      y={-600}
    >
      <CodeBlock
        ref={aveClassDeclarationCodeRef}
        language="java"
        fontFamily={"JetBrains Mono"}
        code={aveClassDeclaration}
      />
    </Rect>
  );

  yield* all(
    tween(1, (value) =>
      aveClassDeclarationRef().y(map(600, 0, easeInOutCubic(value)))
    ),
    tween(1, (value) =>
      relationLineRef().end(map(1, 0.42, easeInOutCubic(value)))
    )
  );

  const aveCodeExplanationRef = createRef<Txt>();
  view.add(
    <Txt
      ref={aveCodeExplanationRef}
      text={`➡️ Ave tem tudo que Animal tem e mais algumas coisas.
➡️ Ave é um tipo de Animal.
        `}
      fontFamily={"JetBrains Mono"}
      fontSize={42}
      fill={colors.Text}
      y={150}
      x={-20}
      opacity={0}
      scale={0}
    />
  );

  yield* chain(
    popUp(aveCodeExplanationRef()),
    waitFor(2),
    tween(0.5, (value) =>
      aveCodeExplanationRef().opacity(map(1, 0, easeOutCubic(value)))
    )
  );
  aveCodeExplanationRef().remove();

  yield* aveClassDeclarationCodeRef().edit(
    2
  )`public abstract class Ave extends Animal {${edit("...", aveClassBody)}}`;
  yield* waitFor(1);

  yield* all(
    tween(1, (value) =>
      aveClassDeclarationRef().y(map(0, -800, easeInCubic(value)))
    ),
    aveClassDeclarationCodeRef().selection(DEFAULT, 1),
    tween(1, (value) =>
      relationLineRef().end(map(0.42, 1, easeInOutCubic(value)))
    )
  );
  aveClassDeclarationRef().remove();

  const galinhaClassDeclarationRef = createRef<Rect>();
  const galinhaClassDeclarationCodeRef = createRef<CodeBlock>();
  view.add(
    <Rect
      ref={galinhaClassDeclarationRef}
      layout
      padding={30}
      radius={12}
      fill={colors.Overlay2}
      y={600}
    >
      <CodeBlock
        ref={galinhaClassDeclarationCodeRef}
        language="java"
        fontFamily={"JetBrains Mono"}
        code={galinhaClassDeclaration}
      />
    </Rect>
  );

  yield* all(
    tween(1, (value) =>
      relationLineRef().end(map(1, 0.42, easeOutCubic(value)))
    ),
    tween(1, (value) =>
      galinhaClassDeclarationRef().y(map(600, 0, easeOutCubic(value)))
    )
  );
  yield* galinhaClassDeclarationCodeRef().edit(
    2
  )`public class Galinha extends Ave {${edit("...", galinhaClassBody)}}`;
  yield* waitFor(2);

  yield* all(
    tween(1, (value) =>
      galinhaClassDeclarationRef().y(map(0, -900, easeInCubic(value)))
    ),
    galinhaClassDeclarationCodeRef().selection(DEFAULT, 1),
    tween(1.2, (value) =>
      relationLineRef().end(map(0.42, 0, easeInOutCubic(value)))
    )
  );
});
