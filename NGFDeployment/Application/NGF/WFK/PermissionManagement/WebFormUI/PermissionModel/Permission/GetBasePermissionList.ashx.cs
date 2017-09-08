using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.Permission
{
    /// <summary>
    /// Summary description for GetBasePermissionList
    /// </summary>
    public class GetBasePermissionList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var basePermissionDTO = new BasePermissionDTO
            {
                Permission_Mode_Id = pageParameterManager.GetGuid("Permission_Mode_Id", Guid.Empty),
                Subject_Category = pageParameterManager.GetString("Subject_Category"),
                Subject_Id = pageParameterManager.GetGuid("Subject_Id", Guid.Empty),
                Subject_Name = pageParameterManager.GetString("Subject_Name"),
                Resource_Org_Id = pageParameterManager.GetGuid("Resource_Org_Id", Guid.Empty),
                Resource_Category = pageParameterManager.GetString("Resource_Category"),
                Resource_Id = pageParameterManager.GetGuid("Resource_Id", Guid.Empty),
                Resource_Name = pageParameterManager.GetString("Resource_Name"),
                Name = pageParameterManager.GetString("Name"),
                Description = pageParameterManager.GetString("Description"),
                Product_Id = pageParameterManager.GetGuid("Product_Id",Guid.Empty),
                Domain_Id = pageParameterManager.GetGuid("Domain_Id",Guid.Empty),
                System = pageParameterManager.GetString("System"),
                Function = pageParameterManager.GetString("Function"),
                DataSource = pageParameterManager.GetString("DataSource"),
                Datatable = pageParameterManager.GetString("Datatable")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BasePermissionBusiness basePermissionBusiness = new BasePermissionBusiness();
            var result = basePermissionBusiness.GetBasePermissionList(basePermissionDTO, pageIndex, pageSize);

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