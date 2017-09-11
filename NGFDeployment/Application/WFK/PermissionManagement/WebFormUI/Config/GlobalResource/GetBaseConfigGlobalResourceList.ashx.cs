using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Config.GlobalResource
{
    /// <summary>
    /// Summary description for GetBaseConfigGlobalResourceList
    /// </summary>
    public class GetBaseConfigGlobalResourceList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var baseConfigGlobalResourceDTO = new BaseConfigGlobalResourceDTO
            {
                Key = pageParameterManager.GetString("Key"),
                Value = pageParameterManager.GetString("Value"),
                Type = pageParameterManager.GetString("Type"),
                Position = pageParameterManager.GetString("Position")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseConfigGlobalResourceBusiness baseConfigGlobaResourceBusiness = new BaseConfigGlobalResourceBusiness();
            var result = baseConfigGlobaResourceBusiness.GetBaseConfigGlobalResourceList(baseConfigGlobalResourceDTO, pageIndex, pageSize);
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