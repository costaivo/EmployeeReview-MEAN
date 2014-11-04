using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployeeReview.Domain.Model
{
    public class Category
    {
        [Key]
        public int CategoryID { get; set; }
        public int TypeID { get; set; }
        public string CategoryValue { get; set; }
        public virtual Type Type { get; set; }
    }
}