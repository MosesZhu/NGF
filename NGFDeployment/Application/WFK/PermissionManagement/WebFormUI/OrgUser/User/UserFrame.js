$(function () {
    $(window).on("resize", function () {
        $("#divTabs").tabs("options").height = $(window).height() - 30;
        $("#divTabs").tabs("options").width = $("#divMainContent").width();
        $("#divTabs").tabs("resize");
    });

    $(window).resize();

    var pageParameterId = $.url('?id');
    $("#iframeUserInformation").attr("src", "UserInformation.aspx?" + $.param({ id: pageParameterId }));
    $("#iframeUserRole").attr("src", "../User/UserRole/UserRoleList.aspx?" + $.param({ userId: pageParameterId }));
});