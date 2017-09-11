using System;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.Web;
using Qisda.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.PageMultiLanguageGlobal
{
    public partial class PageMultiLanguageGlobalExport : WebPageBase
    {
        #region PageParameterSortColumn
        private string m_PageParameterSortColumn;
        protected string PageParameterSortColumn
        {
            get
            {
                return m_PageParameterSortColumn ?? (m_PageParameterSortColumn = PageParameterManager.Default.GetString("LanguageText"));
            }
        }
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            BaseMultiLanguagePageGlobalBusiness baseMultiLanguagePageGlobalBusiness = new BaseMultiLanguagePageGlobalBusiness();
            byte[] bytes = baseMultiLanguagePageGlobalBusiness.Export(PageParameterSortColumn);
            if (bytes != null && bytes.Length > 0)
            {
                QWeb.DownLoadFile(bytes, "PageMultiLanguageGlobal.xlsx");
            }
        }
    }
}