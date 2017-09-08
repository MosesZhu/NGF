using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.Data
{
    /// <summary>
    /// DataService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class DataService : WebService
    {
        #region HelloWorld Test
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetBaseDataList
        /// <summary>
        /// 取得Data列表
        /// </summary>
        /// <param name="tableId">tableId</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<BaseDataDTO> GetBaseDataList(Guid dataSourceId)
        {
            BaseDataBusiness baseDataBusiness = new BaseDataBusiness();
            var baseDataDTOs = baseDataBusiness.GetBaseDataList(new BaseDataDTO { Data_Source_Id = dataSourceId }, 1, int.MaxValue);

            return baseDataDTOs.Results.ToList();
        }
        #endregion

        #region GetData
        /// <summary>
        /// 取得Data列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public BaseDataDTO GetBaseData(Guid id)
        {
            BaseDataBusiness baseDataBusiness = new BaseDataBusiness();
            var baseDataDto = baseDataBusiness.GetBaseData(id);

            return baseDataDto;
        }
        #endregion

        #region SaveBaseData

        /// <summary>
        /// 保存BaseData信息
        /// </summary>
        /// <param name="baseDataDTO"></param>
        /// <param name="baseDataSelectedColumnDTOs"></param>
        /// <param name="baseDataRuleGroupDTOs"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string SaveBaseData(BaseDataDTO baseDataDTO, List<BaseDataSelectedColumnDTO> baseDataSelectedColumnDTOs, List<BaseDataRuleGroupDTO> baseDataRuleGroupDTOs, PageAction pageAction)
        {
            BaseDataBusiness baseDataBusiness = new BaseDataBusiness();
            string result = baseDataBusiness.SaveBaseData(baseDataDTO, baseDataSelectedColumnDTOs, baseDataRuleGroupDTOs, pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseData
        /// <summary>
        /// delete BaseData by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string DeleteBaseData(Guid id)
        {
            BaseDataBusiness baseDataBusiness = new BaseDataBusiness();
            string result = baseDataBusiness.DeleteBaseData(id);

            return result;
        }
        #endregion

        #region CheckBaseDataIsUsed
        /// <summary>
        /// Check BaseData is used by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public bool CheckBaseDataIsUsed(Guid id)
        {
            BaseDataPermissionBusiness baseDataPermissionBusiness = new BaseDataPermissionBusiness();
            bool result = baseDataPermissionBusiness.CheckBaseDataIsUsed(id);

            return result;
        }
        #endregion
    }
}
