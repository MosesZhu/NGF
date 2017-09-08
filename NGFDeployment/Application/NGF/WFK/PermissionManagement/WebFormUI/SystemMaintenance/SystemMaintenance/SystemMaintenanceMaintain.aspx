<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SystemMaintenanceMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SystemMaintenance.SystemMaintenance.SystemMaintenanceMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>New/Update System Maintenance</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="11%">
                    <span class="Label">Org</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="32%">
                    <select id="selectOrg" class="Dropdownlist">
                    </select>
                </td>
                <td width="5%">
                </td>
                <td width="11%">
                    <span class="Label">Product</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="32%">
                    <select id="selectProduct" class="Dropdownlist">
                    </select>
                </td>
                <td width="5%">
                </td>
            </tr>
            <tr>
                <td width="11%">
                    <span class="Label">Category</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="32%">
                    <select id="selectCategory" class="Dropdownlist">
                    </select>
                </td>
                <td width="5%">
                </td>
                <td width="11%">
                    <span class="Label">Status</span>
                </td>
                <td width="2%">
                </td>
                <td width="32%">
                    <input type="text" id="textStatus" class="TextBox" />
                </td>
                <td width="5%">
                </td>
            </tr>
            <tr id="trDomainSystem">
                <td width="11%">
                    <span class="Label">Domain</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="32%">
                    <select id="selectDomain" class="Dropdownlist">
                    </select>
                </td>
                <td width="5%">
                </td>
                <td width="11%">
                    <span class="Label">System</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="32%">
                    <select id="selectSystem" class="Dropdownlist">
                    </select>
                </td>
                <td width="5%">
                </td>
            </tr>
            <tr id="trSystemGroup">
                <td width="11%">
                    <span class="Label">System Group</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="32%">
                    <select id="selectSystemGroup" class="Dropdownlist">
                    </select>
                </td>
                <td width="5%">
                </td>
                <td width="11%">
                    <span class="Label">System</span>
                </td>
                <td width="2%">
                </td>
                <td width="32%">
                    <input type="text" id="textSystem" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td width="5%">
                </td>
            </tr>
            <tr>
                <td width="11%">
                    <span class="Label">Maintenance Role</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="32%">
                    <input id="textMaintenanceRole" class="TextBox easyui-validatebox" data-options="required:true"
                        maxlength="100" type="text" />
                </td>
                <td width="5%">
                    <input id="buttonSearchRole" class="ButtonSearch" type="button" value="" />
                </td>
                <td width="11%">
                </td>
                <td width="2%">
                </td>
                <td width="32%">
                </td>
                <td width="5%">
                </td>
            </tr>
            <tr>
                <td width="11%">
                    <span class="Label">Effective Date</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="32%">
                    <input type="text" id="textEffectiveDate" class="easyui-datetimebox" data-options="formatter:datetimeformatter,parser:datetimeparser,validType:'datetime'" />
                </td>
                <td width="5%">
                </td>
                <td width="11%">
                    <span class="Label">Expiration Date</span>
                </td>
                <td width="2%">
                    <span style="color: red;">*</span>
                </td>
                <td width="32%">
                    <input type="text" id="textExpirationDate" class="easyui-datetimebox" data-options="formatter:datetimeformatter,parser:datetimeparser,validType:'datetime'" />
                </td>
                <td width="5%">
                </td>
            </tr>
            <tr>
                <td width="11%">
                    <span class="Label">Description</span>
                </td>
                <td width="2%">
                </td>
                <td colspan="5">
                    <textarea id="textareaDescription" cols="50" rows="5" class="TextBox" data-options="validType:'length[0,250]'"></textarea>
                </td>
                <td width="5%">
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
    <script src="SystemMaintenanceControl.js" type="text/javascript"></script>
    <script src="SystemMaintenanceMaintain.js" type="text/javascript"></script>
    </form>
</body>
</html>
