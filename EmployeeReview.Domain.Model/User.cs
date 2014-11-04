using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace EmployeeReview.Domain.Model
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }

        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}