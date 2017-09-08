using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.System1
{
    /// <summary>
    /// Summary description for GetBaseSystemList
    /// </summary>
    public class GetBaseSystemList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var baseSystemDTO = new BaseSystemDTO
            {
                Org_Id = pageParameterManager.GetGuid("Org_Id", Guid.Empty),
                Product_Id = pageParameterManager.GetGuid("Product_Id", Guid.Empty),
                Domain_Id = pageParameterManager.GetGuid("Domain_Id", Guid.Empty),
                Name = pageParameterManager.GetString("Name"),
                Description = pageParameterManager.GetString("Description"),
                System_Type = pageParameterManager.GetString("System_Type"),
                Instance_Name = pageParameterManager.GetString("Instance_Name"),
                Version = pageParameterManager.GetString("Version"),
                AdminRole = pageParameterManager.GetString("AdminRole"),
                Base_Url = pageParameterManager.GetString("Base_Url")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseSystemBusiness baseSystemBusiness = new BaseSystemBusiness();
            var result = baseSystemBusiness.GetBaseSystemList(baseSystemDTO, pageIndex, pageSize);

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