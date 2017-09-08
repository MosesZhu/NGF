<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SubjectPermissionFrame.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.SubjectPermission.SubjectPermissionFrame" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Subject Permission Frame</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
            <table width="100%">
                <tr>
                    <td width="10%">
                        <span class="Label">Permission Org</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="30%">
                        <select id="selectPermissionOrg" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                    <td width="10%">
                        <span class="Label">Permission Product</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="30%">
                        <select id="selectPermissionProduct" class="Dropdownlist">
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
                        <span id="spanSubjectCategory" class="Label"></span>
                    </td>
                    <td style="width: 2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td style="width: 30%">
                        <input type="text" maxlength="100" id="textSubjectName" class="TextBox" />
                        <input type="hidden" id="hiddenSubjectId" />
                        <input type="text" id="text1" style="display: none;" />
                        <%--页面上要有两个以上的input type="text"，只有一个的时候，会导致按Enter键时Postback --%>
                    </td>
                    <td style="width: 3%">
                        <input type="button" id="buttonSearchSubject" value="" class="ButtonSearch" />
                    </td>
                </tr>
            </table>
            <br />
        </div>
        <br />
        <div style="text-align: center;">
            <input id="buttonInquiry" type="button" value="Inquiry" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonReset" value="Reset" class="Button80" />
        </div>
        <br />
        <div id="divDetail" style="display: none;">
            <div id="divTabs" class="easyui-tabs">
                <div title="Role" style="padding: 10px">
                    <iframe id="iframeUserRole" frameborder="0" width="100%" height="100%" scrolling="no">
                    </iframe>
                </div>
                <div title="User" style="padding: 10px">
                    <iframe id="iframeRoleUser" frameborder="0" width="100%" height="100%" scrolling="no">
                    </iframe>
                </div>
                <div title="Function" style="padding: 10px">
                    <iframe id="iframeFunction" frameborder="0" width="100%" height="100%" scrolling="no">
                    </iframe>
                </div>
                <div title="Sensitive Column" style="padding: 10px">
                    <iframe id="iframeSensitiveColumn" frameborder="0" width="100%" height="100%" scrolling="no">
                    </iframe>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="SubjectPermissionFrame.js">
    </script>
    </form>
</body>
</html>
