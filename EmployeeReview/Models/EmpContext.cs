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

        public DbSet<Users> User { get; set; }
        public DbSet<Categories> Category { get; set; }
        public DbSet<Responsibilities> Responsibility { get; set; }
        public DbSet<Ratings> Rating { get; set; }
        public DbSet<CategoryTypes> CategoryType { get; set; }
    }
}