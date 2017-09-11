using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalLink
{
    /// <summary>
    /// Summary description for PortalLinkService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PortalLinkService : WebService
    {
        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetPositionList
        /// <summary>
        /// 获取Position列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetPositionList()
        {
            PortalLinkBusiness portalLinkBusiness = new PortalLinkBusiness();
            var positions = portalLinkBusiness.GetPositionList().ToList();

            return positions;
        }
        #endregion

        #region GetPortalLink
        /// <summary>
        /// 获取单个PortalLink
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public PortalLinkDTO GetPortalLink(Guid id)
        {
            PortalLinkBusiness portalLinkBusiness = new PortalLinkBusiness();
            var portalLinkDTO = portalLinkBusiness.GetPortalLink(id);

            return portalLinkDTO;
        }
        #endregion

        #region SavePortalLink
        /// <summary>
        /// 保存PortalLink
        /// </summary>
        /// <param name="portalLinkDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SavePortalLink(PortalLinkDTO portalLinkDTO, PageAction pageAction)
        {
            PortalLinkBusiness portalLinkBusiness = new PortalLinkBusiness();
            string result = portalLinkBusiness.SavePortalLink(portalLinkDTO, pageAction);

            return result;
        }
        #endregion

        #region DeletePortalLink
        /// <summary>
        /// 删除PortalLink
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeletePortalLink(Guid id)
        {
            PortalLinkBusiness portalLinkBusiness = new PortalLinkBusiness();
            string result = portalLinkBusiness.DeletePortalLink(id);

            return result;
        }
        #endregion
    }
}
