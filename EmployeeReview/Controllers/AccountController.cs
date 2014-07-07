using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using EmployeeReview.Models;

namespace EmployeeReview.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult LogOn()
        {
            return View();
        }

        public ActionResult Register()
        {
            return View();

        }
        [HttpPost]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                MembershipCreateStatus createStatus;
                Membership.CreateUser(model.UserID, model.Fname, model.Lname, model.Email, model.Password, model.IsActive,out createStatus);

                if (createStatus == MembershipCreateStatus.Success)
                {
                    FormsAuthentication.SetAuthCookie(model.UserID, false );
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("","Some error occured.");
                }
            }
            return View(model);

        }
    }
}
