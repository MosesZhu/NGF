using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Config.JobSetting
{
    /// <summary>
    /// Summary description for GetBaseJobList
    /// </summary>
    public class GetBaseConfigJobList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var baseJobDTO = new BaseConfigJobDTO
            {
                Org_Id = pageParameterManager.GetGuid("OrgId", Guid.Empty),
                Product_Id = pageParameterManager.GetGuid("ProductId", Guid.Empty),
                Domain_Id = pageParameterManager.GetGuid("DomainId", Guid.Empty),
                System_Id = pageParameterManager.GetGuid("SystemId", Guid.Empty),
                Name = pageParameterManager.GetString("Name"),
                Description = pageParameterManager.GetString("Description"),
                Process = pageParameterManager.GetString("Process")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseConfigJobBusiness baseJobBusiness = new BaseConfigJobBusiness();
            var result = baseJobBusiness.GetBaseJobList(baseJobDTO, pageIndex, pageSize);
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