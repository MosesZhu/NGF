<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DataRuleMaintainGroupItem.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.Data.DataRuleMaintainGroupItem" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Data Rule Maintain Group Item</title>
    <style type="text/css">
        td
        {
            border: 1px solid #95b8e7;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 100%;">
        <table>
            <tr>
                <td style="text-align: center; width: 60px;">
                    <span class="Label">Relation</span>
                </td>
                <td style="text-align: center; width: 140px;">
                    <span class="Label">Column</span>
                </td>
                <td style="text-align: center; width: 60px;">
                    <span class="Label">Operator</span>
                </td>
                <td style="text-align: center; width: 90px;">
                    <span class="Label">ValueType</span>
                </td>
                <td style="text-align: center; width: 200px;">
                    <span class="Label">Value</span>
                </td>
            </tr>
            <tr>
                <td style="width: 60px;">
                    <select id="selectRelation" class="Dropdownlist">
                    </select>
                </td>
                <td style="width: 140px;">
                    <select id="selectColumn" class="Dropdownlist">
                    </select>
                </td>
                <td style="width: 60px;">
                    <select id="selectOperator" class="Dropdownlist">
                    </select>
                </td>
                <td style="width: 90px;">
                    <select id="selectValueType" class="Dropdownlist">
                    </select>
                </td>
                <td style="width: 200px;">
                    <input type="text" id="textValue" maxlength="4000" class="TextBox" style="display: block;
                        width: 98%;" />
                    <select id="selectValue" class="Dropdownlist" style="display: none;">
                    </select>
                </td>
            </tr>
        </table>
        <br />
        <div style="text-align: center;">
            <input id="buttonOk" type="button" value="OK" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
        </div>
    </div>
    <script type="text/javascript" src="DataRuleMaintainGroupItem.js">
    </script>
    </form>
</body>
</html>
