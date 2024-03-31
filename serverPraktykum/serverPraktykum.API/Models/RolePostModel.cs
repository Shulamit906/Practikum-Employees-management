using Core.Entities;
using static Core.Entities.Role;

namespace API.Models
{
    public class RolePostModel
    {
        public RolesName Name { get; set; }
        public bool IsManagement { get; set; }
        public DateTime StartDateRole { get; set; }
        public int EmployeeId { get; set; }

    }
}
