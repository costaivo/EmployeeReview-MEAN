using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployeeReview.Models
{
   
         public class Responsibilities
    {
        [Key]
        public int ResponsibilityID { get; set; }
        
        public string ResponsibilityValue { get; set; }
        public Categories Category { get; set; }
    
    }
}