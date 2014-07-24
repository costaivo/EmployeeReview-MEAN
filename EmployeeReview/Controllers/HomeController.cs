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

            var tempCategory = db.Responsibilities.Include(a => a.Category).Include(a => a.Category.Type).Where(a => a.Category.TypeID == step);
            
            var tempUser=db.Users.SingleOrDefault(a=>a.Email==User.Identity.Name).UserID;

            Home homeObj = new Home();
            homeObj.UserChoices = new List<UserChoice>();
            homeObj.Responsibilities = tempCategory.ToList();
            List<UserChoice> userChoice=db.UserChoices.Where(a=>a.UserID==tempUser).ToList();

            
            int i=0;
            foreach (var cid in userChoice)
            {
                for (i = 0; i < homeObj.Responsibilities.Count; i++)
                {
                    if (cid.Responsibility.ResponsibilityID == homeObj.Responsibilities[i].ResponsibilityID)
                    {
                        
                        UserChoice userChoiceObj = db.UserChoices.SingleOrDefault(a => a.ChoiceID == cid.ChoiceID);
                        userChoiceObj.Comment = db.Comments.SingleOrDefault(a => a.CommentID == cid.CommentID);
                        userChoiceObj.Rating = db.UserChoices.SingleOrDefault(a => a.ChoiceID == cid.ChoiceID).Rating;
                        homeObj.UserChoices.Add(userChoiceObj);
                    }
                }
            }

            
              
            ViewBag.step = step;

            var user = db.Users.FirstOrDefault(a => a.Email == User.Identity.Name);
            
            
            ViewBag.User = user.Fname + " " + user.Lname;

            return View(homeObj);

        }

        [HttpPost]
        public ActionResult Index(Home model)
        {

            var tempCategory = db.Responsibilities.Include(a => a.Category).Include(a => a.Category.Type);
            var home = new Home
            {
                Responsibilities = tempCategory.ToList()
            };
           

            for (int i = 0; i < model.comment.Count; i++)
            {
                Comment c = new Comment { CommentValue = model.comment[i] };
                db.Comments.Add(c);
                db.SaveChanges();
                var lastComment = db.Comments.Max(a => a.CommentID);

                UserChoice newUser = new UserChoice
                {
                    ResponsibilityID = model.Responsibilities[i].ResponsibilityID,
                    RatingID = model.rating[i],
                    UserID = db.Users.SingleOrDefault(a => a.Email == User.Identity.Name).UserID,
                    ForUserID = db.Users.SingleOrDefault(a => a.Email == User.Identity.Name).UserID,
                    CommentID = lastComment
                };
               
                db.UserChoices.Add(newUser);
                db.SaveChanges();
            }
            int step=Convert.ToInt16(Session["step"]);
            if (step < 3)
            {
                ViewBag.step = step + 1;
            }
            else 
            {
                ViewBag.step = step;
            }
            

            return RedirectToAction("Index", new {step=@ViewBag.step});
        }

    }
}
