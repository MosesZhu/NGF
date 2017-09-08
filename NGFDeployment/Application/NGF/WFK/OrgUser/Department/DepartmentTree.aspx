<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DepartmentTree.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Department.DepartmentTree" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Department Tree</title>
</head>
<body>
    <form id="form1" runat="server">
    <span class="Label">Org Department Tree</span>
    <div id="divMainContent" style="width: 98%;">
        <table id="treegrid1">
        </table>
    </div>
    <script type="text/javascript" src="DepartmentTree.js">
    </script>
    </form>
</body>
</html>
