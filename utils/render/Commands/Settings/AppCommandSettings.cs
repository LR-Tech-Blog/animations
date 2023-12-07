using System.ComponentModel;
using Spectre.Console.Cli;

namespace Render.Commands.Settings;

public sealed class AppCommandSettings : CommandSettings
{
    [CommandOption("--settings-template|-t")]
    [DefaultValue(false)]
    public bool showSettingsTemplate { get; init; }
    
    [CommandOption("--generate-settings|-g")]
    [Description("Generate settings template")]
    [DefaultValue(false)]
    public bool generateSettingsTemplate { get; init; }
}