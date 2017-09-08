using System;
using System.Collections.Generic;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Domain
{
    /// <summary>
    /// Summary description for DomainService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DomainService : WebService
    {
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetDomain
        /// <summary>
        /// 取得Domain列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseDomainDTO GetDomain(Guid id)
        {
            BaseDomainBusiness baseDomainBusiness = new BaseDomainBusiness();
            var baseDomainDto = baseDomainBusiness.GetBaseDomain(id);

            return baseDomainDto;
        }
        #endregion

        #region GetDomainList
        /// <summary>
        /// 取得Domain列表
        /// </summary>
        /// <param name="productId">productId</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public IList<BaseDomainDTO> GetDomainList(Guid productId)
        {
            BaseDomainBusiness baseDomainBusiness = new BaseDomainBusiness();
            var baseDomainDTOs = baseDomainBusiness.GetBaseDomainList(new BaseDomainDTO { Product_Id = productId }, 1, int.MaxValue);
            return baseDomainDTOs.Results;
        }
        #endregion

        #region SaveBaseDomain
        /// <summary>
        /// 保存BaseDomain信息
        /// </summary>
        /// <param name="baseDomainDTO"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseDomain(BaseDomainDTO baseDomainDTO, PageAction pageAction)
        {
            BaseDomainBusiness baseDomainBusiness = new BaseDomainBusiness();
            string result = baseDomainBusiness.SaveBaseDomain(baseDomainDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseDomain
        /// <summary>
        /// delete BaseDomain by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseDomain(Guid id)
        {
            BaseDomainBusiness baseDomainBusiness = new BaseDomainBusiness();
            string result = baseDomainBusiness.DeleteBaseDomain(id);

            return result;
        }
        #endregion

        #region GetDomainXml
        [WebMethod(EnableSession = true)]
        public string GetDomainXml(List<BaseDomainDTO> listBaseDomainDTO)
        {
            BaseDomainBusiness baseDomainBusiness = new BaseDomainBusiness();
            return baseDomainBusiness.GetDomainXml(listBaseDomainDTO);
        }
        #endregion

        #region ImportDomain
        [WebMethod(EnableSession = true)]
        public Dictionary<string, List<string>> ImportDomain(List<BaseDomainDTO> listBaseDomainDTO)
        {
            BaseDomainBusiness baseDomainBusiness = new BaseDomainBusiness();
            return baseDomainBusiness.ImportDoamin(listBaseDomainDTO);
        }
        #endregion
    }
}
