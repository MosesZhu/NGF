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
    /// GetControlLanguageList 的摘要说明
    /// </summary>
    public class GetControlLanguageList : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var pageMultiLanguageTextDTO = new BaseMultiLanguagePageDTO
            {
                Product_Name = pageParameterManager.GetString("ProductName"),
                System_Name = pageParameterManager.GetString("SystemName"),
                Class_Name = pageParameterManager.GetString("ClassName")
            };

            BaseMultiLanguagePageBusiness pageMultiLanguageBusiness = new BaseMultiLanguagePageBusiness();
            var result = pageMultiLanguageBusiness.GetControlLanguageList(pageMultiLanguageTextDTO);

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