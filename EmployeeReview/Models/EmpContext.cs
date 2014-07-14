using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using EmployeeReview.Models;


namespace EmployeeReview.Models
{
    public class EmpContext : DbContext
    {
        public EmpContext()
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Categories> Category { get; set; }
        public DbSet<Responsibilities> Responsibility { get; set; }
        public DbSet<Ratings> Rating { get; set; }
        public DbSet<CategoryTypes> CategoryType { get; set; }
        public DbSet<Teams> Team { get; set; }
        public DbSet<CategoryTeams> CategoryTeam { get; set; }

        public void AddUser(User user)
        {
            Users.Add(user);
            SaveChanges();
        }

        public User GetUser(string userName)
        {
            var user = Users.SingleOrDefault(u => u.Email == userName);
            return user;
        }

        public User GetUser(string userName, string password)
        {
            var user = Users.SingleOrDefault(u => u.Email == userName && u.Password == password);
            return user;
        }
    }
}