using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MessageCategory
{
    /// <summary>
    /// Summary description for GetBaseMessageCategoryList
    /// </summary>
    public class GetBaseMessageCategoryList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var baseMessageCategoryDTO = new BaseMessageCategoryDTO
            {
                Name = pageParameterManager.GetString("Name"),
                Category_Code = pageParameterManager.GetString("CategoryCode"),
                Description = pageParameterManager.GetString("Description")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseMessageCategoryBusiness baseMessageCategoryBusiness = new BaseMessageCategoryBusiness();
            var result = baseMessageCategoryBusiness.GetBaseMessageCategoryList(baseMessageCategoryDTO, pageIndex, pageSize);
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