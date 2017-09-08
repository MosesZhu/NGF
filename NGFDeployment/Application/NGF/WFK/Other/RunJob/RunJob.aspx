<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RunJob.aspx.cs" Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Other.RunJob.RunJob" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divContent" style="width: 98%; text-align: center;">
        <asp:Button ID="ButtonRunLogSendMailProcess" runat="server" Text="Run LogSendMailProcess"
            OnClick="ButtonRunLogSendMailProcess_Click" />
        <asp:Button ID="ButtonRunQueuePermissionProcess" runat="server" Text="Run QueuePermissionProcess"
            OnClick="ButtonRunQueuePermissionProcess_Click" />
        <asp:Button ID="ButtonRunSSOSessionStatusProcess" runat="server" Text="Run SSOSessionStatusProcess"
            OnClick="ButtonRunSSOSessionStatusProcess_Click" />
        <asp:Button ID="ButtonRunSyncStaffInsertProcess" runat="server" Text="Run SyncStaffInsertProcess"
            OnClick="ButtonRunSyncStaffInsertProcess_Click" />
        <asp:Button ID="ButtonRunSyncStaffUpdateProcess" runat="server" Text="Run SyncStaffUpdateProcess"
            OnClick="ButtonRunSyncStaffUpdateProcess_Click" />
        <asp:Button ID="ButtonRunSystemMaintenanceProcess" runat="server" Text="Run SystemMaintenanceProcess"
            OnClick="ButtonRunSystemMaintenanceProcess_Click" />
        <asp:Button ID="ButtonRunAllPermissionRecomputeProcess" runat="server" 
            Text="Run AllPermissionRecomputeProcess" 
            onclick="ButtonRunAllPermissionRecomputeProcess_Click" />
    </div>
    </form>
</body>
</html>
