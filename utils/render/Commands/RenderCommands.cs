using System.Text.Json;
using Render.Commands.Settings;
using Render.Exceptions;
using Render.Models;
using Spectre.Console;
using Spectre.Console.Cli;

namespace Render.Commands;

public sealed class RenderCommands : Command<RenderCommandSettings>
{
    private RenderSettings? renderSettings { get; set; }
    
    public override int Execute(CommandContext context, RenderCommandSettings settings)
    {
        RenderSettings? settingsFromFile = ReadSettings(settings.settings);
        if(settingsFromFile is null)
            return 2;
        
        renderSettings = settingsFromFile;

        try
        {
            CheckBinariesInPath();
        }
        catch (InvalidSettingsFileFormatException) { return 3; }
        catch (Exception) { return 1; }
        
        
        
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
        
        InvalidSettingsFileFormatException exception = new();
        AnsiConsole.WriteException(exception);
        return null;
        
    }

    private void CheckBinariesInPath()
    {
        if(renderSettings is null)
            return;
        
        if (!renderSettings.useFfmpegFromEnv)
        {
            bool existsFfmpegBinary = File.Exists(renderSettings.ffmpegPath);
            if (!existsFfmpegBinary)
            {
                BinaryNotFoundException exception = new("FFmpeg", renderSettings.ffmpegPath);
                AnsiConsole.WriteException(exception);
                throw exception;
            }
        }

        if (!renderSettings.useGifskiFromEnv)
        {
            bool existsGifskiBinary = File.Exists(renderSettings.gifskiPath);
            if (!existsGifskiBinary)
            {
                BinaryNotFoundException exception = new("Gifski", renderSettings.gifskiPath);
                AnsiConsole.WriteException(exception);
                throw exception;
            }
        }
    }

    private IEnumerable<string> GetScenesDirectories(string projectPath, IEnumerable<string>? scenesName)
    {
        IEnumerable<string> scenesDir = Directory.GetDirectories(projectPath);
        if (scenesName is not null)
            scenesDir = scenesDir.Where(scenesName.Contains);
        
        return scenesDir;
    }
}