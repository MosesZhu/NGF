using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.Business;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemMaintenance.SystemMaintenance
{
    /// <summary>
    /// Summary description for GetSystemMaintenanceList
    /// </summary>
    public class GetSystemMaintenanceList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            bool IscheckboxExpiredAndClosed = (PageParameterManager.Default.GetString("IsCheckedExpiredAndClosed").ToLower() == "true");
            var baseSystemMaintenanceDTO = new BaseSystemMaintenanceDTO
            {
                Org_Id = PageParameterManager.Default.GetGuid("OrgId", Guid.Empty),
                Product_Id = PageParameterManager.Default.GetGuid("ProductId", Guid.Empty),
                Maintenance_Category = PageParameterManager.Default.GetString("Maintenance_Category", String.Empty),
                MaintainDate = PageParameterManager.Default.GetDateTime("MaintainDate", DateTime.MinValue),
                Domain_Id = PageParameterManager.Default.GetGuid("Domain_Id", Guid.Empty),
                System_Id = PageParameterManager.Default.GetGuid("System_Id", Guid.Empty),
                System_Group_Id = PageParameterManager.Default.GetGuid("System_Group_Id", Guid.Empty),
                System_Group = PageParameterManager.Default.GetString("System_Group", string.Empty),
                IscheckboxExpiredAndClosed = IscheckboxExpiredAndClosed
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseSystemMaintenanceBusiness baseSystemMaintenanceBusiness = new BaseSystemMaintenanceBusiness();
            var result = baseSystemMaintenanceBusiness.GetSystemMaintenanceList(baseSystemMaintenanceDTO, pageIndex, pageSize);

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