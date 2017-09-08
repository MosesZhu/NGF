using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SSO.SSOSession
{
    /// <summary>
    /// Summary description for GetSSOSessionList
    /// </summary>
    public class GetSSOSessionList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var ssoSessionDTO = new SSOSessionDTO
            {
                Org_Id = pageParameterManager.GetGuid("OrgId", Guid.Empty),
                Product_Id = pageParameterManager.GetGuid("ProductId", Guid.Empty),
                Domain = pageParameterManager.GetString("Domain"),
                User_Id = pageParameterManager.GetGuid("UserId", Guid.Empty),
                Session_Type = pageParameterManager.GetString("SessionType"),
                Status = pageParameterManager.GetString("Status")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            SSOSessionBusiness ssoSessionBusiness = new SSOSessionBusiness();
            var result = ssoSessionBusiness.GetSSOSessionList(ssoSessionDTO, pageIndex, pageSize);
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