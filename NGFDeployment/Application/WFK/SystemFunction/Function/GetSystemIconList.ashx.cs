using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Function
{
    /// <summary>
    /// GetSystemIconList 的摘要说明
    /// </summary>
    public class GetSystemIconList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            //string path = context.Server.MapPath("~/SystemFunction/Function/SystemIcon/");
            //int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            //int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());
            //int totalCount;

            //var baseFunctionBusiness = new BaseFunctionBusiness();
            //var pagedImageNames = baseFunctionBusiness.GetPagedImageNames(path, pageIndex, pageSize, out totalCount);

            //var serializer = EasyuiDataGridHelp.Serializer(totalCount, pagedImageNames);

            //context.Response.ContentType = "text/plain";
            //context.Response.Write(serializer);


            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());
            int totalCount;

            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            var pagedImageNames = baseFunctionBusiness.GetPagedImageNames(pageIndex, pageSize, out totalCount);

            var serializer = EasyuiDataGridHelp.Serializer(totalCount, pagedImageNames);

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