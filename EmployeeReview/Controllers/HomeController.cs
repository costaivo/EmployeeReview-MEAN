using EmployeeReview.Models;
using EmployeeReview.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeReview.Controllers
{
    //home
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        private EmpContext db = new EmpContext();
        [Authorize]
        public ActionResult Index(int step=1)
        {
            var context = new EmpContext();

            
            
            var tempCategory =context.Responsibilities.Include(a => a.Category).Include(a => a.Category.Type);
            
            var tempUser=context.Users.SingleOrDefault(a=>a.Email==User.Identity.Name).UserID;

            Home homeObj = new Home();
            homeObj.UserChoices = new List<UserChoice>();
            
            List<UserChoice> userChoice=context.UserChoices.Where(a=>a.UserID==tempUser).ToList();
            
            foreach (var cid in userChoice)
            {
                UserChoice userChoiceObj = context.UserChoices.SingleOrDefault(a => a.ChoiceID == cid.ChoiceID);
                userChoiceObj.Comment = context.Comments.SingleOrDefault(a => a.CommentID == cid.CommentID);
                
                homeObj.UserChoices.Add(userChoiceObj);
            }

            homeObj.Responsibilities = tempCategory.ToList();
              
            ViewBag.step = step;

            var user = context.Users.FirstOrDefault(a => a.Email == User.Identity.Name);
            
            
            ViewBag.User = user.Fname + " " + user.Lname;

            return View(homeObj);

        }

        [HttpPost]
        public ActionResult Index(Home model,int step=1)
        {

           
            var context = new EmpContext();
            
            var tempCategory = context.Responsibilities.Include(a => a.Category).Include(a => a.Category.Type);
            var home = new Home
            {
                Responsibilities = tempCategory.ToList()
            };
            ViewBag.step = step;
            var user = context.Users.FirstOrDefault(a => a.Email == User.Identity.Name);
            ViewBag.User = user.Fname + " " + user.Lname;

            for (int i = 0; i < model.comment.Count; i++)
            {
                Comment c = new Comment { CommentValue = model.comment[i] };
                context.Comments.Add(c);
                context.SaveChanges();
                var lastComment = context.Comments.Max(a=>a.CommentID);

                UserChoice newUser = new UserChoice
                {
                    ResponsibilityID = model.Responsibilities[i].ResponsibilityID,
                    RatingID = model.rating[i],
                    UserID = context.Users.SingleOrDefault(a => a.Email == User.Identity.Name).UserID,
                    ForUserID = context.Users.SingleOrDefault(a => a.Email == User.Identity.Name).UserID,
                    CommentID = lastComment
                };
                context.UserChoices.Add(newUser);
                context.SaveChanges();
            }




            
            return View(home);
        }

    }
}
