using System;
using System.Collections.Generic;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Config.JobSetting
{
    /// <summary>
    /// Summary description for BaseJobService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ConfigJobService : System.Web.Services.WebService
    {
        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetBaseJob
        /// <summary>
        /// 根据base job id获取单个Base Job
        /// </summary>
        /// <param name="baseJobId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseConfigJobDTO GetBaseJob(Guid baseJobId)
        {
            BaseConfigJobBusiness baseJobBusiness = new BaseConfigJobBusiness();
            BaseConfigJobDTO baseJobDTO = baseJobBusiness.GetBaseJob(baseJobId);
            return baseJobDTO;
        }
        #endregion

        #region SaveBaseJob
        /// <summary>
        /// 保存Base Job
        /// </summary>
        /// <param name="baseJobDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseJob(BaseConfigJobDTO baseJobDTO, PageAction pageAction)
        {
            BaseConfigJobBusiness baseJobBusiness = new BaseConfigJobBusiness();
            string result = baseJobBusiness.SaveBaseJob(baseJobDTO, pageAction);
            return result;
        }
        #endregion

        #region DeleteBaseJob
        /// <summary>
        /// 删除Base Job
        /// </summary>
        /// <param name="baseJobId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseJob(Guid baseJobId)
        {
            BaseConfigJobBusiness baseJobBusiness = new BaseConfigJobBusiness();
            string result = baseJobBusiness.DeleteBaseJob(baseJobId);
            return result;
        }
        #endregion

        #region GetConfigJobXml
        [WebMethod(EnableSession = true)]
        public string GetConfigJobXml(List<BaseConfigJobDTO> listBaseConfigJobDTO)
        {
            BaseConfigJobBusiness baseJobBusiness = new BaseConfigJobBusiness();
            return baseJobBusiness.GetConfigJobXml(listBaseConfigJobDTO);
        }
        #endregion

        #region ImportConfigJob
        [WebMethod(EnableSession = true)]
        public Dictionary<string, List<string>> ImportConfigJob(List<BaseConfigJobDTO> listBaseConfigJobDTO)
        {
            BaseConfigJobBusiness baseJobBusiness = new BaseConfigJobBusiness();
            return baseJobBusiness.ImportConfigJob(listBaseConfigJobDTO);
        }
        #endregion
    }
}
