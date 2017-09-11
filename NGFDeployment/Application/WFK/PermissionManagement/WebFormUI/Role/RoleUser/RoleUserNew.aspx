<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RoleUserNew.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Role.RoleUser.RoleUserNew" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Role User New</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="20%">
                    <span class="Label">Role Name</span>
                </td>
                <td width="70%">
                    <input type="text" id="textRoleName" disabled="disabled" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Name</span>
                </td>
                <td>
                    <textarea id="textUserName" cols="50" rows="15" class="TextBox easyui-validatebox"
                        data-options="validType:'length[0,1000]',required:true"></textarea>
                </td>
                <td>
                    <input type="button" id="buttonSearchUser" value="" class="ButtonSearch" />
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
    <script type="text/javascript" src="RoleUserNew.js">
    </script>
    </form>
</body>
</html>
