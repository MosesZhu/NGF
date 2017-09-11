<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DepartmentInformation.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Department.DepartmentInformation" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Department Information</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="30%">
                    <span class="Label">Org</span>
                </td>
                <td width="65%">
                    <input type="text" id="textOrg" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Parent Deptartment Code</span>
                </td>
                <td width="65%">
                    <input type="text" id="textParentDeptartmentCode" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Department Code</span>
                </td>
                <td width="65%">
                    <input type="text" id="textDepartmentCode" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Department Name</span>
                </td>
                <td width="65%">
                    <input type="text" id="textDepartmentName" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Real Name</span>
                </td>
                <td width="65%">
                    <input type="text" id="textRealName" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Description</span>
                </td>
                <td width="65%">
                    <input type="text" id="textDescription" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Level</span>
                </td>
                <td width="65%">
                    <input type="text" id="textLevel" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Manager Name</span>
                </td>
                <td width="65%">
                    <input type="text" id="textManagerName" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Is Virtual Department</span>
                </td>
                <td width="30%">
                    <input type="checkbox" id="CheckBoxIsVirtualDepartment" disabled="disabled" />
                </td>
            </tr>
        </table>
    </div>
    <script type="text/javascript" src="DepartmentInformation.js">
    </script>
    </form>
</body>
</html>
