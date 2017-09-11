using System;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.Web;
using ITS.WebFramework.PermissionManagement.Business;
using Qisda.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MessageContent
{
    public partial class MessageContentInquiry : WebPageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                HiddenFieldMessageServiceUrl.Value = Configuration.Config.System["MessageServiceUrl"];
            }

        }

        protected void buttonExportToExcel_Click(object sender, EventArgs e)
        {
            BaseMessageContentBusiness baseMessageContentBusiness = new BaseMessageContentBusiness();
            var listMessageContent = baseMessageContentBusiness.GetBaseMessageContentList(new BaseMultiLanguageTextDTO(), 1, int.MaxValue);
            GridView1.DataSource = listMessageContent.Results;
            GridView1.DataBind();
            Qisda.Common.QWeb.ExportGridViewToExcel(GridView1, "message_content_list.xls");
        }
    }
}