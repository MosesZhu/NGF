<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MessageContentInquiry.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.MultiLanguage.MessageContent.MessageContentInquiry" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <div id="divQueryConditions" class="easyui-panel" title="Query Conditions" data-options="collapsible:true">
            <table width="100%">
                <tr>
                    <td width="10%">
                        <span class="Label">Category</span>
                    </td>
                    <td width="35%">
                        <select id="selectCategory" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">Type</span>
                    </td>
                    <td width="35%">
                        <select id="selectType" class="Dropdownlist">
                        </select>
                    </td>
                    <td width="5%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">Message Key</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="50" id="textMessageKey" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">Message Code</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="12" id="textMessageCode" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">EN-US</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="250" id="textEnUs" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                    <td width="10%">
                        <span class="Label">ZH-CN</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="250" id="textZhCn" class="TextBox" />
                    </td>
                    <td width="5%">
                    </td>
                </tr>
                <tr>
                    <td width="10%">
                        <span class="Label">ZH-TW</span>
                    </td>
                    <td width="35%">
                        <input type="text" maxlength="250" id="textZhTw" class="TextBox" />
                    </td>
                    <td width="5%">
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
            </table>
            <br />
        </div>
        <br />
        <div style="text-align: center;">
            <input id="buttonInquiry" type="button" value="Inquiry" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonNew" type="button" value="New" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <asp:Button runat="server" ID="buttonExportToExcel" CssClass="Button140" Text="Export To Excel"
                OnClick="buttonExportToExcel_Click" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonGenerateAll" type="button" value="Generate All" class="Button100"
                style="display: none" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonGenerateIncremental" type="button" value="Generate Incremental"
                class="Button140" style="display: none" />
            <asp:HiddenField ID="HiddenFieldMessageServiceUrl" runat="server" ClientIDMode="Static" />
        </div>
        <br />
        <table id="datagrid1">
        </table>
    </div>
    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" Visible="False">
        <Columns>
            <asp:BoundField DataField="Message_Category" HeaderText="Category" />
            <asp:BoundField DataField="Message_Type" HeaderText="Type" />
            <asp:BoundField DataField="Name" HeaderText="Message Key" />
            <asp:BoundField DataField="Code" HeaderText="Message Code" />
            <asp:BoundField DataField="En_Us" HeaderText="EN-US" />
            <asp:BoundField DataField="Zh_Cn" HeaderText="ZH-CN" />
            <asp:BoundField DataField="Zh_Tw" HeaderText="ZH-TW" />
            <asp:BoundField DataField="Status" HeaderText="Status" />
        </Columns>
    </asp:GridView>
    <script type="text/javascript" src="MessageContentInquiry.js">
    </script>
    </form>
</body>
</html>
