<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DataInquiry.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.Data.DataInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Data Inquiry</title>
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
                    <td width="37%">
                        <select id="selectOrg" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                    <td width="10%">
                        <span class="Label">Data Source</span>
                    </td>
                    <td width="37%">
                        <select id="selectDataSource" class="Dropdownlist" style="width: 98%;">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Data Table</span>
                    </td>
                    <td width="37%">
                        <select id="selectDataTable" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                    <td width="10%">
                        <span class="Label">Static Data</span>
                    </td>
                    <td width="37%">
                        <input type="text" maxlength="100" id="textName" class="TextBox" style="width: 98%;" />
                    </td>
                    <td width="3%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Description</span>
                    </td>
                    <td colspan="4" width="87%">
                        <input type="text" maxlength="250" id="textDescription" class="TextBox" />
                    </td>
                    <td width="3%">
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
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="DataControl.js">
    </script>
    <script type="text/javascript" src="DataInquiry.js">
    </script>
    </form>
</body>
</html>
