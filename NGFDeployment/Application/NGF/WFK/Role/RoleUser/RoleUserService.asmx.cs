using System;
using System.Collections.Generic;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Role.RoleUser
{
    /// <summary>
    /// RoleUserService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class RoleUserService : WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetBaseRoleUser
        /// <summary>
        /// 取得RoleUser
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseRoleUserDTO GetBaseRoleUser(Guid roleId, Guid userId)
        {
            BaseRoleUserBusiness baseRoleUserBusiness = new BaseRoleUserBusiness();
            var baseRoleUserDto = baseRoleUserBusiness.GetBaseRoleUser(roleId, userId);

            return baseRoleUserDto;
        }
        #endregion

        #region SaveBaseRoleUser
        [WebMethod(EnableSession=true)]
        public string SaveBaseRoleUser(BaseRoleUserDTO roleUserDTO, PageAction pageAction)
        {
            BaseRoleUserBusiness baseRoleUserBusiness = new BaseRoleUserBusiness();
            string result = baseRoleUserBusiness.SaveBaseRoleUser(roleUserDTO, pageAction);

            return result;
        }

        [WebMethod(EnableSession=true)]
        public string SaveBaseRoleUsers(Guid userId,List<BaseRoleUserDTO> baseRoleUserDTOSelected)
        {
            BaseRoleUserBusiness baseRoleUserBusiness = new BaseRoleUserBusiness();
            string result = baseRoleUserBusiness.SaveBaseRoleUsers(userId, baseRoleUserDTOSelected);

            return result;
        }
        #endregion

        #region DeleteBaseRoleUser
        /// <summary>
        /// delete Base_Role_User by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string DeleteBaseRoleUser(Guid id)
        {
            BaseRoleUserBusiness baseRoleUserBusiness = new BaseRoleUserBusiness();
            string result = baseRoleUserBusiness.DeleteBaseRoleUser(id);

            return result;
        }
        #endregion
    }
}
