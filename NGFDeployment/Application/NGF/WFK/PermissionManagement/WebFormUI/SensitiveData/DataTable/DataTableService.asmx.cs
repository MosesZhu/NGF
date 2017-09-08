using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SensitiveData.DataTable
{
    /// <summary>
    /// Summary description for DataTableService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DataTableService : WebService
    {
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetBaseDataTableList
        /// <summary>
        /// 取得DataTable列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<BaseDataTableDTO> GetBaseDataTableList(Guid? dataSourceId)
        {
            BaseDataTableBusiness baseDataTableBusiness = new BaseDataTableBusiness();
            var baseDataTableDTOs = baseDataTableBusiness.GetBaseDataTableList(
                new BaseDataTableDTO
                {
                    Data_Source_Id = (dataSourceId.HasValue
                                ? dataSourceId.Value
                                : Guid.Empty)
                },
                1,
                int.MaxValue);

            return baseDataTableDTOs.Results.ToList();
        }
        #endregion

        #region GetDataTable
        /// <summary>
        /// 取得DataTable列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseDataTableDTO GetBaseDataTable(Guid id)
        {
            BaseDataTableBusiness baseDataTableBusiness = new BaseDataTableBusiness();
            var baseDataTableDto = baseDataTableBusiness.GetBaseDataTable(id);

            return baseDataTableDto;
        }

        /// <summary>
        /// 取得DataTable列表和DataSource中的Org信息
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseDataTableDTO GetBaseDataTableAndDataSourceInfo(Guid id)
        {
            BaseDataTableBusiness baseDataTableBusiness = new BaseDataTableBusiness();
            var baseDataTableDto = baseDataTableBusiness.GetBaseDataTableAndDataSourceInfo(id);

            return baseDataTableDto;
        }
        #endregion

        #region SaveBaseDataTable
        /// <summary>
        /// 保存BaseDataTable信息
        /// </summary>
        /// <param name="baseDataTableDTO"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseDataTable(BaseDataTableDTO baseDataTableDTO, PageAction pageAction)
        {
            BaseDataTableBusiness baseDataTableBusiness = new BaseDataTableBusiness();
            string result = baseDataTableBusiness.SaveBaseDataTable(baseDataTableDTO, pageAction);

            //Add By Jackie F Yang on 20130922(Save Base_Data_Table_Column)
            if (result.Trim() == string.Empty && pageAction == PageAction.New)
            {
                BaseDataTableDTO resultDto = baseDataTableBusiness.GetBaseDataTableByDataSourceAndDataTable(baseDataTableDTO.Data_Source_Id, baseDataTableDTO.Name);
                Guid table_id = resultDto.Id;
                var baseDataTableColumnBusiness = new BaseDataTableColumnBusiness();
                IList<BaseDataTableColumnDTO> baseDataTableColumnDtos = baseDataTableColumnBusiness.GetBaseDataTableColumnListForDataBase(table_id);
                result = baseDataTableColumnBusiness.SaveBaseDataTableColumn(table_id, baseDataTableColumnDtos);
            }
            return result;
        }
        #endregion

        #region DeleteBaseDataTable
        /// <summary>
        /// delete BaseDataTable by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseDataTable(Guid id)
        {
            BaseDataTableBusiness baseDataTableBusiness = new BaseDataTableBusiness();
            string result = baseDataTableBusiness.DeleteBaseDataTable(id);

            return result;
        }
        #endregion

        #region CheckBaseDataTableIsUsed
        /// <summary>
        /// Check BaseDataTable is used by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public bool CheckBaseDataTableIsUsed(Guid id)
        {
            BaseDataTableBusiness baseDataTableBusiness = new BaseDataTableBusiness();
            bool result = baseDataTableBusiness.CheckBaseDataTableIsUsed(id);

            return result;
        }
        #endregion
    }
}
