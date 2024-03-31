using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IEmployeeRepository
    {
        List<Employee> GetAll();
        Employee EmployeeGetById(int id);

        Task<Employee> AddEmployeeAsync(Employee employee);

        Task<Employee> UpdateEmployeeAsync(int id,Employee employee);

        Task<Employee> DeleteEmployeeAsync(int id);
    }
}
