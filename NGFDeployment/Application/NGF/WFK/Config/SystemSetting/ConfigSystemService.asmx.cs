using System;
using System.Collections.Generic;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Config.SystemSetting
{
    /// <summary>
    /// Summary description for ConfigSystemService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ConfigSystemService : System.Web.Services.WebService
    {

        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetBaseConfigSystem
        /// <summary>
        /// 获取单个Base Config System
        /// </summary>
        /// <param name="configSystemId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseConfigSystemDTO GetBaseConfigSystem(Guid configSystemId)
        {
            BaseConfigSystemBusiness baseConfigSystemBusiness = new BaseConfigSystemBusiness();
            BaseConfigSystemDTO baseConfigSystemDTO = baseConfigSystemBusiness.GetBaseConfigSystem(configSystemId);
            return baseConfigSystemDTO;
        }
        #endregion

        #region SaveBaseConfigSystem
        /// <summary>
        /// 保存Base Config System
        /// </summary>
        /// <param name="baseConfigSystemDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseConfigSystem(BaseConfigSystemDTO baseConfigSystemDTO, PageAction pageAction)
        {
            BaseConfigSystemBusiness baseConfigSystemBusiness = new BaseConfigSystemBusiness();
            string result = baseConfigSystemBusiness.SaveBaseConfigSystem(baseConfigSystemDTO, pageAction);
            return result;
        }
        #endregion

        #region DeleteBaseConfigSystem
        /// <summary>
        /// 删除Base Config System
        /// </summary>
        /// <param name="configSystemId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseConfigSystem(Guid configSystemId)
        {
            BaseConfigSystemBusiness baseConfigSystemBusiness = new BaseConfigSystemBusiness();
            string result = baseConfigSystemBusiness.DeleteBaseConfigSystem(configSystemId);
            return result;

        }
        #endregion

        #region GetConfigSystemXml
        [WebMethod(EnableSession = true)]
        public string GetConfigSystemXml(List<BaseConfigSystemDTO> listBaseConfigSystemDTO)
        {
            BaseConfigSystemBusiness baseConfigSystemBusiness = new BaseConfigSystemBusiness();
            return baseConfigSystemBusiness.GetConfigSystemXml(listBaseConfigSystemDTO);
        }
        #endregion

        #region ImportConfigSystem
        [WebMethod(EnableSession = true)]
        public Dictionary<string, List<string>> ImportConfigSystem(List<BaseConfigSystemDTO> listBaseConfigSystemDTO)
        {
            BaseConfigSystemBusiness baseConfigSystemBusiness = new BaseConfigSystemBusiness();
            return baseConfigSystemBusiness.ImportConfigSystem(listBaseConfigSystemDTO);
        }
        #endregion
    }
}
