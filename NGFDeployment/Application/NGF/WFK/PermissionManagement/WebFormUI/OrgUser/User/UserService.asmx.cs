using System;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using System.Collections.Generic;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.User
{
    /// <summary>
    /// Summary description for UserService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class UserService : WebService
    {
        #region HelloWorld Test
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetGenderList
        /// <summary>
        /// 取得Gender列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<string> GetGenderList()
        {
            BaseUserBusiness baseUserBusiness = new BaseUserBusiness();
            IList<string> genders = baseUserBusiness.GetGenderList();
            return genders.ToList();
        }
        #endregion

        #region GetUser
        /// <summary>
        /// 取得User列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public UserDTO GetUser(Guid id)
        {
            BaseUserBusiness baseUserBusiness = new BaseUserBusiness();
            var userDto = baseUserBusiness.GetUser(id);

            return userDto;
        }
        #endregion

        #region SaveBaseUser
        /// <summary>
        /// 保存BaseUser信息
        /// </summary>
        /// <param name="userDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string SaveBaseUser(UserDTO userDTO, PageAction pageAction)
        {
            BaseUserBusiness baseUserBusiness = new BaseUserBusiness();
            string result = baseUserBusiness.SaveUser(userDTO,pageAction);
            return result;
        }
        #endregion

        #region DeleteBaseUser
        /// <summary>
        /// Delete BaseUser by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string DeleteBaseUser(Guid id)
        {
            BaseUserBusiness baseUserBusiness = new BaseUserBusiness();

            string result = baseUserBusiness.DeleteUser(id);

            return result;
        }

        #endregion
    }
}
