using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.Permission
{
    /// <summary>
    /// Summary description for PermissionService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PermissionService : WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetSubjectCategoryList
        /// <summary>
        /// 取得SubjectCategory列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<string> GetSubjectCategoryList()
        {
            BasePermissionBusiness basePermissionBusiness = new BasePermissionBusiness();
            var subjectCategorys = basePermissionBusiness.GetSubjectCategoryList().ToList();

            return subjectCategorys;
        }
        #endregion

        #region GetResourceCategoryList
        /// <summary>
        /// 取得ResourceCategory列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<string> GetResourceCategoryList()
        {
            BasePermissionBusiness basePermissionBusiness = new BasePermissionBusiness();
            var resourceCategorys = basePermissionBusiness.GetResourceCategoryList().ToList();

            return resourceCategorys;
        }
        #endregion

        #region GetPermission
        /// <summary>
        /// 取得Permission列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public BasePermissionDTO GetBasePermission(Guid id)
        {
            BasePermissionBusiness basePermissionBusiness = new BasePermissionBusiness();
            var basePermissionDto = basePermissionBusiness.GetBasePermission(id);

            return basePermissionDto;
        }
        #endregion

        #region InsertBasePermission

        /// <summary>
        /// 插入BasePermission信息
        /// </summary>
        /// <param name="basePermissionDTO"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string InsertBasePermission(BasePermissionDTO basePermissionDTO)
        {
            BasePermissionBusiness basePermissionBusiness = new BasePermissionBusiness();
            string result = basePermissionBusiness.InsertBasePermission(basePermissionDTO);

            return result;
        }
        #endregion

        #region UpdateBasePermission

        /// <summary>
        /// 更新BasePermission信息
        /// </summary>
        /// <param name="basePermissionDTO"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string UpdateBasePermission(BasePermissionDTO basePermissionDTO)
        {
            BasePermissionBusiness basePermissionBusiness = new BasePermissionBusiness();
            string result = basePermissionBusiness.UpdateBasePermission(basePermissionDTO);

            return result;
        }
        #endregion

        #region SavePermissionFunction
        /// <summary>
        /// SavePermissionFunction
        /// </summary>
        /// <param name="basePermissionDTO"></param>
        /// <param name="systemId"></param>
        /// <param name="basePermissionFunctionDTOs"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string SavePermissionFunction(BasePermissionDTO basePermissionDTO, string systemId, List<BasePermissionFunctionDTO> basePermissionFunctionDTOs)
        {
            BasePermissionBusiness basePermissionBusiness = new BasePermissionBusiness();
            string result = basePermissionBusiness.SavePermissionFunction(basePermissionDTO, systemId, basePermissionFunctionDTOs);

            return result;
        }
        #endregion

        #region DeleteBasePermission
        /// <summary>
        /// delete BasePermission by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string DeleteBasePermission(Guid id)
        {
            BasePermissionBusiness basePermissionBusiness = new BasePermissionBusiness();
            string result = basePermissionBusiness.DeleteBasePermission(id);

            return result;
        }
        #endregion
    }
}
