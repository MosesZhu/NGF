<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PermissionModeMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.PermissionMode.PermissionModeMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Permission Mode Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="18%">
                    <span class="Label">Org</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <select id="selectOrg" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="18%">
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
                <td width="18%">
                    <span class="Label">Permission Mode</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <input type="text" id="textName" maxlength="50" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="18%">
                    <span class="Label">Description</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <textarea id="textareaDescription" cols="50" rows="6" class="TextBox easyui-validatebox"
                        data-options="validType:'length[0,100]'"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="18%">
                    <span class="Label">Is Default</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <input id="CheckboxIsDefault" type="checkbox" />
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
    <script type="text/javascript" src="PermissionModeMaintain.js">
    </script>
    </form>
</body>
</html>
