<%@ Page Language="C#" AutoEventWireup="true" Inherits="ITS.WebFramework.Portal.PageBase"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
     <title>Default Page</title> 
    <link href="lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
    <link href="lib/ligerUI/skins/Gray/css/all.css" rel="stylesheet" type="text/css" />

    <script src="lib/jquery/jquery-1.5.2.min.js" type="text/javascript"></script>
    <script src="lib/ligerUI/js/ligerui.min.js" type="text/javascript"></script>  
    <link href="lib/css/common.css" rel="stylesheet" type="text/css" />  
    <link href="lib/css/welcome.css?v=1" rel="stylesheet" type="text/css" />

    <script src="lib/jquery-validation/jquery.validate.min.js" type="text/javascript"></script> 
    <script src="lib/jquery-validation/jquery.metadata.js" type="text/javascript"></script>
    <script src="lib/jquery-validation/messages_cn.js" type="text/javascript"></script>
    <script src="lib/jquery.form.js" type="text/javascript"></script>

    <script src="lib/js/common.js" type="text/javascript"></script>
    <script src="lib/js/LG.js" type="text/javascript"></script>
    <script src="lib/js/addfavorite.js" type="text/javascript"></script> 
    <script src="/res.axd?js=ext-core.js&v=1" type="text/javascript"></script>
    <script src="/res.axd?js=ext-foundation.js&v=1" type="text/javascript"></script>
    <script src="/res.axd?js=ext-form.js&v=1" type="text/javascript"></script>
    <script src="/res.axd?js=x-debug.js&v=3.2.3" type="text/javascript"></script>
    <script src="/res.axd?lang=ext-lang-zh_CN.js&v=1" type="text/javascript"></script>

</head>
<body style="padding:10px; overflow:auto; text-align:center;background:#FFFFFF;"> 
    <div class="navbar">
        <div class="navbar-l"></div><div class="navbar-r"></div>
        <div class="navbar-icon"><img src="./res.axd?icon=AwardStarAdd" /></div>
        <div class="navbar-inner"> 
            <b><span id="labelwelcome"></span><span>我的最爱</span></b>        
        </div>
    </div>
    <div class="links"> 
    </div>
    <div class="navbar">
        <div class="navbar-l"></div><div class="navbar-r"></div>
        <div class="navbar-icon"><img src="./res.axd?icon=Newspaper" /></div>
        <div class="navbar-inner"> 
            <b><span id="Span1"></span><span>News</span></b>        
        </div>
    </div>    
    <div style="left:0;"><img src="images/News.jpg" style="text-align:left;left:0;width:100%" /></div>      
    <script type="text/javascript">
        document.domain = "qcorp.com";
        $("div.link").live("mouseover", function () {
            $(this).addClass("linkover");

        }).live("mouseout", function () {
            $(this).removeClass("linkover");


        }).live('click', function (e) {
            var text = $("a", this).html();
            var url = $(this).attr("url");
            var id = $(this).attr("id");
            var icon = $(this).attr("icon");
            //parent.f_addTab(null, text, url);
            parent.addNewTab(id, url, text, icon);
        });

        $("div.link .close").live("mouseover", function () {
            $(this).addClass("closeover");
        }).live("mouseout", function () {
            $(this).removeClass("closeover");
        }).live('click', function () {
            var id = $(this).parent().attr("id");

            LG.ajax({
                loading: '正在删除用户收藏中...',
                type: 'AjaxSystem',
                method: 'RemoveMyFavorite',
                data: { ID: id },
                success: function () {
                    loadMyFavorite();
                },
                error: function (message) {
                    LG.showError(message);
                }
            });

            return false;
        });


        var links = $(".links");



        function loadMyFavorite() {
            var Favorite = [
            {
                "FavoriteID": "Approve List",
                "FavoriteTitle": "PDM->Approve List",
                "Url": "http://aic0-s2.qcs.qcorp.com/pdm/PDM/WorkSpace/ApproveList/ApproveList.aspx?ParentMenu=Work Space&AuthModuleID=Approve List",
                "Icon": "images/filetype/vs_aspx.png"
            },
            {
                "FavoriteID": "My Project",
                "FavoriteTitle": "PDM->My Project",
                "Url": "http://aic0-s2.qcs.qcorp.com/pdm/PDM/WorkSpace/Project/MyProject.aspx?ParentMenu=Project&amp;AuthModuleID=My Project",
                "Icon": "images/filetype/vs_aspx.png"
            },
            {
                "FavoriteID": "My Document",
                "FavoriteTitle": "PDM->My Document",
                "Url": "http://aic0-s2.qcs.qcorp.com/pdm/PDM/WorkSpace/Document/MyDocument.aspx?ParentMenu=Document&amp;AuthModuleID=My Document",
                "Icon": "images/filetype/vs_aspx.png"
            },
            {
                "FavoriteID": "Project Inquiry",
                "FavoriteTitle": "PDM->Project Inquiry",
                "Url": "http://aic0-s2.qcs.qcorp.com/pdm/PDM/Inquiry/ProjectInquiry.aspx?ParentMenu=Inquiry&amp;AuthModuleID=Project Inquiry",
                "Icon": "images/filetype/vs_aspx.png"
            }];
            $(Favorite).each(function (i, data) {
                var item = $('<div class="link"><img /><a href="javascript:void(0)"></a><div class="close"></div></div>');
                $("img", item).attr("src", data.Icon);
                $("a", item).html(data.FavoriteTitle);
                item.attr("id", data.FavoriteID);
                item.attr("title", data.FavoriteContent || data.FavoriteTitle);
                item.attr("url", data.Url);
                item.attr("icon", data.Icon);
                links.append(item);
            });
        }


        loadMyFavorite();
    </script>  
</body>
</html>
