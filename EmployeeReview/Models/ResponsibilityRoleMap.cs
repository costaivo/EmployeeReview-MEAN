using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployeeReview.Models
{
    public class ResponsibilityRoleMap
    {
        [Key]
        public int ResponsibilityRoleID { set; get; }
        public int ResponsibilityID { set; get; }
        public int RoleID { set; get; }
        public bool Supervision { set; get; }

        public virtual Responsibility Responsibility { get; set; }
        public virtual Role Role { get; set; }
    }
}