<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SystemMaintenanceInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SystemMaintenance.SystemMaintenance.SystemMaintenanceInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>System Maintenance Management</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divHead">
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
                            <span class="Label">Category</span>
                        </td>
                        <td width="35%">
                            <select id="selectCategory" class="Dropdownlist">
                            </select>
                        </td>
                        <td width="5%">
                        </td>
                        <td width="10%">
                            <span class="Label">Maintain Date</span>
                        </td>
                        <td width="35%">
                            <input type="text" id="textMaintainDate" class="easyui-datetimebox" data-options="formatter:datetimeformatter,parser:datetimeparser" />
                        </td>
                        <td width="5%">
                        </td>
                    </tr>
                    <tr id="trDomainSystem">
                        <td width="10%">
                            <span class="Label">Domain</span>
                        </td>
                        <td width="35%">
                            <select id="selectDomain" class="Dropdownlist">
                            </select>
                        </td>
                        <td width="5%">
                        </td>
                        <td width="10%">
                            <span class="Label">System</span>
                        </td>
                        <td width="35%">
                            <select id="selectSystem" class="Dropdownlist">
                            </select>
                        </td>
                        <td width="5%">
                        </td>
                    </tr>
                    <tr id="trSystemGroup">
                        <td width="10%">
                            <span class="Label">System Group</span>
                        </td>
                        <td width="35%">
                            <select id="selectSystemGroup" class="Dropdownlist">
                            </select>
                        </td>
                        <td width="5%">
                        </td>
                        <td width="10%">
                            <span class="Label">System</span>
                        </td>
                        <td width="35%">
                            <input type="text" id="textSystem" class="TextBox" />
                        </td>
                        <td width="5%">
                        </td>
                    </tr>
                    <tr>
                        <td width="85%" colspan="5">
                            <input type="checkbox" id="checkboxExpiredAndClosed" />
                            <span class="Label">Include Expired and Closed Item</span>
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
        </div>
        <table id="datagrid1">
        </table>
    </div>
    <script src="SystemMaintenanceControl.js" type="text/javascript"></script>
    <script type="text/javascript" src="SystemMaintenanceInquiry.js"></script>
    </form>
</body>
</html>
