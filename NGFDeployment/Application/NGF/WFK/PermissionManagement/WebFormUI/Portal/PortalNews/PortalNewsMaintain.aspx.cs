using System;
using ITS.WebFramework.SSO.Session;
using ITS.WebFramework.Web;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalNews
{
    public partial class PortalNewsMaintain : WebPageBase
    {
        public Guid UserID
        {
            get { return SSOContext.Current.UserID; }
        }

        public string UserName
        {
            get { return SSOContext.Current.UserName; }
        }

        protected override bool AutoCheckPermission
        {
            get
            {
                return false;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
        }
    }
}