using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EmployeeReview.Models;

namespace EmployeeReview.ViewModels
{
    public class Home
    {
        
        public List<UserChoice> UserChoices { get;set; }
        public List<int> rating { get; set; }
        public List<string> comment { get; set; }
        public List<Responsibility> Responsibilities { get; set; }
    }
}