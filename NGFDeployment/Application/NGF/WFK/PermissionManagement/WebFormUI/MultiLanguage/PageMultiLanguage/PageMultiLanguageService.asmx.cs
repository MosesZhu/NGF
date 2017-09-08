using System.Collections.Generic;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.PageMultiLanguage
{
    /// <summary>
    /// PageMultiLanguageService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class PageMultiLanguageService : System.Web.Services.WebService
    {
        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion return "Hello World";

        #region MyRegion
        [WebMethod(EnableSession = true)]
        public List<string> GetSystemList(string productName)
        {
            BaseMultiLanguagePageBusiness baseMultiLanguagePageBusiness = new BaseMultiLanguagePageBusiness();
            List<string> listSystemName = baseMultiLanguagePageBusiness.GetSystemList(productName);
            return listSystemName;
        }
        #endregion

        #region SavePageMultiLanguage
        [WebMethod(EnableSession = true)]
        public string SavePageMultiLanguage(List<BaseMultiLanguagePageDTO> listBaseMultiLanguagePageDTO)
        {
            BaseMultiLanguagePageBusiness baseMultiLanguagePageBusiness = new BaseMultiLanguagePageBusiness();
            string result = baseMultiLanguagePageBusiness.SavePageMultiLanguage(listBaseMultiLanguagePageDTO);
            return result;
        }
        #endregion

        #region DeletePageMultiLanguage
        [WebMethod(EnableSession = true)]
        public string DeletePageMultiLanguage(string productName, string systemName, string className)
        {
            BaseMultiLanguagePageBusiness baseMultiLanguagePageBusiness = new BaseMultiLanguagePageBusiness();
            string result = baseMultiLanguagePageBusiness.DeletePageMultiLanguage(productName, systemName, className);
            return result;
        }
        #endregion

        #region ImportPageMultiLanguage
        [WebMethod(EnableSession = true)]
        public string ImportPageMultiLanguage(string fileName)
        {
            string localPath = Server.MapPath("~/Temporary/" + fileName);
            BaseMultiLanguagePageBusiness baseMultiLanguagePageBusiness = new BaseMultiLanguagePageBusiness();
            string result = baseMultiLanguagePageBusiness.Import(localPath);
            return result;
        }
        #endregion
    }
}
