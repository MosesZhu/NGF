using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ITS.WebFramework.Web;
using ITS.WebFramework.SSO.Session;
using System.IO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.CommonPage
{
    public partial class FileUpload : WebPageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ButtonOK_Click(object sender, EventArgs e)
        {
            if (FileUpload1.HasFile)
            {
                string fileName = FileUpload1.FileName;
                string fileExt = System.IO.Path.GetExtension(fileName);
                string function = Request.QueryString["function"];
                string newFileName = SSOContext.Current.UserName + "_" + function + "_" + DateTime.Now.ToString("yyyyMMddhhmmssfff") + fileExt;
                string directory = Server.MapPath("~/Temporary/");
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }
                DirectoryInfo dirInfo = new DirectoryInfo(directory);
                FileInfo[] files = dirInfo.GetFiles();

                var now = DateTime.Now;
                foreach (FileInfo file in files)
                {
                    if (file.IsReadOnly)
                    {
                        continue;
                    }
                    
                    try
                    {
                        if (now > file.LastWriteTime.AddHours(24))
                        {
                            file.Delete();
                        }
                    }
                    catch (Exception)
                    {
                    }
                }

                string webSavePath = "~/Temporary/" + newFileName;
                FileUpload1.SaveAs(Server.MapPath(webSavePath));
                PageHelper.RegisterStartupScript("callBack('" + HttpUtility.JavaScriptStringEncode(newFileName) + "')");
            }
        }
    }
}