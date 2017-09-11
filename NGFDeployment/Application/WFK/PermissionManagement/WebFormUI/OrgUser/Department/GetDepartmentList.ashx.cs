using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Department
{
    /// <summary>
    /// GetDepartmentList 的摘要说明
    /// </summary>
    public class GetDepartmentList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var baseDepartmentDTO = new BaseDepartmentDTO
            {
                Org_Id = pageParameterManager.GetGuid("Org_Id", Guid.Empty),
                Parent_Deptartment_Code = pageParameterManager.GetString("Parent_Deptartment_Code"),
                Department_Code = pageParameterManager.GetString("Department_Code"),
                Department_Name = pageParameterManager.GetString("Department_Name"),
                Real_Name = pageParameterManager.GetString("Real_Name"),
                Description = pageParameterManager.GetString("Description"),
                Level = pageParameterManager.GetInt32("Level"),
                ManagerName = pageParameterManager.GetString("ManagerName"),
                Is_Virtual_Department = pageParameterManager.GetInt32("Is_Virtual_Department")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseDepartmentBusiness baseDepartmentBusiness = new BaseDepartmentBusiness();
            var result = baseDepartmentBusiness.GetBaseDepartmentList(baseDepartmentDTO, pageIndex, pageSize);

            var serializer = EasyuiDataGridHelp.Serializer(result.RowCount, result.Results, null);

            context.Response.ContentType = "text/plain";
            context.Response.Write(serializer);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}