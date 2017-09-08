using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.DataPermission
{
    /// <summary>
    /// GetBaseDataPermissionList 的摘要说明
    /// </summary>
    public class GetBaseDataPermissionList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var baseDataPermissionDTO = new BaseDataPermissionDTO
            {
                Org_Id = pageParameterManager.GetGuid("Org_Id", Guid.Empty),
                Data_Source_Id = pageParameterManager.GetGuid("Data_Source_Id", Guid.Empty),
                Table_Id = pageParameterManager.GetGuid("Table_Id", Guid.Empty),
                //Data = pageParameterManager.GetString("Data"),
                Data_Id = pageParameterManager.GetGuid("Data_Id", Guid.Empty),
                Permission_Mode_Id = pageParameterManager.GetGuid("Permission_Mode_Id", Guid.Empty),
                Subject_Category = pageParameterManager.GetString("Subject_Category"),
                Subject_Id = pageParameterManager.GetGuid("Subject_Id", Guid.Empty),
                ValidDate = pageParameterManager.GetDateTime("ValidDate")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseDataPermissionBusiness baseDataPermissionBusiness = new BaseDataPermissionBusiness();
            var result = baseDataPermissionBusiness.GetBaseDataPermissionList(baseDataPermissionDTO, pageIndex, pageSize);

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