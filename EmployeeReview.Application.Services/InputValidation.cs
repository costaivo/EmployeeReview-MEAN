using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeReview.Application.Interfaces;
using EmployeeReview.Domain.Model;
using EmployeeReview.Domain.Repository.Interfaces;
using EmployeeReview.Domain.Repository.Services;


namespace EmployeeReview.Application.Services
{
    public class InputValidation:IInputValidation
    {
        public int notEntered;
        public IUserChoiceRepository UserChoice = new UserChoiceRepository();
        public bool ValidInput()
        {
            if (notEntered > 0)
                return false;
            return true;
        }

        public void IncrementInvalidInput()
        {
            this.notEntered++;
        }
        public int GetInvalidInputNum()
        {
            return notEntered;
        }
        public void InitialiseUserChoice()
        {
            UserChoice.InitialiseUserChoice();
            
        }

        public bool UpdateUserRating(int choiceId, int ratingId, UserChoice oldChoice)
        {
            if(ratingId<=1||ratingId >6)
            { return false; }
            if (ratingId != oldChoice.RatingID)
            {
                UserChoice.UpdateUserRating(choiceId, oldChoice, ratingId);
                return true;
            }
            return true;
        }
        public bool UpdateUserComment(int choiceId, string comment, string oldComment)
        {
            if (comment != oldComment)
            {
                UserChoice.UpdateUserComment(choiceId, comment);
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
