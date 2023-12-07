using System.ComponentModel;
using Spectre.Console.Cli;

namespace Render.Commands.Settings;

public sealed class RenderCommandSettings : CommandSettings
{
    [CommandArgument(0, "<PROJECT_OUTPUT>")]
    public string path { get; init; }
        
    [CommandOption("--settings|-s")]
    [DefaultValue("settings.json")]
    public string settings { get; init; }
    
    [CommandOption("--scenes|-S")]
    [Description("Add a scene to render.")]
    public IEnumerable<string>? scenes { get; init; }
    
    [CommandOption("--has-dark-mode|-d")]
    [Description("The animations have dark mode.")]
    [DefaultValue(false)]
    public bool hasDarkMode { get; init; }
    
    [CommandOption("--remove")]
    [Description("Remove all frames from the scene when the render is finished.")]
    [DefaultValue(false)]
    public bool removeWhenEnd { get; init; }
}