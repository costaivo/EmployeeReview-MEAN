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
        public ActionResult Index()
        {
            //var details = db.Responsibilities.Include(a => a.Category);
            var ctx = new EmpContext();

            var cat = ctx.Categories.Include(a => a.Type);

            return View(cat.ToList());

        }

    }
}
