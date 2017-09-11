<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ConfigSystemInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Config.SystemSetting.ConfigSystemInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
            <table width="100%">
                <tr>
                    <td width="10%">
                        <span class="Label">Org</span>
                    </td>
                    <td width="35%">
                        <select id="selectOrg" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">Product</span>
                    </td>
                    <td width="35%">
                        <select id="selectProduct" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Domain</span>
                    </td>
                    <td width="35%">
                        <select id="selectDomain" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">System</span>
                    </td>
                    <td width="35%">
                        <select id="selectSystem" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Key</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="100" id="textKey" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">Value</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="1000" id="textValue" class="TextBox" />
                    </td>
                    <td width="5%">
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
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonExport" type="button" value="Export" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonImport" type="button" value="Import" class="Button80" />
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <div id="dialog1" style="padding: 10px">
        <div id="dialogContent">
        </div>
        <br />
        <div id="dialogButton" style="text-align: center; display: none">
            <input id="btnExport" type="button" value="Export" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="btnClose" type="button" value="Close" class="Button80" />
            <br />
        </div>
    </div>
    <script type="text/javascript" src="ConfigSystemInquiry.js">
    </script>
    </form>
</body>
</html>
