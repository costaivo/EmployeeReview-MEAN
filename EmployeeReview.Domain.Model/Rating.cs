using System.ComponentModel.DataAnnotations;

namespace EmployeeReview.Domain.Model
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