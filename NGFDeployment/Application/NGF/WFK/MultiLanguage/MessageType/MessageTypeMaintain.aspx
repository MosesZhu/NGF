<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MessageTypeMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MessageType.MessageTypeMaintain" %>

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
                    <span class="Label">Category</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <select id="selectCategory" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Type</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <input type="text" id="textTypeName" maxlength="50" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'name'" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Type Code</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <input type="text" id="textTypeCode" maxlength="3" readonly="readonly" class="TextBox_Disabled" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Description</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <textarea id="textareaTypeDescription" cols="50" rows="5" class="TextBox easyui-validatebox"
                        data-options="validType:'length[0,100]'"></textarea>
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
    <script type="text/javascript" src="MessageTypeMaintain.js">
    </script>
    </form>
</body>
</html>
