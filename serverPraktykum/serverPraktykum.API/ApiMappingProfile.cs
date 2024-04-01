using API.Models;
using AutoMapper;
using Core.Entities;

namespace API
{
    public class ApiMappingProfile:Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<RoleEmployeePostModel, RoleEmployee>().ReverseMap();
            CreateMap<RolePostModel, Role>().ReverseMap();
        }

    }
}
