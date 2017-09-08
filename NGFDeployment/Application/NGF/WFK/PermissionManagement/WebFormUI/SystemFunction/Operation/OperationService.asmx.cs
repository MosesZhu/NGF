using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Operation
{
    /// <summary>
    /// Summary description for OperationService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class OperationService : System.Web.Services.WebService
    {
        [WebMethod(EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod(EnableSession=true)]
        public BaseOperationDTO GetOperation(Guid id)
        {
            BaseOperationBusiness baseOperationBusiness = new BaseOperationBusiness();
            var baseOperationDTo = baseOperationBusiness.GetBaseOperation(id);
            return baseOperationDTo;
        }

        #region SaveBaseOperation
        /// <summary>
        /// 保存BaseOperation信息
        /// </summary>
        /// <param name="baseOperationDTO"></param>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string SaveBaseOperation(BaseOperationDTO baseOperationDTO, PageAction pageAction)
        {
            BaseOperationBusiness baseOperationBusiness = new BaseOperationBusiness();
            string result = baseOperationBusiness.SaveBaseOperation(baseOperationDTO, pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseOperation
        /// <summary>
        /// delete BaseOperation by id
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession=true)]
        public string DeleteBaseOperation(Guid id)
        {
            BaseOperationBusiness baseOperationBusiness = new BaseOperationBusiness();
            string result = baseOperationBusiness.DeleteBaseOperation(id);
            return result;
        }
        #endregion
    }
}
