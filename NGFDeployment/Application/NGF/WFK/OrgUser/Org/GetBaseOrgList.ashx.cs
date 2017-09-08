using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Org
{
    /// <summary>
    /// Summary description for GetBaseOrgList
    /// </summary>
    public class GetBaseOrgList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            var baseOrgDTO = new BaseOrgDTO
            {
                Site = PageParameterManager.Default.GetString("Site"),
                Name = PageParameterManager.Default.GetString("Name"),
                Description = PageParameterManager.Default.GetString("Description")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseOrgBusiness baseOrgBusiness = new BaseOrgBusiness();
            var result = baseOrgBusiness.GetBaseOrgList(baseOrgDTO, pageIndex, pageSize);

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