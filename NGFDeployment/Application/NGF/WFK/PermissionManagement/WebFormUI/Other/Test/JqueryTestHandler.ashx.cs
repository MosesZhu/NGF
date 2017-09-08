using System.Web;
using System.Web.SessionState;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Other.Test
{
    /// <summary>
    /// JqueryTestHandler 的摘要说明
    /// </summary>
    public class JqueryTestHandler : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            var text = context.Request.Form["text"];
            string returnvalue = (text == "Y" ? "true" : "false");

            context.Response.ContentType = "text/plain";
            context.Response.Write(returnvalue);
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