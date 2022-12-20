using System.Diagnostics;
using System.Net.NetworkInformation;
using WakeOnLan.Web.Models;
using WakeOnLan.Web.Services.Interfaces;

namespace WakeOnLan.Web.Services
{
    public class NetworkedDeviceService : INetworkedDeviceService
    {
        public Task WakeAsync(Device device)
        {
            var startInfo = new ProcessStartInfo("wakeonlan", device.MacAddress)
            {
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            var process = Process.Start(startInfo);
            return (process?.WaitForExitAsync() ?? Task.CompletedTask);
        }

        public async Task<string?> GetDeviceIpAsync(Device device)
        {            
            var startInfo = new ProcessStartInfo("ip", $"neighbor")
            {
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            Process process;
            try
            {
                process = Process.Start(startInfo);

                if (process == null)
                    throw new Exception("Unable to grab IP");
            } catch (Exception)
            {
                return null;
            }

            await process.WaitForExitAsync();

            var neighbours = process.StandardOutput.ReadToEnd();
            Console.WriteLine(neighbours);
            var ip = neighbours
                .Split('\n')
                .Select(x => x.Trim())
                .Where(x => !string.IsNullOrEmpty(x))
                .Select(x => x.Split(' '))
                .Where(x => x.Length >= 5)
                .Where(x => x[4].ToLower() == device.MacAddress.ToLower())
                .Where(x => x[0].Length <= 15)
                .Select(x => x[0])
                .SingleOrDefault();

            if (ip == null)
                return null;

            return ip;
        }

        public async Task<bool> IsIpReachableAsync(string ip)
        {
            var ping = new Ping();
            var result = await ping.SendPingAsync(ip.Trim());

            return result.Status == IPStatus.Success;
        }

        public Task<bool> IsDeviceOnAsync(Device device)
        {
            if (string.IsNullOrEmpty(device.LastKnownIp))
                return Task.FromResult(false);

            return IsIpReachableAsync(device.LastKnownIp);
        }
    }
}
