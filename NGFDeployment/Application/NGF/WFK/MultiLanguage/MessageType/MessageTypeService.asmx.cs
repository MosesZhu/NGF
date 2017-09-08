using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MessageType
{
    /// <summary>
    /// Summary description for MessageTypeService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MessageTypeService : System.Web.Services.WebService
    {

        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion return "Hello World";

        #region GetMessageTypeList
        /// <summary>
        /// 获取Message Type列表
        /// </summary>
        /// <param name="messageCategoryId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public IList<BaseMessageTypeDTO> GetMessageTypeList(Guid messageCategoryId)
        {
            BaseMessageTypeBusiness baseMessageTypeBusiness = new BaseMessageTypeBusiness();
            var baseMessageTypeDTOs = baseMessageTypeBusiness.GetBaseMessageTypeList(new BaseMessageTypeDTO { Category_Id = messageCategoryId }, 1, int.MaxValue);
            return baseMessageTypeDTOs.Results;
        }
        #endregion

        #region GetBaseMessageType
        /// <summary>
        /// 获取单个Message Type
        /// </summary>
        /// <param name="messageTypeId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseMessageTypeDTO GetBaseMessageType(Guid messageTypeId)
        {
            BaseMessageTypeBusiness baseMessageTypeBusiness = new BaseMessageTypeBusiness();
            BaseMessageTypeDTO baseMessageTypeDTO = baseMessageTypeBusiness.GetBaseMessageType(messageTypeId);
            return baseMessageTypeDTO;
        }
        #endregion

        #region GetTypeCode
        [WebMethod(EnableSession = true)]
        public string GetTypeCode(Guid messageTypeId)
        {
            BaseMessageTypeDTO baseMessageTypeDTO = GetBaseMessageType(messageTypeId);
            return baseMessageTypeDTO.Type_Code;
        }
        #endregion

        #region SaveBaseMessageType
        /// <summary>
        /// 保存Message Type
        /// </summary>
        /// <param name="baseMessageTypeDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseMessageType(BaseMessageTypeDTO baseMessageTypeDTO, PageAction pageAction)
        {
            BaseMessageTypeBusiness baseMessageTypeBusiness = new BaseMessageTypeBusiness();
            string result = baseMessageTypeBusiness.SaveBaseMessageType(baseMessageTypeDTO, pageAction);
            return result;
        }
        #endregion

        #region DeleteBaseMessageType
        /// <summary>
        /// 删除Message Type
        /// </summary>
        /// <param name="messageTypeId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseMessageType(Guid messageTypeId)
        {
            BaseMessageTypeBusiness baseMessageTypeBusiness = new BaseMessageTypeBusiness();
            string result = baseMessageTypeBusiness.DeleteBaseMessageType(messageTypeId);
            return result;
        }
        #endregion

    }
}
