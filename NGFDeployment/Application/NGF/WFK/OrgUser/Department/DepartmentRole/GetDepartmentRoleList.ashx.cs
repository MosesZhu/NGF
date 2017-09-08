using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Department.DepartmentRole
{
    /// <summary>
    /// Summary description for GetDepartmentList
    /// </summary>
    public class GetDepartmentRoleList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var departmentId = pageParameterManager.GetRequiredGuid("departmentId");

            BaseRoleDepartmentBusiness baseRoleDepartmentBusiness = new BaseRoleDepartmentBusiness();
            var listBaseRoleDepartmentDTO = baseRoleDepartmentBusiness.GetDepartmentRoleList(departmentId);

            var serializer = EasyuiTreegridHelp.Serializer<BaseRoleDepartmentDTO>(listBaseRoleDepartmentDTO, null, "Role.Parent_Role_Id", string.Empty);

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