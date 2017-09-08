using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MultiLanguage
{
    /// <summary>
    /// MultiLanguageService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class MultiLanguageService : WebService
    {
        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion return "Hello World";

        #region GetLanguageTextTypeList
        /// <summary>
        /// 取得LanguageTextType列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetLanguageTextTypeList()
        {
            BaseMultiLanguageBusiness baseMultiLanguageBusiness = new BaseMultiLanguageBusiness();
            var textTypes = baseMultiLanguageBusiness.GetLanguageTextTypeList().ToList();

            return textTypes;
        }
        #endregion

        #region GetMultiLanguage
        /// <summary>
        /// 取得MultiLanguage列表
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseMultiLanguageTextDTO GetMultiLanguage(Guid id)
        {
            BaseMultiLanguageBusiness baseMultiLanguageBusiness = new BaseMultiLanguageBusiness();
            var baseMultiLanguageTextDTO = baseMultiLanguageBusiness.GetBaseMultiLanguage(id);

            return baseMultiLanguageTextDTO;
        }
        #endregion

        [WebMethod(EnableSession = true)]
        public string GetFunctionName(Guid functionId)
        {
            BaseMultiLanguageBusiness baseMultiLanguageBusiness = new BaseMultiLanguageBusiness();
            string functionName = baseMultiLanguageBusiness.GetFunctionName(functionId);
            return functionName;

        }

        #region SaveBaseMultiLanguage
        /// <summary>
        /// save BaseMultiLanguage
        /// </summary>
        /// <param name="baseMultiLanguageTextDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseMultiLanguage(BaseMultiLanguageTextDTO baseMultiLanguageTextDTO, PageAction pageAction)
        {
            BaseMultiLanguageBusiness baseMultiLanguageBusiness = new BaseMultiLanguageBusiness();
            string result = baseMultiLanguageBusiness.SaveBaseMultiLanguage(baseMultiLanguageTextDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseMultiLanguage
        /// <summary>
        /// delete BaseMultiLanguage by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseMultiLanguage(Guid id)
        {
            BaseMultiLanguageBusiness baseMultiLanguageBusiness = new BaseMultiLanguageBusiness();
            string result = baseMultiLanguageBusiness.DeleteMultiLanguage(id);

            return result;
        }
        #endregion

        [WebMethod]
        public string ToSimplifiedChinese(string traditional)
        {
            return Microsoft.VisualBasic.Strings.StrConv(traditional, Microsoft.VisualBasic.VbStrConv.SimplifiedChinese, 0);
        }

        [WebMethod]
        public string ToTraditionalChinese(string simplified)
        {
            return Microsoft.VisualBasic.Strings.StrConv(simplified, Microsoft.VisualBasic.VbStrConv.TraditionalChinese, 0);
        }
    }
}
