namespace WakeOnLan.Web.Services.Interfaces
{
    public interface IPasswordService
    {
        string Hash(string password);
        bool Matches(string source, string hash);
    }
}