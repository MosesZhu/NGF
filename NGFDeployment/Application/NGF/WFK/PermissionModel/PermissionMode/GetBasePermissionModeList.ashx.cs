using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.PermissionMode
{
    /// <summary>
    /// Summary description for GetBasePermissionModeList
    /// </summary>
    public class GetBasePermissionModeList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var basePermissionModeDTO = new BasePermissionModeDTO
            {
                Org_Id = pageParameterManager.GetGuid("Org_Id", Guid.Empty),
                Product_Id = pageParameterManager.GetGuid("Product_Id", Guid.Empty),
                Name = pageParameterManager.GetString("Name"),
                Description = pageParameterManager.GetString("Description"),
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BasePermissionModeBusiness basePermissionModeBusiness = new BasePermissionModeBusiness();
            var result = basePermissionModeBusiness.GetBasePermissionModeList(basePermissionModeDTO, pageIndex, pageSize);

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