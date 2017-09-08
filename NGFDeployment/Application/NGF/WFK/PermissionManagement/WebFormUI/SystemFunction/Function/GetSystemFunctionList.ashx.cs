using System.Collections.Generic;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Function
{
    /// <summary>
    /// Summary description for GetSystemFunctionList
    /// </summary>
    public class GetSystemFunctionList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var systemId = pageParameterManager.GetRequiredGuid("SystemId");

            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            IList<BaseFunctionDTO> baseFunctionDTOs = baseFunctionBusiness.GetFunctionTree(systemId);
            
            var serializer = EasyuiTreegridHelp.Serializer<BaseFunctionDTO>(baseFunctionDTOs, null, "Parent_Function_Id", string.Empty);

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