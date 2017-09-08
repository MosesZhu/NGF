<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SSOPortalInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SSO.SSOPortal.SSOPortalInquiry" %>

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
                        <span class="Label">Authentication Type</span>
                    </td>
                    <td width="35%" >
                         <select id="selectAuthenticationType" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                    </td>
                    <td width="35%">
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
    <script src="SSOPortalInquiry.js" type="text/javascript"></script>
    </form>
</body>
</html>
