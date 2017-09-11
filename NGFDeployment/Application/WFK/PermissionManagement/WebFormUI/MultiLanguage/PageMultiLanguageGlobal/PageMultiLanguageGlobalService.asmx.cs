using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.PageMultiLanguageGlobal
{
    /// <summary>
    /// PageMultiLanguageGlobalService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class PageMultiLanguageGlobalService : System.Web.Services.WebService
    {
        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion return "Hello World";

        #region GetPageMultiLanguageGlobal
        /// <summary>
        /// 取得PageMultiLanguageGlobal
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseMultiLanguagePageDTO GetPageMultiLanguageGlobal(Guid id)
        {
            BaseMultiLanguagePageGlobalBusiness baseMultiLanguagePageGlobalBusiness = new BaseMultiLanguagePageGlobalBusiness();
            var baseMultiLanguagePageDTO = baseMultiLanguagePageGlobalBusiness.GetBaseMultiLanguagePage(id);

            return baseMultiLanguagePageDTO;
        }
        #endregion

        #region SavePageMultiLanguageGlobal
        [WebMethod(EnableSession = true)]
        public string SavePageMultiLanguageGlobal(BaseMultiLanguagePageDTO baseMultiLanguagePageDTO, PageAction pageAction)
        {
            BaseMultiLanguagePageGlobalBusiness baseMultiLanguagePageGlobalBusiness = new BaseMultiLanguagePageGlobalBusiness();
            string result = baseMultiLanguagePageGlobalBusiness.SavePageMultiLanguageGlobal(baseMultiLanguagePageDTO, pageAction);
            return result;
        }
        #endregion

        #region DeletePageMultiLanguageGlobal
        [WebMethod(EnableSession = true)]
        public string DeletePageMultiLanguageGlobal(Guid id)
        {
            BaseMultiLanguagePageGlobalBusiness baseMultiLanguagePageGlobalBusiness = new BaseMultiLanguagePageGlobalBusiness();
            string result = baseMultiLanguagePageGlobalBusiness.DeletePageMultiLanguageGlobal(id);
            return result;
        }
        #endregion


        #region ImportPageMultiLanguageGlobal
        [WebMethod(EnableSession = true)]
        public string ImportPageMultiLanguageGlobal(string fileName)
        {
            string localPath = Server.MapPath("~/Temporary/" + fileName);
            BaseMultiLanguagePageGlobalBusiness baseMultiLanguagePageGlobalBusiness = new BaseMultiLanguagePageGlobalBusiness();
            string result = baseMultiLanguagePageGlobalBusiness.Import(localPath);
            return result;
        }
        #endregion

        
    }
}
