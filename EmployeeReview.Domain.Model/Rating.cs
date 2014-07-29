using System.ComponentModel.DataAnnotations;

namespace EmployeeReview.Models
{
    public class Rating
    {
        [Key]
        public int RatingID { get; set; }
        [Required(ErrorMessage = "This is required")]
        public int RatingValue { get; set; }
        public string Meaning { get; set; }
    }
}