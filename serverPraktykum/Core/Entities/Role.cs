using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Core.Entities
{
    public class Role
    {
        public enum RolesName
        {
            Manager,
            Teacher,
            Supervisor,
            Secretary,
            Engineer,
            Accountant,
            Doctor,
            Nurse,
            Lawyer,
            Programmer
        }

        // public List<string> EmployeeType = new List<string> { "Manager", "Teacher", "Supervisor", "Secretary", "Engineer", "Accountant", "Doctor", "Nurse", "Lawyer", "Programmer" };
        public int Id { get; set; }
        public RolesName Name { get; set; }
        public bool IsManagement { get; set; }
        public DateTime StartDateRole { get; set; }


        ///
        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }

        public Role( RolesName name, bool isManagement, DateTime startDateRole)
        {
            Name = name;
            IsManagement = isManagement;
            StartDateRole = startDateRole;
        }

    }
}
