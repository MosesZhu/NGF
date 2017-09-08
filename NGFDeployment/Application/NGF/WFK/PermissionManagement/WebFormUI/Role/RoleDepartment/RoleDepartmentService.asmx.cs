using System;
using System.Collections.Generic;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Role.RoleDepartment
{
    /// <summary>
    /// RoleDepartmentService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class RoleDepartmentService : WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region SaveBaseRoleDepartment
        [WebMethod(EnableSession=true)]
        public string SaveBaseRoleDepartment(BaseRoleDepartmentDTO roleDepartmentDTO)
        {
            BaseRoleDepartmentBusiness baseRoleDepartmentBusiness = new BaseRoleDepartmentBusiness();
            string result = baseRoleDepartmentBusiness.SaveBaseRoleDepartment(roleDepartmentDTO);

            return result;
        }

        [WebMethod(EnableSession = true)]
        public string SaveBaseRoleDepartments(Guid departmentId, List<BaseRoleDepartmentDTO> baseRoleDepartmentDTOSelected)
        {
            BaseRoleDepartmentBusiness baseRoleDepartmentBusiness = new BaseRoleDepartmentBusiness();
            string result = baseRoleDepartmentBusiness.SaveBaseRoleDepartments(departmentId, baseRoleDepartmentDTOSelected);
            return result;
        }
        #endregion

        #region DeleteBaseRoleDepartment
        /// <summary>
        /// delete Base_Role_Department by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string DeleteBaseRoleDepartment(Guid id)
        {
            BaseRoleDepartmentBusiness baseRoleDepartmentBusiness = new BaseRoleDepartmentBusiness();
            string result = baseRoleDepartmentBusiness.DeleteBaseRoleDepartment(id);

            return result;
        }
        #endregion
    }
}
