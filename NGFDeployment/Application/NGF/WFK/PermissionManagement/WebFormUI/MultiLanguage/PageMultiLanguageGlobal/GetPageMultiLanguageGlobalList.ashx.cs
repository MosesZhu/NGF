using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.PageMultiLanguageGlobal
{
    /// <summary>
    /// GetPageMultiLanguageGlobalList 的摘要说明
    /// </summary>
    public class GetPageMultiLanguageGlobalList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var languageText = pageParameterManager.GetString("LanguageText");
            var sortColumn = pageParameterManager.GetString("SortColumn");

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseMultiLanguagePageGlobalBusiness baseMultiLanguagePageGlobalBusiness = new BaseMultiLanguagePageGlobalBusiness();
            var result = baseMultiLanguagePageGlobalBusiness.GetPageMultiLanguageGlobalList(languageText, sortColumn, pageIndex, pageSize);

            var serializer = EasyuiDataGridHelp.Serializer(result.RowCount, result.Results, null);

            context.Response.ContentType = "text/plain";
            context.Response.Write(serializer);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}