using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SSO.SSOSession
{
    /// <summary>
    /// Summary description for SSOSessionService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SSOSessionService : System.Web.Services.WebService
    {
        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetSessionTypeList
        /// <summary>
        /// 获取Session Type列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetSessionTypeList()
        {
            SSOSessionBusiness ssoSessionBusiness = new SSOSessionBusiness();
            var listSessionType = ssoSessionBusiness.GetSessionTypeList().ToList();
            return listSessionType;
        }
        #endregion

        #region GetSessionStatusList
        /// <summary>
        /// 获取Session Status列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetSessionStatusList()
        {
            SSOSessionBusiness ssoSessionBusiness = new SSOSessionBusiness();
            var listSessionStatus = ssoSessionBusiness.GetSessionStatusList().ToList();
            return listSessionStatus;
        }
        #endregion

        #region GetSSOSession
        /// <summary>
        /// 根据Id获取单个SSOSession
        /// </summary>
        /// <param name="ssoSessionId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public SSOSessionDTO GetSSOSession(Guid ssoSessionId)
        {
            SSOSessionBusiness ssoSessionBusiness = new SSOSessionBusiness();
            SSOSessionDTO ssoSessionDTO = ssoSessionBusiness.GetSSOSession(ssoSessionId);
            return ssoSessionDTO;
        }
        #endregion

        #region CloseSSOSession
        /// <summary>
        /// 将Status为Active的置为Killed
        /// </summary>
        /// <param name="ssoSessionId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string CloseSSOSession(Guid ssoSessionId)
        {
            SSOSessionBusiness ssoSessionBusiness = new SSOSessionBusiness();
            string result = ssoSessionBusiness.CloseSSOSession(ssoSessionId);
            return result;
        }
        #endregion

        #region BatchCloseSSOSession
        /// <summary>
        /// 批量Close SSOSession
        /// </summary>
        /// <param name="listSSOSessionId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string BatchCloseSSOSession(List<Guid> listSSOSessionId)
        {
            SSOSessionBusiness ssoSessionBusiness = new SSOSessionBusiness();
            string result = ssoSessionBusiness.BatchCloseSSOSession(listSSOSessionId);
            return result;
        }
        #endregion
    }
}
