<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SelectScope.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Department.SelectScope" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Select Scope</title>
</head>
<body>
    <form id="form1" runat="server">
    <span class="Label">Org Department Tree</span>
    <div id="divMainContent" style="width: 98%;">
        <div style="text-align: center;">
            <input type="button" id="buttonOk" value="OK" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="buttonCancel" value="Cancel" class="Button80" />
        </div>
        <br />
        <table id="treegrid1">
        </table>
    </div>
    <script type="text/javascript" src="SelectScope.js">
    </script>
    </form>
</body>
</html>
