using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployeeReview.Domain.Model
{
    public class Role
    {
        [Key]
        public int RoleID { set; get; }
        public string RoleName { get; set; }
    }
}