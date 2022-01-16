using WakeOnLan.Web.Models;

namespace WakeOnLan.Web.Services.Interfaces
{
    public interface INetworkedDeviceService
    {
        Task Wake(Device device);
        Task<bool> IsDeviceOn(Device device);
    }
}