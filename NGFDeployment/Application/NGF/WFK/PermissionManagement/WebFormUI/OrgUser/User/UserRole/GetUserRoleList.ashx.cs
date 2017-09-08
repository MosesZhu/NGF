using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.User.UserRole
{
    /// <summary>
    /// GetUserRoleList 的摘要说明
    /// </summary>
    public class GetUserRoleList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var userId = pageParameterManager.GetRequiredGuid("UserId");

            BaseRoleUserBusiness baseRoleUserBusiness = new BaseRoleUserBusiness();
            var listBaseRoleUserDTO = baseRoleUserBusiness.GetUserRoleList(userId);

            var serializer = EasyuiTreegridHelp.Serializer<BaseRoleUserDTO>(listBaseRoleUserDTO, null, "Role.Parent_Role_Id", string.Empty);

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