using System;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.DataPermission
{
    /// <summary>
    /// DataPermissionService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class DataPermissionService : WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetDataPermission
        /// <summary>
        /// 取得DataPermission列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public BaseDataPermissionDTO GetBaseDataPermission(Guid id)
        {
            BaseDataPermissionBusiness baseDataPermissionBusiness = new BaseDataPermissionBusiness();
            var baseDataPermissionDto = baseDataPermissionBusiness.GetBaseDataPermission(id);

            return baseDataPermissionDto;
        }
        #endregion

        #region GetDataPermissionValue
        /// <summary>
        /// 取得DataPermissionValue列表
        /// </summary>
        /// <param name="dataPermissionId">dataPermissionId</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string[] GetBaseDataPermissionValue(Guid dataPermissionId)
        {
            BaseDataPermissionValueBusiness baseDataPermissionValueBusiness = new BaseDataPermissionValueBusiness();
            var values = baseDataPermissionValueBusiness.GetBaseDataPermissionValue(dataPermissionId);

            return values ?? new string[0];
        }
        #endregion

        #region SaveBaseDataPermission

        /// <summary>
        /// 保存BaseDataPermission信息
        /// </summary>
        /// <param name="baseDataPermissionDTO"></param>
        /// <param name="permissionValues"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string SaveBaseDataPermission(BaseDataPermissionDTO baseDataPermissionDTO, string[] permissionValues, PageAction pageAction)
        {
            BaseDataPermissionBusiness baseDataPermissionBusiness = new BaseDataPermissionBusiness();
            string result = baseDataPermissionBusiness.SaveBaseDataPermission(baseDataPermissionDTO, permissionValues, pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseDataPermission
        /// <summary>
        /// delete BaseDataPermission by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string DeleteBaseDataPermission(Guid id)
        {
            BaseDataPermissionBusiness baseDataPermissionBusiness = new BaseDataPermissionBusiness();
            string result = baseDataPermissionBusiness.DeleteBaseDataPermission(id);

            return result;
        }
        #endregion
    }
}
