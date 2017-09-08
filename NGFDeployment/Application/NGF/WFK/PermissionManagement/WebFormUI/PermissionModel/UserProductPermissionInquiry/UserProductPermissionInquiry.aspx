<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserProductPermissionInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.UserProductPermissionInquiry.UserProductPermissionInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>User Product Permission Inquiry</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
            <table width="100%">
                <tr>
                    <td width="10%">
                        <span class="Label">Org</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="30%">
                        <select id="selectOrg" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                    <td width="10%">
                        <span class="Label">Product</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="30%">
                        <select id="selectProduct" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                </tr>
                <tr>
                    <td style="width: 10%">
                        <span class="Label">Permission Mode</span>
                    </td>
                    <td style="width: 2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td style="width: 30%">
                        <select id="selectPermissionMode" class="Dropdownlist">
                        </select>
                    </td>
                    <td style="width: 3%">
                    </td>
                    <td style="width: 10%">
                        <span class="Label">User</span>
                    </td>
                    <td style="width: 2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td style="width: 30%">
                        <input type="text" maxlength="100" id="textUserName" class="TextBox" />
                        <input type="hidden" id="hiddenUserId" />
                        <input type="text" id="text1" style="display: none;" />
                        <%--页面上要有两个以上的input type="text"，只有一个的时候，会导致按Enter键时Postback --%>
                    </td>
                    <td style="width: 3%">
                        <input type="button" id="buttonSearchUser" value="" class="ButtonSearch" />
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Domain</span>
                    </td>
                    <td style="width: 2%">
                    </td>
                    <td width="30%">
                        <select id="selectDomain" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                    <td width="10%">
                        <span class="Label">System</span>
                    </td>
                    <td style="width: 2%">
                    </td>
                    <td width="30%">
                        <select id="selectSystem" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                </tr>
            </table>
            <br />
        </div>
        <br />
        <div style="text-align: center;">
            <input id="buttonInquiry" type="button" value="Inquiry" class="Button80" />
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="UserProductPermissionInquiry.js">
    </script>
    </form>
</body>
</html>
