using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.DataPermission
{
    /// <summary>
    /// GetBaseDataPermissionValueList 的摘要说明
    /// </summary>
    public class GetOptionsOriginalData : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var dataId = pageParameterManager.GetRequiredGuid("dataId");

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseDataBusiness baseDataBusiness = new BaseDataBusiness();
            string errorMessage;
            var result = baseDataBusiness.GetOptionsOriginalData(dataId, pageIndex, pageSize, out errorMessage);

            context.Response.ContentType = "text/plain";
            context.Response.Write(result != null
                                       ? EasyuiDataGridHelp.Serializer(result.RowCount, result.Results[0])
                                       : errorMessage);
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