<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserMaintain.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.User.UserMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>User Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="15%">
                    <span class="Label">Org</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="70%">
                    <select id="selectOrg" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Name</span>
                </td>
                <td>
                    <span style="color: red;">*</span>
                </td>
                <td>
                    <input type="text" id="textUserName" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Real Name</span>
                </td>
                <td>
                    <span style="color: red;">*</span>
                </td>
                <td>
                    <input type="text" id="textRealName" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Employee Id</span>
                </td>
                <td>
                </td>
                <td>
                    <input type="text" id="textEmployeeId" maxlength="30" class="TextBox" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Employee No</span>
                </td>
                <td>
                </td>
                <td>
                    <input type="text" id="textEmployeeNo" maxlength="30" class="TextBox" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Password</span>
                </td>
                <td>
                    <span style="color: red;">*</span>
                </td>
                <td>
                    <input type="password" id="textPassword" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'length[6,30]'" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Email</span>
                </td>
                <td>
                    <span style="color: red;">*</span>
                </td>
                <td>
                    <input type="text" id="textEmail" maxlength="50" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'email'" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Mobil Phone</span>
                </td>
                <td>
                </td>
                <td>
                    <input type="text" id="textMobilPhone" maxlength="30" class="TextBox" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Telphone</span>
                </td>
                <td>
                </td>
                <td>
                    <input type="text" id="textTelphone" maxlength="30" class="TextBox" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Company</span>
                </td>
                <td>
                    <span style="color: red;">*</span>
                </td>
                <td>
                    <input type="text" id="textCompany" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Department</span>
                </td>
                <td>
                    <span style="color: red;">*</span>
                </td>
                <td>
                    <input type="text" id="textDepartmentCode" maxlength="50" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Title</span>
                </td>
                <td>
                </td>
                <td>
                    <input type="text" id="textTitle" maxlength="50" class="TextBox" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Gender</span>
                </td>
                <td>
                    <span style="color: red;">*</span>
                </td>
                <td>
                    <select id="selectGender" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
        </table>
        <br />
        <div style="text-align: center;">
            <input id="buttonSave" type="button" value="Save" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
        </div>
    </div>
    <script type="text/javascript" src="UserMaintain.js">
    </script>
    </form>
</body>
</html>
