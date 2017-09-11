using System;
using ITS.WebFramework.Web;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalHomePage
{
    public partial class PortalNewsDetail : WebPageBase
    {
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