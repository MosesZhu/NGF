using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SensitiveData.DataTableColumn
{
    /// <summary>
    /// Summary description for DataTableColumnService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DataTableColumnService : WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetBaseDataTableColumnList
        /// <summary>
        /// GetBaseDataTableColumnList
        /// </summary>
        /// <param name="dataTableId">dataTableId</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<BaseDataTableColumnDTO> GetBaseDataTableColumnList(Guid dataTableId)
        {
            BaseDataTableColumnBusiness baseDataTableColumnBusiness = new BaseDataTableColumnBusiness();
            var result = baseDataTableColumnBusiness.GetBaseDataTableColumnList(dataTableId);

            return result;
        }
        #endregion

        #region GetSensitiveColumnList
        /// <summary>
        /// GetSensitiveColumnList
        /// </summary>
        /// <param name="dataTableId">dataTableId</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<BaseDataTableColumnDTO> GetSensitiveColumnList(Guid dataTableId)
        {
            BaseDataTableColumnBusiness baseDataTableColumnBusiness = new BaseDataTableColumnBusiness();
            var result = baseDataTableColumnBusiness.GetSensitiveColumnList(dataTableId);

            return result;
        }
        #endregion

        #region SaveBaseDataTableColumn
        /// <summary>
        /// 保存BaseDataTableColumn信息
        /// </summary>
        /// <param name="dataTableId"></param>
        /// <param name="baseDataTableColumnDTOs"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string SaveBaseDataTableColumn(Guid dataTableId, List<BaseDataTableColumnDTO> baseDataTableColumnDTOs)
        {
            BaseDataTableColumnBusiness baseDataTableColumnBusiness = new BaseDataTableColumnBusiness();
            string result = baseDataTableColumnBusiness.SaveBaseDataTableColumn(dataTableId, baseDataTableColumnDTOs);

            return result;
        }
        #endregion
    }
}
