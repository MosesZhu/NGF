<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RoleInformation.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Role.Role.RoleInformation" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Role Information</title>
</head>
<body>
    <form id="form1" runat="server">
    <table width="100%">
        <tr>
            <td width="20%">
                <span class="Label">Parent Role</span>
            </td>
            <td width="80%">
                <input type="text" id="textParentRoleName" class="TextBoxLine" disabled="disabled" />
            </td>
        </tr>
        <tr>
            <td width="20%">
                <span class="Label">Role</span>
            </td>
            <td width="80%">
                <input type="text" id="textName" class="TextBoxLine" disabled="disabled" />
            </td>
        </tr>
        <tr>
            <td width="20%">
                <span class="Label">Description</span>
            </td>
            <td width="80%">
                <input type="text" id="textDescription" class="TextBoxLine" disabled="disabled" />
            </td>
        </tr>
        <tr>
            <td width="20%">
                <span class="Label">Role Type</span>
            </td>
            <td width="80%">
                <input type="text" id="TextRoleType" class="TextBoxLine" disabled="disabled" />
            </td>
        </tr>
        <tr>
            <td width="20%">
                <span class="Label">Role Cardinality</span>
            </td>
            <td width="80%">
                <input type="text" id="textRoleCardinality" class="TextBoxLine" disabled="disabled" />
            </td>
        </tr>
    </table>
    <script type="text/javascript" src="RoleInformation.js">
    </script>
    </form>
</body>
</html>
