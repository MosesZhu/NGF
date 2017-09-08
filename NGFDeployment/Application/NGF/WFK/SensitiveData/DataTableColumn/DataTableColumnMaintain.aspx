<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DataTableColumnMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SensitiveData.DataTableColumn.DataTableColumnMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Data Table Column Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="20%">
                    <span class="Label">Data Source</span>
                </td>
                <td width="75%">
                    <input type="text" id="textDataSource" class="TextBoxLine" readonly="readonly" />
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Data Table</span>
                </td>
                <td width="75%">
                    <input type="text" id="textName" class="TextBoxLine" readonly="readonly" />
                </td>
            </tr>
        </table>
        <br />
        <table id="datagrid1">
        </table>
        <br />
        <div style="text-align: center;">
            <input id="buttonSave" type="button" value="Save" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
        </div>
    </div>
    <script type="text/javascript" src="DataTableColumnMaintain.js">
    </script>
    </form>
</body>
</html>
