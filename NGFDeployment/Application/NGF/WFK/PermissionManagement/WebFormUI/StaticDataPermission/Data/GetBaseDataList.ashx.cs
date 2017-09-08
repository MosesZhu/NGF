﻿using System;
using System.Web;
using System.Web.SessionState;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.Data
{
    /// <summary>
    /// GetBaseDataList 的摘要说明
    /// </summary>
    public class GetBaseDataList : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            PageParameterManager pageParameterManager = new PageParameterManager(context);

            var baseDataDTO = new BaseDataDTO
            {
                Org_Id = pageParameterManager.GetGuid("Org_Id", Guid.Empty),
                Data_Source_Id = pageParameterManager.GetGuid("Data_Source_Id", Guid.Empty),
                Table_Id = pageParameterManager.GetGuid("Table_Id", Guid.Empty),
                Name = pageParameterManager.GetString("Name"),
                Description = pageParameterManager.GetString("Description")
            };

            int pageIndex = int.Parse((context.Request.Form["page"] ?? "1").Trim());
            int pageSize = int.Parse((context.Request.Form["rows"] ?? "20").Trim());

            BaseDataBusiness baseDataBusiness = new BaseDataBusiness();
            var result = baseDataBusiness.GetBaseDataList(baseDataDTO, pageIndex, pageSize);

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