<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SystemGroupMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SystemMaintenance.SystemGroup.SystemGroupMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="13%">
                    <span class="Label">System Group Name</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="29%">
                    <input type="text" id="textSystemGroupName" maxlength="30" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'length[0,100]'" />
                </td>
                <td>
                </td>
                <td>
                    <span class="Label">Admin Role</span>
                </td>
                <td>
                    <span style="color: red;">*</span>
                </td>
                <td>
                    <input type="text" id="textGoupAdminRole" maxlength="30" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td width="8%">
                    <input type="button" id="buttonSearchRole" value="" class="ButtonSearch" />
                </td>
            </tr>
            <tr>
                <td width="13%">
                    <span class="Label">Org</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="29%">
                    <select id="selectOrg" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
                <td width="13%">
                    <span class="Label">Product</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="29%">
                    <select id="selectProduct" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="13%">
                    <span class="Label">System Group Description</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td colspan="5">
                    <textarea id="textareaSystemGroupDescription" cols="50" rows="4" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'length[0,250]'"></textarea>
                </td>
                <td>
                </td>
            </tr>
        </table>
    </div>
    <br />
    <div id="divdatagrid1">
        <table id="datagrid1">
        </table>
    </div>
    <br />
    <div id="divFoot" style="text-align: center;">
        <input type="button" id="buttonSave" value="Save" class="Button80" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="button" id="buttonCancel" value="Cancel" class="Button80" />
    </div>
    <script src="SystemGroupControl.js" type="text/javascript"></script>
    <script src="SystemGroupMaintain.js" type="text/javascript"></script>
    </form>
</body>
</html>
