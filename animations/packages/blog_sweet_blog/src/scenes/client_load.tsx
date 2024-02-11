import { Layout, Rect, Txt, makeScene2D, Node, CubicBezier } from "@motion-canvas/2d";
import { CodeBlock, insert } from "@motion-canvas/2d/lib/components/CodeBlock"
import {
  all,
  createRef,
  easeOutCubic,
  tween,
  map,
  chain,
  createSignal,
  waitFor,
  makeRef,
  easeOutQuad,
  waitUntil,
  easeInOutQuart,
} from "@motion-canvas/core";
import { surfaceColor, bgColor, yellowColor, fontColor as textColor, mantleColor, fontColor } from "../theme/colors";

export default makeScene2D(function* (view) {
  const pageElements: Rect[] = []
  const pageWrapper = createRef<Node>();
  const loading = createRef<Txt>();
  const clientDirective = createRef<CodeBlock>();
  const elementInteractive = createRef<Txt>()
  const headerComponent = createRef<CodeBlock>();
  const jsLoadedArrow = createRef<CubicBezier>();
  const jsLoadedText = createRef<Txt>();
  const loadingSignal = createSignal(0);

  const pageWidth = 1000;
  const pageHeight = 800;

  view.add(
    <CodeBlock ref={clientDirective} language="tsx"
    x={-530} y={-350} fontSize={70} fontWeight={600} opacity={0}
    code={"client:load"}
    />
  )

  view.add(
    <Node ref={pageWrapper} x={400}>
      <Txt ref={loading} fontFamily={"Poppins"} fill={textColor} fontSize={30}
      opacity={0} x={-350} y={-430}>
        RECARREGANDO...
      </Txt>
      <Rect
        fill={surfaceColor}
        width={pageWidth}
        height={pageHeight}
        radius={12}
        stroke={yellowColor}
        lineWidth={loadingSignal}
      >
        <Layout
          layout
          gap={10}
          width={pageWidth - 50}
          height={pageHeight - 50}
          direction={"column"}
        >
          <Rect
            ref={makeRef(pageElements, 0)}
            grow={2}
            fill={mantleColor}
            stroke={yellowColor}
            radius={7}
            justifyContent={"center"}
            alignItems={"center"}>
              <CodeBlock ref={headerComponent} language="tsx" padding={0} 
              code={"<Header/>"}/>
            </Rect>
          <Layout layout gap={10} grow={5}>
            <Rect ref={makeRef(pageElements, 1)} grow={1} fill={bgColor} radius={7} />
            <Rect ref={makeRef(pageElements, 2)} grow={3} fill={bgColor} radius={7} />
          </Layout>
          <Rect ref={makeRef(pageElements, 3)} grow={2} fill={bgColor} radius={7} />
        </Layout>
      </Rect>
      <Txt ref={elementInteractive} fontFamily={"Poppins"} fill={fontColor} fontSize={30}
      x={320} y={-200} opacity={pageElements[0].opacity}>
        NÃO INTERATIVO
      </Txt>
    </Node>
  );

  view.add(
    <CubicBezier
      ref={jsLoadedArrow}
      lineWidth={10}
      stroke={yellowColor}
      p0={[78, -270]}
      p1={[400, -270]}
      p2={[400, -270]}
      p3={[800, -270]}
      end={0}
    />
  )

  view.add(
    <Txt ref={jsLoadedText} fontFamily={"Poppins"} fill={yellowColor} fontSize={60}
    x={460} y={-320} opacity={0} scale={0.98}>
      Javascript carregado
    </Txt>
  )

  yield* all(
    tween(1, (value) => {
      pageWrapper().position.x(map(1500, 400, easeOutCubic(value)));
    }),
    clientDirective().opacity(1, 0.5)
  );
  yield* all(
    clientDirective().x(-530, 0).to(110, 1),
    clientDirective().y(-350, 0).to(-270, 1)
  )
  yield* tween(0.5, (value) => {
    pageWrapper().position.x(map(400, 0, easeOutCubic(value)));
  })
  yield* all(
    ...pageElements.map(rec => rec.opacity(1, 0).to(0, 0.3)),
    ...pageElements.map(rec => rec.scale(1, 0).to(0.98, 0.3)),
  )
  yield* all(
    clientDirective().opacity(1, 0).to(0, 0),
    loading().opacity(1, 0.3),
    headerComponent().edit(0)`<Header ${insert("client:load")}/>`,
    chain(
      loadingSignal(10, 0.5),
      loadingSignal(0, 0.5),
      loadingSignal(10, 0.5),
      loadingSignal(0, 0.5),
      loadingSignal(10, 0.5),
      loadingSignal(0, 0.5),
    ),
    chain(
      waitFor(0.3),
      chain(
        ...pageElements.map(rec => rec.opacity(0, 0).to(1, 0.3)),
        all(
          tween(0.3, (value) => {
            pageElements[0].lineWidth(map(0, 7, easeOutQuad(value)))
          }),
          elementInteractive().text("NÃO INTERATIVO", 0).to("INTERATIVO", 0.3),
          elementInteractive().x(320, 0).to(350, 0.3),
          elementInteractive().fill(textColor, 0).to(yellowColor, 0.3)
        ),
        ...pageElements.map(rec => rec.scale(0.98, 0).to(1, 0.3)),
      ),
      loading().opacity(0, 0.3),
    )
  )
  yield* waitFor(0.3)
  yield* chain(
    pageWrapper().position.x(0, 0).to(-400, 1),
    tween(0.4, (value) => jsLoadedArrow().end(map(0, 1, easeInOutQuart(value)))),
    all(
      jsLoadedText().opacity(1, 0.3),
      jsLoadedText().scale(0.98, 0).to(1, 0.3),
    )
  )
  yield* waitUntil("end")
});
