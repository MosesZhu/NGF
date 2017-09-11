<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SelectRole.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Role.Role.SelectRole" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Select Role</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
            <table width="100%">
                <tr>
                    <td width="20%">
                        <span class="Label">Role Type</span>
                    </td>
                    <td width="75%">
                        <select id="selectRoleType" class="Dropdownlist">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Role Name</span>
                    </td>
                    <td>
                        <input type="text" id="textRoleName" maxlength="100" class="TextBox" />
                    </td>
                    <td>
                        <input type="text" id="textHidden" style="display: none;"/>
                    </td>
                </tr>
            </table>
            <br />
        </div>
        <br />
        <div style="text-align: center;">
            <input type="button" id="buttonInquiry" value="Inquiry" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonOk" value="OK" disabled="disabled" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonCancel" value="Cancel" class="Button80" />
        </div>
        <br />
        <table id="treegrid1">
        </table>
    </div>
    <script type="text/javascript" src="SelectRole.js">
    </script>
    </form>
</body>
</html>
