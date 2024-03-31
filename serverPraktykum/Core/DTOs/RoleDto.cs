using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Core.Entities.Role;

namespace Core.DTOs
{
    public class RoleDto
    {
        public int Id { get; set; }
        public RolesName Name { get; set; }
        public bool IsManagement { get; set; }
        public DateTime StartDateRole { get; set; }

        public int EmployeeId { get; set; }
       // public EmployeeDto Employee { get; set; }

    }
}
