using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ITS.WebFramework.Web;
using ITS.WebFramework.SSO.Session;


namespace ITS.WebFramework.PermissionManagement.WebFormUI.CommonPage
{
    public partial class ExportToXml : WebPageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string xml = Request["txtContent"];
            xml = HttpUtility.HtmlDecode(xml);
            string function = Request["txtFunction"];
            string fileNmae = SSOContext.Current.UserName + "_" + function + "_" + DateTime.Now.ToString("yyyyMMddhhmmssfff") + ".xml";
            Response.Clear();
            Response.Buffer = true;
            //Response.Charset = "UTF8";
            Response.AppendHeader("Content-Disposition", "attachment;filename=" + fileNmae);
            Response.ContentEncoding = System.Text.Encoding.UTF8;

            Response.ContentType = "application/text";
            System.IO.StringWriter ostringwriter = new System.IO.StringWriter();
            System.Web.UI.HtmlTextWriter ohtmltextwriter = new System.Web.UI.HtmlTextWriter(ostringwriter);

            Response.Write(xml);
            Response.End();
        }
    }
}