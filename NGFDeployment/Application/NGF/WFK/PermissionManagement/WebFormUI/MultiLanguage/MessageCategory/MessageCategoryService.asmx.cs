using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MessageCategory
{
    /// <summary>
    /// Summary description for MessageCategoryService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MessageCategoryService : System.Web.Services.WebService
    {

        #region HelloWorld Test
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion return "Hello World";

        #region GetMessageCategoryList
        /// <summary>
        /// 获取Message Category列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public IList<BaseMessageCategoryDTO> GetMessageCategoryList()
        {
            BaseMessageCategoryBusiness baseMessageCategoryBusiness = new BaseMessageCategoryBusiness();
            var baseMessageCategoryDTOs = baseMessageCategoryBusiness.GetBaseMessageCategoryList(new BaseMessageCategoryDTO(), 1, int.MaxValue);
            return baseMessageCategoryDTOs.Results;
        }
        #endregion

        #region GetBaseMessageCategory
        /// <summary>
        /// 获取单个Message Category
        /// </summary>
        /// <param name="messageCategoryId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseMessageCategoryDTO GetBaseMessageCategory(Guid messageCategoryId)
        {
            BaseMessageCategoryBusiness baseMessageCategoryBusiness = new BaseMessageCategoryBusiness();
            BaseMessageCategoryDTO baseMessageCategoryDTO = baseMessageCategoryBusiness.GetBaseMessageCategory(messageCategoryId);
            return baseMessageCategoryDTO;
        }
        #endregion

        #region GetCategoryCode
        /// <summary>
        /// 获取Category Code
        /// </summary>
        /// <param name="messageCategoryId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string GetCategoryCode(Guid messageCategoryId)
        {
            BaseMessageCategoryDTO baseMessageCategoryDTO = GetBaseMessageCategory(messageCategoryId);
            return baseMessageCategoryDTO.Category_Code;
        }
        #endregion

        #region SaveBaseMessageCategory
        /// <summary>
        /// 保存Message Category
        /// </summary>
        /// <param name="baseMessageCategoryDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseMessageCategory(BaseMessageCategoryDTO baseMessageCategoryDTO, PageAction pageAction)
        {
            BaseMessageCategoryBusiness baseMessageCategoryBusiness = new BaseMessageCategoryBusiness();
            string result = baseMessageCategoryBusiness.SaveBaseMessageCategory(baseMessageCategoryDTO, pageAction);
            return result;
        }
        #endregion

        #region DeleteBaseMessageCategory
        /// <summary>
        /// 删除Message Category
        /// </summary>
        /// <param name="messageCategoryId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseMessageCategory(Guid messageCategoryId)
        {
            BaseMessageCategoryBusiness baseMessageCategoryBusiness = new BaseMessageCategoryBusiness();
            string result = baseMessageCategoryBusiness.DeleteBaseMessageCategory(messageCategoryId);
            return result;
        }
        #endregion

    }
}
