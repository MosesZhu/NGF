using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.Data
{
    /// <summary>
    /// GetBaseDataSelectedColumnList 的摘要说明
    /// </summary>
    public class GetBaseDataSelectedColumnList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            Guid dataId = pageParameterManager.GetGuid("dataId", Guid.Empty);
            Guid dataTableId = pageParameterManager.GetRequiredGuid("dataTableId");

            BaseDataSelectedColumnBusiness baseDataSelectedColumnBusiness = new BaseDataSelectedColumnBusiness();
            var result = baseDataSelectedColumnBusiness.GetBaseDataSelectedColumnList(dataId, dataTableId);

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