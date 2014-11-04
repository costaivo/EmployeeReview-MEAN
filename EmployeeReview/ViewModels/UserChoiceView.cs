using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EmployeeReview.Domain.Model;
using System.ComponentModel.DataAnnotations;

namespace EmployeeReview.ViewModels
{
    public class UserChoiceView
    {
        
        public List<UserChoice> UserChoices { get;set; }
        [Required(ErrorMessage = "This is required")]
        public List<int> rating { get; set; }
        [Required(ErrorMessage="This is required")]
        public List<string> comment { get; set; }
        public List<Responsibility> Responsibilities { get; set; }
    }
}