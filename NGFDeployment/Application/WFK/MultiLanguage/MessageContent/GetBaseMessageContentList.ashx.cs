using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MessageContent
{
    /// <summary>
    /// Summary description for GetBaseMessageContentList
    /// </summary>
    public class GetBaseMessageContentList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var baseMultiLanguageTextDTO = new BaseMultiLanguageTextDTO
            {
                Message_Category_Id = pageParameterManager.GetGuid("CategoryId", Guid.Empty),
                System_Id = pageParameterManager.GetGuid("TypeId", Guid.Empty),
                Name = pageParameterManager.GetString("MessageKey"),
                Code = pageParameterManager.GetString("MessageCode"),
                Status = pageParameterManager.GetString("Status"),
                En_Us = pageParameterManager.GetString("EnUs"),
                Zh_Cn = pageParameterManager.GetString("ZhCn"),
                Zh_Tw = pageParameterManager.GetString("ZhTw")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseMessageContentBusiness baseMessageContentBusiness = new BaseMessageContentBusiness();
            var result = baseMessageContentBusiness.GetBaseMessageContentList(baseMultiLanguageTextDTO, pageIndex, pageSize);
            var serializer = EasyuiDataGridHelp.Serializer(result.RowCount, result.Results, null);

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