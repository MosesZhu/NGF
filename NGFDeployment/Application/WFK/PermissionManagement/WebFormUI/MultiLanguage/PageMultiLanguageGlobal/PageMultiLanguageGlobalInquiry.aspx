<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PageMultiLanguagGlobalInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.PageMultiLanguageGlobal.PageMultiLanguageGlobalInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Page Multi Language Global Inquiry</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
            <table width="100%">
                <tr>
                    <td width="10%">
                        <span class="Label">Text</span>
                    </td>
                    <td width="38%">
                        <input type="text" id="textLanguageText" class="TextBox" maxlength="250" />
                    </td>
                    <td width="2%">
                    </td>
                    <td width="10%">
                        <span class="Label">Sort</span>
                    </td>
                    <td width="38%">
                        <input id="radioEnglish" type="radio" name="LanguageSort" value="English" checked="checked" /><label
                            for="radioEnglish">English</label>
                        <input id="radioChineseSimplified" type="radio" name="LanguageSort" value="Chinese Simplified" /><label
                            for="radioChineseSimplified">Chinese Simplified</label>
                        <input id="radioChineseTraditional" type="radio" name="LanguageSort" value="Chinese Traditional" /><label
                            for="radioChineseTraditional">Chinese Traditional</label>
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
            <input id="buttonNew" type="button" value="New" class="Button80" style="margin-right: 10px;" />
            <input id="buttonExport" type="button" value="Export" class="Button80" style="margin-right: 10px;" />
            <input id="buttonImport" type="button" value="Import" class="Button80" />
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="PageMultiLanguageGlobalInquiry.js">
    </script>
    </form>
</body>
</html>
