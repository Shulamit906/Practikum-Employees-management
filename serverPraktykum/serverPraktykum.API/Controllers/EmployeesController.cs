
using API.Models;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeService employeeService,IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        // GET: api/<WorkersController>
        [HttpGet]
        public ActionResult Get()
        {
            var list = _employeeService.GetAll();
            var listDto = list.Select(u => _mapper.Map<EmployeeDto>(u));
            return Ok(listDto);
        }

        // GET api/<WorkersController>/5
        [HttpGet("{id}")]
        public ActionResult<Employee> Get(int id)
        {
         
            var s = _employeeService.EmployeeGetById(id);
            var employeeDto = _mapper.Map<EmployeeDto>(s);
            return Ok(employeeDto);
        }

        // POST api/<WorkersController>
        [HttpPost]
        public async Task<ActionResult<Employee>> Post([FromBody] EmployeePostModel employee)
        {
           
            var employeeToAdd = _mapper.Map<Employee>(employee);
            var addedEmployee =await  _employeeService.AddEmployeeAsync(employeeToAdd);
            var employeeDto = _mapper.Map<EmployeeDto>(addedEmployee);
            return Ok(employeeDto);

        }

        // PUT api/<WorkersController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(int id, [FromBody] Employee employee)
        {
            
            var existEmployee = _employeeService.EmployeeGetById(id);
            if (existEmployee is null)
            {
                return NotFound();
            }
            _mapper.Map(employee, existEmployee);
            await _employeeService.UpdateEmployeeAsync (id, employee);

            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        // DELETE api/<WorkersController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> Delete(int id)
        {
            var deletedEmployee = await _employeeService.DeleteEmployeeAsync(id);
            if (deletedEmployee == null)
            {
                return NotFound();
            }
            return deletedEmployee;
        }
    }
}
