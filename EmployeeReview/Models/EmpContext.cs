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

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Responsibility> Responsibilities { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<CategoryTeamMap> CategoryTeams { get; set; }

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