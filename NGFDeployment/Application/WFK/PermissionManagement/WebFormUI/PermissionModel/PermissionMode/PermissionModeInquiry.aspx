﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PermissionModeInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.PermissionMode.PermissionModeInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Permission Mode Inquiry</title>
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
                        <span class="Label">Permission Mode</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="50" id="textName" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">Description</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="100" id="textDescription" class="TextBox" />
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
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="PermissionModeInquiry.js">
    </script>
    </form>
</body>
</html>
