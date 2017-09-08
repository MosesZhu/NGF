<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OperationMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Operation.OperationMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Operation Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="15%">
                    <span class="Label">Function</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <input type="text" id="textFunction" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Operation</span>
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
                <td width="15%">
                    <span class="Label">Control</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <input type="text" id="textControlId" maxlength="100" class="TextBox" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Description</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <textarea id="textareaDescription" cols="50" rows="6" class="TextBox easyui-validatebox"
                        data-options="validType:'length[0,250]'"></textarea>
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
    <script type="text/javascript" src="OperationMaintain.js">
    </script>
    </form>
</body>
</html>
