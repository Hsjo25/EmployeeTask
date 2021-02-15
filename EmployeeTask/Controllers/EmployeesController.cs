using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EmployeeTask.Models;
using EmployeeTask.Helper;

using Newtonsoft.Json;

using EmployeeTask.Data;
namespace EmployeeTask.Controllers
{[Authorize]
    public class EmployeesController : Controller
    {
        EmpDb db = new EmpDb();

        // GET: Employees
        public ActionResult Index()
        {
     
            return View();
        }
        public JsonResult GetPaggedData(int pageNumber = 1, int pageSize =10)
        {
            List<Employee> listData = db.ListAll();
            var pagedData = Pagination.PagedResult(listData, pageNumber, pageSize);
            return Json(pagedData, JsonRequestBehavior.AllowGet);
        }
        public JsonResult List()
        {
            return Json(db.ListAll(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Employee emp)
        {
            return Json(db.AddEmp(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var Employee = db.ListAll().Find(x => x.EmpID.Equals(ID));
            return Json(Employee, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Employee emp)
        {
            return Json(db.Update(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(db.Delete(ID), JsonRequestBehavior.AllowGet);
        }
    }
}
