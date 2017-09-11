<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PermissionInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.Permission.PermissionInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Permission Inquiry</title>
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
                </tr>
                <tr>
                    <td>
                        <span class="Label">Subject</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <input type="text" maxlength="100" id="textSubjectName" class="TextBox" />
                        <input type="hidden" id="hiddenSubjectId" />
                    </td>
                    <td>
                        <input type="button" id="buttonSearchSubject" value="" class="ButtonSearch" />
                    </td>
                    <td>
                        <%--<span class="Label">Resource Org</span>--%>
                    </td>
                    <td>
                    </td>
                    <td>
<%--                        <select id="selectResourceOrg" class="Dropdownlist">
                        </select>--%>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Resource Category</span>
                    </td>
                    <td>
                        <span style="color: red;">*</span>
                    </td>
                    <td>
                        <select id="selectResourceCategory" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Resource</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <input type="text" maxlength="100" id="textResourceName" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Permission</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <input type="text" maxlength="100" id="textName" class="TextBox" />
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Description</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <input type="text" maxlength="250" id="textDescription" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id="trProductDomain">
                    <td>
                        <span class="Label">Resource Product</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <select id="selectResourceProduct" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Resource Domain</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <select id="selectResourceDomain" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id="trSystemFunction">
                    <td>
                        <span class="Label">System</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <input type="text" maxlength="100" id="textSystem" class="TextBox" />
                    </td>
                    <td>
                    </td>
                    <td>
                        <span id="spanFunction" class="Label">Function</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <input type="text" maxlength="250" id="textFunction" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id="trDatasourceDatatable">
                    <td>
                        <span class="Label">DataSource</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <input type="text" maxlength="100" id="textDataSource" class="TextBox" />
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Datatable</span>
                    </td>
                    <td>
                    </td>
                    <td>
                        <input type="text" maxlength="250" id="textDatatable" class="TextBox" />
                    </td>
                    <td>
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
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="PermissionControl.js">
    </script>
    <script type="text/javascript" src="PermissionInquiry.js">
    </script>
    </form>
</body>
</html>
