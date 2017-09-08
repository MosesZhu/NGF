<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FunctionInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Function.FunctionInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Function Inquiry</title>
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
                        <td width="2%">
                            <span style="color: red;">*</span>
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
                        <td width="2%">
                            <span style="color: red;">*</span>
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
                        <td width="2%">
                            <span style="color: red;">*</span>
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
                        <td width="2%">
                            <span style="color: red;">*</span>
                        </td>
                        <td width="35%">
                            <select id="selectSystem" class="Dropdownlist">
                            </select>
                        </td>
                        <td width="3%">
                        </td>
                    </tr>
                </table>
                <br />
            </div>
            <br />
            <div style="text-align: center;">
                <input id="buttonInquiry" type="button" value="Inquiry" class="Button80" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input id="buttonCopy" type="button" value="Copy" class="Button80" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input id="buttonExport" type="button" value="Export" class="Button80" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input id="buttonImport" type="button" value="Import" class="Button80" />
            </div>
            <br />
        </div>
        <div id="divFunction" style="display: none;">
            <p id="pHint">
                Right click to display the context menu.</p>
            <table id="treegrid1">
            </table>
            <div id="menuSystem" class="easyui-menu" style="width: 120px;">
                <div id="menuSystemAdd" data-options="iconCls:'icon-add'">
                    Add Category or Function</div>
                <div id="menuSystemDelete" data-options="iconCls:'icon-remove'">
                    Delete All Children</div>
            </div>
            <div id="menuCategory" class="easyui-menu" style="width: 120px;">
                <div id="menuCategoryAdd" data-options="iconCls:'icon-add'">
                    Add Category or Function</div>
                <div id="menuCategoryEdit" data-options="iconCls:'icon-edit'">
                    Edit Category</div>
                <div id="menuCategoryDelete" data-options="iconCls:'icon-remove'">
                    Delete Self And All Children</div>
            </div>
            <div id="menuFunction" class="easyui-menu" style="width: 120px;">
                <div id="menuFunctionAdd" data-options="iconCls:'icon-add'">
                    Add Operation</div>
                <div id="menuFunctionEdit" data-options="iconCls:'icon-edit'">
                    Edit Function</div>
                <div id="menuFunctionDelete" data-options="iconCls:'icon-remove'">
                    Delete Self And All Children</div>
            </div>
            <div id="menuOperation" class="easyui-menu" style="width: 120px;">
                <div id="menuOperationEdit" data-options="iconCls:'icon-edit'">
                    Edit Operation</div>
                <div id="menuOperationDelete" data-options="iconCls:'icon-remove'">
                    Delete Self</div>
            </div>
        </div>
    </div>
    <div id="dialog1" style="padding: 10px">
        <div id="dialogContent">
        </div>
        <br />
        <div id="dialogButton" style="text-align: center; display: none">
            <input id="btnExport" type="button" value="Export" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="btnClose" type="button" value="Close" class="Button80" />
            <br />
        </div>
    </div>
    <script type="text/javascript" src="FunctionDropDownList.js">
    </script>
    <script type="text/javascript" src="FunctionInquiry.js">
    </script>
    </form>
</body>
</html>
