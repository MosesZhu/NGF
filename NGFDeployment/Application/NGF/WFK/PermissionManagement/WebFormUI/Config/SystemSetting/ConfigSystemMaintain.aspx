<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ConfigSystemMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Config.SystemSetting.ConfigSystemMaintain" %>

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
                <td width="20%">
                    <span class="Label">Org</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <select id="selectOrg" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Product</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <select id="selectProduct" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Domain</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <select id="selectDomain" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">System</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <select id="selectSystem" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Key</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <input type="text" id="textKey" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'namespace'" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Value</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <textarea id="textareaValue" cols="50" rows="3" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'length[0,1000]'"></textarea>
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
    <script type="text/javascript" src="ConfigSystemMaintain.js">
    </script>
    </form>
</body>
</html>
