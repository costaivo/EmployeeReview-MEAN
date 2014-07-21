using EmployeeReview.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeReview.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        private EmpContext db = new EmpContext();
        [Authorize]
        public ActionResult Index(int step=1)
        {
            var ctx = new EmpContext();

            var cat = ctx.Responsibilities.Include(a => a.Category).Include(a => a.Category.Type);

            ViewBag.step = step;

            var t = ctx.Users.FirstOrDefault(a => a.Email == User.Identity.Name);
            
            
            ViewBag.User = t.Fname + " " + t.Lname;

            return View(cat.ToList());

        }

    }
}
