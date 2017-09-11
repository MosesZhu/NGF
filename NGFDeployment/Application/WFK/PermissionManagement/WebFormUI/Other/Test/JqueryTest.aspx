<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="JqueryTest.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Other.Test.JqueryTest" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Test</title>
</head>
<body>
    <form id="form1" runat="server">
    <ajaxtoolkit:toolkitscriptmanager id="ToolkitScriptManager1" runat="server">
    </ajaxtoolkit:toolkitscriptmanager>
    <div id="divContent" style="width: 98%; text-align: center;">
        <input id="btnAlert" type="button" value="alert" style="width: 80px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input id="btnHelloWorld" type="button" value="error" style="width: 80px;" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input id="btnHello" type="button" class="Button80" value="question" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input id="btnArray" type="button" class="Button80" value="information" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input id="btnPerson" type="button" class="Button80" value="warning" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input id="btnConfirm" type="button" class="Button80" value="confirm" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input id="btnPrompt" type="button" class="Button80" value="prompt" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input id="btnTrim" type="button" class="Button80" value="trim" />
        <br />
        <input type="text" id="textValidatebox" class="easyui-validatebox TextBox200" data-options="required:true,validType:'remote[\'JqueryTestHandler.ashx\',\'text\']',invalidMessage:'不合法'" />
        <br />
        <input id="buttonTestAjax" type="button" class="Button80" value="Test Ajax" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input id="buttonTestToJSONDate" type="button" class="Button80" value="Test toJSON Date" />
        <br />
        <input id="buttonTestJob" type="button" class="Button80" value="Test Job" />
        <br />
        <input id="buttonTestOpenInNewTab" type="button" class="Button130" value="Test Open In New Tab" />
        <br />
    </div>
    <div>
        <input type="button" id="buttonSearchSubject" value="" class="ButtonSearch" />
        <br />
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <ContentTemplate>
                <asp:Button ID="Button1" runat="server" Text="" class="ButtonSearch" />
            </ContentTemplate>
        </asp:UpdatePanel>
        <br />
    </div>
    <div>
        <asp:UpdatePanel ID="UpdatePanel2" runat="server" UpdateMode="Conditional">
            <ContentTemplate>
                <asp:Image ID="Image1" runat="server" />
                <asp:ImageButton ID="ImageButton1" runat="server" />
                <input id="buttonQDialog1" type="button" class="Button80" value="Test QDialog" />
                <input id="buttonQDialog2" type="button" class="Button80" value="Test QDialog1" />
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
    <div>
        <asp:Button ID="Button2" runat="server" Text="Button" OnClick="Button2_Click" />
        <asp:Button ID="Button3" runat="server" Text="Button" OnClick="Button3_Click" />
    </div>
    <div>
        <asp:Label ID="LabelMessage" runat="server"></asp:Label>
    </div>
    <div>
        <span>Url</span>
        <input type="text" id="textUrl" />
        <input type="button" id="buttonOpenUrlNewTab" value="Open Url New Tab" />
    </div>
    <div>
        <span>Function Name</span>
        <input type="text" id="textFunctionName" />
        <input type="button" id="buttonOpenFunctionNewTab" value="Open Function New Tab" />
    </div>
    <div style="height: 2000px;">
        test
    </div>
    <div>
        <input type="button" id="buttonDialog" />
    </div>
    <div id="dd">Dialog Content.</div>  

    <script type="text/javascript" src="JqueryTest.js">
    </script>
    </form>
</body>
</html>
