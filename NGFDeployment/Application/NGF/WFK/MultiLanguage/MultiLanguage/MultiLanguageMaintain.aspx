<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MultiLanguageMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MultiLanguage.MultiLanguageMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Multi Language Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="7%">
                    <span class="Label">Text Type</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="84%" colspan="5">
                    <select id="selectTextType" class="Dropdownlist">
                    </select>
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr id="trOrg">
                <td width="7%">
                    <span class="Label">Org</span>
                </td>
                <td width="2%">
                </td>
                <td width="84%" colspan="5">
                    <select id="selectOrg" class="Dropdownlist">
                    </select>
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr id="trProduct">
                <td width="7%">
                    <span class="Label">Product</span>
                </td>
                <td width="2%">
                </td>
                <td width="84%" colspan="5">
                    <select id="selectProduct" class="Dropdownlist">
                    </select>
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr id="trDomain">
                <td width="7%">
                    <span class="Label">Domain</span>
                </td>
                <td width="2%">
                </td>
                <td width="84%" colspan="5">
                    <select id="selectDomain" class="Dropdownlist">
                    </select>
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr id="trSystem">
                <td width="7%">
                    <span class="Label">System</span>
                </td>
                <td width="2%">
                </td>
                <td width="84%" colspan="5">
                    <select id="selectSystem" class="Dropdownlist">
                    </select>
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr>
                <td width="7%">
                    <span class="Label" id="spanCode">Code</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="84%" colspan="5">
                    <input type="text" id="textCode" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                    <select id="selectCode" class="Dropdownlist" style="display: none">
                    </select>
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr id="trName">
                <td width="7%">
                    <span class="Label">Name</span>
                </td>
                <td width="2%">
                    <span style="color: red;" id="spanName">*</span>
                </td>
                <td width="84%" colspan="5">
                    <input type="text" id="textName" maxlength="100" class="TextBox " data-options="required:true" />
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr>
                <td width="7%">
                    <span class="Label">EN-US</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="84%" colspan="5">
                    <textarea id="textareaEnUs" cols="50" rows="3" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'length[1,250]'"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="7%">
                    <span class="Label">ZH-CN</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="84%" colspan="5">
                    <textarea id="textareaZhCn" cols="50" rows="3" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'length[1,250]'"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="7%">
                    <span class="Label">ZH-TW</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="84%" colspan="5">
                    <textarea id="textareaZhTw" cols="50" rows="3" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'length[1,250]'"></textarea>
                </td>
                <td>
                </td>
            </tr>
        </table>
        <div id="divOther" class="easyui-panel" title="Other" data-options="collapsible:true,collapsed:true">
            <table width="100%">
                <tr>
                    <td width="7%">
                        <span class="Label">Reserve Language1</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%">
                        <textarea id="textareaReserveLanguage1" cols="50" rows="3" class="TextBox easyui-validatebox"
                            data-options="validType:'length[0,250]'"></textarea>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">Reserve Language2</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%">
                        <textarea id="textareaReserveLanguage2" cols="50" rows="3" class="TextBox easyui-validatebox"
                            data-options="validType:'length[0,250]'"></textarea>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">Reserve Language3</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%">
                        <textarea id="textareaReserveLanguage3" cols="50" rows="3" class="TextBox easyui-validatebox"
                            data-options="validType:'length[0,250]'"></textarea>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">Reserve Language4</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%">
                        <textarea id="textareaReserveLanguage4" cols="50" rows="3" class="TextBox easyui-validatebox"
                            data-options="validType:'length[0,250]'"></textarea>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">Reserve Language5</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%">
                        <textarea id="textareaReserveLanguage5" cols="50" rows="3" class="TextBox easyui-validatebox"
                            data-options="validType:'length[0,250]'"></textarea>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">Attribute1</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%">
                        <input type="text" id="textAttribute1" maxlength="50" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">Attribute2</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%">
                        <input type="text" id="textAttribute2" maxlength="50" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">Attribute3</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%">
                        <input type="text" id="textAttribute3" maxlength="50" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">Attribute4</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%">
                        <input type="text" id="textAttribute4" maxlength="50" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="7%">
                        <span class="Label">Attribute5</span>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="84%">
                        <input type="text" id="textAttribute5" maxlength="50" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div style="text-align: center;">
            <input id="buttonSave" type="button" value="Save" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
        </div>
    </div>
    <script type="text/javascript" src="MultiLanguageMaintain.js">
    </script>
    </form>
</body>
</html>
