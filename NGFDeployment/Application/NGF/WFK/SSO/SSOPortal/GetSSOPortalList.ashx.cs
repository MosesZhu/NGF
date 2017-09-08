using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SSO.SSOPortal
{
    /// <summary>
    /// Summary description for GetSSOPortalList
    /// </summary>
    public class GetSSOPortalList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            var ssoPortalDTO = new SSOPortalDTO
            {
                Org_Id = PageParameterManager.Default.GetGuid("OrgId", Guid.Empty),
                Product_Id = PageParameterManager.Default.GetGuid("ProductId", Guid.Empty),
                Authentication_Type = PageParameterManager.Default.GetInt32("AuthenticationType", 0)
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            SSOPortalBusiness ssoPortalBusiness = new SSOPortalBusiness();
            var result = ssoPortalBusiness.GetSSOPortalList(ssoPortalDTO, pageIndex, pageSize);

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