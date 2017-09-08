using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SensitiveData.DataTableColumn
{
    /// <summary>
    /// Summary description for GetBaseDataTableColumnList
    /// </summary>
    public class GetBaseDataTableColumnList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var dataTableId = pageParameterManager.GetRequiredGuid("DataTableId");

            var baseDataTableColumnBusiness = new BaseDataTableColumnBusiness();
            var result = baseDataTableColumnBusiness.GetBaseDataTableColumnListForDataBase(dataTableId);

            var serializer = EasyuiDataGridHelp.Serializer(result.Count, result, null);

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