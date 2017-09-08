using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.PageMultiLanguage
{
    /// <summary>
    /// GetPageMultiLanguageList 的摘要说明
    /// </summary>
    public class GetPageMultiLanguageList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var baseMultiLanguagePageDTO = new BaseMultiLanguagePageDTO
            {
                Product_Name = pageParameterManager.GetString("ProductName"),
                System_Name = pageParameterManager.GetString("SystemName"),
                Class_Name = pageParameterManager.GetString("ClassName")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseMultiLanguagePageBusiness baseMultiLanguagePageBusiness = new BaseMultiLanguagePageBusiness();
            var result = baseMultiLanguagePageBusiness.GetPageMultiLanguageList(baseMultiLanguagePageDTO, pageIndex, pageSize);

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