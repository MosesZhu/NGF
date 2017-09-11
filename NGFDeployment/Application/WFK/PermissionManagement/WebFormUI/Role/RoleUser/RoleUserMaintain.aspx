<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RoleUserMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Role.RoleUser.RoleUserMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Role User Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="15%">
                    <span class="Label">User Name</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="65%">
                    <input type="text" id="textUserName" maxlength="100" class="TextBoxLine" disabled="disabled"
                        data-options="required:true"  />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Real Name</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="65%">
                    <input type="text" id="textRealName" maxlength="100" class="TextBoxLine" disabled="disabled"
                        data-options="required:true"  />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Employee No</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="65%">
                    <input type="text" id="textEmployeeNo" maxlength="50" class="TextBoxLine" disabled="disabled"
                        data-options="required:true"  />
                </td>
                <td>
                </td>
            </tr>
            <tr id="tr1" style="display: none">
                <td width="15%">
                    <span class="Label" id="labelUserPropertyName1"></span>
                </td>
                <td>
                </td>
                <td width="65%">
                    <input id="textUserPropertyValue1"  />
                </td>
            </tr>
            <tr id="tr2" style="display: none">
                <td width="15%">
                    <span class="Label" id="labelUserPropertyName2"></span>
                </td>
                <td>
                </td>
                <td width="65%">
                    <input id="textUserPropertyValue2"  />
                </td>
            </tr>
            <tr id="tr3" style="display: none">
                <td width="15%">
                    <span class="Label" id="labelUserPropertyName3"></span>
                </td>
                <td>
                </td>
                <td width="65%">
                    <input id="textUserPropertyValue3"  />
                </td>
            </tr>
            <tr id="tr4" style="display: none">
                <td width="15%">
                    <span class="Label" id="labelUserPropertyName4"></span>
                </td>
                <td>
                </td>
                <td width="65%">
                    <input id="textUserPropertyValue4"  />
                </td>
            </tr>
            <tr id="tr5" style="display: none">
                <td width="15%">
                    <span class="Label" id="labelUserPropertyName5"></span>
                </td>
                <td>
                </td>
                <td width="65%">
                    <input id="textUserPropertyValue5"  />
                </td>
            </tr>
            <tr id="tr6" style="display: none">
                <td width="15%">
                    <span class="Label" id="labelUserPropertyName6"></span>
                </td>
                <td>
                </td>
                <td width="65%">
                    <input id="textUserPropertyValue6"  />
                </td>
            </tr>
            <tr id="tr7" style="display: none">
                <td width="15%">
                    <span class="Label" id="labelUserPropertyName7"></span>
                </td>
                <td>
                </td>
                <td width="65%">
                    <input id="textUserPropertyValue7"  />
                </td>
            </tr>
            <tr id="tr8" style="display: none">
                <td width="15%">
                    <span class="Label" id="labelUserPropertyName8"></span>
                </td>
                <td>
                </td>
                <td width="65%">
                    <input id="textUserPropertyValue8"  />
                </td>
            </tr>
            <tr id="tr9" style="display: none">
                <td width="15%">
                    <span class="Label" id="labelUserPropertyName9"></span>
                </td>
                <td>
                </td>
                <td width="65%">
                    <input id="textUserPropertyValue9"  />
                </td>
            </tr>
            <tr id="tr10" style="display: none">
                <td width="15%">
                    <span class="Label" id="labelUserPropertyName10"></span>
                </td>
                <td>
                </td>
                <td width="65%">
                    <input id="textUserPropertyValue10"  />
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
    <script type="text/javascript" src="RoleUserMaintain.js">
    </script>
    </form>
</body>
</html>
