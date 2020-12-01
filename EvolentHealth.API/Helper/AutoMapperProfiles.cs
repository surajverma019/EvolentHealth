using System.Linq;
using AutoMapper;
using EvolentHealth.API.Dtos;
using EvolentHealth.API.Helper;
using EvolentHealth.API.Models;

namespace EvolentHealth.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Contact, ContactForReturnDto>();
            CreateMap<ContactForReturnDto, Contact>();
            CreateMap<ContactForCreationDto, Contact>().ReverseMap();
        }
    }
}