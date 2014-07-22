using System;
using System.Linq;
using System.Web.Security;
using EmployeeReview.Models;

namespace EmployeeReview.Infrastructure
{
    public class CustomRoleProvider : RoleProvider
    {
        public override bool IsUserInRole(string username, string roleName)
        {
            using (var Context = new EmpContext())
            {
                var user = Context.Users.SingleOrDefault(u => u.Email == username);
                if (user == null)
                    return false;
                return user.UserRole != null && user.UserRole.Select(u => u.Role).Any(r => r.RoleName == roleName);
            }
        }

        public override string[] GetRolesForUser(string username)
        {
            using (var usersContext = new EmpContext())
            {
                var user = usersContext.Users.SingleOrDefault(u => u.Email == username);
                if (user == null)
                    return new string[] { };
                return user.UserRole == null ? new string[] { } : user.UserRole.Select(u => u.Role).Select(u => u.RoleName).ToArray();
            }
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            using (var usersContext = new EmpContext())
            {
                return usersContext.Roles.Select(r => r.RoleName).ToArray();
            }
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName { get; set; }
    }
}