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
        
        
        void InitialiseUserChoice();
        bool UpdateUserRating(int choiceId, int ratingId, UserChoice oldChoice);
        bool UpdateUserComment(int choiceId, string comment, string oldComment);
        IQueryable<Responsibility> GetResponsibilities(int step);
        UserChoice GetUserChoice(int responsibilityId, int userId);
        User GetUser(string email);
        List<UserChoice> GetUserChoices(int userId, int step);
        UserChoice GetUserChoice(int choiceId);

    }
}
