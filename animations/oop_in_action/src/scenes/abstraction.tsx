import { Rect, SVG, Txt, makeScene2D } from "@motion-canvas/2d";
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
} from "@motion-canvas/core";
import { getColorTheme } from "../shared/styles";
import { bookSvgData } from "../svg_data";
import { popUp } from "../shared/reanimations";
import {
  CodeBlock,
  insert,
  remove,
} from "@motion-canvas/2d/lib/components/CodeBlock";
import { bookEmptyClass } from "../code";

export default makeScene2D(function* (view) {
  const theme = useScene().variables.get<boolean>("darkMode", false);
  const isDarkMode = theme();
  const colors = getColorTheme(isDarkMode);
  const size = useScene().getSize();

  view.add(<Rect width={size.width} height={size.height} fill={colors.Base} />);

  const bookSvgRef = createRef<SVG>();
  view.add(
    <SVG
      ref={bookSvgRef}
      lineWidth={2}
      svg={bookSvgData}
      fill={colors.Overlay0}
      scale={15}
    />
  );

  yield* tween(0.6, (value) =>
    bookSvgRef().x(map(-1100, -730, easeOutCubic(value)))
  );

  const atributesListRef = createRef<Rect>();
  const titleTxtRef = createRef<Txt>();
  const authorTxtRef = createRef<Txt>();
  const publisherTxtRef = createRef<Txt>();
  const publishYearTxtRef = createRef<Txt>();
  const pagesTxtref = createRef<Txt>();
  const isbnTxtRef = createRef<Txt>();
  const fontSize = 52;

  view.add(
    <Rect ref={atributesListRef} layout direction={"column"} gap={90} x={-200}>
      <Txt
        ref={titleTxtRef}
        fontFamily={"JetBrains Mono"}
        fill={colors.Text}
        fontSize={fontSize}
        opacity={0}
        scale={0}
      >
        Titulo
      </Txt>

      <Txt
        ref={authorTxtRef}
        fontFamily={"JetBrains Mono"}
        fill={colors.Text}
        fontSize={fontSize}
        opacity={0}
        scale={0}
      >
        Autor
      </Txt>

      <Txt
        ref={publisherTxtRef}
        fontFamily={"JetBrains Mono"}
        fill={colors.Text}
        fontSize={fontSize}
        opacity={0}
        scale={0}
      >
        Editora
      </Txt>

      <Txt
        ref={publishYearTxtRef}
        fontFamily={"JetBrains Mono"}
        fill={colors.Text}
        fontSize={fontSize}
        opacity={0}
        scale={0}
      >
        Ano de publicação
      </Txt>

      <Txt
        ref={pagesTxtref}
        fontFamily={"JetBrains Mono"}
        fill={colors.Text}
        fontSize={fontSize}
        opacity={0}
        scale={0}
      >
        N° de páginas
      </Txt>

      <Txt
        ref={isbnTxtRef}
        fontFamily={"JetBrains Mono"}
        fill={colors.Text}
        fontSize={fontSize}
        opacity={0}
        scale={0}
      >
        ISBN
      </Txt>
    </Rect>
  );

  yield* sequence(
    0.2,
    popUp(titleTxtRef()),
    popUp(authorTxtRef()),
    popUp(publisherTxtRef()),
    popUp(publishYearTxtRef()),
    popUp(pagesTxtref()),
    popUp(isbnTxtRef())
  );

  const exapleCodeRef = createRef<CodeBlock>();
  view.add(
    <CodeBlock
      ref={exapleCodeRef}
      language="java"
      code={bookEmptyClass}
      fontFamily={"Jetbrains Mono"}
      x={510}
      scale={0}
      opacity={0}
    />
  );

  yield* popUp(exapleCodeRef());
  yield* waitFor(2);

  yield* sequence(
    2,
    chain(
      exapleCodeRef().edit()`public class Livro {
    ${remove("// O que devo colocar?")}
}`,
      exapleCodeRef().selection(DEFAULT, 0)
    ),

    sequence(
      1,
      titleTxtRef().fill(colors.Text, 0).to(colors.Green, 0.3),
      exapleCodeRef().edit()`public class Livro {
    ${insert("public String titulo;")}
}`
    ),
    sequence(
      1,
      authorTxtRef().fill(colors.Text, 0).to(colors.Green, 0.3),
      exapleCodeRef().edit()`public class Livro {
    public String titulo;
    ${insert("public String autor;")}
}`
    ),
    sequence(
      1,
      publisherTxtRef().fill(colors.Text, 0).to(colors.Green, 0.3),
      exapleCodeRef().edit()`public class Livro {
    public String titulo;
    public String autor;
    ${insert("public String editora;")}
}`
    ),
    sequence(
      1,
      publishYearTxtRef().fill(colors.Text, 0).to(colors.Green, 0.3),
      exapleCodeRef().edit()`public class Livro {
    public String titulo;
    public String autor;
    public String editora;
    ${insert("public int anoPublicacao;")}
}`
    ),
    sequence(
      1,
      pagesTxtref().fill(colors.Text, 0).to(colors.Green, 0.3),
      exapleCodeRef().edit()`public class Livro {
    public String titulo;
    public String autor;
    public String editora;
    public int anoPublicacao;
    ${insert("public int numeroPaginas;")}
}`
    ),
    sequence(
      1,
      isbnTxtRef().fill(colors.Text, 0).to(colors.Red, 0.3),
      exapleCodeRef().selection(DEFAULT, 0.5)
    )
  );

  yield* sequence(
    0.4,
    tween(1, (value) => atributesListRef().y(map(0, 1000, easeInCubic(value)))),
    all(
      tween(1, (value) =>
        exapleCodeRef().x(map(510, 300, easeInOutCubic(value)))
      ),
      exapleCodeRef().fontSize(48, 0).to(60, 1),
      tween(1, (value) =>
        bookSvgRef().x(map(-730, -450, easeInOutCubic(value)))
      )
    )
  );

  yield* waitFor(2);
});
