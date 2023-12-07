using Render.Commands;
using Spectre.Console.Cli;

var app = new CommandApp<AppCommands>();
app.Configure(config =>
{
    config.AddCommand<RenderCommands>("render");
});
return app.Run(args);