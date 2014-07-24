using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EmployeeReview.Models;
using System.ComponentModel.DataAnnotations;

namespace EmployeeReview.ViewModels
{
    public class Home
    {
        
        public List<UserChoice> UserChoices { get;set; }
        [Required]
        public List<int> rating { get; set; }
        [Required]
        public List<string> comment { get; set; }
        public List<Responsibility> Responsibilities { get; set; }
    }
}