namespace Render.Exceptions;

public class BinaryNotFoundException(string binaryName, string binaryPath) : 
    Exception(string.Format(MESSAGE, binaryName, binaryPath))
{
    private const string MESSAGE = "The {0} binary was not found in path {1}";
}