<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DataMaintain.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.StaticDataPermission.Data.DataMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Data Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent">
        <div id="divStaticData" class="easyui-panel" title="">
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
                        <span class="Label">Data Source</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="35%">
                        <select id="selectDataSource" class="Dropdownlist" style="width: 90%;">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Data Table</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="35%">
                        <select id="selectDataTable" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="3%">
                    </td>
                    <td width="10%">
                        <span class="Label">Static Data</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;">*</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="100" id="textName" class="TextBox easyui-validatebox"
                            data-options="required:true" style="width: 89%;" />
                    </td>
                    <td width="3%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Description</span>
                    </td>
                    <td width="2%">
                        <span style="color: red;"></span>
                    </td>
                    <td colspan="5">
                        <textarea id="textDescription" cols="150" rows="3" class="TextBox easyui-validatebox"
                            data-options="validType:'length[0,250]'" style="width: 96%;"></textarea>
                    </td>
                    <td width="3%">
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <table id="datagridSelectedColumn" class="easyui-datagrid" title="Selected Column">
        </table>
        <br />
        <div id="divConditionRules" class="easyui-panel" title="Condition Rules" data-options="tools:[{text: 'Add Group',iconCls:'icon-add',handler:createDataRuleGroup}]">
            <div id="divRuleGroup" style="width: 100%;">
            </div>
            <div name="divRuleGroupTemplate" style="display: none; width: 99%;">
                <fieldset>
                    <legend>Group Item <span name="spanSequence"></span></legend>
                    <table style="width: 100%;">
                        <tr style="width: 100%;">
                            <td style="width: 30px;">
                                <input name="buttonDelete" type="button" value="" class="ButtonDelete" />
                            </td>
                            <td style="width: 60px;">
                                <select name="selectCondition" class="Dropdownlist">
                                    <option selected="selected">and</option>
                                    <option>or</option>
                                </select>
                            </td>
                            <td>
                                <div name="divDatagridItem" style="width: 100%;">
                                    <table name="datagridItem">
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </fieldset>
                <br />
            </div>
        </div>
        <br />
        <div id="divCommand" style="text-align: center; display: none;">
            <input id="buttonSave" type="button" value="Save" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
        </div>
    </div>
    <script type="text/javascript" src="DataControl.js">
    </script>
    <script type="text/javascript" src="DataMaintain.js">
    </script>
    <script type="text/javascript" src="DataRuleGroup.js">
    </script>
    <script type="text/javascript" src="DataRuleItem.js">
    </script>
    </form>
</body>
</html>
