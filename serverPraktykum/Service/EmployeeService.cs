
using Core.Entities;
using Core.Repositories;
using Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public List<Employee> GetAll()
        {
            return _employeeRepository.GetAll().Where(e => e.IsActive).ToList();
        }

        public Employee EmployeeGetById(int id)
        {
            return _employeeRepository.EmployeeGetById(id);
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            foreach (var role in employee.Roles)
            {
                if (role.StartDateRole < employee.StartDate)
                    throw new InvalidOperationException($"תאריך ההתחלה של תפקיד {role.RoleId} חייב להיות לפני או שווה לתאריך ההתחלה של העובד.");
            }
            return await _employeeRepository.AddEmployeeAsync(employee);
        }

        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            foreach (var role in employee.Roles)
            {
                if (role.StartDateRole < employee.StartDate)
                    throw new InvalidOperationException($"תאריך ההתחלה של תפקיד {role.RoleId} חייב להיות לפני או שווה לתאריך ההתחלה של העובד.");
            }
            return await _employeeRepository.UpdateEmployeeAsync(id, employee);
        }

        public async Task<Employee> DeleteEmployeeAsync(int id)
        {
            return  await _employeeRepository.DeleteEmployeeAsync(id);
        }
    }
}

