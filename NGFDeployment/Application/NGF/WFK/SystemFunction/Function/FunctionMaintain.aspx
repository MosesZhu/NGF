<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FunctionMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Function.FunctionMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Function Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table width="100%">
            <tr>
                <td width="15%">
                    <span class="Label">Org</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%">
                    <input type="text" id="textOrg" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Product</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%">
                    <input type="text" id="textProduct" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Domain</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%">
                    <input type="text" id="textDomain" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">System</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%">
                    <input type="text" id="textSystem" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Parent Function</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%">
                    <input type="text" id="textParentFunction" readonly="readonly" class="TextBoxLine" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Node Type</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="70%">
                    <select id="selectNodeType" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Code</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="70%">
                    <input type="text" id="textCode" maxlength="30" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Name</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="70%">
                    <input type="text" id="textName" maxlength="100" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Instance Type</span>
                </td>
                <td width="3%">
                    <span id="spanInstanceTypeStar" style="color: red; display: none">*</span>
                </td>
                <td width="70%">
                    <select id="selectInstanceType" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Assembly</span>
                </td>
                <td width="3%">
                    <span id="spanAssemblyStar" style="color: red; display: none">*</span>
                </td>
                <td width="70%">
                    <input type="text" id="textAssembly" maxlength="100" class="TextBox" data-options="required:true" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Form</span>
                </td>
                <td width="3%">
                    <span id="spanFormStar" style="color: red; display: none">*</span>
                </td>
                <td width="70%">
                    <input type="text" id="textFormClass" maxlength="100" class="TextBox" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Url</span>
                </td>
                <td width="3%">
                    <span id="spanUrlStar" style="color: red; display: none">*</span>
                </td>
                <td width="70%">
                    <textarea id="textInputUrl" cols="50" rows="4" class="TextBox"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Complete Url</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%">
                    <textarea id="textCompleteUrl" cols="50" rows="4" class="TextBox easyui-validatebox"
                        data-options="validType:'url'" disabled="disabled"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Target</span>
                </td>
                <td width="3%">
                    <span id="spanTargetStar" style="color: red; display: none">*</span>
                </td>
                <td width="70%">
                    <select id="selectTarget" class="Dropdownlist">
                    </select>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Icon</span>
                </td>
                <td width="3%">
                    <input type="button" id="buttonSelectIcon" value="" class="ButtonSearch" />
                </td>
                <td width="70%">
                    <input type="text" id="textSystemIconName" class="TextBox" readonly="readonly" />
                </td>
                <td>
                    <img id="imgIcon" style="display: none" alt="" src="" />
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Custom Icon Url</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%">
                    <textarea id="textareaCustomIconUrl" cols="50" rows="4" class="TextBox easyui-validatebox"
                        data-options="validType:'length[0,1024]'"></textarea>
                    <input type="text" id="txtEnCodeIconUrl" class="TextBox easyui-validatebox" data-options="validType:'url'"
                        style="display: none" />
                </td>
                <td>
                    <img id="imageIconUrl" style="display: none" alt="" src="" />
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Description</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%">
                    <textarea id="textareaDescription" cols="50" rows="4" class="TextBox easyui-validatebox"
                        data-options="validType:'length[0,250]'"></textarea>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Is Public</span>
                </td>
                <td width="3%">
                </td>
                <td width="70%">
                    <input type="checkbox" id="checkBoxIsPublic" />
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    <span class="Label">Scope</span>
                </td>
                <td width="3%">
                    <input type="button" id="buttonSearchScope" value="" class="ButtonSearch" />
                </td>
                <td width="70%">
                    <div id="divScope">
                    </div>
                </td>
                <td>
                </td>
            </tr>
        </table>
        <br />
        <div style="text-align: center;">
            <input type="button" id="buttonSave" value="Save" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonCancel" value="Cancel" class="Button80" />
        </div>
    </div>
    <script type="text/javascript" src="FunctionMaintain.js">
    </script>
    <script type="text/javascript" src="FunctionScope.js">
    </script>
    </form>
</body>
</html>
