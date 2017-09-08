﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FrameworkLogInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Portal.FrameworkLog.FrameworkLogInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
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
                    <tr>
                        <td width="10%">
                            <span class="Label">User</span>
                        </td>
                        <td width="35%">
                            <input type="text" maxlength="50" id="textUser" class="TextBox" />
                            <input type="hidden" id="hiddenUserId" />
                        </td>
                        <td width="5%">
                            <input type="button" id="buttonSearchUser" value="" class="ButtonSearch" />
                        </td>
                        <td width="10%">
                            <span class="Label">Status</span>
                        </td>
                        <td width="35%">
                            <select id="selectStatus" class="Dropdownlist">
                            </select>
                        </td>
                        <td width="5%">
                        </td>
                    </tr>
                    <tr>
                        <td width="10%">
                            <span class="Label">Date From</span>
                        </td>
                        <td width="35%">
                            <input type="text" id="textLogDateFrom" class="easyui-datebox" data-options="formatter:dateformatter,parser:dateparser,validType:'date'" />
                        </td>
                        <td width="5%">
                        </td>
                        <td width="10%">
                            <span class="Label">Date To</span>
                        </td>
                        <td width="35%">
                            <input type="text" id="textLogDateTo" class="easyui-datebox" data-options="formatter:dateformatter,parser:dateparser,validType:'date'" />
                        </td>
                        <td width="5%">
                        </td>
                    </tr>
                    <tr>
                        <td width="10%">
                            <span class="Label">Type</span>
                        </td>
                        <td width="35%">
                            <select id="selectLogType" class="Dropdownlist">
                            </select>
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
            </div>
            <br />
        </div>
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="FrameworkLogInquiry.js">
    </script>
    </form>
</body>
</html>