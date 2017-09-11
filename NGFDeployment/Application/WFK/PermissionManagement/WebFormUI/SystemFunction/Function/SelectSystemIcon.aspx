<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SelectSystemIcon.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.SystemFunction.Function.SelectSystemIcon" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Select System Icon</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent">
        <div id="divHead">
        <div style="text-align: center;">
            <input type="button" id="buttonOk" value="OK" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonCancel" value="Cancel" class="Button80" />
        </div>
        <br />
        </div>
        <table id="datagrid1">
        </table>
    </div>
    <script type="text/javascript" src="SelectSystemIcon.js">
    </script>
    </form>
</body>
</html>
