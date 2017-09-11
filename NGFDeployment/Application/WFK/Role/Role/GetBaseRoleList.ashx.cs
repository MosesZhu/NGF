using System.Collections.Generic;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Role.Role
{
    /// <summary>
    /// Summary description for GetBaseOrgList
    /// </summary>
    public class GetBaseRoleList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var roleType = pageParameterManager.GetString("RoleType");
            var roleName = pageParameterManager.GetString("RoleName");
            var description = pageParameterManager.GetString("Description");

            BaseRoleBusiness baseRoleBusiness = new BaseRoleBusiness();
            IList<BaseRoleDTO> roleTree = baseRoleBusiness.GetRoleTree(roleType, roleName, description);

            var serializer = EasyuiTreegridHelp.Serializer<BaseRoleDTO>(roleTree, null, "Parent_Role_Id", string.Empty);

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