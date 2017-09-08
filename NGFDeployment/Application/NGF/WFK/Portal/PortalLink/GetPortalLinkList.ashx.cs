using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalLink
{
    /// <summary>
    /// Summary description for GetPortalLinkList
    /// </summary>
    public class GetPortalLinkList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var portalLinkDTO = new PortalLinkDTO
            {
                Org_Id = pageParameterManager.GetGuid("OrgId", Guid.Empty),
                Product_Id = pageParameterManager.GetGuid("ProductId", Guid.Empty),
                Position = pageParameterManager.GetString("Position"),
                Name = pageParameterManager.GetString("Name"),
                Target = pageParameterManager.GetString("Target"),
                Description = pageParameterManager.GetString("Description"),
                Sort_Code = pageParameterManager.GetInt32("SortCode", -1)
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            PortalLinkBusiness portalLinkBusiness = new PortalLinkBusiness();
            var result = portalLinkBusiness.GetPortalLinkList(portalLinkDTO, pageIndex, pageSize);

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