using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.PermissionDetail.SensitiveColumnPermission
{
    /// <summary>
    /// GetSensitiveColumnPermissionList 的摘要说明
    /// </summary>
    public class GetSensitiveColumnPermissionList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var basePermissionDTO = new BasePermissionDTO
            {
                Permission_Mode_Id = pageParameterManager.GetRequiredGuid("permissionModeId"),
                Subject_Category = pageParameterManager.GetRequiredString("subjectCategory"),
                Subject_Id = pageParameterManager.GetRequiredGuid("subjectId")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BasePermissionBusiness basePermissionBusiness = new BasePermissionBusiness();
            var result = basePermissionBusiness.GetBasePermissionListForSensitiveColumn(basePermissionDTO, pageIndex, pageSize);

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