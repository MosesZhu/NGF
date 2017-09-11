$(function () {
    $(window).on("resize", function () {
        $("#divTabs").tabs("options").height = $(window).height() - 30;
        $("#divTabs").tabs("options").width = $("#divMainContent").width();
        $("#divTabs").tabs("resize");
    });

    $(window).resize();

    var pageParameterId = $.url('?id');
    var pageParameterPageAction = $.url('?PageAction');
    var pageParameterRoleName = $.url('?name');
    var pageParameterRoleType = $.url('?roleType');

    $("#iframeRoleInformation").attr("src", "RoleInformation.aspx?" + $.param({ id: pageParameterId }));
    $("#iframeRoleUser").attr("src", "../RoleUser/RoleUserList.aspx?" + $.param({ roleid: pageParameterId, PageAction: pageParameterPageAction, name: pageParameterRoleName, roleType: pageParameterRoleType }));
    $("#iframeRoleDepartment").attr("src", "../RoleDepartment/RoleDepartmentList.aspx?" + $.param({ roleid: pageParameterId, PageAction: pageParameterPageAction, name: pageParameterRoleName, roleType: pageParameterRoleType }));
});