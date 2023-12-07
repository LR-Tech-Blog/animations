using Render.Commands.Settings;
using Spectre.Console;
using Spectre.Console.Cli;
using Spectre.Console.Json;

namespace Render.Commands;

public sealed class AppCommands : Command<AppCommandSettings>
{
    public override int Execute(CommandContext context, AppCommandSettings settings)
    {
        if(settings.showSettingsTemplate)
            ShowSettingsTemplate();
        if(settings.generateSettingsTemplate)
            GenerateSettingsTemplate();
        
        return 0;
    }

    private void ShowSettingsTemplate()
    {
        JsonText json = new(Templates.SETTIGNS_TEMPLATE);
        Panel panel = new Panel(json)
            .Header("Settings Template");
        
        AnsiConsole.Console.Write(panel);
    }
    
    private void GenerateSettingsTemplate()
    {
        AnsiConsole.Status()
            .Start("Generating settings template...", async (ctx) =>
            {
                await using StreamWriter file = File.CreateText("./settings.json");
                await file.WriteAsync(Templates.SETTIGNS_TEMPLATE);
                
                AnsiConsole.MarkupLine("[green]Settings template generated![/]");
            });
    }
}