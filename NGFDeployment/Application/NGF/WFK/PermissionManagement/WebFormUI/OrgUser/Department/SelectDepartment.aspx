<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SelectDepartment.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Department.SelectDepartment" %>

<%@ Import Namespace="ITS.WebFramework.PermissionManagement.Common.PermissionConst" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Select Department</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
            <table width="100%">
                <tr>
                    <td width="150px">
                        <span class="Label">Org</span>
                    </td>
                    <td width="35%">
                        <select id="selectOrg" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="30px">
                    </td>
                    <td width="150px">
                        <span class="Label">Parent Department Code</span>
                    </td>
                    <td width="35%">
                        <input type="text" id="textParentDeptartmentCode" class="TextBox" />
                    </td>
                    <td width="30px">
                    </td>
                </tr>
                <tr>
                    <td width="150px">
                        <span class="Label">Department Code</span>
                    </td>
                    <td width="35%">
                        <input type="text" id="textDepartmentCode" class="TextBox" />
                    </td>
                    <td width="30px">
                    </td>
                    <td width="150px">
                        <span class="Label">Department Name</span>
                    </td>
                    <td width="35%">
                        <input type="text" id="textDepartmentName" class="TextBox" />
                    </td>
                    <td width="30px">
                    </td>
                </tr>
                <tr>
                    <td width="150px">
                        <span class="Label">Real Name</span>
                    </td>
                    <td width="35%">
                        <input type="text" id="textRealName" class="TextBox" />
                    </td>
                    <td width="30px">
                    </td>
                    <td width="150px">
                        <span class="Label">Description</span>
                    </td>
                    <td width="35%">
                        <input type="text" id="textDescription" class="TextBox" />
                    </td>
                    <td width="30px">
                    </td>
                </tr>
                <tr>
                    <td width="150px">
                        <span class="Label">Level</span>
                    </td>
                    <td width="35%">
                        <select id="selectLevel" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="30px">
                    </td>
                    <td width="150px">
                        <span class="Label">Manager Name</span>
                    </td>
                    <td width="35%">
                        <input type="text" id="textManagerName" class="TextBox" />
                    </td>
                    <td width="30px">
                    </td>
                </tr>
                <tr>
                    <td width="150px">
                        <span class="Label">Is Virtual Department</span>
                    </td>
                    <td width="35%">
                        <input type="radio" id="RadioIsVirtualDepartmentYes" name="RadioIsVirtualDepartment"
                            value="<%=BooleanType.True.ToString() %>" checked="checked" />Yes &nbsp;&nbsp;&nbsp;
                        <input type="radio" id="RadioIsVirtualDepartmentNo" name="RadioIsVirtualDepartment"
                            value="<%=BooleanType.False.ToString() %>" />No &nbsp;&nbsp;&nbsp;
                        <input type="radio" id="RadioIsVirtualDepartmentBoth" name="RadioIsVirtualDepartment"
                            value="" checked="checked" />Both
                    </td>
                    <td width="30px">
                    </td>
                    <td width="150px">
                    </td>
                    <td width="35%">
                    </td>
                    <td width="30px">
                    </td>
                </tr>
            </table>
            <br />
        </div>
        <br />
        <div style="text-align: center;">
            <input type="button" id="buttonInquiry" value="Inquiry" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonReset" value="Reset" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonOk" value="OK" disabled="disabled" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonCancel" value="Cancel" class="Button80" />
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="SelectDepartment.js">
    </script>
    </form>
</body>
</html>
