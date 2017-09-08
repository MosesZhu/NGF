<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SSOSessionInformation.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SSO.SSOSession.SSOSessionInformation" %>

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
                <td width="12%">
                    <span class="Label">Org</span>
                </td>
                <td width="80%">
                    <input type="text" id="textOrg" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="12%">
                    <span class="Label">Product</span>
                </td>
                <td width="80%">
                    <input type="text" id="textProduct" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="12%">
                    <span class="Label">Domain</span>
                </td>
                <td width="80%">
                    <input type="text" id="textDomain" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="12%">
                    <span class="Label">User</span>
                </td>
                <td width="80%">
                    <input type="text" id="textUser" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="12%">
                    <span class="Label">Client IP</span>
                </td>
                <td width="80%">
                    <input type="text" id="textClientIp" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="12%">
                    <span class="Label">Data</span>
                </td>
                <td width="80%">
                    <textarea id="textData" cols="50" rows="3" readonly="readonly" class="TextBox_Disabled"></textarea>
                </td>
            </tr>
            <tr>
                <td width="12%">
                    <span class="Label">Type</span>
                </td>
                <td width="80%">
                    <input type="text" id="textSessionType" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="12%">
                    <span class="Label">Language</span>
                </td>
                <td width="80%">
                    <input type="text" id="textLanguage" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="12%">
                    <span class="Label">Status</span>
                </td>
                <td width="80%">
                    <input type="text" id="textStatus" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="12%">
                    <span class="Label">Logon Time</span>
                </td>
                <td width="80%">
                    <input type="text" id="textLogonTime" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
            <tr>
                <td width="12%">
                    <span class="Label">Last Access Time</span>
                </td>
                <td width="80%">
                    <input type="text" id="textLastAccessTime" readonly="readonly" class="TextBox_Disabled" />
                </td>
            </tr>
        </table>
    </div>
    <script type="text/javascript" src="SSOSessionInformation.js">
    </script>
    </form>
</body>
</html>
