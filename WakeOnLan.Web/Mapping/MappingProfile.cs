using AutoMapper;
using WakeOnLan.Web.Dto;
using WakeOnLan.Web.Models;

namespace WakeOnLan.Web.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateDeviceDto, Device>();
            CreateMap<Device, DeviceDto>();
        }
    }
}
