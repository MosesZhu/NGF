<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PortalNewsInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalNews.PortalNewsInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
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
                    <td width="35%">
                        <select id="selectOrg" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">Product</span>
                    </td>
                    <td width="35%">
                        <select id="selectProduct" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Subject</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="250" id="textSubject" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">Posted by</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="100" id="textPostUser" class="TextBox" />
                        <input type="hidden" id="hiddenUserId" />
                    </td>
                    <td width="5%">
                        <input type="button" id="buttonSearchUser" value="" class="ButtonSearch" />
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Due Date From</span>
                    </td>
                    <td width="35%">
                        <input type="text" id="textDueDateFrom" class="easyui-datebox" data-options="formatter:dateformatter,parser:dateparser,validType:'date'" />
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">Due Date To</span>
                    </td>
                    <td width="35%">
                        <input type="text" id="textDueDateTo" class="easyui-datebox" data-options="formatter:dateformatter,parser:dateparser,validType:'date'" />
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
            <input id="buttonNew" type="button" value="New" class="Button80" />
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript">
        var currentOrgId = "<%=OrgId %>";
        var currentUserId = "<%=UserID %>";
        var currentUserName = "<%=UserName %>";
    </script>
    <script type="text/javascript" src="PortalNewsInquiry.js">
    </script>
    </form>
</body>
</html>
