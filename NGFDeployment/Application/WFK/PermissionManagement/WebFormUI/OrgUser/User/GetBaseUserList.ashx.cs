using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.User
{
    /// <summary>
    /// Summary description for GetBaseUserList
    /// </summary>
    public class GetBaseUserList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var userDTO = new UserDTO
            {
                Org_Id = pageParameterManager.GetGuid("Org_Id", Guid.Empty),
                Org = pageParameterManager.GetString("Org"),
                User_Name = pageParameterManager.GetString("User_Name"),
                Real_Name = pageParameterManager.GetString("Real_Name"),
                Employee_Id = pageParameterManager.GetString("Employee_Id"),
                Employee_No = pageParameterManager.GetString("Employee_No"),
                Email = pageParameterManager.GetString("Email"),
                Mobil_Phone = pageParameterManager.GetString("Mobil_Phone"),
                Telphone = pageParameterManager.GetString("Telphone"),
                Company = pageParameterManager.GetString("Company"),
                Department_Code = pageParameterManager.GetString("Department_Code"),
                Title = pageParameterManager.GetString("Title"),
                Gender = pageParameterManager.GetString("Gender"),
                Computer_Name = pageParameterManager.GetString("Computer_Name")
            };

            if (!string.IsNullOrWhiteSpace(pageParameterManager.GetString("Is_Staff")))
            {
                userDTO.Is_Staff = int.Parse(pageParameterManager.GetString("Is_Staff"));
            }

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseUserBusiness baseUserBusiness = new BaseUserBusiness();
            var result = baseUserBusiness.GetUserList(userDTO, pageIndex, pageSize);

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