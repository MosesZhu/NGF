using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SensitiveData.DataSource
{
    /// <summary>
    /// Summary description for GetBaseDataSourceList
    /// </summary>
    public class GetBaseDataSourceList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var baseDataSourceDTO = new BaseDataSourceDTO
            {
                Org_Id = pageParameterManager.GetGuid("Org_Id", Guid.Empty),
                Environment = pageParameterManager.GetString("Environment"),
                Name = pageParameterManager.GetString("Name"),
                Description = pageParameterManager.GetString("Description"),
                Provider = pageParameterManager.GetString("Provider")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseDataSourceBusiness baseDataSourceBusiness = new BaseDataSourceBusiness();
            var result = baseDataSourceBusiness.GetBaseDataSourceList(baseDataSourceDTO, pageIndex, pageSize);

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