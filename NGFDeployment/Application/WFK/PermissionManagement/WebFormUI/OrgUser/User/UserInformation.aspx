<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserInformation.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.User.UserInformation" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>User Information</title>
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
                    <span class="Label">User Name</span>
                </td>
                <td width="65%">
                    <input type="text" id="textUserName" disabled="disabled" class="TextBoxLine" />
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
                    <span class="Label">Employee Id</span>
                </td>
                <td width="65%">
                    <input type="text" id="textEmployeeId" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Employee No</span>
                </td>
                <td width="65%">
                    <input type="text" id="textEmployeeNo" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Is Staff</span>
                </td>
                <td width="65%">
                    <input type="checkbox" id="CheckBoxIsStaff" disabled="disabled" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Email</span>
                </td>
                <td width="65%">
                    <input type="text" id="textEmail" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Mobil Phone</span>
                </td>
                <td width="65%">
                    <input type="text" id="textMobilPhone" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Telphone</span>
                </td>
                <td width="65%">
                    <input type="text" id="textTelphone" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Company</span>
                </td>
                <td width="65%">
                    <input type="text" id="textCompany" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Department</span>
                </td>
                <td width="65%">
                    <input type="text" id="textDepartmentCode" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Title</span>
                </td>
                <td width="65%">
                    <input type="text" id="textTitle" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Gender</span>
                </td>
                <td width="65%">
                    <input type="text" id="textGender" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
            <tr>
                <td width="30%">
                    <span class="Label">Computer Name</span>
                </td>
                <td width="65%">
                    <input type="text" id="textComputerName" disabled="disabled" class="TextBoxLine" />
                </td>
            </tr>
        </table>
    </div>
    <script type="text/javascript" src="UserInformation.js">
    </script>
    </form>
</body>
</html>
