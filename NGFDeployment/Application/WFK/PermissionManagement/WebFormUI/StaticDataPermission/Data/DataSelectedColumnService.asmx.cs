using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.Data
{
    /// <summary>
    /// DataSelectedColumnService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    [System.Web.Script.Services.ScriptService]
    public class DataSelectedColumnService : System.Web.Services.WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }


        #region GetBaseDataSelectedColumn
        /// <summary>
        /// 取得Data Selected Column列表
        /// </summary>
        /// <param name="dataId">dataId</param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public List<BaseDataSelectedColumnDTO> GetBaseDataSelectedColumn(Guid dataId)
        {
            BaseDataSelectedColumnBusiness baseDataSelectedColumnBusiness = new BaseDataSelectedColumnBusiness();
            var baseDataSelectedColumnDTOs = baseDataSelectedColumnBusiness.GetBaseDataSelectedColumnList(dataId);

            return baseDataSelectedColumnDTOs.ToList();
        }
        #endregion
    }
}
