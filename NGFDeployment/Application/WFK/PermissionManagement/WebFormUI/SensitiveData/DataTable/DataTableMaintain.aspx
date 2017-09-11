<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DataTableMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SensitiveData.DataTable.DataTableMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Data Table Maintain</title>
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
                <td width="7%">
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Data Source</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="70%">
                    <select id="selectDataSource" class="Dropdownlist">
                    </select>
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Data Table</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="70%">
                    <input type="text" id="textName" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Description</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%">
                    <textarea id="textareaDescription" cols="50" rows="6" class="TextBox easyui-validatebox"
                        data-options="validType:'length[0,250]'"></textarea>
                </td>
                <td width="7%">
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
    <script type="text/javascript" src="DataTableMaintain.js">
    </script>
    </form>
</body>
</html>
