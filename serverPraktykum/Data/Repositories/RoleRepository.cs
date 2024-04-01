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
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;

        public RoleRepository(DataContext context)
        {
            _context = context;
        }

        public List<Role> GetAll()
        {
            return _context.Roles.ToList();
            // return _context.Employees.Include(roleEmployee => roleEmployee.Roles).ThenInclude(roleEmployee => roleEmployee.Role).ToList();
        }

        public Role RoleGetById(int id)
        {
            return _context.Roles.FirstOrDefault(x => x.Id == id);
        }

        public async Task<Role> AddRoleAsync(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }

    }
}
