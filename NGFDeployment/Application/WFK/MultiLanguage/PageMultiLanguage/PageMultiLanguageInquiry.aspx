<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PageMultiLanguageInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.PageMultiLanguage.PageMultiLanguageInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Page Multi Language Inquiry</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
            <table width="100%">
                <tr>
                    <td width="10%">
                        <span class="Label">Product</span>
                    </td>
                    <td width="3%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="35%">
                        <select id="selectProduct" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="2%">
                    </td>
                    <td width="10%">
                        <span class="Label">System</span>
                    </td>
                    <td width="3%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="35%">
                        <select id="selectSystem" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="2%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Class Name</span>
                    </td>
                    <td width="3%">
                    </td>
                    <td colspan="5" width="85%">
                        <input type="text" maxlength="100" id="textClassName" class="TextBox" />
                    </td>
                    <td width="2%">
                    </td>
                </tr>
            </table>
            <br />
        </div>
        <br />
        <div style="text-align: center;">
            <input id="buttonInquiry" type="button" value="Inquiry" class="Button80" style="margin-right: 10px;" />
            <input id="buttonExport" type="button" value="Export" class="Button80" style="margin-right: 10px;" />
            <input id="buttonImport" type="button" value="Import" class="Button80" />
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="PageMultiLanguageInquiry.js">
    </script>
    </form>
</body>
</html>
