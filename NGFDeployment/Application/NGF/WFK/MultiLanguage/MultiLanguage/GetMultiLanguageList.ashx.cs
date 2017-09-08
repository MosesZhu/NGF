using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MultiLanguage
{
    /// <summary>
    /// GetMultiLanguageList 的摘要说明
    /// </summary>
    public class GetMultiLanguageList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var baseMultiLanguageTextDTO = new BaseMultiLanguageTextDTO
            {
                Org_Id = pageParameterManager.GetGuid("OrgId", Guid.Empty),
                Product_Id = pageParameterManager.GetGuid("ProductId", Guid.Empty),
                Domain_Id = pageParameterManager.GetGuid("DomainId", Guid.Empty),
                System_Id = pageParameterManager.GetGuid("SystemId", Guid.Empty),
                Text_Type = pageParameterManager.GetString("TextType"),
                Name = pageParameterManager.GetString("Name"),
                Code = pageParameterManager.GetString("Code"),
                En_Us = pageParameterManager.GetString("EnUs"),
                Zh_Cn = pageParameterManager.GetString("ZhCn"),
                Zh_Tw = pageParameterManager.GetString("ZhTw")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseMultiLanguageBusiness baseMultiLanguageBusiness = new BaseMultiLanguageBusiness();
            var result = baseMultiLanguageBusiness.GetBaseMultiLanguageList(baseMultiLanguageTextDTO, pageIndex, pageSize);

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