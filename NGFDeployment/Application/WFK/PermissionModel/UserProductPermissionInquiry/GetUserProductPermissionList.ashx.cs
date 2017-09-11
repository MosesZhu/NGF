using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.UserProductPermissionInquiry
{
    /// <summary>
    /// Summary description for GetUserProductPermissionList
    /// </summary>
    public class GetUserProductPermissionList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            CacheUserProductPermissionDTO cacheUserProductPermissionDTO = new CacheUserProductPermissionDTO
            {
                Org_Id = pageParameterManager.GetGuid("OrgId", Guid.Empty),
                Product_Id = pageParameterManager.GetGuid("ProductId", Guid.Empty),
                Permission_Mode_Id = pageParameterManager.GetGuid("PermissionModeId", Guid.Empty),
                User_Id = pageParameterManager.GetGuid("UserId", Guid.Empty),
                Domain_Id = pageParameterManager.GetGuid("DomainId", Guid.Empty),
                System_Id = pageParameterManager.GetGuid("SystemId", Guid.Empty)
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            CacheUserProductPermissionBusiness cacheUserProductPermissionBusiness = new CacheUserProductPermissionBusiness();
            var result = cacheUserProductPermissionBusiness.GetCacheUserProductPermissionList(cacheUserProductPermissionDTO, pageIndex, pageSize);
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