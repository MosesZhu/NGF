using System;
using System.Collections.Generic;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Product
{
    /// <summary>
    /// Summary description for ProductService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ProductService : WebService
    {
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetProduct
        /// <summary>
        /// 取得Product列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseProductDTO GetProduct(Guid id)
        {
            BaseProductBusiness baseProductBusiness = new BaseProductBusiness();
            var baseProductDto = baseProductBusiness.GetBaseProduct(id);

            return baseProductDto;
        }
        #endregion

        #region GetProductList
        /// <summary>
        /// 取得Product列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public IList<BaseProductDTO> GetProductList()
        {
            BaseProductBusiness baseProductBusiness = new BaseProductBusiness();
            var baseProductDTOs = baseProductBusiness.GetBaseProductList(new BaseProductDTO(), 1, int.MaxValue);
            return baseProductDTOs.Results;
        }
        #endregion

        #region SaveBaseProduct

        /// <summary>
        /// 保存BaseProduct信息
        /// </summary>
        /// <param name="baseProductDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseProduct(BaseProductDTO baseProductDTO, PageAction pageAction)
        {
            BaseProductBusiness baseProductBusiness = new BaseProductBusiness();
            string result = baseProductBusiness.SaveBaseProduct(baseProductDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseProduct
        /// <summary>
        /// delete BaseProduct by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseProduct(Guid id)
        {
            BaseProductBusiness baseProductBusiness = new BaseProductBusiness();
            string result = baseProductBusiness.DeleteBaseProduct(id);

            return result;
        }
        #endregion

        #region GetProductXml
        [WebMethod(EnableSession = true)]
        public string GetProductXml(List<BaseProductDTO> listBaseProductDTO)
        {
            BaseProductBusiness baseProductBusiness = new BaseProductBusiness();
            return baseProductBusiness.GetProductXml(listBaseProductDTO);
        }
        #endregion

        #region ImportProduct
        [WebMethod(EnableSession = true)]
        public Dictionary<string, List<string>> ImportProduct(List<BaseProductDTO> listBaseProductDTO)
        {
            BaseProductBusiness baseProductBusiness = new BaseProductBusiness();
            return baseProductBusiness.ImportProduct(listBaseProductDTO);
        }
        #endregion
    }
}
