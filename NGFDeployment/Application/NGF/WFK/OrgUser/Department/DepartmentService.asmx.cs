using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Department
{
    /// <summary>
    /// DepartmentService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class DepartmentService : WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetDepartmentLevelList
        /// <summary>
        /// 取得Department Level列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<int> GetDepartmentLevelList()
        {
            BaseDepartmentBusiness baseDepartmentBusiness = new BaseDepartmentBusiness();
            var levels = baseDepartmentBusiness.GetDepartmentLevelList().ToList();

            return levels;
        }
        #endregion

        #region GetDepartment
        /// <summary>
        /// 取得Department列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public BaseDepartmentDTO GetDepartment(Guid id)
        {
            BaseDepartmentBusiness baseDepartmentBusiness = new BaseDepartmentBusiness();
            var baseDepartmentDto = baseDepartmentBusiness.GetBaseDepartment(id);

            return baseDepartmentDto;
        }
        #endregion
    }
}
