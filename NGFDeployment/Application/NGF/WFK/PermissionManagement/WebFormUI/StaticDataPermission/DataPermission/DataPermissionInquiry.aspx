<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DataPermissionInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.DataPermission.DataPermissionInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Data Permission Inquiry</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
            <table width="100%">
                <tr>
                    <td width="13%">
                        <span class="Label">Permission Org</span>
                    </td>
                    <td width="3%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="30%">
                        <select id="selectPermissionOrg" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="6%">
                    </td>
                    <td width="12%">
                        <span class="Label">Permission Product</span>
                    </td>
                    <td width="3%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="30%">
                        <select id="selectPermissionProduct" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Permission Mode</span>
                    </td>
                    <td>
                        <span style="color: red;">*</span>
                    </td>
                    <td>
                        <select id="selectPermissionMode" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Data Source</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <select id="selectDataSource" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Static Data</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <select id="selectData" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Valid Date</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <input type="text" id="textValidDate" class="easyui-datebox" data-options="formatter:dateformatter,parser:dateparser,validType:'date'"></input>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Subject Category</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <select id="selectSubjectCategory" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Subject</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <input type="text" maxlength="100" id="textSubjectName" class="TextBox" />
                        <input type="hidden" id="hiddenSubjectId" value="<%=Guid.Empty %>" />
                    </td>
                    <td colspan="5">
                        <input type="button" id="buttonSearchSubject" value="" class="ButtonSearch" />
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
    <script type="text/javascript" src="DataPermissionControl.js">
    </script>
    <script type="text/javascript" src="DataPermissionInquiry.js">
    </script>
    </form>
</body>
</html>
