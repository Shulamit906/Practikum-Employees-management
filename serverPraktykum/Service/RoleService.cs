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
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public List<Role> GetAll()
        {
            return _roleRepository.GetAll();
        }

        public Role RoleGetById(int id)
        {
            return _roleRepository.RoleGetById(id);
        }

        public async Task<Role> AddRoleAsync(Role role)
        {
            return await _roleRepository.AddRoleAsync(role);
        }
    }
}
