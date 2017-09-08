using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;


namespace ITS.WebFramework.PermissionManagement.WebFormUI.Config.GlobalResource
{
    /// <summary>
    /// Summary description for ConfigGlobalResourceService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ConfigGlobalResourceService : System.Web.Services.WebService
    {

        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetGlobalResourceTypeList
        /// <summary>
        /// 获取Global Resource Type列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetGlobalResourceTypeList()
        {
            BaseConfigGlobalResourceBusiness baseConfigGlobalResourceBusiness = new BaseConfigGlobalResourceBusiness();
            List<string> listGlobalResourceType = baseConfigGlobalResourceBusiness.GetGlobalResourceTypeList().ToList();
            return listGlobalResourceType;
        }
        #endregion

        #region GetGlobalResourcePositionList
        /// <summary>
        /// 获取Global Resource Position列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetGlobalResourcePositionList()
        {
            BaseConfigGlobalResourceBusiness baseConfigGlobalResourceBusiness = new BaseConfigGlobalResourceBusiness();
            List<string> listGlobalResourcePosition = baseConfigGlobalResourceBusiness.GetGlobalResourcePositionList().ToList();
            return listGlobalResourcePosition;
        }
        #endregion

        #region GetBaseConfigGlobalResource
        /// <summary>
        /// 获取单个Base Config Global Resource
        /// </summary>
        /// <param name="configGlobalResourceId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseConfigGlobalResourceDTO GetBaseConfigGlobalResource(Guid configGlobalResourceId)
        {
            BaseConfigGlobalResourceBusiness baseConfigGlobalResourceBusiness = new BaseConfigGlobalResourceBusiness();
            BaseConfigGlobalResourceDTO baseConfigGlobalResourceDTO = baseConfigGlobalResourceBusiness.GetBaseConfigGlobalResource(configGlobalResourceId);
            return baseConfigGlobalResourceDTO;
        }
        #endregion

        #region SaveBaseConfigGlobalResource
        /// <summary>
        /// 保存Base Config Global Resource
        /// </summary>
        /// <param name="baseConfigGlobalResourceDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseConfigGlobalResource(BaseConfigGlobalResourceDTO baseConfigGlobalResourceDTO, PageAction pageAction)
        {
            BaseConfigGlobalResourceBusiness baseConfigGlobalResourceBusiness = new BaseConfigGlobalResourceBusiness();
            string result = baseConfigGlobalResourceBusiness.SaveBaseConfigGlobalResource(baseConfigGlobalResourceDTO, pageAction);
            return result;
        }
        #endregion

        #region DeleteBaseConfigGlobalResource
        /// <summary>
        /// 删除Base Config Global Resource
        /// </summary>
        /// <param name="configGlobalResourceId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseConfigGlobalResource(Guid configGlobalResourceId)
        {
            BaseConfigGlobalResourceBusiness baseConfigGlobalResourceBusiness = new BaseConfigGlobalResourceBusiness();
            string result = baseConfigGlobalResourceBusiness.DeleteBaseConfigGlobalResource(configGlobalResourceId);
            return result;
        }
        #endregion

        #region GetConfigGlobalResourceXml
        [WebMethod(EnableSession = true)]
        public string GetConfigGlobalResourceXml(List<BaseConfigGlobalResourceDTO> listBaseConfigGlobalResourceDTO)
        {
            BaseConfigGlobalResourceBusiness baseConfigGlobalResourceBusiness = new BaseConfigGlobalResourceBusiness();
            return baseConfigGlobalResourceBusiness.GetConfigGlobalResourceXml(listBaseConfigGlobalResourceDTO);
        }
        #endregion

        #region ImportConfigGlobalResource
        [WebMethod(EnableSession = true)]
        public Dictionary<string, List<string>> ImportConfigGlobalResource(List<BaseConfigGlobalResourceDTO> listBaseConfigGlobalResourceDTO)
        {
            BaseConfigGlobalResourceBusiness baseConfigGlobalResourceBusiness = new BaseConfigGlobalResourceBusiness();
            return baseConfigGlobalResourceBusiness.ImportConfigGlobalResource(listBaseConfigGlobalResourceDTO);
        }
        #endregion
    }
}
