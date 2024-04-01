
using Core.Entities;
using Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public List<Employee> GetAll()
        {
            return _context.Employees.Include(roleEmployee => roleEmployee.Roles).ThenInclude(roleEmployee => roleEmployee.Role).ToList();
        }

        public Employee EmployeeGetById(int id)
        {
            return _context.Employees.Include(roleEmployee => roleEmployee.Roles).ThenInclude(roleEmployee => roleEmployee.Role).FirstOrDefault(x => x.Id == id);
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            var existingEmployee = _context.Employees.FirstOrDefault(x => x.Id == id);
            if (existingEmployee != null)
            {
                existingEmployee.FirstName = employee.FirstName;
                existingEmployee.LastName = employee.LastName;
                existingEmployee.Tz = employee.Tz;
                existingEmployee.StartDate = employee.StartDate;
                existingEmployee.BirthDate = employee.BirthDate;
                existingEmployee.Gender = employee.Gender;
                existingEmployee.Roles = employee.Roles;
                existingEmployee.IsActive = employee.IsActive;

            }
            await _context.SaveChangesAsync();
            return existingEmployee;
        }

        public async Task<Employee> DeleteEmployeeAsync(int id)
        {
            var employeeToDelete = _context.Employees.FirstOrDefault(x => x.Id == id);
            if (employeeToDelete != null)
            {
                employeeToDelete.IsActive = false;
            }
            await _context.SaveChangesAsync();
            return employeeToDelete;
        }
    }
}
