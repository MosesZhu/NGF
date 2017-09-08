<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FileUpload.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.CommonPage.FileUpload" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>File Upload</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="divMainContent" style="width: 98%;">
            <div style="text-align: center;">
                <asp:FileUpload ID="FileUpload1" runat="server" />
            </div>
            <br />
            <br />
            <br />
            <br />
            <div style="text-align: center;">
                <asp:Button ID="ButtonOK" Text="OK" runat="server" OnClick="ButtonOK_Click" CssClass="Button80"
                    OnClientClick="return checkFile();" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input id="buttonCancel" type="button" value="Cancel" class="Button80" />
            </div>
        </div>
    </div>
    <script type="text/javascript" src="FileUpload.js">
    </script>
    </form>
</body>
</html>
