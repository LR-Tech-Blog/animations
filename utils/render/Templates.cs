namespace Render;

public static class Templates
{
    public const string SETTIGNS_TEMPLATE = """
                                            {
                                                "gifskiPath": "<PATH_TO_GIFSKI>",
                                                "ffmpegPath": "<PATH_TO_FFMPEG>",
                                                "sceneFormat": "<SCENE_MOVIE_EXTENSION>"
                                                "useFfmpegFromEnv": false,
                                                "useGifskiFromEnv": false
                                            }
                                            """;
    
}