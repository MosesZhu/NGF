using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Portal.FrameworkLog
{
    /// <summary>
    /// Summary description for FrameworkLogService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class FrameworkLogService : System.Web.Services.WebService
    {

        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetLogStatusList
        /// <summary>
        /// 获取Log Status列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetLogStatusList()
        {
            BaseLogBusiness baseLogBusiness = new BaseLogBusiness();
            var listLogStatus = baseLogBusiness.GetLogStatusList().ToList();
            return listLogStatus;
        }
        #endregion

        #region GetLogTypeList
        /// <summary>
        /// 获取Log Type列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetLogTypeList()
        {
            BaseLogBusiness baseLogBusiness = new BaseLogBusiness();
            var listLogType = baseLogBusiness.GetLogTypeList().ToList();
            return listLogType;
        }
        #endregion

        #region GetFrameworkLog
        /// <summary>
        /// 获取单个FrameworkLog
        /// </summary>
        /// <param name="logId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseLogDTO GetFrameworkLog(Guid logId)
        {
            BaseLogBusiness baseLogBusiness = new BaseLogBusiness();
            var baseLogDTO = baseLogBusiness.GetBaseLog(logId);
            return baseLogDTO;
        }
        #endregion

        #region CloseLog
        /// <summary>
        /// 将Log的状态改为Closed
        /// </summary>
        /// <param name="logId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string CloseLog(Guid logId)
        {
            BaseLogBusiness baseLogBusiness = new BaseLogBusiness();
            string result = baseLogBusiness.CloseLog(logId);
            return result;
        }
        #endregion

        #region BatchCloseLog
        /// <summary>
        /// 批量Close Log
        /// </summary>
        /// <param name="listLogId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string BatchCloseLog(List<Guid> listLogId)
        {
            BaseLogBusiness baseLogBusiness = new BaseLogBusiness();
            string result = baseLogBusiness.BatchCloseLog(listLogId);
            return result;
        }
        #endregion
    }
}
