import {
  makeScene2D,
  Rect,
  Node,
  Txt,
  CubicBezier,
  BezierOverlayInfo,
  Img,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  easeInCirc,
  easeInCubic,
  easeInOutCubic,
  easeInOutQuart,
  easeInQuart,
  easeOutCirc,
  easeOutCubic,
  easeOutQuart,
  map,
  range,
  sequence,
  tween,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import File from "./components/File";
import {
  fontColor,
  lavanderColor,
  mantleColor,
  surfaceColor,
} from "../theme/colors";
import helloWorldImage from "../images/hello_world.jpg";

export default makeScene2D(function* (view) {
  const contentPage = createRef<Node>();
  const contentPageText = createRef<Txt>();
  const contentPageFile = createRef<Rect>();

  const postContent = `
  ---
  title: "Hello World"
  author: rog
  image: {
    "src": "/images/posts/hello_world.jpg",
    "alt": "Hello World"
  }
  ---
  # Header 1
  Isto é um parágrafo
  `;
  const dataContent = `
  {
    "name": "Luan Roger",
    "linkedin": "https://linkedin.com/in/luan-roger",
    "github": "https://github.com/LuanRoger",
  }
  `;

  view.add(
    <Node ref={contentPage}>
      <Txt
        ref={contentPageText}
        fontFamily={"Poppins"}
        y={-330}
        x={-30}
        fill={fontColor}
        opacity={0}
        fontSize={40}
      >
        Página de conteúdo
      </Txt>
      <File
        ref={contentPageFile}
        filePath="content.mdx"
        fileWidth={290}
        shadowColor={lavanderColor}
        code={postContent}
      />
    </Node>
  );
  yield* sequence(
    0.5,
    tween(1, (value) =>
      contentPageFile().height(map(0, 600, easeOutCirc(value)))
    ),
    contentPageText().opacity(0, 0).to(1, 0.3)
  );
  yield* chain(
    all(
      contentPageFile().shadowBlur(0, 0).to(20, 0.2),
      tween(0.6, (value) =>
        contentPageFile().width(map(500, 940, easeOutCirc(value)))
      ),
    ),
    waitFor(1),
    all(
      contentPageFile().shadowBlur(20, 0).to(0, 0.2),
      tween(0.6, (value) =>
      contentPageFile().width(map(940, 500, easeInQuart(value)))
      ),
    )
  );

  yield* tween(1, (value) => contentPage().x(map(0, -600, easeInOutQuart(value))))

  const contentData = createRef<Node>();
  const contentDataText = createRef<Txt>();
  const contentDataFile = createRef<Rect>();
  view.add(
    <Node ref={contentData}>
      <Txt
        ref={contentDataText}
        fontFamily={"Poppins"}
        y={-330}
        x={-30}
        fill={fontColor}
        opacity={0}
        fontSize={40}
      >
        Informações
      </Txt>
      <File
        ref={contentDataFile}
        filePath="author.json"
        fileWidth={290}
        language="json"
        code={dataContent}
        codeFontSize={30}
        shadowColor={lavanderColor}
      />
    </Node>
  );

  yield* sequence(
    0.4,
    tween(0.4, (value) =>
      contentDataFile().height(map(0, 600, easeOutCirc(value)))
    ),
    contentDataText().opacity(0, 0).to(1, 0.3)
  );
  yield* chain(
    all(
      contentDataFile().shadowBlur(0, 0).to(20, 0.2),
      tween(0.6, (value) =>
        contentDataFile().width(map(500, 900, easeOutCirc(value)))
      ),
      contentPage().filters.blur(0, 0).to(10, 0.2)
    ),
    waitFor(1),
    all(
      contentDataFile().shadowBlur(20, 0).to(0, 0.2),
      tween(0.6, (value) =>
        contentDataFile().width(map(900, 500, easeInCirc(value)))
      ),
      contentPage().filters.blur(10, 0).to(0, 0.2)
    )
  );
  yield* waitFor(0.5);
  yield* sequence(
    0.2,
    tween(0.6, (value) => contentPage().y(map(0, -900, easeOutCirc(value)))),
    tween(0.6, (value) => contentData().y(map(0, 900, easeOutCirc(value))))
  );

  const postsRow1 = createRef<Rect>();
  const postsRow2 = createRef<Rect>();
  const postsRow3 = createRef<Rect>();

  const pageCount = 10;

  view.add(
    <Rect ref={postsRow1} x={-650} y={900}>
      {range(pageCount).map((i) => {
        const postName = `post${i}.mdx`;
        return (
          <File filePath={postName} y={() => 700 * i} code={postContent} />
        );
      })}
    </Rect>
  );
  view.add(
    <Rect ref={postsRow2} y={900}>
      {range(pageCount).map((i) => {
        const postName = `post${i}.mdx`;
        return (
          <File filePath={postName} y={() => 700 * i} code={postContent} />
        );
      })}
    </Rect>
  );
  view.add(
    <Rect ref={postsRow3} x={650} y={900}>
      {range(pageCount).map((i) => {
        const postName = `post${i}.mdx`;
        return (
          <File filePath={postName} y={() => 700 * i} code={postContent} />
        );
      })}
    </Rect>
  );

  yield* sequence(
    0.3,
    tween(3, (value) =>
      postsRow1().position.y(map(900, -5000, easeInOutCubic(value)))
    ),
    tween(3, (value) =>
      postsRow2().position.y(map(-7300, -600, easeInOutCubic(value)))
    ),
    tween(3, (value) =>
      postsRow3().position.y(map(900, -5000, easeInOutCubic(value)))
    )
  );

  const browser = createRef<Rect>();
  const browserContentText = createRef<Txt>();
  const browserContentBody = createRef<Rect>()
  view.add(
    <Rect
      ref={browser}
      layout
      width={1100}
      height={900}
      padding={10}
      gap={10}
      fill={surfaceColor}
      radius={12}
      x={1600}
      direction={"column"}
    >
      <Rect fill={mantleColor} grow={1} radius={12} />
      <Rect
        fill={mantleColor}
        grow={2}
        radius={12}
        padding={20}
      >
        <Rect
        ref={browserContentBody}
        layout
        direction={"column"}
        gap={10}
        width={1100}
        opacity={0}
        scale={0.9}
        >
        <Img src={helloWorldImage} height={450} radius={12} />
        <Txt
          ref={browserContentText}
          fontFamily={"Poppins"}
          fill={fontColor}
          fontSize={40}
        >
          Header 1
        </Txt>
        <Txt
          ref={browserContentText}
          fontFamily={"Poppins"}
          fill={fontColor}
          fontSize={30}
        >
          Isto é um parágrafo
        </Txt>
        </Rect>
      </Rect>
    </Rect>
  );

  yield* sequence(
    0.4,
    tween(1, (value) => postsRow1().x(map(-650, -1300, easeInCubic(value)))),
    tween(1, (value) => postsRow2().x(map(0, -1300, easeInCubic(value)))),
    all(
      tween(1, (value) => postsRow3().x(map(650, -600, easeInOutCubic(value)))),
      postsRow3().y(-5000, 0).to(-4900, 1.1)
    ),
    tween(1, (value) => browser().x(map(1600, 350, easeOutQuart(value))))
  );

  const contentTransport = createRef<CubicBezier>();
  view.add(
    <CubicBezier
      ref={contentTransport}
      lineWidth={6}
      stroke={lavanderColor}
      startArrow
      arrowSize={10}
      p0={{ x: -210, y: 0 }}
      p1={{ x: -250, y: 0 }}
      p2={{ x: -310, y: 0 }}
      p3={{ x: -340, y: 0 }}
      start={1}
    />
  );

  yield* contentTransport().start(1, 0).to(0, 0.3);
  yield* all(
    browserContentBody().opacity(0, 0).to(1, 0.3),
    browserContentBody().scale(0.9, 0).to(1, 0.3),
  )

  yield* waitUntil("end")
});
