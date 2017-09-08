using System;
using System.Collections.Generic;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Department
{
    /// <summary>
    /// GetDepartmentTreeList 的摘要说明
    /// </summary>
    public class GetDepartmentTreeList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var isFirst = pageParameterManager.GetRequiredBoolean("First");
            var treeType = pageParameterManager.GetRequiredString("TreeType");
            var id = pageParameterManager.GetGuid("Id", Guid.Empty);

            BaseDepartmentBusiness baseDepartmentBusiness = new BaseDepartmentBusiness();
            IList<BaseDepartmentDTO> listBaseDepartmentDTO = baseDepartmentBusiness.GetDepartmentTreeList(treeType, id);

            var serializer = isFirst
                ? EasyuiTreegridHelp.Serializer(listBaseDepartmentDTO, null, "Parent_Deptartment_Id", "IsHasChildren")
                : EasyuiTreegridHelp.SerializerChild(listBaseDepartmentDTO, "Parent_Deptartment_Id", "IsHasChildren");

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