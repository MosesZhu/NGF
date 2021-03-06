﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SystemInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.System1.SystemInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>System Inquiry</title>
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
                        <input type="text" maxlength="100" id="textName" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Description</span>
                    </td>
                    <td width="85%" colspan="4">
                        <input type="text" maxlength="250" id="textDescription" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">System Type</span>
                    </td>
                    <td width="35%">
                        <select id="selectSystemType" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">Instance Name</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="50" id="textInstanceName" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Version</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="30" id="textVersion" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">Admin Role</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="100" id="textAdminRole" class="TextBox" />
                    </td>
                    <td width="5%">
                        <input type="button" id="buttonSearchRole" value="" class="ButtonSearch" />
                    </td>
                </tr>
            </table>
            <br />
        </div>
        <br />
        <div style="text-align: center;">
            <input id="buttonInquiry" type="button" value="Inquiry" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonReset" value="Reset" class="Button80" />
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
    <script type="text/javascript" src="SystemControl.js">
    </script>
    <script type="text/javascript" src="SystemInquiry.js">
    </script>
    </form>
</body>
</html>
