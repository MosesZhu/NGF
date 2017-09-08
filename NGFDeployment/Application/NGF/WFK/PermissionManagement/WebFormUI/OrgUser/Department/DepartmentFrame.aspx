<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DepartmentFrame.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.OrgUser.Department.DepartmentFrame" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Department Information</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent">
        <div id="divTabs" class="easyui-tabs">
            <div title="Information" style="padding: 10px">
                <iframe id="iframeDepartmentInformation" frameborder="0" width="100%" height="100%"
                    scrolling="no"></iframe>
            </div>
            <div title="Sub Department" style="padding: 10px">
                <iframe id="iframeSubDepartment" frameborder="0" width="100%" height="100%" scrolling="no">
                </iframe>
            </div>
            <div title="User" style="padding: 10px">
                <iframe id="iframeDepartmentUser" frameborder="0" width="100%" height="100%" scrolling="no">
                </iframe>
            </div>
            <div title="Role" style="padding: 10px">
                <iframe id="iframeDepartmentRole" frameborder="0" width="100%" height="100%" scrolling="no">
                </iframe>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="DepartmentFrame.js">
    </script>
    </form>
</body>
</html>
