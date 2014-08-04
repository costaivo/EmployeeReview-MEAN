using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeReview.Application.Interfaces;
using EmployeeReview.Domain.Model;
using EmployeeReview.Domain.Repository.Interfaces;
using EmployeeReview.Domain.Repository.Services;
using Microsoft.Practices.Unity;

namespace EmployeeReview.Application.Services
{
    public class InputValidation:IInputValidation
    {
        public int notEntered;
        [Dependency]
        public IUserChoiceRepository UserChoiceRepo{get;set;}
        private IUnityContainer container;

        public InputValidation(IUnityContainer container)
        {
            this.container = container;
        }

        public UserChoice GetUserChoice(int choiceId)
        {
            UserChoice UserChoice = UserChoiceRepo.GetUserChoice(choiceId);
            return UserChoice;
        }
        public List<UserChoice> GetUserChoices(int userId, int step)
        {
            List<UserChoice> oldChoices = UserChoiceRepo.GetUserChoices(userId, step);
            return oldChoices;
        }
        public IQueryable<Responsibility> GetResponsibilities(int step)
        {
            IQueryable<Responsibility> r = UserChoiceRepo.GetResponsibilities(step);
            return r;
        }
        public UserChoice GetUserChoice(int responsibilityId, int userId)
        {
            UserChoice UserChoice = UserChoiceRepo.GetUserChoice(responsibilityId, userId);

            return UserChoice;
        }
        public User GetUser(string email)
        {
            User user = UserChoiceRepo.GetUser(email);
            return user;
        }

        public void InitialiseUserChoice()
        {
            UserChoiceRepo.InitialiseUserChoice();
        }

        public bool UpdateUserRating(int choiceId, int ratingId, UserChoice oldChoice)
        {
            if(ratingId<1||ratingId >6)
            { return false; }
            if (ratingId != oldChoice.RatingID)
            {
                UserChoiceRepo.UpdateUserRating(choiceId, oldChoice, ratingId);
                return true;
            }
            return true;
        }
        public bool UpdateUserComment(int choiceId, string comment, string oldComment)
        {
            if (comment != oldComment)
            {
                UserChoiceRepo.UpdateUserComment(choiceId, comment);
                return true;
            }

            else if (comment == "" || comment == " ")
            {
                return false;
            }
            return true;
        }
        //public void GetSavedData(int step, string userEmail, UserChoiceView viewObj)
        //{
        //    var responsibility = UserChoice.GetResponsibilities(step);

        //    var user = UserChoice.GetUser(userEmail);
        //    int userId = user.UserID;
        //    UserChoiceView viewObj = new UserChoiceView();
        //    viewObj.UserChoices = new List<UserChoice>();
        //    viewObj.Responsibilities = responsibility.ToList();


        //    foreach (var r in responsibility)
        //    {
        //        UserChoice userChoiceObj = UserChoiceObj.GetUserChoice(r.ResponsibilityID, userId);

        //        viewObj.UserChoices.Add(userChoiceObj);

        //    }
        //}

    }
}
