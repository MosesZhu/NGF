<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MultiLanguageInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MultiLanguage.MultiLanguageInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Multi Language</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
            <table width="100%">
                <tr>
                    <td width="7%">
                        <span class="Label">Text Type</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="84%" colspan="5">
                        <select id="selectTextType" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="7%">
                    </td>
                </tr>
                <tr id="trOrg">
                    <td width="7%">
                        <span class="Label">Org</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%" colspan="5">
                        <select id="selectOrg" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="7%">
                    </td>
                </tr>
                <tr id="trProduct">
                    <td width="7%">
                        <span class="Label">Product</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%" colspan="5">
                        <select id="selectProduct" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="7%">
                    </td>
                </tr>
                <tr id="trDomain">
                    <td width="7%">
                        <span class="Label">Domain</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%" colspan="5">
                        <select id="selectDomain" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="7%">
                    </td>
                </tr>
                <tr id="trSystem">
                    <td width="7%">
                        <span class="Label">System</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%" colspan="5">
                        <select id="selectSystem" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="7%">
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label" id="spanCode">Code</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%" colspan="5">
                        <input type="text" maxlength="100" id="textCode" class="TextBox" />
                        <select id="selectCode" class="Dropdownlist" style="display: none;">
                        </select>
                    </td>
                    <td width="7%">
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">Name</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="34%">
                        <input type="text" maxlength="100" id="textName" class="TextBox" />
                    </td>
                    <td width="7%">
                    </td>
                    <td width="7%">
                        <span class="Label">EN-US</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="34%">
                        <input type="text" maxlength="250" id="textEnUs" class="TextBox" />
                    </td>
                    <td width="7%">
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">ZH-CN</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="34%">
                        <input type="text" maxlength="250" id="textZhCn" class="TextBox" />
                    </td>
                    <td width="7%">
                    </td>
                    <td width="7%">
                        <span class="Label">ZH-TW</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="34%">
                        <input type="text" maxlength="250" id="textZhTw" class="TextBox" />
                    </td>
                    <td width="7%">
                    </td>
                </tr>
            </table>
            <br />
        </div>
        <br />
        <div style="text-align: center;">
            <input id="buttonInquiry" type="button" value="Inquiry" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonNew" type="button" value="New" class="Button80" />
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="MultiLanguageInquiry.js">
    </script>
    </form>
</body>
</html>
