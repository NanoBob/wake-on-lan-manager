using WakeOnLan.Web.Models;

namespace WakeOnLan.Web.Services.Interfaces
{
    public interface INetworkedDeviceService
    {
        Task WakeAsync(Device device);
        Task<bool> IsDeviceOnAsync(Device device);
        Task<string?> GetDeviceIpAsync(Device device);
        Task<bool> IsIpReachableAsync(string ip);
    }
}