using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemMaintenance.SystemGroup
{
    /// <summary>
    /// Summary description for GetSystemGroupList
    /// </summary>
    public class GetSystemGroupList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            var baseSystemGroupDTO = new BaseSystemGroupDTO
            {
                Org_Id = PageParameterManager.Default.GetGuid("OrgId", Guid.Empty),
                Product_Id = PageParameterManager.Default.GetGuid("ProductId", Guid.Empty)
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseSystemGroupBusiness baseSystemGroupBusiness = new BaseSystemGroupBusiness();
            var result = baseSystemGroupBusiness.GetSystemGroupList(baseSystemGroupDTO, pageIndex, pageSize);

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