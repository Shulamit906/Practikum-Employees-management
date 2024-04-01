using Core.Entities;

namespace API.Models
{
    public class RoleEmployeePostModel
    {
        public int RoleId { get; set; }
        public bool IsManagement { get; set; }
        public DateTime StartDateRole { get; set; }
    }
}
