import { Rect, RectProps, SVG, Txt } from "@motion-canvas/2d/lib/components";
import { surfaceColor, bgColor, fontColor } from "../../theme/colors";
import { CodeBlock } from "@motion-canvas/2d/lib/components/CodeBlock";

interface FileProps extends RectProps {
  filePath: string;
  fileWidth?: number;
  code: string;
  codeFontSize?: number;
  language?: string;
}

export default function File({
  filePath,
  fileWidth,
  language,
  code,
  codeFontSize,
  ...rest
}: FileProps) {
  return (
    <Rect
      fill={surfaceColor}
      width={500}
      height={600}
      radius={20}
      {...rest}
      layout
      direction={"column"}
      padding={20}
      gap={30}
      clip
    >
      <Rect
        fill={bgColor}
        width={fileWidth ?? 300}
        height={60}
        radius={50}
        justifyContent={"start"}
        paddingLeft={20}
        alignItems={"center"}
        gap={10}
        direction={"row"}
        layout
      >
        <SVG
          fill={fontColor}
          svg={() =>
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-1.41-1.41z"/></svg>`
          }
          width={40}
          height={40}
        />
        <Txt fontFamily={"Poppins"} fill={fontColor} fontSize={30}>
          {filePath}
        </Txt>
      </Rect>
      <CodeBlock
        language={language ?? "mdx"}
        fontSize={codeFontSize ?? 40}
        code={code}
      />
    </Rect>
  );
}
