<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PortalLinkMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalLink.PortalLinkMaintain" %>

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
                    <span style="color: red;">*</span>
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
                    <span class="Label">Position</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <select id="selectPosition" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Name</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <input type="text" id="textName" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Target</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <select id="selectTarget" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Sort Code</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <input type="text" id="textSortCode" class="easyui-numberbox TextBox" data-options="min:0,precision:0" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Description</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <textarea id="textareaDescription" cols="50" rows="6" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'length[0,250]'"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Navigate Url</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <textarea id="textareaNavigateUrl" cols="50" rows="6" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'urlSelfDefined'"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Icon</span>
                </td>
                <td width="3%">
                    <input type="button" id="buttonSelectIcon" value="" class="ButtonSearch" />
                </td>
                <td width="60%">
                    <input type="text" id="textSystemIconName" class="TextBox" readonly="readonly" />
                </td>
                <td>
                    <img id="imgIcon" style="display: none" alt="" src="" />
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Custom Icon Url</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <textarea id="textareaCustomIconUrl" cols="50" rows="4" class="TextBox easyui-validatebox"
                        data-options="validType:'url'"></textarea>
                    <input type="text" id="txtEnCodeIconUrl" class="TextBox easyui-validatebox" data-options="validType:'url'"
                        style="display: none" />
                </td>
                <td>
                    <img id="imageIconUrl" style="display: none" alt="" src="" />
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
    <script type="text/javascript" src="PortalLinkMaintain.js">
    </script>
    </form>
</body>
</html>
