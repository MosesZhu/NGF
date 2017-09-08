using System;
using System.Collections.Generic;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Config.GlobalSetting
{
    /// <summary>
    /// Summary description for ConfigGlobalService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ConfigGlobalService : System.Web.Services.WebService
    {

        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetBaseConfigGlobal
        [WebMethod(EnableSession = true)]
        public BaseConfigGlobalDTO GetBaseConfigGlobal(Guid configGlobalId)
        {
            BaseConfigGlobalBusiness baseConfigGlobalBusiness = new BaseConfigGlobalBusiness();
            BaseConfigGlobalDTO baseConfigGlobalDTO = baseConfigGlobalBusiness.GetBaseConfigGlobal(configGlobalId);
            return baseConfigGlobalDTO;
        }
        #endregion

        #region SaveBaseConfigGlobal
        [WebMethod(EnableSession = true)]
        public string SaveBaseConfigGlobal(BaseConfigGlobalDTO baseConfigGlobalDTO, PageAction pageAction)
        {
            BaseConfigGlobalBusiness baseConfigGlobalBusiness = new BaseConfigGlobalBusiness();
            string result = baseConfigGlobalBusiness.SaveBaseConfigGlobal(baseConfigGlobalDTO, pageAction);
            return result;
        }
        #endregion

        #region DeleteBaseConfigGlobal
        [WebMethod(EnableSession = true)]
        public string DeleteBaseConfigGlobal(Guid configGlobalId)
        {

            BaseConfigGlobalBusiness baseConfigGlobalBusiness = new BaseConfigGlobalBusiness();
            string result = baseConfigGlobalBusiness.DeleteBaseConfigGlobal(configGlobalId);
            return result;
        }
        #endregion

        #region GetConfigGlobalXml
        [WebMethod(EnableSession = true)]
        public string GetConfigGlobalXml(List<BaseConfigGlobalDTO> listBaseConfigGlobalDTO)
        {
            BaseConfigGlobalBusiness baseConfigGlobalBusiness = new BaseConfigGlobalBusiness();
            return baseConfigGlobalBusiness.GetConfigGlobalXml(listBaseConfigGlobalDTO);
        }
        #endregion

        #region ImportConfigGlobal
        [WebMethod(EnableSession = true)]
        public Dictionary<string, List<string>> ImportConfigGlobal(List<BaseConfigGlobalDTO> listBaseConfigGlobalDTO)
        {
            BaseConfigGlobalBusiness baseConfigGlobalBusiness = new BaseConfigGlobalBusiness();
            return baseConfigGlobalBusiness.ImportConfigGlobal(listBaseConfigGlobalDTO);
        }
        #endregion
    }
}
