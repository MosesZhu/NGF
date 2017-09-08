using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalHomePage
{
    /// <summary>
    /// Summary description for PortalHomePageService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PortalHomePageService : System.Web.Services.WebService
    {

        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetPortalFavoritList
        [WebMethod(EnableSession = true)]
        public List<PortalFavoritDTO> GetPortalFavoritList()
        {
            PortalFavoritBusiness portalFavoritBusiness = new PortalFavoritBusiness();
            var listPortalFavorit = portalFavoritBusiness.GetPortalFavoritList();
            return listPortalFavorit;
        }
        #endregion

        #region GetPortalNewsDetail
        [WebMethod(EnableSession = true)]
        public PortalNewsDTO GetPortalNewsDetail(Guid newsId)
        {
            PortalNewsBusiness portalNewsBusiness = new PortalNewsBusiness();
            PortalNewsDTO portalNewsDTO = portalNewsBusiness.GetPortalNewsDetail(newsId);
            return portalNewsDTO;
        }
        #endregion

        [WebMethod(EnableSession = true)]
        public string InsertNewsStatus(PortalNewsStatusDTO portalNewsStatusDTO)
        {
            PortalNewsBusiness portalNewsBusiness = new PortalNewsBusiness();
            string result = portalNewsBusiness.InsertNewsStatus(portalNewsStatusDTO);
            return result;
        }

        [WebMethod(EnableSession = true)]
        public string UpdateFavorite(List<PortalFavoritDTO> listPortalFavoritDTO)
        {
            PortalFavoritBusiness portalFavoritBusiness = new PortalFavoritBusiness();
            string result = portalFavoritBusiness.UpdateFavorite(listPortalFavoritDTO);
            return result;
        }

        [WebMethod(EnableSession = true)]
        public string DeleteFavoirte(Guid favoriteId)
        {
            PortalFavoritBusiness portalFavoritBusiness = new PortalFavoritBusiness();
            string result = portalFavoritBusiness.DeleteFavorite(favoriteId);
            return result;
        }
    }
}
