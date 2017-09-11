using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.Data
{
    /// <summary>
    /// DataRuleGroupService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class DataRuleGroupService : WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetBaseDataRuleGroupList
        /// <summary>
        /// 取得DataRuleGroup列表
        /// </summary>
        /// <param name="dataId">dataId</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<BaseDataRuleGroupDTO> GetBaseDataRuleGroupList(Guid dataId)
        {
            BaseDataRuleGroupBusiness baseDataRuleGroupBusiness = new BaseDataRuleGroupBusiness();
            var baseDataRuleGroupDTOs = baseDataRuleGroupBusiness.GetBaseDataRuleGroupList(dataId);

            return baseDataRuleGroupDTOs.ToList();
        }
        #endregion

        /// <summary>
        /// 取得Relation列表
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public IList<string> GetRelations()
        {
            BaseDataRuleItemBusiness baseDataRuleItemBusiness = new BaseDataRuleItemBusiness();
            var relationListAll = baseDataRuleItemBusiness.GetRelations();
            return relationListAll;
        }

        /// <summary>
        /// 取得Operator列表
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public IList<string> GetOperators()
        {
            BaseDataRuleItemBusiness baseDataRuleItemBusiness = new BaseDataRuleItemBusiness();
            var operatorList = baseDataRuleItemBusiness.GetOperators();
            return operatorList;
        }

        /// <summary>
        /// 取得Value Type列表
        /// </summary>
        /// <param></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public IList<string> GetValueTypes()
        {
            BaseDataRuleItemBusiness baseDataRuleItemBusiness = new BaseDataRuleItemBusiness();
            var valueTypeList = baseDataRuleItemBusiness.GetValueTypes();
            return valueTypeList;
        }

        [WebMethod(EnableSession=true)]
        public IList<string> GetMacros()
        {
            BaseDataRuleItemBusiness baseDataRuleItemBusiness = new BaseDataRuleItemBusiness();
            var valueTypeList = baseDataRuleItemBusiness.GetMacros();
            return valueTypeList;
        }

        [WebMethod(EnableSession=true)]
        public IList<string> GetSystemVariables()
        {
            BaseDataRuleItemBusiness baseDataRuleItemBusiness = new BaseDataRuleItemBusiness();
            var valueTypeList = baseDataRuleItemBusiness.GetSystemVariables();
            return valueTypeList;
        }
    }
}
