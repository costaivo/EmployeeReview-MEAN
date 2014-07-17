using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployeeReview.Models
{
    public class Rating
    {
        [Key]
        public int RatingID { get; set; }
        public int RatingValue { get; set; }
        public string Meaning { get; set; }
    }
}