namespace WakeOnLan.Web.Models
{
    public class Device
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string MacAddress { get; set; } = "";
        public string PasswordHash { get; set; } = "";
        public string LastKnownIp { get; set; } = "";
    }
}
