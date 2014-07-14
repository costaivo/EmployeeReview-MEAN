using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using EmployeeReview.Models;
using EmployeeReview.Interfaces;
using EmployeeReview.Services;

namespace EmployeeReview.Controllers
{
    public class AccountController : Controller
    {
        public IFormsAuthenticationService FormsService { get; set; }
        public IMembershipService MembershipService { get; set; }

        protected override void Initialize(RequestContext requestContext)
        {
            if (FormsService == null) { FormsService = new FormsAuthenticationService(); }
            if (MembershipService == null) { MembershipService = new AccountMembershipService(); }

            base.Initialize(requestContext);
        }

        //
        // GET: /Account/LogOn

        public ActionResult LogOn()
        {
            return View();
        }

        //
        // POST: /Account/LogOn

        [HttpPost]
        public ActionResult LogOn(LogOnModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                if (MembershipService.ValidateUser(model.Email, model.Password))
                {
                    FormsService.SignIn(model.Email, model.RememberMe);
                    if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                        && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                    {
                        return Redirect(returnUrl);
                    }
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", "The user name or password provided is incorrect.");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/LogOff

        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Index", "Home");
        }

        //
        // GET: /Account/Register

        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register

        [HttpPost]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Attempt to register the user
                var createStatus = MembershipService.CreateUser(model.Email, model.Password, model.Fname,model.Lname);

                if (createStatus == MembershipCreateStatus.Success)
                {
                    FormsService.SignIn(model.Email, false /* createPersistentCookie */);
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", ErrorCodeToString(createStatus));
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ChangePassword

        [Authorize]
        public ActionResult ChangePassword()
        {
            return View();
        }

        // ChangePassword method not implemented in CustomMembershipProvider.cs
        // Feel free to update!

        //
        // POST: /Account/ChangePassword

        [Authorize]
        [HttpPost]
        public ActionResult ChangePassword(ChangePasswordModel model)
        {
            if (ModelState.IsValid)
            {

                // ChangePassword will throw an exception rather
                // than return false in certain failure scenarios.
                bool changePasswordSucceeded;
                try
                {
                    MembershipUser currentUser = Membership.GetUser(User.Identity.Name, true /* userIsOnline */);
                    changePasswordSucceeded = currentUser.ChangePassword(model.OldPassword, model.NewPassword);
                }
                catch (Exception)
                {
                    changePasswordSucceeded = false;
                }

                if (changePasswordSucceeded)
                {
                    return RedirectToAction("ChangePasswordSuccess");
                }
                else
                {
                    ModelState.AddModelError("", "The current password is incorrect or the new password is invalid.");
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ChangePasswordSuccess

        public ActionResult ChangePasswordSuccess()
        {
            return View();
        }

        #region Status Codes
        private static string ErrorCodeToString(MembershipCreateStatus createStatus)
        {
            // See http://go.microsoft.com/fwlink/?LinkID=177550 for
            // a full list of status codes.
            switch (createStatus)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "User name already exists. Please enter a different user name.";

                case MembershipCreateStatus.DuplicateEmail:
                    return "A user name for that e-mail address already exists. Please enter a different e-mail address.";

                case MembershipCreateStatus.InvalidPassword:
                    return "The password provided is invalid. Please enter a valid password value.";

                case MembershipCreateStatus.InvalidEmail:
                    return "The e-mail address provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidAnswer:
                    return "The password retrieval answer provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "The password retrieval question provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidUserName:
                    return "The user name provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.ProviderError:
                    return "The authentication provider returned an error. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                case MembershipCreateStatus.UserRejected:
                    return "The user creation request has been canceled. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                default:
                    return "An unknown error occurred. Please verify your entry and try again. If the problem persists, please contact your system administrator.";
            }
        }
        #endregion
    }
   /* public class AccountController : Controller
    {
        //
        // GET: /Account/
        private EmpContext db = new EmpContext();
       

        public ActionResult Index(LogOnModel model)
        {
           
            
            if (Session["LoggedUserId"] != null)
            { 
                var ctx = new EmpContext();
                var temp = Session["LoggedUserId"].ToString();
                RegisterModel Usr = ctx.Users.FirstOrDefault(i => i.Email == temp);
             
               // var items = ctx.Responsibility.Include()
                /*
                var items = from s in ctx.Category
                            join t in ctx.CategoryType on s.CategoryType.TypeID equals t.TypeID
                            join x in ctx.Responsibility on s.Responsibility.ResponsibilityID equals x.ResponsibilityID
                            join r in ctx.Rating on s.Rating.RatingID equals r.RatingID
                            select new { t.TypeValue,s.CategoryValue,r.RatingValue,x.ResponsibilityValue};
                items = items.OrderBy(i => i.CategoryValue);
                ViewBag.item = items;
                
                 */
            
    /*
                 return View();
            }
            else 
            {
                return RedirectToAction("LogOn");

            }
        }

        #region login functions
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
                var ctx = new EmpContext();
                RegisterModel Usr = ctx.Users.FirstOrDefault(i => i.Email == model.Email && i.Password == model.Password);
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
        #endregion


        public ActionResult Register()
        {
            return View();

        }
        [HttpPost]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                using (var ctx = new EmpContext())
                {
                    RegisterModel NewUsr = new RegisterModel { Fname = model.Fname, Lname = model.Lname, Email = model.Email, Password = model.Password ,ConfirmPassword=model.ConfirmPassword,IsActive=true };
                    ctx.Users.Add(NewUsr);
                    ctx.SaveChanges();
                    return RedirectToAction("LogOn");
                }
           }
            return View();
            

        }
    }*/




}
