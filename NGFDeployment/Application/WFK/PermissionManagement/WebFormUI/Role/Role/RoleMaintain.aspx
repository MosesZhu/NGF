<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RoleMaintain.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Role.Role.RoleMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Role Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="20%">
                    <span class="Label">Parent Role</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="60%" colspan="2">
                    <input type="text" id="textParentRoleName" class="TextBoxLine" disabled="disabled" />
                    <input id="HiddenParentRoleId" type="hidden" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Role</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td colspan="2">
                    <input type="text" id="textName" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Description</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td colspan="2">
                    <input type="text" id="textDescription" maxlength="250" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Role Type</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td colspan="2">
                    <input type="text" id="textRoleType" class="TextBoxLine" disabled="disabled" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">Role Cardinality</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td colspan="2">
                    <input type="text" id="textRoleCardinality" maxlength="4" style="width: 99%" class="TextBox easyui-numberbox"
                        data-options="min:0,precision:0" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Property 1</span>
                </td>
                <td width="3%">
                </td>
                <td width="40%">
                    <input type="text" id="textUserPropertyName1" maxlength="50" style="width: 99%" class="TextBox" />
                </td>
                <td width="20%">
                    <select id="selectUserPropertyDatatype1" class="Dropdownlist" style="width: 99%">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Property 2</span>
                </td>
                <td width="3%">
                </td>
                <td>
                    <input type="text" id="textUserPropertyName2" maxlength="50" style="width: 99%" class="TextBox" />
                </td>
                <td>
                    <select id="selectUserPropertyDatatype2" class="Dropdownlist" style="width: 99%">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Property 3</span>
                </td>
                <td width="3%">
                </td>
                <td>
                    <input type="text" id="textUserPropertyName3" maxlength="50" style="width: 99%" class="TextBox" />
                </td>
                <td>
                    <select id="selectUserPropertyDatatype3" class="Dropdownlist" style="width: 99%">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Property 4</span>
                </td>
                <td width="3%">
                </td>
                <td>
                    <input type="text" id="textUserPropertyName4" maxlength="50" style="width: 99%" class="TextBox" />
                </td>
                <td>
                    <select id="selectUserPropertyDatatype4" class="Dropdownlist" style="width: 99%">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Property 5</span>
                </td>
                <td width="3%">
                </td>
                <td>
                    <input type="text" id="textUserPropertyName5" maxlength="50" style="width: 99%" class="TextBox" />
                </td>
                <td>
                    <select id="selectUserPropertyDatatype5" class="Dropdownlist" style="width: 99%">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Property 6</span>
                </td>
                <td width="3%">
                </td>
                <td>
                    <input type="text" id="textUserPropertyName6" maxlength="50" style="width: 99%" class="TextBox" />
                </td>
                <td>
                    <select id="selectUserPropertyDatatype6" class="Dropdownlist" style="width: 99%">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Property 7</span>
                </td>
                <td width="3%">
                </td>
                <td>
                    <input type="text" id="textUserPropertyName7" maxlength="50" style="width: 99%" class="TextBox" />
                </td>
                <td>
                    <select id="selectUserPropertyDatatype7" class="Dropdownlist" style="width: 99%">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Property 8</span>
                </td>
                <td width="3%">
                </td>
                <td>
                    <input type="text" id="textUserPropertyName8" maxlength="50" style="width: 99%" class="TextBox" />
                </td>
                <td>
                    <select id="selectUserPropertyDatatype8" class="Dropdownlist" style="width: 99%">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Property 9</span>
                </td>
                <td width="3%">
                </td>
                <td>
                    <input type="text" id="textUserPropertyName9" maxlength="50" style="width: 99%" class="TextBox" />
                </td>
                <td>
                    <select id="selectUserPropertyDatatype9" class="Dropdownlist" style="width: 99%">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="Label">User Property 10</span>
                </td>
                <td width="3%">
                </td>
                <td>
                    <input type="text" id="textUserPropertyName10" maxlength="50" style="width: 99%"
                        class="TextBox" />
                </td>
                <td>
                    <select id="selectUserPropertyDatatype10" class="Dropdownlist" style="width: 99%">
                    </select>
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
    <script type="text/javascript" src="RoleMaintain.js">
    </script>
    </form>
</body>
</html>
