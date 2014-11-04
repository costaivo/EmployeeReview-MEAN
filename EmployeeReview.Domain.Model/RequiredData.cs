using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace EmployeeReview.Domain.Model
{
    public class RequiredData : DropCreateDatabaseIfModelChanges<EmpContext>
    {
        protected override void Seed(EmpContext context)
        {
            var category = new List<Type> { 
            new Type {TypeID=1 , TypeValue="Project-related Category"},
            new Type {TypeID=2 , TypeValue="General Category"},
            new Type {TypeID=3 , TypeValue="Technical Skill Category"}
            };
            foreach (var r in category)
            {
                context.Types.Add(r);
                context.SaveChanges();
            }
            var rating = new List<Rating>
            {
                new Rating{RatingID=0,RatingValue=0,Meaning="Not entered"},
                new Rating{RatingID=1,RatingValue=1,Meaning="Very Bad"},
                new Rating{RatingID=2,RatingValue=2,Meaning="Bad"},
                new Rating{RatingID=3,RatingValue=3,Meaning="Above Average"},
                new Rating{RatingID=4,RatingValue=4,Meaning="Good"},
                new Rating{RatingID=5,RatingValue=5,Meaning="Very Good"}
            };
            foreach(var r in rating)
            {
                context.Ratings.Add(r);
                context.SaveChanges();
            }

            var tempCategory = new List<Category> { 
            new Category{ CategoryID=1,CategoryValue="Coding",Type=category.Single(a=>a.TypeValue == "Project-related Category")},
            new Category{CategoryID=2,CategoryValue="Deployment",Type=category.Single(a=>a.TypeValue == "Project-related Category")},
            new Category{CategoryID=3,CategoryValue="Company policies",Type=category.Single(a=>a.TypeValue == "General Category")},
            new Category{CategoryID=4,CategoryValue="Upholding company values and culture",Type=category.Single(a=>a.TypeValue == "General Category")},
            new Category{CategoryID=5,CategoryValue="OOPS",Type=category.Single(a=>a.TypeValue == "Technical Skill Category")},
            new Category{CategoryID=6,CategoryValue="C/C++",Type=category.Single(a=>a.TypeValue == "Technical Skill Category")}
            
            };
            foreach (var a in tempCategory)
            {
                context.Categories.Add(a);
                context.SaveChanges();
            }
            
            var team = new List<Team> { 
            new Team{TeamID=1,TeamName="DCT"},
            new Team{TeamID=2,TeamName="Frontend"}
            };
            foreach (var t in team) {
                context.Teams.Add(t);
                context.SaveChanges();
            }


            var responsibility = new List<Responsibility> { 
            new Responsibility{ ResponsibilityID=1, ResponsibilityValue="Develop enhancements to existing and/or new modules based on specifications and provide suitable solutions for issues/errors/new features based on the understanding of the system and client business processes",Category=tempCategory.Single(a=>a.CategoryValue=="Coding")},
            new Responsibility{ResponsibilityID=2,ResponsibilityValue="Understand and implement unit test cases for your code.",Category=tempCategory.Single(a=>a.CategoryValue=="Coding")},
            new Responsibility{ResponsibilityID=3,ResponsibilityValue="Understand and use source versioning system(s) effectively",Category=tempCategory.Single(a=>a.CategoryValue=="Coding")},
            new Responsibility{ResponsibilityID=4,ResponsibilityValue="Follow coding standards and guidelines",Category=tempCategory.Single(a=>a.CategoryValue=="Deployment")},
            new Responsibility{ResponsibilityID=5,ResponsibilityValue="Migrate changes into production environment, or client framework",Category=tempCategory.Single(a=>a.CategoryValue=="Deployment")},
            new Responsibility{ResponsibilityID=6,ResponsibilityValue="Troubleshoot issues and errors in applications under development and applications in production where you might have to work with someone's code and provide suitable solutions for issues/errors/new features based on the understanding of the system and client business processes",Category=tempCategory.Single(a=>a.CategoryValue=="Deployment")},
            new Responsibility{ResponsibilityID=7,ResponsibilityValue="Review solutions/fixes for bugs and issues proposed/completed by other team members",Category=tempCategory.Single(a=>a.CategoryValue=="Deployment")},
     /*       new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Perform  integration/functionality testing and work with QA on ensuring that application meets relevant QA standards by taking ownership to devise a plan for fixing bugs"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Rapidly prototype apps to demo new features/tech, the prototypes should meet the objectives/requirements set forth by senior staff"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Assist in system design based on business requirements and current system constraints, work with TA and BA teams  to analyze the system architecture from various aspects. "},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="understand project documentation and keep project files (naming convention and structure) well organized.  Contribute to technical documentation and deployment guides."},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Record work hours in time tracking system according to the company guidelines"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Work on task distribution, assign project tasks and resources"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Communicate with client and other teams' staff on project progress"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Assess project-related risks (resource related, timeline related, complexity related) and identify implementation strategy that reduces project risks and keeps the project within objectives (timeline, estimated hours, quality)"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Review code (issues free without affecting existing functionality, code & application performance optimized, requirement compliance and following coding standards) and provide feedback."},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Evaluate performance and give feedback according to the company guidelines and provide training whenever required"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Define and follow-up on goals, and direction for the team "},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Schedule work based on priorities, risks, and team strengths and assign resources across projects"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Recruit new staff, prepare for and conduct interviews and evaluate potential candidates according to the company guidelines"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Assist in formulating development standards and best practices"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Learn new tools, technologies, skills, and develop an understanding of your talents and non-talents"},
            */
            new Responsibility{ResponsibilityID=8,ResponsibilityValue="Adhere to company policies and guidelines for attendance, leave application, home drops, dress code, confidentiality, IT - equipment and office security.",Category=tempCategory.Single(a=>a.CategoryValue=="Company policies")},
            new Responsibility{ResponsibilityID=9,ResponsibilityValue="Adhere to company values and principles e.g. being a productive team member by assisting others and pursuing team goals , doing your best every day, knowing your strengths, respecting opinions of others and open to constructive criticism ",Category=tempCategory.Single(a=>a.CategoryValue=="Upholding company values and culture")},
            
            new Responsibility{ResponsibilityID=10,ResponsibilityValue="Interfaces, Classes, Objects, Inheritance, Abstraction, Encapsulation, Data Hiding/Information Hiding, Polymorphism",Category=tempCategory.Single(a=>a.CategoryValue=="OOPS")},
            new Responsibility{ResponsibilityID=11,ResponsibilityValue="Basic of C/C++, Control Structure, Pointers, File I/O",Category=tempCategory.Single(a=>a.CategoryValue=="C/C++")}
           
            /*new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Objective C, Framework Knowledge and Understanding, Application profiles, xml, json, REST"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Knowledge of Android Framework and it versions, Knowledge of Play store, Communication between web service, xml, json, REST"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="MVC, Singleton, Delegate, Observer"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Basic SQL Queries, Transactions, Understanding of Database concepts"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Advance SQL Queries, Stored Procedures, Optimizations. Knowledge of (MS SQL SERVER)"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Advance SQL Queries, Stored Procedures, Optimizations and Knowledge of MYSQL"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Understanding and Implementation of Arrays, Queues, Stacks, Linked-lists, Binary Trees & Search"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Understanding and Implementation of Arrays,  Stack , Queues, Binary Trees & Search"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Understanding of interactions between Web-servers and clients, REST , json"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue=" Windows Communication Foundation Basics & Architecture"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="MVC in .NET"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Nhibernate / Linq / Entity Framework"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Usage of SSIS in MS SQL SERVER 2008/2012"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="PHP Basics, Control structure, function , design patterns, framework"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Java Basics, Control structure, functions , design patterns &  editors"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Knowledge of HTML5 Tags, Canvas and HTML5 Datastore"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue=".NET Framework (2.0,3.5,4.0). VS 2005,2008,2010,2012"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="MS Test, N-Unit, Mocking. MB Unit"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue=" X-Code unit test"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Junit"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="phpUnit or any other Unit testing framework in PHP"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="TFS, SVN, GIT"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Javascript, VB Script, Jquery, Cross browser knowledge"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue=""},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue=""},
            */
            
            };
            foreach (var r in responsibility)
            {
                context.Responsibilities.Add(r);
                context.SaveChanges();
            }

            var catgTeamMap = new List<CategoryTeamMap> { 
            new CategoryTeamMap{Category=tempCategory.Single(a=>a.CategoryValue=="Coding"),Team=team.Single(b=>b.TeamName=="DCT")},
            new CategoryTeamMap{Category=tempCategory.Single(a=>a.CategoryValue=="Deployment"),Team=team.Single(b=>b.TeamName=="Frontend")}
            };
            foreach (var ct in catgTeamMap)
            {
                context.CategoryTeams.Add(ct);
                context.SaveChanges();
            }
            var role = new List<Role>
            {
                new Role{RoleID=1,RoleName="developer"},
                new Role{RoleID=2,RoleName="team lead"}
            };
            foreach (var r in role)
            {
                context.Roles.Add(r);
                context.SaveChanges();

            }
            /*
            var user=new List<User>{
            new User{UserID=1,Email="hello@mail.com",Password="hellobye",Fname="hello",Lname="bye"},
            new User{UserID=2,Email="hello12@mail.com",Password="hellobye12",Fname="hello",Lname="bye"}};
            foreach(var i in user){
            context.Users.Add(i);
            context.SaveChanges();
            }
           */
            

            //var userRole = new List<UserRole>{
            //new UserRole{User=context.Users.SingleOrDefault(a=>a.UserID==1),Role=role.SingleOrDefault(a=>a.RoleName=="developer")},
            //new UserRole{User=context.Users.SingleOrDefault(a=>a.UserID==2),Role=role.SingleOrDefault(a=>a.RoleName=="team lead")}
            //};
            //foreach(var t in userRole){
            //    context.UserRoles.Add(t);
            //    context.SaveChanges();
            //}

         
            
            //var rRMap = new List<ResponsibilityRoleMap> { 
            //new ResponsibilityRoleMap{Role=role.SingleOrDefault(a=>a.RoleID==1),Responsibility=responsibility.SingleOrDefault(a=>a.ResponsibilityID==1),Supervision=true},
            //new ResponsibilityRoleMap{Role=role.SingleOrDefault(a=>a.RoleID==1),Responsibility=responsibility.SingleOrDefault(a=>a.ResponsibilityID==2),Supervision=true},
            //new ResponsibilityRoleMap{Role=role.SingleOrDefault(a=>a.RoleID==1),Responsibility=responsibility.SingleOrDefault(a=>a.ResponsibilityID==3),Supervision=true},
            //new ResponsibilityRoleMap{Role=role.SingleOrDefault(a=>a.RoleID==1),Responsibility=responsibility.SingleOrDefault(a=>a.ResponsibilityID==4),Supervision=false},
            //new ResponsibilityRoleMap{Role=role.SingleOrDefault(a=>a.RoleID==2),Responsibility=responsibility.SingleOrDefault(a=>a.ResponsibilityID==5),Supervision=false},
            //new ResponsibilityRoleMap{Role=role.SingleOrDefault(a=>a.RoleID==2),Responsibility=responsibility.SingleOrDefault(a=>a.ResponsibilityID==6),Supervision=false},
            //new ResponsibilityRoleMap{Role=role.SingleOrDefault(a=>a.RoleID==2),Responsibility=responsibility.SingleOrDefault(a=>a.ResponsibilityID==7),Supervision=false}
            //};
            //foreach(var rr in rRMap){
            //    context.ResponsibilityRoles.Add(rr);
            //    context.SaveChanges();
            //}
        }
    }
}