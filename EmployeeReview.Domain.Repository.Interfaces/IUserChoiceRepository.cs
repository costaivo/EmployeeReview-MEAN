using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeReview.Domain.Repository;
using EmployeeReview.Domain.Model;

namespace EmployeeReview.Domain.Repository.Interfaces
{
    public interface IUserChoiceRepository
    {
        bool UpdateUserComment(int choiceId,string comment);
        bool CreateUserComment();
        bool InitialiseUserChoice();
        bool UpdateUserRating(int choiceId,UserChoice oldChoice,int ratingId);

        UserChoice GetUserChoice(int responsibilityId, int userId);
        UserChoice GetUserChoice(int choiceId);
        List<UserChoice> GetUserChoices(int userId,int step);
        User GetUser(string email);
        IQueryable<Responsibility> GetResponsibilities(int step);
    }
}
