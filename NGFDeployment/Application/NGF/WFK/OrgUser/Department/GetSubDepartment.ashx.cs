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
    /// Summary description for GetSubDepartment
    /// </summary>
    public class GetSubDepartment : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);
            var departmentId = pageParameterManager.GetRequiredGuid("DepartmentId");
            var isFirst = pageParameterManager.GetRequiredBoolean("First");

            BaseDepartmentBusiness baseDepartmentBusiness = new BaseDepartmentBusiness();

            IList<BaseDepartmentDTO> listBaseDepartmentDTO = baseDepartmentBusiness.GetBaseDepartmentsByParentID(departmentId);

            string serializer;
            if (isFirst)
            {
                var baseDepartmentDTO = baseDepartmentBusiness.GetBaseDepartment(departmentId);
                baseDepartmentDTO.Parent_Deptartment_Id = null;
                listBaseDepartmentDTO.Insert(0, baseDepartmentDTO);
                serializer = EasyuiTreegridHelp.Serializer<BaseDepartmentDTO>(listBaseDepartmentDTO, null, "Parent_Deptartment_Id", "IsHasChildren");
            }
            else
            {
                serializer = EasyuiTreegridHelp.SerializerChild<BaseDepartmentDTO>(listBaseDepartmentDTO, "Parent_Deptartment_Id", "IsHasChildren");
            }

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