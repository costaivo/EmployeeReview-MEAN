using System.ComponentModel.DataAnnotations;

namespace EmployeeReview.Models
{
    public class Rating
    {
        [Key]
        public int RatingID { get; set; }
        [Required]
        public int RatingValue { get; set; }
        public string Meaning { get; set; }
    }
}