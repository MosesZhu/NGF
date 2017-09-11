using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalNews
{
    /// <summary>
    /// Summary description for PortalNewsService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PortalNewsService : WebService
    {

        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetPortalNews
        /// <summary>
        /// 获取单个PortalNews
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public PortalNewsDTO GetPortalNews(Guid id)
        {
            PortalNewsBusiness portalNewsBusiness = new PortalNewsBusiness();
            var portalNewsDTO = portalNewsBusiness.GetPortalNews(id);

            return portalNewsDTO;
        }
        #endregion

        #region SavePortalNews
        /// <summary>
        /// 保存PortalNews
        /// </summary>
        /// <param name="portalNewsDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SavePortalNews(PortalNewsDTO portalNewsDTO, PageAction pageAction)
        {
            PortalNewsBusiness portalNewsBusiness = new PortalNewsBusiness();
            string result = portalNewsBusiness.SavePortalNews(portalNewsDTO, pageAction);

            return result;
        }
        #endregion

        #region DeletePortalNews
        /// <summary>
        /// 删除PortalNews
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeletePortalNews(Guid id)
        {
            PortalNewsBusiness portalNewsBusiness = new PortalNewsBusiness();
            string result = portalNewsBusiness.DeletePortalNews(id);

            return result;
        }
        #endregion
    }
}
