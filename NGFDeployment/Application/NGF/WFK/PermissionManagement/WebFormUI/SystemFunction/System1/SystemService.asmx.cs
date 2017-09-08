using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.SSO.Session;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.System1
{
    /// <summary>
    /// Summary description for SystemService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SystemService : WebService
    {
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetSystemTypeList
        /// <summary>
        /// 取得SystemType列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetSystemTypeList()
        {
            BaseSystemBusiness baseSystemBusiness = new BaseSystemBusiness();
            var systemTypes = baseSystemBusiness.GetSystemTypeList().ToList();

            return systemTypes;
        }
        #endregion

        #region GetSystemList
        /// <summary>
        /// 取得System列表
        /// </summary>
        /// <param name="orgId">orgId</param>
        ///  <param name="domainId">domainId</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public IList<BaseSystemDTO> GetSystemList(Guid orgId, Guid domainId)
        {
            BaseSystemBusiness baseSystemBusiness = new BaseSystemBusiness();
            var baseSystemDTOs = baseSystemBusiness.GetBaseSystemList(new BaseSystemDTO { Org_Id = orgId, Domain_Id = domainId }, 1, int.MaxValue);
            return baseSystemDTOs.Results;
        }
        #endregion

        #region GetSystem
        /// <summary>
        /// 取得System列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseSystemDTO GetSystem(Guid id)
        {
            BaseSystemBusiness baseSystemBusiness = new BaseSystemBusiness();
            var baseSystemDto = baseSystemBusiness.GetBaseSystem(id);

            return baseSystemDto;
        }
        #endregion

        #region SaveBaseSystem
        /// <summary>
        /// 保存BaseSystem信息
        /// </summary>
        /// <param name="baseSystemDTO"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseSystem(BaseSystemDTO baseSystemDTO, PageAction pageAction)
        {
            BaseSystemBusiness baseSystemBusiness = new BaseSystemBusiness();
            string result = baseSystemBusiness.SaveBaseSystem(baseSystemDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseSystem
        /// <summary>
        /// delete BaseSystem by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseSystem(Guid id)
        {
            BaseSystemBusiness baseSystemBusiness = new BaseSystemBusiness();
            string result = baseSystemBusiness.DeleteBaseSystem(id);

            return result;
        }
        #endregion

        #region IsCurrentUserSystemAdmin
        /// <summary>
        /// 验证当前登录用户是否是系统管理员
        /// </summary>
        /// <param name="systemId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public bool IsCurrentUserSystemAdmin(Guid systemId)
        {
            BaseSystemBusiness baseSystemBusiness = new BaseSystemBusiness();
            bool isSystemAdmin = baseSystemBusiness.IsSystemAdmin(systemId, SSOContext.Current.UserID);
            return isSystemAdmin;
        }
        #endregion

        #region GetSystemXml
        [WebMethod(EnableSession = true)]
        public string GetSystemXml(List<BaseSystemDTO> listBaseSystemDTO)
        {
            BaseSystemBusiness baseSystemBusiness = new BaseSystemBusiness();
            return baseSystemBusiness.GetSystemXml(listBaseSystemDTO);
        }
        #endregion

        #region ImportSystem
        [WebMethod(EnableSession = true)]
        public Dictionary<string, List<string>> ImportSystem(List<BaseSystemDTO> listBaseSystemDTO)
        {
            BaseSystemBusiness baseSystemBusiness = new BaseSystemBusiness();
            return baseSystemBusiness.ImportSystem(listBaseSystemDTO);
        }
        #endregion
    }
}
