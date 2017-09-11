using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.PermissionMode
{
    /// <summary>
    /// Summary description for PermissionModeService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PermissionModeService : WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetBasePermissionModeList
        /// <summary>
        /// 取得PermissionMode列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<BasePermissionModeDTO> GetBasePermissionModeList()
        {
            BasePermissionModeBusiness basePermissionModeBusiness = new BasePermissionModeBusiness();
            var basePermissionModeDTOs = basePermissionModeBusiness.GetBasePermissionModeList(new BasePermissionModeDTO(), 1, int.MaxValue);

            return basePermissionModeDTOs.Results.ToList();
        }

        /// <summary>
        /// 取得默认PermissionMode
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<BasePermissionModeDTO> GetBasePermissionModeListByOrgProduct(BasePermissionModeDTO basePermissionModeDTO)
        {
            BasePermissionModeBusiness basePermissionModeBusiness = new BasePermissionModeBusiness();
            var basePermissionModeDTOs = basePermissionModeBusiness.GetBasePermissionModeList(basePermissionModeDTO, 1, int.MaxValue);

            return basePermissionModeDTOs.Results.ToList();
        }
        #endregion

        #region GetPermissionMode
        /// <summary>
        /// 取得PermissionMode DTO
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public BasePermissionModeDTO GetBasePermissionMode(Guid id)
        {
            BasePermissionModeBusiness basePermissionModeBusiness = new BasePermissionModeBusiness();
            var basePermissionModeDto = basePermissionModeBusiness.GetBasePermissionMode(id);

            return basePermissionModeDto;
        }
        #endregion

        #region GetPermissionMode
        /// <summary>
        /// 取得默认PermissionMode
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public BasePermissionModeDTO GetDefaultBasePermissionMode(BasePermissionModeDTO basePermissionModeDTO)
        {
            BasePermissionModeBusiness basePermissionModeBusiness = new BasePermissionModeBusiness();
            var basePermissionModeDto = basePermissionModeBusiness.GetDefaultBasePermissionMode(basePermissionModeDTO);

            return basePermissionModeDto;
        }
        #endregion

        #region SaveBasePermissionMode

        /// <summary>
        /// 保存BasePermissionMode信息
        /// </summary>
        /// <param name="basePermissionModeDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string SaveBasePermissionMode(BasePermissionModeDTO basePermissionModeDTO, PageAction pageAction)
        {
            BasePermissionModeBusiness basePermissionModeBusiness = new BasePermissionModeBusiness();
            string result = basePermissionModeBusiness.SaveBasePermissionMode(basePermissionModeDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteBasePermissionMode
        /// <summary>
        /// delete BasePermissionMode by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string DeleteBasePermissionMode(Guid id)
        {
            BasePermissionModeBusiness basePermissionModeBusiness = new BasePermissionModeBusiness();
            string result = basePermissionModeBusiness.DeleteBasePermissionMode(id);

            return result;
        }
        #endregion
    }
}
