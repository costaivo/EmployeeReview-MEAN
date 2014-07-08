using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace EmployeeReview.Models
{
    public class Context : DbContext
    {
        public Context()
        { }

        public DbSet<RegisterModel> NewUser { get; set; }
        public DbSet<LogOnModel> User { get; set; }

    }
}