<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ConfigJobImport.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Config.JobSetting.ConfigJobImport" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Config Job Import</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent" style="width: 98%;">
        <table id="datagrid1">
        </table>
        <br />
        <div id="divButton" style="text-align: center;">
            <input id="buttonSave" type="button" value="Save" class="Button80" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="buttonClose" type="button" value="Close" class="Button80" />
        </div>
    </div>
    <script type="text/javascript" src="ConfigJobImport.js">
    </script>
    </form>
</body>
</html>
