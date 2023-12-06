export interface ColorTheme {
    Rosewater: string;
    Mauve: string;
    Red: string;
    Maroon: string;
    Peach: string;
    Yellow: string;
    Green: string;
    Blue: string;
    Lavender: string;
    Text: string;
    Subtext1: string;
    Subtext0: string;
    Overlay2: string;
    Overlay1: string;
    Overlay0: string;
    Surface2: string;
    Surface1: string;
    Surface0: string;
    Base: string;
    Mantle: string;
    Crust: string;
}

export function getColorTheme(isDarkMode: boolean): ColorTheme {
    return isDarkMode ? ColorsDarkMode : ColorsLightMode;
}

// Colors from https://github.com/catppuccin/catppuccin
//Light mode: Latte
export const ColorsLightMode = {
    Rosewater: "rgb(220, 138, 120)",
    Mauve: "rgb(136, 57, 239)",
    Red: "rgb(210, 15, 57)",
    Maroon: "rgb(230, 69, 83)",
    Peach: "rgb(254, 100, 11)",
    Yellow: "rgb(223, 142, 29)",
    Green: "rgb(64, 160, 43)",
    Blue: "rgb(30, 102, 245)",
    Lavender: "rgb(114, 135, 253)",
    Text: "rgb(76, 79, 105)",
    Subtext1: "rgb(92, 95, 119)",
    Subtext0: "rgb(108, 111, 133)",
    Overlay2: "rgb(124, 127, 147)",
    Overlay1: "rgb(140, 143, 161)",
    Overlay0: "rgb(156, 160, 176)",
    Surface2: "rgb(172, 176, 190)",
    Surface1: "rgb(188, 192, 204)",
    Surface0: "rgb(204, 208, 218)",
    Base: "rgb(239, 241, 245)",
    Mantle: "rgb(230, 233, 239)",
    Crust: "rgb(220, 224, 232)"
}
//Dark mode: Macchiato
export const ColorsDarkMode = {
    Rosewater: "rgb(244, 219, 214)",
    Mauve: "rgb(198, 160, 246)",
    Red: "rgb(237, 135, 150)",
    Maroon: "	rgb(238, 153, 160)",
    Peach: "rgb(245, 169, 127)",
    Yellow: "rgb(238, 212, 159)",
    Green: "rgb(166, 218, 149)",
    Blue: "rgb(138, 173, 244)",
    Lavender: "rgb(183, 189, 248)",
    Text: "rgb(202, 211, 245)",
    Subtext1: "rgb(184, 192, 224)",
    Subtext0: "rgb(165, 173, 203)",
    Overlay2: "rgb(147, 154, 183)",
    Overlay1: "rgb(128, 135, 162)",
    Overlay0: "	rgb(110, 115, 141)",
    Surface2: "rgb(91, 96, 120)",
    Surface1: "rgb(73, 77, 100)",
    Surface0: "rgb(54, 58, 79)",
    Base: "rgb(36, 39, 58)",
    Mantle: "rgb(30, 32, 48)",
    Crust: "rgb(24, 25, 38)"
}