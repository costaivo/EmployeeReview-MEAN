using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployeeReview.Models
{
   

         public class Responsibility
    {
        [Key]
        public int ResponsibilityID { get; set; }
        public int CategoryID { get; set; }
        public string ResponsibilityValue { get; set; }
        public virtual Category Category { get; set; }
    
    }
}