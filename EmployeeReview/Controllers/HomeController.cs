using EmployeeReview.Models;
using EmployeeReview.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
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
        public ActionResult Index(int step = 1)
        {
            EmpContext ctx = new EmpContext();
            EmpContext c1 = new EmpContext();

            var responsibility = ctx.Responsibilities.Include(a => a.Category).Include(a => a.Category.Type).Where(a => a.Category.TypeID == step);

            var user = db.Users.SingleOrDefault(a => a.Email == User.Identity.Name).UserID;

            UserChoiceView viewObj = new UserChoiceView();
            viewObj.UserChoices = new List<UserChoice>();
            viewObj.Responsibilities = responsibility.ToList();
            List<UserChoice> userChoice = db.UserChoices.Where(a => a.UserID == user && a.Responsibility.Category.TypeID == step).ToList();

            foreach(var r in responsibility)
            {
                UserChoice userChoiceObj = c1.UserChoices.SingleOrDefault(a => a.Responsibility.ResponsibilityID == r.ResponsibilityID && a.UserID == user);
                
                
                viewObj.UserChoices.Add(userChoiceObj);
                ctx.SaveChanges();
            }

            
            //int i = 0;
            //foreach (var cid in userChoice)
            //{
            //    for (i = 0; i < homeObj.Responsibilities.Count; i++)
            //    {
            //        if (cid.Responsibility.ResponsibilityID == homeObj.Responsibilities[i].ResponsibilityID)
            //        {

            //            UserChoice userChoiceObj = db.UserChoices.SingleOrDefault(a => a.ChoiceID == cid.ChoiceID);
            //            userChoiceObj.Comment = db.Comments.SingleOrDefault(a => a.CommentID == cid.CommentID);
            //            userChoiceObj.Rating = db.UserChoices.SingleOrDefault(a => a.ChoiceID == cid.ChoiceID).Rating;
            //            homeObj.UserChoices.Add(userChoiceObj);
            //        }
            //    }
            //}



            ViewBag.step = step;

            var userName = db.Users.FirstOrDefault(a => a.Email == User.Identity.Name);


            ViewBag.User = userName.Fname + " " + userName.Lname;

            return View(viewObj);

        }

        [HttpPost]
        public ActionResult Index(UserChoiceView model)
        {

            if (ModelState.IsValid)
            {
                var tempCategory = db.Responsibilities.Include(a => a.Category).Include(a => a.Category.Type);
                var home = new UserChoiceView
                {
                    Responsibilities = tempCategory.ToList()
                };


                for (int i = 0; i < model.UserChoices.Count; i++)
                {
                    Comment c = new Comment { CommentValue = model.UserChoices[i].Comment.CommentValue };
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
                
                
                int step = Convert.ToInt16(Session["step"]);
                if (step < 3)
                {
                    ViewBag.step = step + 1;
                }
                else
                {
                    ViewBag.step = step;
                }

                return RedirectToAction("Index", new { step = @ViewBag.step });
            }
            else { 
                ModelState.AddModelError("","All inputs need to be filled.");
                int step = Convert.ToInt16(Session["step"]);
                ViewBag.step = step;
                return RedirectToAction("Index", new { step = @ViewBag.step });
                }

        }
    }
}
