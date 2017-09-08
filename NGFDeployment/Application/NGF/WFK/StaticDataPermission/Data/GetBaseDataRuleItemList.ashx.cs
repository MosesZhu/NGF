using System;
using System.Collections.Generic;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.Data
{
    /// <summary>
    /// GetBaseDataRuleItemList 的摘要说明
    /// </summary>
    public class GetBaseDataRuleItemList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var dataRuleGroupId = pageParameterManager.GetGuid("dataRuleGroupId", Guid.Empty);

            var baseDataRuleItemBusiness = new BaseDataRuleItemBusiness();
            var result = baseDataRuleItemBusiness.GetBaseDataRuleItemList(dataRuleGroupId);

            if (result == null || result.Count == 0)
            {
                result = new List<BaseDataRuleItemDTO> { new BaseDataRuleItemDTO() };
            }

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