using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using EmployeeReview.Models;
using System.Data.Entity.ModelConfiguration.Conventions;


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
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserChoice> UserChoices { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<ResponsibilityRoleMap> ResponsibilityRoles { get; set; }
        
        

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }
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

        public void AddUserRole(UserRole userRole)
        {
            var roleEntry = UserRoles.SingleOrDefault(r => r.UserID == userRole.UserID);
            if (roleEntry != null)
            {
                UserRoles.Remove(roleEntry);
                SaveChanges();
            }
            UserRoles.Add(userRole);
            SaveChanges();
        }
    }
}