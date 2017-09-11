using System;
using ITS.WebFramework.Web;
using ITS.WebFramework.SSO.Session;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalHomePage
{
    public partial class PortalHomePage : WebPageBase
    {
        public string Language
        {
            get { return SSOContext.Current.Language.ToString(); }
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region AutoCheckPermission
        /// <summary>
        /// 此页面不用检查权限
        /// </summary>
        protected override bool AutoCheckPermission
        {
            get
            {
                return false;
            }
        }
        #endregion
    }
}