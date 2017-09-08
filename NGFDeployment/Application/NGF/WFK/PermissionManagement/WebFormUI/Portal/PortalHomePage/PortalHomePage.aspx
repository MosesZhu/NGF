<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PortalHomePage.aspx.cs"
    Inherits="ITS.WebFramework.PermissionManagement.WebFormUI.Portal.PortalHomePage.PortalHomePage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Portal Home Page</title>
    <style type="text/css">
        .droppable
        {
            border:1px solid #cFcFcF;
            text-align: center;
            margin: 11px;
            width: 107px;
            height: 60px;
            float: left;
            word-wrap: break-word;
            overflow: hidden;
        }
        .draggable
        {
            border:1px solid #cFcFcF;
            width: 107px;
            height: 60px;
            margin-left: -1px;
            margin-top: -1px;
            background: #DEEBF7;
        }
        .imgBtn
        {
            float: right;
            width: 11px;
            height: 11px;
            cursor: pointer;
        }
        .linkover
        {
            border: 1px solid #d3d3d3;
            background: #f1f1f1;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="divMainContent">
        <div class="easyui-panel" style="padding: 3px;" id="divFavorite" title="My Favorites"
            data-options="collapsible:true">
            <div class="links" id="divLinks" style="float: left;">
            </div>
        </div>
        <br />
        <div id="divNews">
            <table id="datagrid1">
            </table>
        </div>
    </div>
    <script type="text/javascript">
        var language = "<%=Language %>";
    </script>
    <script type="text/javascript" src="PortalHomePage.js">
    </script>
    </form>
</body>
</html>
