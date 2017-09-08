<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ConfigJobMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Config.JobSetting.ConfigJobMaintain" %>

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
                <td width="20%">
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
                <td width="20%">
                    <span class="Label">Domain</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <select id="selectDomain" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">System</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <select id="selectSystem" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Name</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <input type="text" id="textName" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'name'" />
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
                    <textarea id="textareaDescription" cols="50" rows="3" class="TextBox easyui-validatebox"
                        data-options="validType:'length[0,250]'"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Assembly</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <textarea id="textareaAssembly" cols="50" rows="3" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'namespace'"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Process</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <textarea id="textareaProcess" cols="50" rows="3" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'namespace'"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Time Slice(Minutes)</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%">
                    <input type="text" id="textTimeSlice" class="easyui-numberbox TextBox" data-options="required:true,min:0,precision:0" />
                </td>
            </tr>
            <tr>
                <td width="20%">
                    <span class="Label">Last Datetime</span>
                </td>
                <td width="3%">
                </td>
                <td width="60%">
                    <input type="text" id="textLastDatetime" class="easyui-datetimebox" data-options="formatter:datetimeformatter,parser:datetimeparser,validType:'datetime'" />
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
    <script type="text/javascript" src="ConfigJobMaintain.js">
    </script>
    </form>
</body>
</html>
