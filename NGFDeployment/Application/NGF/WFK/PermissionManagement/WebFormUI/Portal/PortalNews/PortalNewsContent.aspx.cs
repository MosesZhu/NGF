using System;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.Web;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalNews
{
    public partial class PortalNewsContent : WebPageBase
    {
        #region PageParameterId
        protected Guid PageParameterId
        {
            get
            {
                return PageParameterManager.Default.GetGuid("id", Guid.Empty);
            }
        }
        #endregion

        protected override bool AutoCheckPermission
        {
            get
            {
                return false;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                txtBoxContent.Text =
                    (PageParameterId == Guid.Empty
                        ? string.Empty
                        : (new PortalNewsBusiness()).GetPortalNewsContent(PageParameterId));
            }
        }
    }
}