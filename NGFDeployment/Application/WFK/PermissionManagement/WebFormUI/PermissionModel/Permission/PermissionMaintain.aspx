<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PermissionMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.Permission.PermissionMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Permission Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="150px">
                    <span class="Label">Permission Org</span>
                </td>
                <td width="570px">
                    <input type="text" id="textPermissionOrg" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="150px">
                    <span class="Label">Permission Product</span>
                </td>
                <td width="570px">
                    <input type="text" id="textPermissionProduct" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="150px">
                    <span class="Label">Permission Mode</span>
                </td>
                <td width="570px">
                    <input type="text" id="textPermissionMode" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="150px">
                    <span class="Label">Subject Category</span>
                </td>
                <td width="570px">
                    <input type="text" id="textSubjectCategory" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="150px">
                    <span class="Label">Subject</span>
                </td>
                <td width="570px">
                    <input type="text" id="textSubjectName" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
<%--            <tr>
                <td width="150px">
                    <span class="Label">Resource Org</span>
                </td>
                <td width="570px">
                    <input type="text" id="textResourceOrg" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>--%>
            <tr>
                <td width="150px">
                    <span class="Label">Resource Category</span>
                </td>
                <td width="570px">
                    <input type="text" id="textResourceCategory" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr id="trProduct">
                <td width="150px">
                    <span class="Label">Resource Product</span>
                </td>
                <td width="570px">
                    <input type="text" id="textProduct" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
                <tr id="trDomain">
                    <td width="150px">
                        <span class="Label">Resource Domain</span>
                    </td>
                    <td width="570px">
                        <input type="text" id="textDomain" readonly="readonly" class="TextBoxLine" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id="trSystem">
                    <td width="150px">
                        <span class="Label">System</span>
                    </td>
                    <td width="570px">
                        <input type="text" id="textSystem" readonly="readonly" class="TextBoxLine" />
                    </td>
                </tr>
                <tr id="trFunction">
                    <td width="150px">
                        <span class="Label">Function</span>
                    </td>
                    <td width="570px">
                        <input type="text" id="textFunction" readonly="readonly" class="TextBoxLine" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id="trDatasource">
                    <td width="150px">
                        <span class="Label">DataSource</span>
                    </td>
                    <td width="570px">
                        <input type="text" id="textDataSource" readonly="readonly" class="TextBoxLine" />
                    </td>
                </tr>
                <tr id="trDatatable">
                    <td width="150px">
                        <span class="Label">Datatable</span>
                    </td>
                    <td width="570px">
                        <input type="text" id="textDatatable" readonly="readonly" class="TextBoxLine" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="150px">
                        <span class="Label">Resource</span>
                    </td>
                    <td width="570px">
                        <input type="text" id="textResourceName" readonly="readonly" class="TextBoxLine" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="150px">
                        <span class="Label">Permission</span>
                    </td>
                    <td width="570px">
                        <input type="text" maxlength="100" id="textName" class="TextBox" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td width="150px">
                        <span class="Label">Description</span>
                    </td>
                    <td width="570px">
                        <textarea id="textareaDescription" cols="50" rows="6" class="TextBox easyui-validatebox"
                            data-options="validType:'length[0,250]'"></textarea>
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
    <script type="text/javascript" src="PermissionMaintain.js">
    </script>
    </form>
</body>
</html>
