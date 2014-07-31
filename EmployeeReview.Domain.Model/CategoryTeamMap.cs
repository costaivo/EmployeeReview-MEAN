using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployeeReview.Domain.Model
{
    public class CategoryTeamMap
    {
        [Key]
        public int CategoryTeamMapID { get; set; }
        public int TeamID {get;set; }
        public int CategoryID {get;set; }    
        public virtual Team Team { get; set; }
        public virtual Category Category { set; get; }
    }
}