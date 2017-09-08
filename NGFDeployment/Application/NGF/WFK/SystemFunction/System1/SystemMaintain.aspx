<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SystemMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.System1.SystemMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>System Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="15%">
                    <span class="Label">Org</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="65%">
                    <select id="selectOrg" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Product</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="65%">
                    <select id="selectProduct" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Domain</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="65%">
                    <select id="selectDomain" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">System</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="65%">
                    <input type="text" id="textName" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Description</span>
                </td>
                <td width="3%">
                </td>
                <td width="65%">
                    <textarea id="textareaDescription" cols="50" rows="6" class="TextBox easyui-validatebox"
                        data-options="validType:'length[0,250]'"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">System Type</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="65%">
                    <select id="selectSystemType" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Instance Name</span>
                </td>
                <td width="3%">
                </td>
                <td width="65%">
                    <input type="text" id="textInstanceName" maxlength="50" class="TextBox" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Version</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="65%">
                    <input type="text" id="textVersion" maxlength="30" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Admin Role</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="65%">
                    <input type="text" id="textAdminRole" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                    <input type="button" id="buttonSearchRole" value="" class="ButtonSearch" />
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Url</span>
                </td>
                <td width="3%">
                    <span id="spanUrlStar" style="color: red; display: none">*</span>
                </td>
                <td width="65%">
                    <textarea id="textareaUrl" cols="50" rows="6" class="TextBox"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">External Base Url</span>
                </td>
                <td width="3%">
                    <span id="spanExternalBaseUrlStar" style="color: red; display: none">*</span>
                </td>
                <td width="65%">
                    <textarea id="textareaExternalBaseUrl" cols="50" rows="6" class="TextBox"></textarea>
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
    <script type="text/javascript" src="SystemControl.js">
    </script>
    <script type="text/javascript" src="SystemMaintain.js">
    </script>
    </form>
</body>
</html>
