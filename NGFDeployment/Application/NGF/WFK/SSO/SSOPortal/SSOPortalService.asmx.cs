using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SSO.SSOPortal
{
    /// <summary>
    /// Summary description for SSOPortalService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SSOPortalService : WebService
    {
        #region Hello World
        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetSSOPortal
        /// <summary>
        /// 获取SSOPortal列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public SSOPortalDTO GetSSOPortal(Guid id)
        {
            SSOPortalBusiness ssoPortalBusiness = new SSOPortalBusiness();
            var ssoPortalDto = ssoPortalBusiness.GetSSOPortal(id);
            return ssoPortalDto;
        }
        #endregion

        #region GetAuthenticationTypeList
        /// <summary>
        /// 获取Authentication_Type列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<SSOPortalDTO> GetAuthenticationTypeList()
        {
            SSOPortalBusiness ssoPortalBusiness = new SSOPortalBusiness();
            var list = ssoPortalBusiness.GetAuthenticationTypeList().ToList();

            return list;
        }
        #endregion

        #region SaveSSOPortal

        /// <summary>
        /// 保存SSOPortal信息
        /// </summary>
        /// <param name="ssoPortalDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveSSOPortal(SSOPortalDTO ssoPortalDTO, PageAction pageAction)
        {
            SSOPortalBusiness ssoPortalBusiness = new SSOPortalBusiness();
            string result = ssoPortalBusiness.SaveSSOPortal(ssoPortalDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteSSOPortal
        /// <summary>
        /// delete SSOPortal by id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteSSOPortal(Guid id)
        {
            SSOPortalBusiness ssoPortalBusiness = new SSOPortalBusiness();
            string result = ssoPortalBusiness.DeleteSSOPortal(id);

            return result;
        }
        #endregion
    }
}
