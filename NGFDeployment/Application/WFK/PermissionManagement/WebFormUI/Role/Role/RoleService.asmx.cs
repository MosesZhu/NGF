using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Role.Role
{
    /// <summary>
    /// Summary description for RoleService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class RoleService : WebService
    {
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetRoleTypeList
        /// <summary>
        /// 取得Site列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetRoleTypeList()
        {
            BaseRoleBusiness baseRoleBusiness = new BaseRoleBusiness();
            var roleTypes = baseRoleBusiness.GetRoleTyleList().ToList();

            return roleTypes;
        }
        #endregion

        #region GetUserPropertyDatatypeList
        /// <summary>
        /// 取得用户权限数据类型(UserPropertyDatatype)列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetUserPropertyDatatypeList()
        {
            BaseRoleBusiness baseRoleBusiness = new BaseRoleBusiness();
            var propertyDatatypes = baseRoleBusiness.GetUserPropertyDatatypeList().ToList();

            return propertyDatatypes;
        }
        #endregion

        #region GetRole
        /// <summary>
        /// 取得Role
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseRoleDTO GetRole(Guid id)
        {
            BaseRoleBusiness baseRoleBusiness = new BaseRoleBusiness();
            var baseRoleDto = baseRoleBusiness.GetBaseRole(id);

            return baseRoleDto;
        }
        #endregion

        #region IsCurrentUserProductAdmin
        [WebMethod(EnableSession = true)]
        public bool IsCurrentUserProductAdmin()
        {
            BaseProductBusiness baseProductBusiness = new BaseProductBusiness();
            bool result = baseProductBusiness.IsCurrentUserProductAdmin();
            return result;
        }
        #endregion

        #region SaveBaseRole
        [WebMethod(EnableSession = true)]
        public string SaveBaseRole(BaseRoleDTO roleDTO, PageAction pageAction)
        {
            BaseRoleBusiness baseRoleBusiness = new BaseRoleBusiness();
            string result = baseRoleBusiness.SaveBaseRole(roleDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseRole
        /// <summary>
        /// delete BaseRole by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseRole(Guid id)
        {
            BaseRoleBusiness baseRoleBusiness = new BaseRoleBusiness();
            string result = baseRoleBusiness.DeleteBaseRole(id);

            return result;
        }

        #endregion

        #region GetRoleXml
        [WebMethod(EnableSession = true)]
        public string GetRoleXml(List<BaseRoleDTO> listBaseRoleDTO)
        {
            BaseRoleBusiness baseRoleBusiness = new BaseRoleBusiness();
            return baseRoleBusiness.GetRoleXml(listBaseRoleDTO);
        }
        #endregion

        #region ImportRole
        [WebMethod(EnableSession = true)]
        public Dictionary<string, List<string>> ImportRole(List<BaseRoleDTO> listBaseRoleDTO)
        {
            BaseRoleBusiness baseRoleBusiness = new BaseRoleBusiness();
            return baseRoleBusiness.ImportRole(listBaseRoleDTO);
        }
        #endregion
    }
}
