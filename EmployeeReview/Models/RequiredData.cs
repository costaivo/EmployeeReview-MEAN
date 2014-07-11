using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace EmployeeReview.Models
{
    public class RequiredData : DropCreateDatabaseIfModelChanges<EmpContext>
    {
        protected override void Seed(EmpContext context)
        {
            var category = new List<CategoryTypes> { 
            new CategoryTypes {TypeID=1 , TypeValue="Project-related Category"},
            new CategoryTypes {TypeID=2 , TypeValue="General Category"},
            new CategoryTypes {TypeID=3 , TypeValue="Technical Skill Category"}
            };
            foreach (var r in category)
            {
                context.CategoryType.Add(r);
                context.SaveChanges();
            }
            var rating = new List<Ratings>
            {
                new Ratings{RatingID=1,RatingValue=1,Meaning="Very Bad"},
                new Ratings{RatingID=2,RatingValue=2,Meaning="Bad"},
                new Ratings{RatingID=3,RatingValue=3,Meaning="Above Average"},
                new Ratings{RatingID=4,RatingValue=4,Meaning="Good"},
                new Ratings{RatingID=5,RatingValue=5,Meaning="Very Good"}
            };
            foreach(var r in rating)
            {
                context.Rating.Add(r);
                context.SaveChanges();
            }
            var responsibility = new List<Responsibilities> { 
            new Responsibilities{ResponsibilityID=1,ResponsibilityValue="Develop enhancements to existing and/or new modules based on specifications and provide suitable solutions for issues/errors/new features based on the understanding of the system and client business processes"},
            new Responsibilities{ResponsibilityID=2,ResponsibilityValue="Understand and implement unit test cases for your code."},
            new Responsibilities{ResponsibilityID=3,ResponsibilityValue="Understand and use source versioning system(s) effectively"},
            new Responsibilities{ResponsibilityID=4,ResponsibilityValue="Follow coding standards and guidelines"},
            new Responsibilities{ResponsibilityID=5,ResponsibilityValue="Migrate changes into production environment, or client framework"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Troubleshoot issues and errors in applications under development and applications in production where you might have to work with someone's code and provide suitable solutions for issues/errors/new features based on the understanding of the system and client business processes"},
            new Responsibilities{ResponsibilityID=7,ResponsibilityValue="Review solutions/fixes for bugs and issues proposed/completed by other team members"},
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
            
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Adhere to company policies and guidelines for attendance, leave application, home drops, dress code, confidentiality, IT - equipment and office security."},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Adhere to company values and principles e.g. being a productive team member by assisting others and pursuing team goals , doing your best every day, knowing your strengths, respecting opinions of others and open to constructive criticism "},
            
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Interfaces, Classes, Objects, Inheritance, Abstraction, Encapsulation, Data Hiding/Information Hiding, Polymorphism"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Basic of C/C++, Control Structure, Pointers, File I/O"},
            new Responsibilities{ResponsibilityID=6,ResponsibilityValue="Objective C, Framework Knowledge and Understanding, Application profiles, xml, json, REST"},
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
                context.Responsibility.Add(r);
                context.SaveChanges();
            }
            new List<Categories> { 
            new Categories{CategoryValue="Coding",CategoryType=category.Single(a=>a.TypeValue == "Project-related Category"),Responsibility = responsibility.Single(x=>x.ResponsibilityValue == "Develop enhancements to existing and/or new modules based on specifications and provide suitable solutions for issues/errors/new features based on the understanding of the system and client business processes"),Rating=rating.Single(x=>x.RatingValue==3)},
            new Categories{CategoryValue="Deployment",CategoryType=category.Single(a=>a.TypeValue == "General Category"),Responsibility = responsibility.Single(x=>x.ResponsibilityValue == "Understand and implement unit test cases for your code."),Rating=rating.Single(x=>x.RatingValue==3)}
            }.ForEach(a => context.Category.Add(a));
            context.SaveChanges();
        }
    }
}