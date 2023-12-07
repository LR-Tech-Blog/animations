using System.Text.Json;
using Render.Commands.Settings;
using Render.Models;
using Spectre.Console;
using Spectre.Console.Cli;

namespace Render.Commands;

public sealed class RenderCommands : Command<RenderCommandSettings>
{
    private RenderSettings _renderSettings { get; set; }
    
    public override int Execute(CommandContext context, RenderCommandSettings settings)
    {
        RenderSettings? renderSettings = ReadSettings(settings.settings);
        if(renderSettings is null)
            return 1;
        
        _renderSettings = renderSettings;
        AnsiConsole.MarkupLine("Render command is not implemented yet.");
        
        return 0;
    }
    
    public override ValidationResult Validate(CommandContext context, RenderCommandSettings settings)
    {
        if (string.IsNullOrWhiteSpace(settings.path))
            return ValidationResult.Error("Path is required.");
        if(string.IsNullOrWhiteSpace(settings.settings))
            return ValidationResult.Error("Settings is required.");
        
        bool settingsExist = File.Exists(settings.settings);
        bool projectPathExist = Directory.Exists(settings.path);
        if(!settingsExist)
            return ValidationResult.Error("Settings file does not exist.");
        if(!projectPathExist)
            return ValidationResult.Error("Project path does not exist.");
        
        return ValidationResult.Success();
    }
    
    private RenderSettings? ReadSettings(string path)
    {
        string json = File.ReadAllText(path);
        RenderSettings? settings = JsonSerializer.Deserialize<RenderSettings>(json);
        if (settings is not null) return settings;
        
        Exception exception = new("Settings file is invalid.");
        AnsiConsole.WriteException(exception, ExceptionFormats.ShortenEverything);
        return null;

    }
}