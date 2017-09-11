<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RoleFrame.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Role.Role.RoleFrame" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Role Information</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent">
        <div id="divTabs" class="easyui-tabs">
            <div title="Information" style="padding: 10px">
                <iframe id="iframeRoleInformation" frameborder="0" width="100%" height="100%" scrolling="no">
                </iframe>
            </div>
            <div title="User" style="padding: 10px">
                <iframe id="iframeRoleUser" frameborder="0" width="100%" height="100%" scrolling="no">
                </iframe>
            </div>
            <div title="Department" style="padding: 10px">
                <iframe id="iframeRoleDepartment" frameborder="0" width="100%" height="100%" scrolling="no">
                </iframe>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="RoleFrame.js">
    </script>
    </form>
</body>
</html>
