using System;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.Permission
{
    /// <summary>
    /// Summary description for ViewBaseSubjectService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ViewBaseSubjectService : WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetViewBaseSubjectId
        /// <summary>
        /// 取得主题 Id
        /// </summary>
        /// <param name="subjectCategory">主题分类</param>
        /// <param name="subjectName">主题名</param>
        /// <returns>主题 Id</returns>
        [WebMethod(EnableSession=true)]
        public Guid? GetViewBaseSubjectId(string subjectCategory, string subjectName)
        {
            ViewBaseSubjectBusiness viewBaseSubjectBusiness = new ViewBaseSubjectBusiness();
            var subjectId = viewBaseSubjectBusiness.GetViewBaseSubjectId(subjectCategory, subjectName);

            return subjectId;
        }
        #endregion

    }
}
