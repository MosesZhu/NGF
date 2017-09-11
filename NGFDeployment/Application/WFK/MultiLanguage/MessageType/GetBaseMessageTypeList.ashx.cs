using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MessageType
{
    /// <summary>
    /// Summary description for GetBaseMessageTypeList
    /// </summary>
    public class GetBaseMessageTypeList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var baseMessageTypeDTO = new BaseMessageTypeDTO
            {
                Category_Id = pageParameterManager.GetGuid("CategoryId", Guid.Empty),
                Type_Name = pageParameterManager.GetString("TypeName"),
                Type_Code = pageParameterManager.GetString("TypeCode"),
                Type_Description = pageParameterManager.GetString("TypeDescription")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseMessageTypeBusiness baseMessageTypeBusiness = new BaseMessageTypeBusiness();
            var result = baseMessageTypeBusiness.GetBaseMessageTypeList(baseMessageTypeDTO, pageIndex, pageSize);
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