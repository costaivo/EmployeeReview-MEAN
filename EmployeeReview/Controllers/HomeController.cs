using EmployeeReview.Domain.Model;
using EmployeeReview.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using EmployeeReview.Domain.Repository.Interfaces;
using EmployeeReview.Domain.Repository.Services;
using EmployeeReview.Application.Interfaces;
using EmployeeReview.Application.Services;
namespace EmployeeReview.Controllers
{
    //home
    public class HomeController : Controller
    {
        public IUserChoiceRepository UserChoiceObj { get; set; }
        public IInputValidation UserChoiceService { get; set; } 
        //
        // GET: /Home/
        

        [Authorize]
        public ActionResult Index(int step = 1,int notEntered=0)
        {
            
            if (UserChoiceObj == null) 
            { UserChoiceObj = new UserChoiceRepository(); }
            if (UserChoiceService == null) 
            { UserChoiceService = new InputValidation(); }
            if (notEntered > 0)
            {
                ViewBag.Error = string.Format("{0} invalid inputs. Please enter valid inputs.", notEntered);
            }
            var responsibility = UserChoiceObj.GetResponsibilities(step);
            
             
            var user = UserChoiceObj.GetUser(User.Identity.Name);
            int userId = user.UserID;
            UserChoiceView viewObj = new UserChoiceView();
            viewObj.UserChoices = new List<UserChoice>();
            viewObj.Responsibilities = responsibility.ToList();


            foreach(var r in responsibility)
            {
                UserChoice userChoiceObj = UserChoiceObj.GetUserChoice(r.ResponsibilityID, userId);
                    
                viewObj.UserChoices.Add(userChoiceObj);

            }

            ViewBag.step = step;

            ViewBag.User = user.Fname + " " + user.Lname;

            return View(viewObj);

        }

        [HttpPost]
        public ActionResult Index(UserChoiceView model)
        {
            if (UserChoiceObj == null)
            { UserChoiceObj = new UserChoiceRepository(); }
            if (UserChoiceService == null)
            { UserChoiceService = new InputValidation(); }

            var user = UserChoiceObj.GetUser(User.Identity.Name);
            int step = Convert.ToInt16(Session["step"]);
            int notEntered = 0, startChoiceId = model.UserChoices[0].ChoiceID; 
            List<UserChoice> oldChoices=UserChoiceObj.GetUserChoices(user.UserID,step);
            
            for (int i = 0; i < model.UserChoices.Count(); i++)
            {
                int choiceId = model.UserChoices[i].ChoiceID;
                UserChoice updateChoice = UserChoiceObj.GetUserChoice(choiceId);
                    
                
                   
                
                if ( !UserChoiceService.UpdateUserComment(choiceId, model.UserChoices[i].Comment.CommentValue, oldChoices[i].Comment.CommentValue))
                {
                    notEntered++;
                }
                if (!UserChoiceService.UpdateUserRating(choiceId, model.UserChoices[i].RatingID, oldChoices[i]))
                {
                    notEntered++;    
                }
                
               
            }
            
            
            if (step < 3 && notEntered<1 || step<1)
            {
                ViewBag.step = step + 1;
            }
            else
            {
                ViewBag.step = step;
            }
            if (notEntered > 0)
            {
                return RedirectToAction("Index", new { notEntered = notEntered,step=@ViewBag.step });
            }
            return RedirectToAction("Index", new { step = @ViewBag.step, });
            
            
        }
    }
}
