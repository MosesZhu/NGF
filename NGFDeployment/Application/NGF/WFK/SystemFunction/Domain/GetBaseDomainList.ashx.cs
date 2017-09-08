using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Domain
{
    /// <summary>
    /// Summary description for GetBaseDomainList
    /// </summary>
    public class GetBaseDomainList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var baseDomainDTO = new BaseDomainDTO
            {
                Product_Id = pageParameterManager.GetGuid("Product_Id", Guid.Empty),
                Name = pageParameterManager.GetString("Name"),
                Description = pageParameterManager.GetString("Description")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseDomainBusiness baseDomainBusiness = new BaseDomainBusiness();
            var result = baseDomainBusiness.GetBaseDomainList(baseDomainDTO, pageIndex, pageSize);

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