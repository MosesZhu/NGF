using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.PermissionDetail.FunctionPermission
{
    /// <summary>
    /// GetFunctionPermissionList 的摘要说明
    /// </summary>
    public class GetFunctionPermissionList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var basePermissionDTO = new BasePermissionDTO
            {
                Permission_Mode_Id = pageParameterManager.GetRequiredGuid("permissionModeId"),
                Subject_Category = pageParameterManager.GetRequiredString("subjectCategory"),
                Subject_Id = pageParameterManager.GetRequiredGuid("subjectId"),
                Resource_Org_Id = pageParameterManager.GetRequiredGuid("resourceOrgId"),
            };
            Guid systemId = pageParameterManager.GetRequiredGuid("systemId");

            BasePermissionBusiness basePermissionBusiness = new BasePermissionBusiness();
            var basePermissionFunctionDTOs = basePermissionBusiness.GetBasePermissionListForFunction(basePermissionDTO, systemId);

            var serializer = EasyuiTreegridHelp.Serializer<BasePermissionFunctionDTO>(basePermissionFunctionDTOs, null, "Parent_Function_Id", string.Empty);

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