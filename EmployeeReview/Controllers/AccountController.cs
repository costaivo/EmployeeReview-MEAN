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
                using (var ctx = new Context())
                {
                    RegisterModel NewUsr = new RegisterModel { Fname = model.Fname, Lname = model.Lname, Email = model.Email, Password = model.Password };
                    ctx.NewUser.Add(NewUsr);
                    ctx.SaveChanges();
                    return RedirectToAction("LogOn");
                }
            }
            return View(model);

        }
    }
}
