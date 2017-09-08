using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.FrameworkLog
{
    /// <summary>
    /// Summary description for GetFrameworkLogList
    /// </summary>
    public class GetFrameworkLogList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var baseLogDTO = new BaseLogDTO
            {
                Org_Id = pageParameterManager.GetGuid("OrgId", Guid.Empty),
                Product_Id = pageParameterManager.GetGuid("ProductId", Guid.Empty),
                Domain_Id = pageParameterManager.GetGuid("DomainId", Guid.Empty),
                System_Id = pageParameterManager.GetGuid("SystemId", Guid.Empty),
                User_Id = pageParameterManager.GetGuid("UserId", Guid.Empty),
                Status = pageParameterManager.GetString("Status"),
                Log_Date_From = pageParameterManager.GetDateTime("LogDateFrom"),
                Log_Date_To = pageParameterManager.GetDateTime("LogDateTo"),
                Log_Type = pageParameterManager.GetString("LogType")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseLogBusiness baseLogBusiness = new BaseLogBusiness();
            var result = baseLogBusiness.GetBaseLogList(baseLogDTO, pageIndex, pageSize);
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