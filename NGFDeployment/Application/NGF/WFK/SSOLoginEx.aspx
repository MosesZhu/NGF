<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SSOLogin.aspx.cs" Inherits="ITS.WebFramework.SSO.Web.SSOLogin" ValidateRequest="false" Trace="false" %>
<!--
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>
        <%=System.Configuration.ConfigurationSettings.AppSettings["SYSTEM_NAME"]%>
    </title>
    <link href="styles/FrameStyle.css" rel="stylesheet" type="text/css" />
    <link href="styles/GlobalStyle.css" rel="stylesheet" type="text/css" />
    <script language="javascript" type="text/javascript">
     function Login()
     {        
        var e = event.srcElement; 
        var k = event.keyCode; 
        
        if (k == 13 && e.type != "textarea") 
        {   
            if(e.id=="<%=inputUserName.ClientID%>")       
            {
                document.all.<%=inputUserName.ClientID%>.focus();                
            }
            else 
            {   
                if(document.all.<%=inputUserName.ClientID%>.value!=="" && document.all.<%=inputPassword.ClientID%>.value!=="")
                {                
                    document.all.<%=buttonLogin.ClientID%>.click();                     
                }
                else
                {
                    document.all.<%=inputPassword.ClientID%>.focus();
                }
            }   
            event.cancelBubble = true; 
            event.returnValue = false;         
        }        
     }
     function init()
     {
        
     }
    </script>

</head>
<body onload="init()" style="font-size: 9pt;">
    <form id="frmLogin" runat="server" defaultbutton="buttonLogin">
    <div>
        <table id="tbPanel" style="width: 98%; height:98%">
            <%--<tr>
                <td align="center" style="height: 190px">
                </td>
            </tr>--%>
            <tr>
                <td align="center" valign="middle">
                    
                    <asp:ScriptManager ID="ScriptManager1" runat="server">
                    </asp:ScriptManager>
                    <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional" >
                        <ContentTemplate>
                            <table class="TableLogin" cellpadding="0" align="center" style="width: 450px">
                                <tr class="BannerBlue">
                                    <td class="Width20">
                                    </td>
                                    <td valign="middle" align="left">
                                        <asp:label id="labelSystemName" runat="server" CssClass="LoginTitle" ></asp:label>
                                    </td>
                                    <td id="HeaderMid" style="width: 40px">
                                    </td>
                                    <td align="right" style="height:36px;">
                                        <img  id="imglogoR" src="images/QTYPE_BW_REV.jpg" height="36px"></td>
                                    <td class="Width20">
                                    </td>
                                </tr>
                                <tr class="BannerGray">
                                    <td colspan ="4" align="right" style="height:32px" valign="middle">
                                        <asp:DropDownList ID="ddlLang" Width="140px" runat="server" CssClass="DropDownListLogLan" OnSelectedIndexChanged="ddlLang_SelectedIndexChanged"
                                                AutoPostBack="True" >
                                        </asp:DropDownList>
                                    </td>
                                    <td class="Width20">
                                    </td>
                                </tr>
                                <tr bgcolor="#e8e8e8">
                                    <td colspan="5"  valign="top">
                                        <div id="TreeMenu" style="vertical-align:top;width:100%;">
                                            <table style="height:100%;width:100%;" cellpadding="0" cellspacing="5">
                                            
                                                <tr >
                                                    <td colspan="3" align="center">
                                                        <asp:RadioButtonList ID="radioExternalUser" CssClass="LoginLbl" runat="server" 
                                                            RepeatDirection="Horizontal" AutoPostBack="True" CellPadding="3" 
                                                            CellSpacing="0" Width="351px" 
                                                            onselectedindexchanged="rdoLoginType_SelectedIndexChanged"  >
                                                            <asp:ListItem Selected="True" Value="0" >For Internal User</asp:ListItem>
                                                            <asp:ListItem Value="1" >For External User</asp:ListItem>
                                                        </asp:RadioButtonList>
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td style="width:126px; height:15px;" align="right">
                                                        <asp:Label ID="Label2" runat="server" Text="Product" CssClass="LoginLbl"></asp:Label>
                                                    </td>
                                                    <td style="width:152px; height:15px;" align="left">
                                                        <asp:DropDownList ID="ddlProduct" runat="server" CssClass="DropDownListDomain" 
                                                            onselectedindexchanged="ddlProduct_SelectedIndexChanged" AutoPostBack="True">
                                                        </asp:DropDownList>
                                                    </td>
                                                    <td style="width:122px; height:15px;">
                                                        &nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="width:126px; height:15px;" align="right">
                                                        <asp:Label ID="Label1" runat="server" Text="Org" CssClass="LoginLbl"></asp:Label>
                                                    </td>
                                                    <td style="width:152px; height:15px;" align="left">
                                                        <asp:DropDownList ID="ddlOrg" runat="server" CssClass="DropDownListDomain" 
                                                            onselectedindexchanged="ddlOrg_SelectedIndexChanged" AutoPostBack="True">
                                                        </asp:DropDownList>
                                                    </td>
                                                    <td style="width:122px; height:15px;">
                                                        &nbsp;</td>
                                                </tr>
                                                <tr id="trUserName" runat="server">
                                                    <td style="width:126px; height:15px;" align="right">
                                                        <asp:Label ID="lblUserName" runat="server" Text="UserName" CssClass="LoginLbl"></asp:Label>
                                                    </td>
                                                    <td style="width:152px; height:15px;" align="left">
                                                        <asp:TextBox ID="inputUserName" runat="server" AutoCompleteType="DisplayName"
                                                                    CssClass="LoginTextBox" onkeydown="Login();" MaxLength="30"></asp:TextBox>
                                                    </td>
                                                    <td style="width:122px; height:15px;">
                                                        &nbsp;</td>
                                                </tr>
                                                <tr id="trPassword" runat="server">
                                                    <td align="right" style="height:15px;">
                                                        <asp:Label ID="lblPassword" runat="server" Text="Password"  CssClass="LoginLbl"></asp:Label>
                                                    </td>
                                                    <td align="left" style="height:15px;">
                                                        <asp:TextBox ID="inputPassword" runat="server" TextMode="Password"
                                                                    CssClass="LoginTextBox" onkeydown="Login();" MaxLength="24" ></asp:TextBox>
                                                    </td>
                                                    <td style="height:15px;" align="left">
                                                        &nbsp;</td>
                                                </tr>
                                                <tr id="trDomain" runat="server">
                                                    <td align="right" style="height:15px;">
                                                        <asp:Label ID="lblDomain" runat="server" Text="Domain"  CssClass="LoginLbl"></asp:Label>
                                                    </td>
                                                    <td align="left" style="height:15px;">
                                                        <asp:DropDownList ID="ddlDomain" runat="server" CssClass="DropDownListDomain">
                                                        </asp:DropDownList>                                        
                                                    </td>
                                                    <td style="height:15px;" align="left">
                                                        &nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="height:15px;">
                                                        &nbsp;</td>
                                                    <td style="height:15px;">
                                                        <asp:Button ID="buttonLogin"  
                                                              runat="server" CssClass="LoginButton" OnClick="buttonLogin_Click"
                                                                                Text="Login" Height="25px" />
                                                    </td>
                                                    <td style="height:15px;">
                                                        &nbsp;</td>
                                                </tr>
                                            </table>
                                        </div>                                        
                                    </td>
                                    <tr>
                                        <td colspan="5" class="LoginLine" ></td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" class="LoginFooter" ></td>
                                    </tr>
                                </tr>
                            </table>
                        </ContentTemplate>
                    </asp:UpdatePanel>                                   
                </td>               
            </tr>
        </table>
    </div>
    </form>
</body>
</html>