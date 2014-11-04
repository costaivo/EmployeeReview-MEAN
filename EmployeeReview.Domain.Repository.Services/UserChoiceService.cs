using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using EmployeeReview.Domain.Model;
using EmployeeReview.Domain.Repository.Interfaces;

namespace EmployeeReview.Domain.Repository.Services
{
    public class UserChoiceRepository:IUserChoiceRepository
    {        
        private EmpContext ctx=new EmpContext();
        private EmpContext db = new EmpContext();
        public UserChoiceRepository()
        { }

        public IQueryable<Responsibility> GetResponsibilities(int step)
        {
             IQueryable<Responsibility> r= ctx.Responsibilities.Include(a => a.Category).Include(a => a.Category.Type).Where(a => a.Category.TypeID == step);
             return r;
        }
        public User GetUser(string email)
        {
            User user=ctx.Users.SingleOrDefault( a=>a.Email==email);
            return user;
        
        }
        public UserChoice GetUserChoice(int responsibilityId,int userId)
        {
            UserChoice UserChoice = db.UserChoices.SingleOrDefault(a => a.Responsibility.ResponsibilityID == responsibilityId && a.UserID == userId);
            
            return UserChoice;
        }
        public UserChoice GetUserChoice(int choiceId)
        {
            UserChoice UserChoice= ctx.UserChoices.SingleOrDefault(a => a.ChoiceID == choiceId);
            return UserChoice;
        }
        public List<UserChoice> GetUserChoices(int userId,int step)
        {
            List<Category> catgs=ctx.Categories.Where(a=>a.TypeID==step).ToList();
            int catId=catgs[0].CategoryID;
            List<Responsibility> resps=ctx.Responsibilities.Where(a=>a.CategoryID >= catId).ToList();

            int respId = resps[0].ResponsibilityID;
            List<UserChoice> oldChoices = ctx.UserChoices.Where(a => a.UserID == userId && a.ResponsibilityID>=respId).ToList();
            return oldChoices;
        }
        public bool UpdateUserComment(int choiceId,string comment)
        {
            UserChoice updateChoice = ctx.UserChoices.SingleOrDefault(a => a.ChoiceID == choiceId);
            updateChoice.Comment.CommentValue = comment;
            ctx.SaveChanges();
            return true;
 
        }

        public bool UpdateUserRating(int choiceId, int ratingId)
        {
            UserChoice updateChoice = ctx.UserChoices.SingleOrDefault(a => a.ChoiceID == choiceId);
            ctx.SaveChanges();
            return true;
        }

        public bool CreateUserComment()
        {
            Comment c = new Comment { CommentValue = " " };
            ctx.Comments.Add(c);
            ctx.SaveChanges();
            return true;
        }

        public bool InitialiseUserChoice()
        {
            for (int i = 1; i <= db.Responsibilities.Count(); i++)
            {

                Comment c = new Comment { CommentValue = " " };
                ctx.Comments.Add(c);
                ctx.SaveChanges();
                var lastComment = ctx.Comments.Max(a => a.CommentID);
                var lastUser = ctx.Users.Max(a => a.UserID);
                var userId = ctx.Users.SingleOrDefault(a => a.UserID == lastUser).UserID;



                UserChoice newUserChoice = new UserChoice
                {
                    ResponsibilityID = i,
                    RatingID = 1,
                    UserID = userId,
                    ForUserID = userId,
                    CommentID = lastComment,
                    Entered = false
                };

                ctx.UserChoices.Add(newUserChoice);
                ctx.SaveChanges();
            }
            return true;
        }
        public bool UpdateUserRating(int choiceId,UserChoice oldChoice,int ratingId)
    {
            UserChoice updateChoice = ctx.UserChoices.SingleOrDefault(a => a.ChoiceID == choiceId);
            //ctx.Entry(oldChoice).State=EntityState.Detached;
            updateChoice.RatingID = ratingId;
            //ctx.UserChoices.Add(oldChoice);
            //ctx.Entry(oldChoice).State = EntityState.Modified;
            ctx.SaveChanges();
            return true;
    }
    }
}
