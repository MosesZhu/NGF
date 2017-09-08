<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CopyFunction.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Function.CopyFunction" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Copy Function</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent">
        <div id="divHead">
            <div id="divQueryConditions" class="easyui-panel" data-options="collapsible:false">
                <div style="float: left; width: 100%;">
                    <div style="float: left; width: 40%;">
                        <fieldset>
                            <legend>Source System</legend>
                            <table width="100%">
                                <tr>
                                    <td width="10%">
                                        <span class="Label">Org</span>
                                    </td>
                                    <td width="35%">
                                        <select id="selectOrg" class="Dropdownlist">
                                        </select>
                                    </td>
                                    <td width="3%">
                                    </td>
                                    <td width="10%">
                                        <span class="Label">Product</span>
                                    </td>
                                    <td width="35%">
                                        <select id="selectProduct" class="Dropdownlist">
                                        </select>
                                    </td>
                                    <td width="3%">
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
                                    <td width="3%">
                                    </td>
                                    <td width="10%">
                                        <span class="Label">System</span>
                                    </td>
                                    <td width="35%">
                                        <select id="selectSystem" class="Dropdownlist">
                                        </select>
                                    </td>
                                    <td width="3%">
                                    </td>
                                </tr>
                            </table>
                        </fieldset>
                    </div>
                    <div style="float: left; width: 58%;">
                        <fieldset>
                            <legend>Destination System</legend>
                            <table width="100%">
                                <tr>
                                    <td width="6%">
                                        <span class="Label">Org</span>
                                    </td>
                                    <td width="24%">
                                        <input type="text" id="textDestinationOrg" value="" readonly="readonly" class="TextBoxLine" />
                                    </td>
                                    <td width="3%">
                                    </td>
                                    <td width="6%">
                                        <span class="Label">Product</span>
                                    </td>
                                    <td width="24%">
                                        <input type="text" id="textDestinationProduct" value="" readonly="readonly" class="TextBoxLine" />
                                    </td>
                                    <td width="3%">
                                    </td>
                                    <td width="6%">
                                        <span class="Label">Domain</span>
                                    </td>
                                    <td width="24%">
                                        <input type="text" id="textDestinationDomain" value="" readonly="readonly" class="TextBoxLine" />
                                    </td>
                                    <td width="3%">
                                    </td>
                                </tr>
                                <tr>
                                    <td width="6%">
                                        <span class="Label">System</span>
                                    </td>
                                    <td width="24%">
                                        <input type="text" id="textDestinationSystem" value="" readonly="readonly" class="TextBoxLine" />
                                    </td>
                                    <td width="3%">
                                    </td>
                                    <td width="6%">
                                        <span class="Label">Function</span>
                                    </td>
                                    <td colspan="5">
                                        <input type="text" id="textDestinationFunction" value="" readonly="readonly" class="TextBoxLine" />
                                    </td>
                                    <%--   <td width="3%">
                                </td>
                                <td width="6%">
                                </td>
                                <td width="24%">
                                </td>
                                <td width="3%">
                                </td>--%>
                                </tr>
                            </table>
                        </fieldset>
                    </div>
                </div>
            </div>
            <br />
            <div style="text-align: center;">
                <input id="buttonInquiry" type="button" value="Inquiry" class="Button80" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input id="buttonCopy" type="button" value="Copy" class="Button80" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
            </div>
            <br />
        </div>
        <table id="treegrid1">
        </table>
    </div>
    <script type="text/javascript" src="FunctionDropDownList.js">
    </script>
    <script type="text/javascript" src="CopyFunction.js">
    </script>
    </form>
</body>
</html>
