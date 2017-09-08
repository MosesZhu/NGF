using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalNews
{
    /// <summary>
    /// Summary description for GetPortalNewsList
    /// </summary>
    public class GetPortalNewsList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var portalNewsDTO = new PortalNewsDTO
            {
                Org_Id = pageParameterManager.GetGuid("OrgId", Guid.Empty),
                Product_Id = pageParameterManager.GetGuid("ProductId", Guid.Empty),
                Subject = pageParameterManager.GetString("Subject"),
                Post_User_Id = pageParameterManager.GetGuid("PostUserId", Guid.Empty),
                Due_Date_From = pageParameterManager.GetDateTime("DueDateFrom"),
                Due_Date_To = pageParameterManager.GetDateTime("DueDateTo")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            PortalNewsBusiness portalNewsBusiness = new PortalNewsBusiness();
            var result = portalNewsBusiness.GetPortalNewsList(portalNewsDTO, pageIndex, pageSize);

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