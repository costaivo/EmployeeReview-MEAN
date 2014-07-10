using System.Linq;
using System.Web.Mvc;
using EmployeeReview.Models;

namespace EmployeeReview.Controllers
{
    public class AccountController : Controller
    {
        
        // GET: /Account/
        public ActionResult Index(LogOnModel model)
        {
            
            if (Session["LoggedUserId"] != null)
            { 
                var ctx = new Context();
                var temp = Session["LoggedUserId"].ToString();
                Users Usr = ctx.User.First(i => i.Email == temp);
                ViewBag.fname = Usr.Fname;
                ViewBag.lname = Usr.Lname;
                
                return View();
            }
            else 
            {
                return RedirectToAction("LogOn");

            }
        }
        public ActionResult LogOn()
        {

            return View();
        }
        
        public ActionResult LogOff()
        {
            Session["LoggedUserId"] = null;
            
            return RedirectToAction("LogOn");

        }
        [HttpPost]
        public ActionResult LogOn(LogOnModel model)
        {
            if (ModelState.IsValid)
            {
                var ctx = new Context();
                Users Usr = ctx.User.First(i => i.Email == model.Email && i.Password == model.Password);
                if (Usr == null)
                {
                    return RedirectToAction("LogOn"); }
                else
                {
                    Session["LoggedUserId"] = Usr.Email;
                    
                    return RedirectToAction("Index");
                }
                

            }

            return View();
        }
        

        public ActionResult Register()
        {
            return View();

        }
        [HttpPost]
        public ActionResult Register(Users model)
        {
            if (ModelState.IsValid)
            {
                using (var ctx = new Context())
                {
                    Users NewUsr = new Users
                    {
                        Fname = model.Fname,
                        Lname = model.Lname,
                        Email = model.Email,
                        Password = model.Password,
                        ConfirmPassword = model.ConfirmPassword,
                        IsActive = true
                    };
                    ctx.User.Add(NewUsr);
                    ctx.SaveChanges();
                    return RedirectToAction("LogOn");
                }
           }
            return View();
            

        }
    }
}
