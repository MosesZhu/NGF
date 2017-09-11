using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common.EasyuiHelp;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemMaintenance.SystemGroup
{
    /// <summary>
    /// Summary description for SystemGroupService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SystemGroupService : WebService
    {
        #region Hello World
        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetSystemGroupList
        /// <summary>
        /// 取得SystemGroup列表
        /// </summary>
        /// <param name="orgId">orgId</param>
        ///  <param name="productId">productId</param>
        ///<returns></returns>
        [WebMethod(EnableSession = true)]
        public IList<BaseSystemGroupDTO> GetSystemGroupList(Guid orgId, Guid productId)
        {
            BaseSystemGroupBusiness baseSystemGroupBusiness = new BaseSystemGroupBusiness();
            var baseSystemGroupDTOs = baseSystemGroupBusiness.GetSystemGroupList(new BaseSystemGroupDTO { Org_Id = orgId, Product_Id = productId }, 1, int.MaxValue);
            return baseSystemGroupDTOs.Results;
        }
        #endregion

        #region GetSystemGroup
        /// <summary>
        /// 取得SystemGroup列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseSystemGroupDTO GetSystemGroup(Guid id)
        {
            BaseSystemGroupBusiness baseSystemGroupBusiness = new BaseSystemGroupBusiness();
            var baseSystemGroupDto = baseSystemGroupBusiness.GetSystemGroup(id);
            return baseSystemGroupDto;
        }
        #endregion

        #region SaveSystemGroup

        /// <summary>
        /// 保存SystemGroup信息
        /// </summary>
        /// <param name="baseSystemGroupDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveSystemGroup(BaseSystemGroupDTO baseSystemGroupDTO, PageAction pageAction)
        {
            BaseSystemGroupBusiness baseSystemGroupBusiness = new BaseSystemGroupBusiness();
            string result = baseSystemGroupBusiness.SaveSystemGroup(baseSystemGroupDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteSystemGroup
        /// <summary>
        /// delete SystemGroup by id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteSystemGroup(Guid id)
        {
            BaseSystemGroupBusiness baseSystemGroupBusiness = new BaseSystemGroupBusiness();
            string result = baseSystemGroupBusiness.DeleteSystemGroup(id);

            return result;
        }
        #endregion
    }
}
