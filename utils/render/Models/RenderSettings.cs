namespace Render.Models;

public class RenderSettings
{
    public required string gifskiPath { get; init; }
    public required string ffmpegPath { get; init; }
    public required string sceneFormat { get; init; }
    public bool useFfmpegFromEnv { get; init; }
    public bool useGifskiFromEnv { get; init; }
}