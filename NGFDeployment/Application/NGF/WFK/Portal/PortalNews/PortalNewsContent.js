/// <reference name="ITS.WebFramework.CommonResource.Scripts.References.js" assembly="ITS.WebFramework.CommonResource" />

$(function () {
    $(window).on("resize", function () {
        var contentHeight = $(window).height();
        $("#divContent").height(contentHeight);
        $("#txtBoxContent").parent().height(contentHeight);
        //以下为增加对IE浏览器自适应高度的支持
        $("#HtmlEditorExtender1_ExtenderContentEditable").css("height", "69%");
        $("#HtmlEditorExtender1_ExtenderSourceView").css("height", "81%");
    });
    $(window).resize();
});

function getPortalNewsContent() {
    var content = $.trim($("#txtBoxContent").val());
    return content;
}