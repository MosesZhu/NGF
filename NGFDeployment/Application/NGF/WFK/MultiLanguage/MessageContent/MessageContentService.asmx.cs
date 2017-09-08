using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.SSO.Session;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MessageContent
{
    /// <summary>
    /// Summary description for MessageContentService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MessageContentService : System.Web.Services.WebService
    {

        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion return "Hello World";

        #region GetMessageStatusList
        /// <summary>
        /// 获取Message Status列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetMessageStatusList()
        {
            BaseMessageContentBusiness baseMessageContentBusiness = new BaseMessageContentBusiness();
            var messageStatus = baseMessageContentBusiness.GetMessageStatusList().ToList();

            return messageStatus;
        }
        #endregion

        #region GetBaseMessageContent
        /// <summary>
        /// 获取单个Message Content
        /// </summary>
        /// <param name="messageContentId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseMultiLanguageTextDTO GetBaseMessageContent(Guid messageContentId)
        {
            BaseMessageContentBusiness baseMessageContentBusiness = new BaseMessageContentBusiness();
            BaseMultiLanguageTextDTO baseMultiLanguageTextDTO = baseMessageContentBusiness.GetBaseMessageContent(messageContentId);
            return baseMultiLanguageTextDTO;

        }
        #endregion

        #region SaveBaseMessageContent
        /// <summary>
        /// 保存Message Content
        /// </summary>
        /// <param name="baseMultiLanguageTextDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseMessageContent(BaseMultiLanguageTextDTO baseMultiLanguageTextDTO, PageAction pageAction)
        {
            BaseMessageContentBusiness baseMessageContentBusiness = new BaseMessageContentBusiness();
            string result = baseMessageContentBusiness.SaveBaseMessageContent(baseMultiLanguageTextDTO, pageAction);
            return result;
        }
        #endregion

        #region DeleteBaseMessageContent
        /// <summary>
        /// 删除Message Content
        /// </summary>
        /// <param name="messageContentId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseMessageContent(Guid messageContentId)
        {
            BaseMessageContentBusiness baseMessageContentBusiness = new BaseMessageContentBusiness();
            string result = baseMessageContentBusiness.DeleteBaseMessageContent(messageContentId);
            return result;
        }
        #endregion

        #region ApproveMessage
        /// <summary>
        /// 批准Message Content
        /// </summary>
        /// <param name="messageContentId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string ApproveMessage(Guid messageContentId)
        {
            BaseMessageContentBusiness baseMessageContentBusiness = new BaseMessageContentBusiness();
            string result = baseMessageContentBusiness.ApproveMessage(messageContentId);
            return result;
        }
        #endregion

        #region IsCurrentUserMessageAdmin
        /// <summary>
        /// 检查当前用户是否是Message管理员
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public bool IsCurrentUserMessageAdmin()
        {
            BaseMessageContentBusiness baseMessageContentBusiness = new BaseMessageContentBusiness();
            var listMessageAdminUser = baseMessageContentBusiness.GetMessageAdminRoleUser();
            int count = listMessageAdminUser.Where(t => t.User_Id == SSOContext.Current.UserID).Count();
            return count > 0;
        }
        #endregion
    }
}
