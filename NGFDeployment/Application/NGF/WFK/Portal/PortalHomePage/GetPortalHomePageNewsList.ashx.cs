using System.Web;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using System.Web.SessionState;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalHomePage
{
    /// <summary>
    /// Summary description for GetPortalHomePageNewsList
    /// </summary>
    public class GetPortalHomePageNewsList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            PortalNewsBusiness portalNewsBusiness = new PortalNewsBusiness();
            var result = portalNewsBusiness.GetPortalHomePageNewsList(pageIndex, pageSize);
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