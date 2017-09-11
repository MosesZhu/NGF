using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SensitiveData.DataSource
{
    /// <summary>
    /// Summary description for DataSourceService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DataSourceService : System.Web.Services.WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetProviderList
        /// <summary>
        /// 取得Provider列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<string> GetProviderList()
        {
            BaseDataSourceBusiness baseDataSourceBusiness = new BaseDataSourceBusiness();
            var providers = baseDataSourceBusiness.GetProviderList().ToList();

            return providers;
        }
        #endregion

        #region GetBaseDataSourceList
        /// <summary>
        /// 取得DataSource列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<BaseDataSourceDTO> GetBaseDataSourceList(Guid? orgId)
        {
            BaseDataSourceBusiness baseDataSourceBusiness = new BaseDataSourceBusiness();
            var baseDataSourceDTOs = baseDataSourceBusiness.GetBaseDataSourceList(
                new BaseDataSourceDTO
                    {
                        Org_Id = (orgId.HasValue
                                    ? orgId.Value
                                    : Guid.Empty)
                    },
                1,
                int.MaxValue);

            return baseDataSourceDTOs.Results.ToList();
        }
        #endregion

        #region GetDataSource
        /// <summary>
        /// 取得DataSource列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public BaseDataSourceDTO GetBaseDataSource(Guid id)
        {
            BaseDataSourceBusiness baseDataSourceBusiness = new BaseDataSourceBusiness();
            var baseDataSourceDto = baseDataSourceBusiness.GetBaseDataSource(id);

            return baseDataSourceDto;
        }
        #endregion

        #region SaveBaseDataSource
        /// <summary>
        /// 保存BaseDataSource信息
        /// </summary>
        /// <param name="baseDataSourceDTO"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string SaveBaseDataSource(BaseDataSourceDTO baseDataSourceDTO,PageAction pageAction)
        {
            BaseDataSourceBusiness baseDataSourceBusiness = new BaseDataSourceBusiness();
            string result = baseDataSourceBusiness.SaveBaseDataSource(baseDataSourceDTO,pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseDataSource
        /// <summary>
        /// delete BaseDataSource by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string DeleteBaseDataSource(Guid id)
        {
            BaseDataSourceBusiness baseDataSourceBusiness = new BaseDataSourceBusiness();
            string result = baseDataSourceBusiness.DeleteBaseDataSource(id);

            return result;
        }
        #endregion

        #region Test Connect String
        /// <summary>
        /// Test Connect String by provider and connect string
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string TestBaseDataSourceConnectString(BaseDataSourceDTO baseDataSourceDTO)
        {
            BaseDataSourceBusiness baseDataSourceBusiness = new BaseDataSourceBusiness();
            string result = baseDataSourceBusiness.CheckConnectExist(baseDataSourceDTO.Provider, baseDataSourceDTO.Connection_String.Trim());

            return result;
        }
        #endregion

    }
}
