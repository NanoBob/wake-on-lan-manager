using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WakeOnLan.Web.Dto;
using WakeOnLan.Web.Models;
using WakeOnLan.Web.Persistence;
using WakeOnLan.Web.Services.Interfaces;

namespace WakeOnLan.Web.Controllers
{
    [ApiController]
    [Route("api/devices")]
    public class DeviceController : Controller
    {
        private readonly WakeContext context;
        private readonly IMapper mapper;
        private readonly IPasswordService passwordService;
        private readonly INetworkedDeviceService networkedDeviceService;

        public DeviceController(
            WakeContext context,
            IMapper mapper,
            IPasswordService passwordService,
            INetworkedDeviceService wakeService)
        {
            this.context = context;
            this.mapper = mapper;
            this.passwordService = passwordService;
            this.networkedDeviceService = wakeService;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<DeviceDto>>> Get()
        {
            var devices = await this.context.Devices
                .Select(x => this.mapper.Map<DeviceDto>(x))
                .ToArrayAsync();

            return Ok(devices);
        }

        [HttpPost("")]
        public async Task<ActionResult<DeviceDto>> Create(CreateDeviceDto deviceDto)
        {
            if (this.context.Devices.Any(x => x.MacAddress == deviceDto.MacAddress))
                return BadRequest();

            var device = this.mapper.Map<Device>(deviceDto);
            device.PasswordHash = this.passwordService.Hash(deviceDto.Password);
            this.context.Devices.Add(device);
            await this.context.SaveChangesAsync();

            return Ok(this.mapper.Map<DeviceDto>(device));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, DeleteDeviceDto dto)
        {
            var device = await this.context.Devices.SingleAsync(x => x.Id == id);
            if (!this.passwordService.Matches(dto.Password, device.PasswordHash))
                return Unauthorized();

            this.context.Devices.Remove(device);
            await this.context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("{id}/wake")]
        public async Task<IActionResult> Wake(int id, WakeDeviceDto dto)
        {
            var device = await this.context.Devices.SingleAsync(x => x.Id == id);
            if (!this.passwordService.Matches(dto.Password, device.PasswordHash))
                return Unauthorized();

            await this.networkedDeviceService.Wake(device);

            return Ok();
        }

        [HttpGet("{id}/status")]
        public async Task<ActionResult<bool>> IsDeviceOn(int id)
        {
            var device = await this.context.Devices.SingleAsync(x => x.Id == id);
            return Ok(await this.networkedDeviceService.IsDeviceOn(device));
        }
    }
}
