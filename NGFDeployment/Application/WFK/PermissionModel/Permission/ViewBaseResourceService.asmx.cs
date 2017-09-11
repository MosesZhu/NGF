using System;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.Permission
{
    /// <summary>
    /// Summary description for ViewBaseResourceService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ViewBaseResourceService : WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetViewBaseResourceId
        /// <summary>
        /// 取得资源Id
        /// </summary>
        /// <param name="resourceCategory">资源分类</param>
        /// <param name="resourceName">资源名</param>
        /// <returns>资源Id</returns>
        [WebMethod(EnableSession=true)]
        public Guid? GetViewBaseResourceId(string resourceCategory, string resourceName)
        {
            ViewBaseResourceBusiness viewBaseResourceBusiness = new ViewBaseResourceBusiness();
            var resourceId = viewBaseResourceBusiness.GetViewBaseResourceId(resourceCategory, resourceName);

            return resourceId;
        }
        #endregion

    }
}
