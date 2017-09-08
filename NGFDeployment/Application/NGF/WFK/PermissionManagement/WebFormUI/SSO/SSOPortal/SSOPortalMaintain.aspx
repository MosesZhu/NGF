<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SSOPortalMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SSO.SSOPortal.SSOPortalMaintain" %>

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
                <td width="20%">
                    <span class="Label">Product</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="70%">
                    <select id="selectProduct" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Authentication Type</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="70%">
                    <select id="selectAuthenticationType" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Portal Internal Url</span>
                </td>
                <td width="3%">
                    <span id="spanInternal" style="color: red;">*</span>
                </td>
                <td width="70%" name="portalInternalUrls">
                    <input type="text" id="textPortalInternalUrl" class="TextBox easyui-validatebox"
                        maxlength="1024" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Portal Internal Url Backup1</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%" name="portalInternalUrls">
                    <input type="text" id="textPortalInternalUrlBackup1" class="TextBox easyui-validatebox"
                        maxlength="1024" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Portal Internal Url Backup2</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%" name="portalInternalUrls">
                    <input type="text" id="textPortalInternalUrlBackup2" class="TextBox easyui-validatebox"
                        maxlength="1024" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Portal Internal Url Backup3</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%" name="portalInternalUrls">
                    <input type="text" id="textPortalInternalUrlBackup3" class="TextBox easyui-validatebox"
                        maxlength="1024" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Portal External Url</span>
                </td>
                <td width="3%">
                    <span id="spanExternal" style="color: red;">*</span>
                </td>
                <td width="70%" name="portalExternalUrls">
                    <input type="text" id="textPortalExternalUrl" class="TextBox easyui-validatebox"
                        maxlength="1024" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Portal External Url Backup1</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%" name="portalExternalUrls">
                    <input type="text" id="textPortalExternalUrlBackup1" class="TextBox easyui-validatebox"
                        maxlength="1024" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Portal External Url Backup2</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%" name="portalExternalUrls">
                    <input type="text" id="textPortalExternalUrlBackup2" class="TextBox easyui-validatebox"
                        maxlength="1024" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Portal External Url Backup3</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%" name="portalExternalUrls">
                    <input type="text" id="textPortalExternalUrlBackup3" class="TextBox easyui-validatebox"
                        maxlength="1024" />
                </td>
                <td>
                </td>
            </tr>
        </table>
        <br />
        <div style="text-align: center;">
            <input type="button" id="buttonSave" value="Save" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonCancel" value="Cancel" class="Button80" />
        </div>
    </div>
    <script src="SSOPortalMaintain.js" type="text/javascript"></script>
    </form>
</body>
</html>
