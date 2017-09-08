<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FrameworkLogInformation.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Portal.FrameworkLog.FrameworkLogInformation" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="10%">
                    <span class="Label">Org</span>
                </td>
                <td width="80%">
                    <input type="text" id="textOrg" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Product</span>
                </td>
                <td width="80%">
                    <input type="text" id="textProduct" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Domain</span>
                </td>
                <td width="80%">
                    <input type="text" id="textDomain" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">System</span>
                </td>
                <td width="80%">
                    <input type="text" id="textSystem" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">User</span>
                </td>
                <td width="80%">
                    <input type="text" id="textUser" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Type</span>
                </td>
                <td width="80%">
                    <input type="text" id="textLogType" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Url</span>
                </td>
                <td width="80%">
                    <textarea id="textUrl" cols="50" rows="3" readonly="readonly" class="TextBox_Disabled"></textarea>
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Referer</span>
                </td>
                <td width="80%">
                    <textarea id="textReferer" cols="50" rows="2" readonly="readonly" class="TextBox_Disabled"></textarea>
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Ip Address</span>
                </td>
                <td width="80%">
                    <input type="text" id="textIpAddress" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">User Agent</span>
                </td>
                <td width="80%">
                    <textarea id="textUserAgent" cols="50" rows="2" readonly="readonly" class="TextBox_Disabled"></textarea>
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Message</span>
                </td>
                <td width="80%">
                    <input type="text" id="textMessage" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Stack Trace</span>
                </td>
                <td width="80%">
                    <textarea id="textStackTrace" cols="50" rows="3" readonly="readonly" class="TextBox_Disabled"></textarea>
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Log Date</span>
                </td>
                <td width="80%">
                    <input type="text" id="textLogDate" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Status</span>
                </td>
                <td width="80%">
                    <input type="text" id="textStatus" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Is Mail Sent</span>
                </td>
                <td width="80%">
                    <input type="checkbox" id="checkboxIsMailSent" disabled="disabled" />
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">System Version</span>
                </td>
                <td width="80%">
                    <input type="text" id="textSystemVersion" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
        </table>
    </div>
    <script type="text/javascript" src="FrameworkLogInformation.js">
    </script>
    </form>
</body>
</html>
