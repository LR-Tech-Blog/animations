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
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12 2v6.5a1.5 1.5 0 0 0 1.356 1.493L13.5 10H20v10a2 2 0 0 1-1.85 1.995L18 22H6a2 2 0 0 1-1.995-1.85L4 20V4a2 2 0 0 1 1.85-1.995L6 2h6Zm2 .043a2 2 0 0 1 .877.43l.123.113L19.414 7a2 2 0 0 1 .502.84l.04.16H14V2.043Z"/></g></svg>`
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
