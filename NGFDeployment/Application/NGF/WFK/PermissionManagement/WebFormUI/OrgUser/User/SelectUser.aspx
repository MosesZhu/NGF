<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SelectUser.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.User.SelectUser" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Select User</title>
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
                    <td width="2%">
                    </td>
                    <td width="10%">
                        <span class="Label">User Name</span>
                    </td>
                    <td width="35%">
                        <input type="text" id="textUserName" class="TextBox" />
                    </td>
                    <td width="2%">
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Real Name</span>
                    </td>
                    <td>
                        <input type="text" id="textRealName" class="TextBox" />
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Employee No</span>
                    </td>
                    <td>
                        <input type="text" id="textEmployeeNo" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Is Staff</span>
                    </td>
                    <td>
                        <input type="radio" id="rdYes" value="Yes" name="isStaff" />Yes &nbsp;&nbsp;&nbsp;
                        <input type="radio" id="rdNo" value="No" name="isStaff" />No &nbsp;&nbsp;&nbsp;
                        <input type="radio" id="rdBoth" value="Both" name="isStaff" checked="checked" />Both
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Email</span>
                    </td>
                    <td>
                        <input type="text" id="textEmail" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Mobil Phone</span>
                    </td>
                    <td>
                        <input type="text" id="textMobilPhone" class="TextBox" />
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Telphone</span>
                    </td>
                    <td>
                        <input type="text" id="textTelphone" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Company</span>
                    </td>
                    <td>
                        <input type="text" id="textCompany" class="TextBox" />
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Department</span>
                    </td>
                    <td>
                        <input type="text" id="textDepartment" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Title</span>
                    </td>
                    <td>
                        <input type="text" id="textTitle" class="TextBox" />
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Gender</span>
                    </td>
                    <td>
                        <select id="selectGender" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Computer Name</span>
                    </td>
                    <td>
                        <input type="text" id="textComputerName" class="TextBox" />
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
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonOk" value="OK" disabled="disabled" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonCancel" value="Cancel" class="Button80" />
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="SelectUser.js">
    </script>
    </form>
</body>
</html>
