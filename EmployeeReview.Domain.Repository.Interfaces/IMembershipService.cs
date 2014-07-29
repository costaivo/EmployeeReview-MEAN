using System;
using System.Web.Security;


namespace EmployeeReview.Domain.Repository.Interfaces
{
    public interface IMembershipService
    {
        int MinPasswordLength { get; }

        bool ValidateUser(string email, string password);
        //MembershipCreateStatus CreateUser(string email, string password, string fname, string lname);
        bool ChangePassword(string userName, string oldPassword, string newPassword);
    }
}