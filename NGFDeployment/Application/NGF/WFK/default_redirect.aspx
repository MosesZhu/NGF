<%@ Page Language="C#"%>
<%@ Import Namespace="ITS.WebFramework.Common" %>

<script language="C#" runat=server>
	void Page_Load(object sender, EventArgs e)
	{
        if (Request.UrlReferrer != null
                && UrlHelper.IsSameOrigin(Request.Url, Request.UrlReferrer))
        {
            Response.End();
        }
        else
        {
            Response.Redirect("~/default.aspx");
        }
	}
</script>