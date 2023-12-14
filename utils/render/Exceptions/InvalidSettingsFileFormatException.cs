namespace Render.Exceptions;

public class InvalidSettingsFileFormatException() : Exception(MESSAGE)
{
    private const string MESSAGE = "Settings file is invalid.";
}