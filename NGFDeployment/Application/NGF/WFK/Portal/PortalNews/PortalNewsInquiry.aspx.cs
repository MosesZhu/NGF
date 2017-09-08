using System;
using ITS.WebFramework.Web;
using ITS.WebFramework.SSO.Session;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalNews
{
    public partial class PortalNewsInquiry : WebPageBase
    {
        public Guid OrgId
        {
            get { return SSOContext.Current.OrgID; }
        }

        public Guid UserID
        {
            get { return SSOContext.Current.UserID; }
        }

        public string UserName
        {
            get { return SSOContext.Current.UserName; }
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}