<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FunctionPermission.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.PermissionModel.PermissionDetail.FunctionPermission.FunctionPermission" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Function Permission</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent">
        <div id="divHead">
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
                    <td width="8%">
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
                    <td width="8%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Domain</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="30%">
                        <select id="selectDomain" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="8%">
                    </td>
                    <td width="10%">
                        <span class="Label">System</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="30%">
                        <select id="selectSystem" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="8%">
                    </td>
                </tr>
            </table>
            <br />
            <div style="text-align: center;">
                <input id="buttonInquiry" type="button" value="Inquiry" class="Button80" />
            </div>
            <br />
        </div>
        <div id="divDetail">
            <table id="treegrid1">
            </table>
        </div>
    </div>
    <script type="text/javascript" src="FunctionPermission.js">
    </script>
    </form>
</body>
</html>
