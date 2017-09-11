using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using ITS.WebFramework.PermissionManagement.Business;
using ITS.WebFramework.PermissionManagement.Business.Job;
using ITS.WebFramework.PermissionManagement.DTO;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Other.Test
{
    /// <summary>
    /// Summary description for JqueryTestService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class JqueryTestService : WebService
    {
        ///<summary>
        /// 无参数
        /// </summary> 
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        ///<summary>
        /// 传入参数
        /// </summary> 
        [WebMethod(EnableSession = true)]
        public string Hello(string name)
        {
            return string.Format("Hello {0}", name);
        }

        /// <summary>
        /// 返回泛型列表
        /// </summary> 
        [WebMethod(EnableSession = true)]
        public List<int> CreateArray(int i)
        {
            List<int> list = new List<int>();

            while (i >= 0)
            {
                list.Add(i--);
            }

            return list;
        }

        ///  <summary>
        /// 返回复杂类型
        /// </summary> 
        [WebMethod(EnableSession = true)]
        public Person GetPerson(string name, int age)
        {
            return new Person
                {
                    Name = name,
                    Age = age
                };
        }

        ///  <summary>
        /// 返回复杂类型
        /// </summary> 
        [WebMethod(EnableSession = true)]
        public string RunJob()
        {
            QueuePermissionBusiness queuePermissionBusiness = new QueuePermissionBusiness();
            queuePermissionBusiness.Run();

            return string.Empty;
        }


        #region GetData1

        [WebMethod(EnableSession = true)]
        public List<BaseFunctionDTO> GetData1()
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            var result = baseFunctionBusiness.GetFunctionTree(new Guid("386A5D3D-AE6A-4562-8E6C-749EFB351F1C"));
            return result.ToList();

        }

        [WebMethod(EnableSession = true)]
        public string GetData2()
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            var result = baseFunctionBusiness.GetFunctionTree(new Guid("386A5D3D-AE6A-4562-8E6C-749EFB351F1C"));

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string serializerFunctions = javaScriptSerializer.Serialize(result);

            return serializerFunctions;
        }

        [WebMethod(EnableSession = true)]
        public string GetData3()
        {
            var json = File.ReadAllText(HttpContext.Current.Server.MapPath("~/Test/treegrid/treegrid_data2.json"));
            return json;
        }

        [WebMethod(EnableSession = true)]
        public string GetData4()
        {
            var queryString = HttpContext.Current.Request.QueryString;


            return queryString[0];
        }
        #endregion

        /// <summary>
        /// 返回泛型列表
        /// </summary> 
        [WebMethod(EnableSession = true)]
        public List<int> GetData10(int i)
        {
            Thread.Sleep(3000);

            List<int> list = new List<int>();

            while (i >= 0)
            {
                list.Add(i--);
            }

            return list;
        }

        /// <summary>
        /// 根据系统名称、功能名称，获取功能ID
        /// </summary>
        /// <param name="systemName"></param>
        /// <param name="funcitonName"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public Guid GetFunctionId(string systemName, string functionName)
        {
            BaseFunctionBusiness baseFunctionBusiness = new BaseFunctionBusiness();
            return baseFunctionBusiness.GetFunctionId(systemName, functionName);
        }
    }




    /// 
    /// 复杂类型
    /// 
    [Serializable]
    public class Person
    {
        public string Name { get; set; }

        public int Age { get; set; }
    }
}
