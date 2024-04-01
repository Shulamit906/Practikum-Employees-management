using API.Models;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Services;
using Microsoft.AspNetCore.Mvc;
using Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }

        // GET: api/<RoleController>
        [HttpGet]
        public ActionResult Get()
        {
            var list = _roleService.GetAll();
            var listDto = list.Select(u => _mapper.Map<RoleDto>(u));
            return Ok(listDto);
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public ActionResult<Role> Get(int id)
        {
            var s = _roleService.RoleGetById(id);
            var roleDto = _mapper.Map<RoleDto>(s);
            return Ok(roleDto);
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult<Role>> Post([FromBody] RolePostModel role)
        {
            var roleToAdd = _mapper.Map<Role>(role);
            var addedRole = await _roleService.AddRoleAsync(roleToAdd);
            var employeeDto = _mapper.Map<RoleDto>(addedRole);
            return Ok(employeeDto);
        }

    }
}
