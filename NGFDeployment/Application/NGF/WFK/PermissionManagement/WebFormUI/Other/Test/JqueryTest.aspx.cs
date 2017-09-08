using System;
using System.Collections.Generic;
using System.Linq;
using ITS.WebFramework.Web;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Other.Test
{
    public partial class JqueryTest : WebPageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LabelMessage.Text = "This message is from ITS.WebFramework.Web:"
                    + ITS.WebFramework.Message.MFG.QML.CheckMaxMakerCount;
                //PageHelper.ShowError("Error Test", "Error Message", "Error Detal", "ErrorTestCallback", "{test1:\"test1\"}");
                return;
            }
        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            ExecuteCommand(() =>
            {
                List<string> listValue = new List<string>() { "a", "b", "c" };
                var s1 = listValue.Aggregate((current, value1) => current + "," + value1);
                var s2 = listValue.Aggregate(string.Empty, (current, value1) => current + (value1 + ",")).TrimEnd(',');

                throw new Exception(s1 + "&&&&&" + s2);
            });
        }

        protected void Button3_Click(object sender, EventArgs e)
        {
            throw new Exception("test3");
        }
    }


}