using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployeeReview.Models
{
    public class Comment
    {
        [Key]
        public int CommentID { get; set; }
        
        public string CommentValue { get; set; }
    }
}