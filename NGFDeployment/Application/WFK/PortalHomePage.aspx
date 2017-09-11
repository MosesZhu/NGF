<%@ Page Language="C#" %>

<%@ Import Namespace="ITS.WebFramework.Configuration" %>
<script language="C#" runat="server">
    void Page_Load(object sender, EventArgs e)
    {
        Response.Redirect(ConfigurationManager.AppSettings["PortalHomePage"]);
    }
</script>
