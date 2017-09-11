using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.SSO.Session;
using System.Web.Script.Serialization;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Org
{
    /// <summary>
    /// Summary description for OrgService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class OrgService : WebService
    {
        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetSiteList
        /// <summary>
        /// 取得Site列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetSiteList()
        {
            BaseOrgBusiness baseOrgBusiness = new BaseOrgBusiness();
            var sites = baseOrgBusiness.GetSiteList().ToList();

            return sites;
        }
        #endregion

        #region GetOrgListAll
        /// <summary>
        /// 取得Org列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<BaseOrgDTO> GetOrgListAll()
        {
            BaseOrgBusiness baseOrgBusiness = new BaseOrgBusiness();
            var pageResultOrg = baseOrgBusiness.GetBaseOrgList(new BaseOrgDTO(), 1, int.MaxValue);

            List<BaseOrgDTO> baseOrgDtos = pageResultOrg.Results.ToList();

            return baseOrgDtos;
        }
        #endregion

        #region GetOrg
        /// <summary>
        /// 取得Org列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseOrgDTO GetOrg(Guid id)
        {
            BaseOrgBusiness baseOrgBusiness = new BaseOrgBusiness();
            var baseOrgDto = baseOrgBusiness.GetBaseOrg(id);

            return baseOrgDto;
        }
        #endregion

        #region SaveBaseOrg
        /// <summary>
        /// 保存BaseOrg信息
        /// </summary>
        /// <param name="baseOrgDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseOrg(BaseOrgDTO baseOrgDTO, PageAction pageAction)
        {
            BaseOrgBusiness baseOrgBusiness = new BaseOrgBusiness();
            string result = baseOrgBusiness.SaveBaseOrg(baseOrgDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseOrg
        /// <summary>
        /// delete BaseOrg by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseOrg(Guid id)
        {
            BaseOrgBusiness baseOrgBusiness = new BaseOrgBusiness();
            string result = baseOrgBusiness.DeleteBaseOrg(id);

            return result;
        }
        #endregion

        #region IsCurrentUserOrgAdmin
        /// <summary>
        /// 验证当前登录用户是否是Org管理员
        /// </summary>
        /// <param name="orgId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public bool IsCurrentUserOrgAdmin(Guid orgId)
        {
            BaseOrgBusiness baseOrgBusiness = new BaseOrgBusiness();
            bool isOrgAdmin = baseOrgBusiness.IsOrgAdmin(orgId, SSOContext.Current.UserID);
            return isOrgAdmin;
        }
        #endregion

        #region GetOrgXml
        /// <summary>
        /// 获取xml字串
        /// </summary>
        /// <param name="listBaseOrgDTO"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string GetOrgXml(List<BaseOrgDTO> listBaseOrgDTO)
        {
            BaseOrgBusiness baseOrgBusiness = new BaseOrgBusiness();
            return baseOrgBusiness.GetOrgXml(listBaseOrgDTO);
        }
        #endregion

        #region ImportOrg
        [WebMethod(EnableSession = true)]
        public Dictionary<string, List<string>> ImportOrg(List<BaseOrgDTO> listBaseOrgDTO)
        {
            BaseOrgBusiness baseOrgBusiness = new BaseOrgBusiness();
            var result = baseOrgBusiness.ImportOrg(listBaseOrgDTO);
            return result;
        }
        #endregion
    }
}
