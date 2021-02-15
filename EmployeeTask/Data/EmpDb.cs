using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EmployeeTask.Models;
using System.Data;
using System.Data.Entity;

namespace EmployeeTask.Data
{
    public class EmpDb
    {
        private ApplicationDbContext db;
        public EmpDb()
        {
            db = new ApplicationDbContext();
        }

        public List<Employee> ListAll()
        {
            var Emplst = (from emp in db.Employees select emp).ToList();

            return Emplst;


        }
        public Employee AddEmp(Employee emp)
        {
            var model = db.Employees.Add(emp);
            db.SaveChanges();
            return model;
        }
        
        public Employee Update(Employee emp)
        {
            db.Entry(emp).State = EntityState.Modified;
            db.SaveChanges();
            return emp;
        }


        public int Delete(int ID)
        {
            var model = (from emp in db.Employees where emp.EmpID == ID select emp).FirstOrDefault();
            db.Employees.Remove(model);
            db.SaveChanges();
            return 0;
        }
    }
}