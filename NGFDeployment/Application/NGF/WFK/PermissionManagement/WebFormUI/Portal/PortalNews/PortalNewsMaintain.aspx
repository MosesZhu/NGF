<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PortalNewsMaintain.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalNews.PortalNewsMaintain" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Portal News Maintain</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table id="tableHead" width="100%">
            <tr>
                <td width="10%">
                    <span class="Label">Subject</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="80%" colspan="5">
                    <textarea id="textareaSubject" cols="50" rows="2" class="TextBox easyui-validatebox"
                        data-options="required:true,validType:'length[0,250]'"></textarea>
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Org</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="30%">
                    <select id="selectOrg" class="Dropdownlist">
                    </select>
                </td>
                <td width="7%">
                </td>
                <td width="10%">
                    <span class="Label">Product</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="30%">
                    <select id="selectProduct" class="Dropdownlist">
                    </select>
                </td>
                <td width="7%">
                </td>
            </tr>
            <tr>
                <td width="10%">
                    <span class="Label">Posted by</span>
                </td>
                <td width="3%">
                    <span style="color: red;">*</span>
                </td>
                <td width="30%">
                    <input type="text" maxlength="100" id="textPostUser" class="TextBox easyui-validatebox"
                        data-options="required:true" />
                    <input type="hidden" id="hiddenUserId" />
                </td>
                <td width="7%">
                    <input type="button" id="buttonSearchUser" value="" class="ButtonSearch" />
                </td>
                <td width="10%">
                    <span class="Label">Due Date</span>
                </td>
                <td width="3%">
                </td>
                <td width="30%">
                    <input type="text" id="textDueDate" class="easyui-datebox" data-options="formatter:dateformatter,parser:dateparser,validType:'date'" />
                </td>
                <td width="7%">
                </td>
            </tr>
        </table>
        <div id="divContent">
            <iframe id="iframePortalNewsContent" frameborder="0" width="100%" height="100%" scrolling="no">
            </iframe>
        </div>
        <br />
        <br />
        <div id="divCommand" style="text-align: center;">
            <input id="buttonSave" type="button" value="Save" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
        </div>
    </div>
    <script type="text/javascript">
        var currentUserId = "<%=UserID %>";
        var currentUserName = "<%=UserName %>";
    </script>
    <script type="text/javascript" src="PortalNewsMaintain.js">
    </script>
    </form>
</body>
</html>
