using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Common;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Function
{
    /// <summary>
    /// Summary description for FunctionService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class FunctionService : WebService
    {
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        #region GetNodeTypeList
        /// <summary>
        /// 取得NodeType列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetNodeTypeList()
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            var nodeTypeList = baseFunctionBusiness.GetNodeTypeList().ToList();

            return nodeTypeList;
        }
        #endregion

        #region GetInstanceTypeList
        /// <summary>
        /// 取得InstanceType列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetInstanceTypeList()
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            var instanceTypeList = baseFunctionBusiness.GetInstanceTypeList().ToList();
            return instanceTypeList;
        }
        #endregion

        #region GetTargetList
        /// <summary>
        /// 取得Target列表
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public List<string> GetTargetList()
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            var targetList = baseFunctionBusiness.GetTargetList().ToList();
            return targetList;
        }
        #endregion

        #region GetFunction
        [WebMethod(EnableSession = true)]
        public List<BaseFunctionDTO> GetFunctionList(Guid systemId)
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            var listBaseFunctionDTO = baseFunctionBusiness.GetFunctionList(systemId);
            return listBaseFunctionDTO;
        }
        #endregion

        #region GetFunction
        [WebMethod(EnableSession = true)]
        public BaseFunctionDTO GetFunction(Guid id)
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            var baseFunctionDTo = baseFunctionBusiness.GetBaseFunction(id);
            return baseFunctionDTo;
        }
        #endregion

        #region GetFunctionScope
        [WebMethod(EnableSession = true)]
        public IList<BaseFunctionScopeDTO> GetFunctionScope(Guid functionId)
        {
            BaseFunctionScopeBusiness baseFunctionScopeBusiness = new BaseFunctionScopeBusiness();
            IList<BaseFunctionScopeDTO> baseFunctionScopeList = baseFunctionScopeBusiness.GetFunctionScopeList(functionId);
            return baseFunctionScopeList;
        }
        #endregion

        #region SaveBaseFunction
        /// <summary>
        /// 保存BaseFunction信息
        /// </summary>
        /// <param name="baseFunctionDTO"></param>
        /// <param name="pageAction"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string SaveBaseFunction(BaseFunctionDTO baseFunctionDTO, IList<BaseFunctionScopeDTO> functionScopes, PageAction pageAction)
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            string result = baseFunctionBusiness.SaveBaseFunction(baseFunctionDTO, functionScopes, pageAction);

            return result;
        }
        #endregion

        #region DeleteBaseFunction
        /// <summary>
        /// delete BaseFunction by id
        /// </summary>
        /// <param name="deleteType">删除类型，值为SystemAllChildren, FunctionAndAllChildren</param>
        /// <param name="systemId"></param>
        /// <param name="functionId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string DeleteBaseFunction(string deleteType, Guid systemId, Guid functionId)
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            string result = baseFunctionBusiness.DeleteBaseFunction(deleteType, systemId, functionId);
            return result;
        }
        #endregion

        /// <summary>
        /// Copy BaseFunction信息
        /// </summary>
        /// <param name="baseFunctions"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string CopyFunction(Guid systemId, string nodeType, Guid? parentFunctionId, IList<BaseFunctionDTO> baseFunctions)
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            string result = baseFunctionBusiness.CopyFunction(systemId, nodeType, parentFunctionId, baseFunctions);
            return result;
        }

        #region GetFunctionXml
        [WebMethod(EnableSession = true)]
        public string GetFunctionXml(List<BaseFunctionDTO> listBaseFunctionDTO)
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            return baseFunctionBusiness.GetFunctionXml(listBaseFunctionDTO);
        }
        #endregion

        #region ImportFunction
        [WebMethod(EnableSession = true)]
        public Dictionary<string, List<string>> ImportFunction(List<BaseFunctionDTO> listBaseFunctionDTO)
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            return baseFunctionBusiness.ImportFunction(listBaseFunctionDTO);
        }
        #endregion
    }
}
