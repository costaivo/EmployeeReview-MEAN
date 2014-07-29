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
        public ActionResult Index(int step = 1,int notEntered=0)
        {
            EmpContext ctx = new EmpContext();
            EmpContext c1 = new EmpContext();
            if (notEntered > 0)
            {
                ViewBag.Error = string.Format("{0} invalid inputs. Please enter valid inputs.", notEntered);
            }
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




            ViewBag.step = step;

            var userName = db.Users.FirstOrDefault(a => a.Email == User.Identity.Name);


            ViewBag.User = userName.Fname + " " + userName.Lname;

            return View(viewObj);

        }

        [HttpPost]
        public ActionResult Index(UserChoiceView model)
        {
            var user = db.Users.SingleOrDefault(a => a.Email == User.Identity.Name).UserID;
            int notEntered = 0;
            List<UserChoice> oldChoices=db.UserChoices.Where(a=>a.UserID==user).ToList();
            for (int i = 0; i < model.UserChoices.Count(); i++)
            {
                int choiceId = model.UserChoices[i].ChoiceID;
                UserChoice updateChoice = db.UserChoices.SingleOrDefault(a => a.ChoiceID == choiceId);
                if (model.UserChoices[i].Comment.CommentValue != oldChoices[i].Comment.CommentValue)
                {
                    updateChoice.Comment.CommentValue = model.UserChoices[i].Comment.CommentValue;
                    db.SaveChanges();
                
                }
                if (model.UserChoices[i].Comment.CommentValue == "" || model.UserChoices[i].Comment.CommentValue == " ")
                {
                    notEntered++;
                }
                if (model.UserChoices[i].RatingID == 1 || model.UserChoices[i].RatingID == 0)
                {
                    notEntered++;
                }
                if (model.UserChoices[i].RatingID != oldChoices[i].RatingID && model.UserChoices[i].RatingID!=0)
                {
                    db.Entry(oldChoices[i]).State=EntityState.Detached;
                    updateChoice.RatingID = model.UserChoices[i].RatingID;
                    db.UserChoices.Attach(oldChoices[i]);
                    db.Entry(oldChoices[i]).State = EntityState.Modified;
                    db.SaveChanges();
                }
               
            }
            if (notEntered > 0) 
            {
                return RedirectToAction("Index", new { notEntered=notEntered});
 
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
            
            //string comments;
            //List<string> choices=model.UserChoices;
            //    foreach(var ){}
            //=model.UserChoices

            //if (true)
            //{
            //    var tempCategory = db.Responsibilities.Include(a => a.Category).Include(a => a.Category.Type);
            //    var home = new UserChoiceView
            //    {
            //        Responsibilities = tempCategory.ToList()
            //    };


            //    for (int i = 0; i < model.UserChoices.Count; i++)
            //    {
            //        Comment c = new Comment { CommentValue = model.UserChoices[i].Comment.CommentValue };
            //        db.Comments.Add(c);
            //        db.SaveChanges();
            //        var lastComment = db.Comments.Max(a => a.CommentID);

            //        UserChoice newUser = new UserChoice
            //        {
            //            ResponsibilityID = model.Responsibilities[i].ResponsibilityID,
            //            RatingID = model.rating[i],
            //            UserID = db.Users.SingleOrDefault(a => a.Email == User.Identity.Name).UserID,
            //            ForUserID = db.Users.SingleOrDefault(a => a.Email == User.Identity.Name).UserID,
            //            CommentID = lastComment
            //        };

            //        db.UserChoices.Add(newUser);
            //        db.SaveChanges();
            //    }
                
                
            //    int step = Convert.ToInt16(Session["step"]);
            //    if (step < 3)
            //    {
            //        ViewBag.step = step + 1;
            //    }
            //    else
            //    {
            //        ViewBag.step = step;
            //    }

            //    return RedirectToAction("Index", new { step = @ViewBag.step });
            //}
            //else { 
            //    ModelState.AddModelError("","All inputs need to be filled.");
            //    int step = Convert.ToInt16(Session["step"]);
            //    ViewBag.step = step;
            //    return RedirectToAction("Index", new { step = @ViewBag.step });
            //    }

        }
    }
}
