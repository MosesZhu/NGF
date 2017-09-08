using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Config.GlobalSetting
{
    /// <summary>
    /// Summary description for GetBaseConfigGlobalList
    /// </summary>
    public class GetBaseConfigGlobalList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var baseConfigGlobalDTO = new BaseConfigGlobalDTO
            {
                Key = pageParameterManager.GetString("Key"),
                Value = pageParameterManager.GetString("Value"),
                Org_Id = pageParameterManager.GetGuid("OrgId", Guid.Empty)
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseConfigGlobalBusiness baseConfigGlobalBusiness = new BaseConfigGlobalBusiness();
            var result = baseConfigGlobalBusiness.GetBaseConfigGlobalList(baseConfigGlobalDTO, pageIndex, pageSize);
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