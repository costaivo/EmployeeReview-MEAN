using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EmployeeReview.Models
{
    public class Developer
    {
    }
    public class Responsibilities
    {
        [Key]
        public int ResponsibilityID { get; set; }
        public string ResponsibilityValue { get; set; }

    }

    public class Categories
    {
        [Key]
        public int CategoryID { get; set; }
        public string CategoryValue { get; set; }
        [ForeignKey("Responsibilities")]
        public int ResponsibilityID { get; set; }


    }
   
    public class Ratings
    {
        [Key]
        public int RatingID { get; set; }
        public int RatingValue { get; set; }
        public string Meaning { get; set; }

    }
    public class CategoryTypes
    {
        [Key]
        public int TypeID { get; set; }
        public string TypeValue { get; set; }
        //[ForeignKey("Categories")]
        public int CategoryID { get; set; }
    }
}