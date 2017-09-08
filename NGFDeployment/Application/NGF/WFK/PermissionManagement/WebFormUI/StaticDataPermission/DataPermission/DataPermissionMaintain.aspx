<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DataPermissionMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.DataPermission.DataPermissionMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Data Permission Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent">
        <div id="divDataPermission">
            <table width="100%">
                <tr>
                    <td width="14%">
                        <span class="Label">Permission Org</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="28%">
                        <select id="selectPermissionOrg" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                    <td width="14%">
                        <span class="Label">Permission Product</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="28%">
                        <select id="selectPermissionProduct" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="7%">
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Permission Mode</span>
                    </td>
                    <td>
                        <span style="color: red;">*</span>
                    </td>
                    <td>
                        <select id="selectPermissionMode" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Data Source</span>
                    </td>
                    <td>
                        <span style="color: red;">*</span>
                    </td>
                    <td>
                        <select id="selectDataSource" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Static Data</span>
                    </td>
                    <td>
                        <span style="color: red;">*</span>
                    </td>
                    <td>
                        <select id="selectData" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                    <td>
                        <span class="Label">Subject Category</span>
                    </td>
                    <td>
                        <span style="color: red;">*</span>
                    </td>
                    <td>
                        <select id="selectSubjectCategory" class="Dropdownlist">
                        </select>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Subject</span>
                    </td>
                    <td>
                        <span style="color: red;">*</span>
                    </td>
                    <td>
                        <input type="text" maxlength="100" id="textSubjectName" style="width: 99%" class="TextBox easyui-validatebox"
                            data-options="required:true" />
                        <input type="hidden" id="hiddenSubjectId" value="<%=Guid.Empty %>" />
                    </td>
                    <td>
                        <input type="button" id="buttonSearchSubject" value="" class="ButtonSearch" />
                    </td>
                    <td>
                        <span class="Label">Effective Date</span>
                    </td>
                    <td>
                        <span style="color: red;">*</span>
                    </td>
                    <td>
                        <input type="text" id="textEffectiveDate" class="easyui-datebox" data-options="required:true,formatter:dateformatter,parser:dateparser,validType:'date'" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="Label">Expiration Date</span>
                    </td>
                    <td>
                        <span style="color: red;">*</span>
                    </td>
                    <td>
                        <input type="text" id="textExpirationDate" class="easyui-datebox" data-options="required:true,formatter:dateformatter,parser:dateparser,validType:'date'" />
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div id="divDataPermissionValue">
            <iframe id="iframeDataPermissionValue" frameborder="0" width="100%" height="100%"
                scrolling="no"></iframe>
        </div>
        <br />
        <div id="divCommand" style="text-align: center; display: none;">
            <input id="buttonSave" type="button" value="Save" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
        </div>
    </div>
    <script type="text/javascript" src="DataPermissionControl.js">
    </script>
    <script type="text/javascript" src="DataPermissionMaintain.js">
    </script>
    </form>
</body>
</html>
