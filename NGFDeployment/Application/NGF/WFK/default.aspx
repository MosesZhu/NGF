<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="ITS.WebFramework.Portal._default" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <meta http-equiv="content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title></title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
    <meta name="Title" content="BACH Portal 3.0" />
    <meta name="Description" content="Qisda BACH Portal" />
    <meta name="Keywords" content="extjs,ext,asp.net,control,asp.net 2.0,ajax,web2.0" />
    <link href="css/default.css" rel="stylesheet" type="text/css" />
    <link href="css/GlobalStyle.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <script type="text/javascript">
        try {
            document.domain = "<%=ITS.WebFramework.Common.UrlHelper.GetRootDomainName(Request.Url.Host) %>";
        } catch (error) {
        }
    </script>
    <script src="lib/jquery/jquery-1.5.2.min.js" type="text/javascript"></script>
    <script src="lib/jquery/jquery.json-2.4.js" type="text/javascript"></script>
    <x:pagemanager id="PageManager1" autosizepanelid="RegionPanel1" runat="server"></x:pagemanager>
    <x:regionpanel id="RegionPanel1" showborder="false" runat="server">
        <Regions>
            <x:Region ID="Region1" Split="false" CollapseMode="Mini" EnableCollapse="false" Margins="0 0 0 0"
                ShowBorder="false" ShowHeader="false" Height="70px" Position="Top" Layout="Fit"
                runat="server">
                <Items>
                    <x:ContentPanel ShowBorder="false" CssClass="jumbotron" EnableCollapse="false" ShowHeader="false"
                        ID="ContentPanel1" runat="server">
                        <div class="title">
                            <a href="./default.aspx" style="color: #fff;">
                                <asp:Image ID="imageProduct" runat="server" />
                                <asp:Label ID="lableProductName" runat="server" Text="" Visible="false"></asp:Label>
                            </a>
                        </div>
                        <div class="version">
                            <a href="http://qcsportal.qcs.qcorp.com/" title="BACH Portal 3.0" class="logo" target="_blank">
                                <!--img src="./images/logo/Qisda_logo1.jpg" alt="QCS Portal"/-->
                                <asp:Image ID="imageOrg" runat="server" />
                                <asp:Label ID="labelOrg" runat="server" Text="" Visible="false"></asp:Label>
                            </a>
                        </div>
                    </x:ContentPanel>
                </Items>
                <Toolbars>
                    <x:Toolbar ID="Toolbar2" Position="Bottom" CssStyle="background-image:url('');background-color:#DEEBF7;border:0"
                        runat="server">
                        <Items>
                            <x:Label ID="lblLoginName" runat="server" Text="">
                            </x:Label>
                            <x:Label runat="server" Text="  " CssStyle="width:20px;">
                            </x:Label>
                            <x:Label ID="lblLoginTime" runat="server" Text="">
                            </x:Label>
                            <x:ToolbarFill ID="ToolbarFill3" runat="server">
                            </x:ToolbarFill>
                            <x:DropDownList ID="ddlMultLang" AutoPostBack="True" Width="80px" runat="server"
                                Visible="true" OnSelectedIndexChanged="ddlMultLang_OnSelectedIndexChanged" Enabled="false">
                            </x:DropDownList>
                            <%--<x:Button ID="buttonTest" OnClientClick="addNewTab('RPS', 'empty.aspx?ID=RPS', 'RPS', 'images/rps.png');"
                                IconUrl="~/images/rps.png" CssStyle="color:#ffffff;" Text="RPS" ToolTip="Report Printing System"
                                ToolTipType="Qtip" EnablePostBack="false" runat="server">
                            </x:Button>
                            <x:Button ID="button3" OnClientClick="addNewTab('JLS', 'empty.aspx?ID=JLS', 'JLS', 'images/jls.png');"
                                IconUrl="~/images/jls.png" CssStyle="color:#ffffff;" Text="JLS" ToolTip="Job List System"
                                ToolTipType="Qtip" EnablePostBack="false" runat="server">
                            </x:Button>--%>
                            <x:Button ID="buttonAdminLogin" OnClientClick="" IconUrl="~/images/login.png" CssStyle="color:#ffffff;"
                                Text="Admin Login" ToolTip="Admin Login" ToolTipType="Qtip" EnablePostBack="false"
                                runat="server">
                            </x:Button>
                            <x:Button ID="buttonLogout" OnClientClick="window.location='ssologout.aspx';" IconUrl="~/images/exit.png"
                                CssStyle="color:#ffffff;" Text="Logout" ToolTip="Logout" ToolTipType="Qtip" EnablePostBack="false"
                                runat="server">
                            </x:Button>
                            <x:Button ID="buttonToggleHeadPanel" OnClientClick="ToggleHeadPanel(this)" IconUrl="~/images/igpnl_up.gif"
                                CssStyle="color:#ffffff;" ToolTip="" EnablePostBack="false" runat="server" ClientIDMode="Static">
                            </x:Button>
                        </Items>
                    </x:Toolbar>
                </Toolbars>
            </x:Region>
            <x:Region ID="Region2" Split="true" EnableSplitTip="true" CollapseMode="Mini" Width="200px"
                Margins="0 0 0 0" ShowHeader="false" Title="Sample Menu" EnableLargeHeader="false"
                Icon="Outline" EnableCollapse="true" Layout="Fit" Position="Left" runat="server">
                <Toolbars>
                    <x:Toolbar ID="Toolbar1" Position="Top" runat="server">
                        <Items>
                            <x:ToolbarFill ID="ToolbarFill1" runat="server">
                            </x:ToolbarFill>
                            <x:Button ID="buttonExpand" IconUrl="~/images/expand-all.gif" Text="Expand" ToolTip="Expand Menu"
                                ToolTipType="Qtip" EnablePostBack="false" runat="server">
                            </x:Button>
                            <x:Button ID="buttonCollapse" IconUrl="~/images/collapse-all.gif" Text="Collapse"
                                ToolTip="Collapse Menu" EnablePostBack="false" runat="server">
                            </x:Button>
                        </Items>
                    </x:Toolbar>
                    <x:Toolbar ID="Toolbar3" Position="Bottom" runat="server">
                        <Items>
                            <x:TextBox ID="TextFind" runat="server">
                            </x:TextBox>
                            <x:Button ID="ButtonFind" IconUrl="~/images/Search.gif" runat="server" Text="Find"
                                EnablePostBack="false" OnClientClick="findNode()">
                            </x:Button>
                        </Items>
                    </x:Toolbar>
                </Toolbars>
                <Items>
                    <x:RegionPanel ShowBorder="false" runat="server">
                        <Regions>
                            <x:Region ID="GlobalRegion" Width="200px" Margins="0 0 0 0" ShowHeader="false" Position="Center"
                                ShowBorder="false" Layout="Fit" runat="server">
                                <Items>
                                </Items>
                            </x:Region>
                        </Regions>
                    </x:RegionPanel>
                </Items>
            </x:Region>
            <x:Region ID="mainRegion" ShowHeader="false" Layout="Fit" Margins="0 0 0 0" Position="Center"
                runat="server">
                <Items>
                    <x:TabStrip ID="mainTabStrip" EnableTabCloseMenu="true" ShowBorder="false" AutoPostBack="false"
                        runat="server">
                        <Tabs>
                            <x:Tab ID="tabHome" Title="Home" Layout="Fit" Icon="House" IFrameName="main" EnableIFrame="true"
                                IFrameUrl="PortalHomePage.aspx" runat="server">
                                <Toolbars>
                                    <x:Toolbar runat="server">
                                        <Items>
                                            <x:ToolbarFill ID="ToolbarFill2" runat="server">
                                            </x:ToolbarFill>
                                            <x:Button ID="buttonRefresh" IconUrl="./res.axd?icon=Reload" Text="Refresh" OnClientClick="Ext.DomQuery.selectNode('iframe', this.ownerCt.ownerCt.el.dom).contentWindow.location.reload();"
                                                EnablePostBack="false" runat="server">
                                            </x:Button>
                                        </Items>
                                    </x:Toolbar>
                                </Toolbars>
                            </x:Tab>
                        </Tabs>
                    </x:TabStrip>
                </Items>
            </x:Region>
        </Regions>
    </x:regionpanel>
    </form>
    <script type="text/javascript">
        var language = "<%=CurrentLanguage %>";
    </script>
    <script src="./js/default.js" type="text/javascript"></script>
</body>
</html>
