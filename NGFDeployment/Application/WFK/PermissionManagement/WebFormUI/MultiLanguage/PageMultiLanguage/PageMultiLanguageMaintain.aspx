<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PageMultiLanguageMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.PageMultiLanguage.PageMultiLanguageMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Page Multi Language Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table id="tableHead" width="100%">
            <tr>
                <td width="10%">
                    <span class="Label">Product</span>
                </td>
                <td width="35%">
                    <input type="text" id="textProduct" readonly="readonly" class="TextBox_Disabled" />
                </td>
                <td width="5%">
                </td>
                <td width="10%">
                    <span class="Label">System</span>
                </td>
                <td width="35%">
                    <input type="text" id="textSystem" readonly="readonly" class="TextBox_Disabled" />
                </td>
                <td width="5%">
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Class Name</span>
                </td>
                <td width="35%">
                    <input type="text" id="textClassName" readonly="readonly" class="TextBox_Disabled" />
                </td>
                <td width="5%">
                </td>
            </tr>
        </table>
        <br />
        <table id="datagrid1">
        </table>
        <br />
        <div id="divButton" style="text-align: center;">
            <input id="buttonSave" type="button" value="Save" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
        </div>
    </div>
    <script type="text/javascript" src="PageMultiLanguageMaintain.js">
    </script>
    </form>
</body>
</html>
