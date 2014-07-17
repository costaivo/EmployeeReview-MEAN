using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployeeReview.Models
{
    public class Type
    {
        [Key]
        public int TypeID { get; set; }
        public string TypeValue { get; set; }
        
    }
}