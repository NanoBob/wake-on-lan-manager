using System.ComponentModel.DataAnnotations;

namespace WakeOnLan.Web.Dto
{
    public class CreateDeviceDto
    {
        [MinLength(2)]
        public string Name { get; set; } = "";

        [RegularExpression(@"^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$")]
        public string MacAddress { get; set; } = "";

        [MinLength(4)]
        public string Password { get; set; } = "";
    }
}
