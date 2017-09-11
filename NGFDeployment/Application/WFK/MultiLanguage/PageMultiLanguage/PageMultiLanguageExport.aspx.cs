using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.Web;
using Qisda.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.PageMultiLanguage
{
    public partial class PageMultiLanguageExport : WebPageBase
    {
        #region PageParameterProductName
        private string m_PageParameterProductName;
        protected string PageParameterProductName
        {
            get
            {
                return m_PageParameterProductName ?? (m_PageParameterProductName = PageParameterManager.Default.GetString("productName"));
            }
        }
        #endregion

        #region PageParameterSystemName
        private string m_PageParameterSystemName;
        protected string PageParameterSystemName
        {
            get
            {
                return m_PageParameterSystemName ?? (m_PageParameterSystemName = PageParameterManager.Default.GetString("systemName"));
            }
        }
        #endregion

        #region PageParameterClassName
        private string m_PageParameterClassName;
        protected string PageParameterClassName
        {
            get
            {
                return m_PageParameterClassName ?? (m_PageParameterClassName = PageParameterManager.Default.GetString("className"));
            }
        }
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            BaseMultiLanguagePageBusiness baseMultiLanguagePageBusiness = new BaseMultiLanguagePageBusiness();
            byte[] bytes = baseMultiLanguagePageBusiness.Export(
                new BaseMultiLanguagePageDTO
                {
                    Product_Name = PageParameterProductName,
                    System_Name = PageParameterSystemName,
                    Class_Name = PageParameterClassName
                }
            );
            if (bytes != null && bytes.Length > 0)
            {
                QWeb.DownLoadFile(bytes, string.Format("PageMultiLanguage-{0}-{1}.xlsx", PageParameterProductName, PageParameterSystemName));
            }
        }
    }
}