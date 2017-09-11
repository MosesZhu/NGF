<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RoleInquiry.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Role.Role.RoleInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Role Inquiry</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divHead">
            <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
                <table width="100%">
                    <tr>
                        <td width="10%">
                            <span class="Label">Role Type</span>
                        </td>
                        <td width="35%">
                            <select id="selectRoleType" class="Dropdownlist">
                            </select>
                        </td>
                        <td width="5%">
                        </td>
                        <td width="10%">
                            <span class="Label">Role</span>
                        </td>
                        <td width="35%">
                            <input type="text" id="textRoleName" maxlength="100" class="TextBox" />
                        </td>
                        <td width="5%">
                        </td>
                    </tr>
                    <tr>
                        <td width="10%">
                            <span class="Label">Description</span>
                        </td>
                        <td width="85%" colspan="4">
                            <input type="text" maxlength="250" id="textDescription" class="TextBox" />
                        </td>
                        <td width="5%">
                        </td>
                    </tr>
                </table>
                <br />
            </div>
            <br />
            <div style="text-align: center;">
                <input id="buttonInquiry" type="button" value="Inquiry" class="Button80" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input id="buttonExport" type="button" value="Export" class="Button80" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input id="buttonImport" type="button" value="Import" class="Button80" />
            </div>
            <br />
        </div>
        <div id="divRole" style="display: none;">
            <p id="pHint">
                Right click to display the context menu.</p>
            <table id="treegrid1">
            </table>
            <div id="menuCategary" class="easyui-menu" style="width: 120px;">
                <div id="divMenuCategaryAdd" data-options="iconCls:'icon-add'">
                    Add Role</div>
            </div>
            <div id="menuRole" class="easyui-menu" style="width: 120px;">
                <div id="divMenuRoleAdd" data-options="iconCls:'icon-add'">
                    Add Role</div>
                <div id="divMenuRoleEdit" data-options="iconCls:'icon-edit'">
                    Edit Role</div>
                <div id="divMenuRoleDelete" data-options="iconCls:'icon-remove'">
                    Delete Self And All Children</div>
            </div>
        </div>
    </div>
    <div id="dialog1" style="padding: 10px">
        <div id="dialogContent">
        </div>
        <br />
        <div id="dialogButton" style="text-align: center; display: none">
            <input id="btnExport" type="button" value="Export" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="btnClose" type="button" value="Close" class="Button80" />
            <br />
        </div>
    </div>
    <script type="text/javascript" src="RoleInquiry.js">
    </script>
    </form>
</body>
</html>
