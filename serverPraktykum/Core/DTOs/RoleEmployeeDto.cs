using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class RoleEmployeeDto
    {
        public int RoleId { get; set; }
        public bool IsManagement { get; set; }
        public DateTime StartDateRole { get; set; }

    }
}
