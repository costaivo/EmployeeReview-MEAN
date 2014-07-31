using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeReview.Domain.Repository.Interfaces;
using EmployeeReview.Domain.Model;

namespace EmployeeReview.Application.Interfaces
{
    public interface IInputValidation
    {
        
        bool ValidInput();
        void InitialiseUserChoice();
        void IncrementInvalidInput();
        int GetInvalidInputNum();
        bool UpdateUserRating(int choiceId, int ratingId, UserChoice oldChoice);
        bool UpdateUserComment(int choiceId, string comment, string oldComment);


    }
}
