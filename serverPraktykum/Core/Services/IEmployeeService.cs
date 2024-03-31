using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface IEmployeeService
    {
        List<Employee> GetAll();
        Employee EmployeeGetById(int id);

        Task<Employee> AddEmployeeAsync(Employee employee);

        Task<Employee> UpdateEmployeeAsync(int id, Employee employee);

        Task<Employee> DeleteEmployeeAsync(int id);
    }
}
