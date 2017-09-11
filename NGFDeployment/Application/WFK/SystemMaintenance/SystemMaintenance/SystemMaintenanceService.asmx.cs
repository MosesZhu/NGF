using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;
using ITS.WebFramework.PermissionManagement.Common.PermissionEnum;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemMaintenance.SystemMaintenance
{
    /// <summary>
    /// Summary description for SystemMaintenanceService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SystemMaintenanceService : WebService
    {
        #region Hello World
        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        #endregion

        #region GetSystemMaintenanceList
        /// <summary>
        /// 取得SystemMaintenance列表
        /// </summary>
        /// <param name="orgId">orgId</param>
        ///  <param name="productId">productId</param>
        ///<returns></returns>
        [WebMethod(EnableSession = true)]
        public IList<BaseSystemMaintenanceDTO> GetSystemMaintenanceList(Guid orgId, Guid productId)
        {
            BaseSystemMaintenanceBusiness BaseSystemMaintenanceBusiness = new BaseSystemMaintenanceBusiness();
            var baseSystemMaintenanceDTOs = BaseSystemMaintenanceBusiness.GetSystemMaintenanceList(new BaseSystemMaintenanceDTO { Org_Id = orgId, Product_Id = productId }, 1, int.MaxValue);
            return baseSystemMaintenanceDTOs.Results;
        }
        #endregion

        #region GetSystemMaintenance
        /// <summary>
        /// 取得SystemMaintenance列表
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public BaseSystemMaintenanceDTO GetSystemMaintenance(Guid id)
        {
            BaseSystemMaintenanceBusiness baseSystemMaintenanceBusiness = new BaseSystemMaintenanceBusiness();
            var baseSystemMaintenanceDto = baseSystemMaintenanceBusiness.GetSystemMaintenance(id);
            return baseSystemMaintenanceDto;
        }
        #endregion

        #region GetCategoryList
        /// <summary>
        /// 取得Maintenance_Category列表
        /// </summary>
        ///<returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetCategoryList()
        {
            BaseSystemMaintenanceBusiness baseSystemMaintenanceBusiness = new BaseSystemMaintenanceBusiness();
            var list = baseSystemMaintenanceBusiness.GetCategoryList().ToList();
            return list;
        }
        #endregion

        #region GetSystemList
        /// <summary>
        /// 取得System列表
        /// </summary>
        /// <param name="orgId">orgId</param>
        /// <param name="productId">productId</param>
        ///  <param name="domainId">domainId</param>
        ///<returns></returns>
        [WebMethod(EnableSession = true)]
        public IList<BaseSystemDTO> GetSystemList(Guid orgId, Guid productId, Guid domainId)
        {
            BaseSystemBusiness baseSystemBusiness = new BaseSystemBusiness();
            var baseSystemMaintenanceDTOs = baseSystemBusiness.GetBaseSystemList(
                new BaseSystemDTO { Org_Id = orgId, Product_Id = productId, Domain_Id = domainId }, 1, int.MaxValue);
            return baseSystemMaintenanceDTOs.Results;
        }
        #endregion


        #region GetMaintenanceRole
        /// <summary>
        /// 取得默认MaintenanceRole
        /// </summary>
        /// <param name="systemId"></param>
        /// <param name="systemGroupId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string GetMaintenanceRole(Guid systemId, Guid systemGroupId)
        {
            BaseSystemMaintenanceBusiness baseSystemMaintenanceBusiness = new BaseSystemMaintenanceBusiness();
            string maintenanceRole = baseSystemMaintenanceBusiness.GetMaintenanceRole(systemId, systemGroupId);
            return maintenanceRole;
        }
        #endregion

        #region SaveSystemMaintenance

        /// <summary>
        /// 保存SystemMaintenance信息
        /// </summary>
        /// <param name="baseSystemMaintenanceDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveSystemMaintenance(BaseSystemMaintenanceDTO baseSystemMaintenanceDTO, PageAction pageAction)
        {
            BaseSystemMaintenanceBusiness baseSystemMaintenanceBusiness = new BaseSystemMaintenanceBusiness();
            string result = baseSystemMaintenanceBusiness.SaveSystemMaintenance(baseSystemMaintenanceDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteSystemMaintenance
        /// <summary>
        /// delete SystemMaintenance by id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteSystemMaintenance(Guid id)
        {
            BaseSystemMaintenanceBusiness baseSystemMaintenanceBusiness = new BaseSystemMaintenanceBusiness();
            string result = baseSystemMaintenanceBusiness.DeleteSystemMaintenance(id);

            return result;
        }
        #endregion

        #region CloseSystemMaintenance
        /// <summary>
        /// close SystemMaintenance by id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string CloseSystemMaintenance(Guid id)
        {
            BaseSystemMaintenanceBusiness baseSystemMaintenanceBusiness = new BaseSystemMaintenanceBusiness();
            string result = baseSystemMaintenanceBusiness.CloseSystemMaintenance(id);

            return result;
        }
        #endregion
    }
}
