using System.Web;
using System.Data;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.CommonPage
{
    /// <summary>
    /// GetXmlImportList 的摘要说明
    /// </summary>
    public class GetXmlImportList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string fileName = PageParameterManager.Default.GetString("fileName");
            string filePath = context.Server.MapPath("~/Temporary/" + fileName);
            DataTable dt = XmlHelper.GetXmlImportList(filePath);
            var serializer = EasyuiDataGridHelp.Serializer(dt.Rows.Count, dt);

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