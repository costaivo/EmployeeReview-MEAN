using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EmployeeReview.Domain.Model
{
    public class UserChoice
    {
        [Key]
        public int ChoiceID { get; set; }
        public bool Entered { get; set; }
        public int ResponsibilityID { get; set; }
        public int RatingID { get; set; }
        public int CommentID { get; set; }
        [ForeignKey("User")]
        public int UserID { get; set; }
        [ForeignKey("ForUser")]
        public int ForUserID  { get; set; } 

        public virtual Responsibility Responsibility{get;set;}
        public virtual Rating Rating{get;set;}
        public virtual Comment Comment{get;set;}
        public virtual User User {get;set;}
        public virtual User ForUser { get; set; }

        
         
    }
}