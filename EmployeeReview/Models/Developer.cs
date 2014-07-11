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
        /*public int ResponsibilityID { get; set; }
        public int CategoryTypeID { get; set; }
        public int RatingID { get; set; }
        */
        public Responsibilities Responsibility { get; set; }
        public CategoryTypes CategoryType { get; set; }
        public Ratings Rating { get; set; }


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
        
       
    }
    public class Teams {
        [Key]
        public int TeamID { get; set; }
        public string TeamValue { get; set; }

      }

    public class CategoryTeams { 
        [Key]
        public int CategoryTeamID { get; set; }
        //public int TeamID {get;set; }
       // public int CategoryID {get;set; }    
        public Teams Team {get;set;}
        public Categories Category { set; get; }
}
}