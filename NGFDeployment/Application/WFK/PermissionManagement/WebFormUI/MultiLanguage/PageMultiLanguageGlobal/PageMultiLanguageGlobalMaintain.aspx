<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PageMultiLanguagGlobalMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.PageMultiLanguageGlobal.PageMultiLanguageGlobalMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Page Multi Language Global Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table id="tableHead" width="100%">
            <tr>
                <td width="20%">
                    <span class="Label">English</span>
                </td>
                <td width="75%">
                    <input type="text" id="textEnglish" class="TextBox easyui-validatebox" maxlength="250"
                        data-options="required:true" />
                </td>
                <td width="5%">
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Chinese Simplified</span>
                </td>
                <td width="75%">
                    <input type="text" id="textChineseSimplified" class="TextBox easyui-validatebox"
                        maxlength="250" data-options="required:true" />
                </td>
                <td width="5%">
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Chinese Traditional</span>
                </td>
                <td width="75%">
                    <input type="text" id="textChineseTraditional" class="TextBox easyui-validatebox"
                        maxlength="250" data-options="required:true" />
                </td>
                <td width="5%">
                </td>
            </tr>
        </table>
        <br />
        <div id="divButton" style="text-align: center;">
            <input id="buttonSave" type="button" value="Save" class="Button80" style="margin-right: 10px;" />
            <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
        </div>
    </div>
    <script type="text/javascript" src="PageMultiLanguageGlobalMaintain.js">
    </script>
    </form>
</body>
</html>
