$(function () {
    $(window).on("resize", function () {
        $("#divTabs").tabs("options").height = $(window).height() - 30;
        $("#divTabs").tabs("options").width = $("#divMainContent").width();
        $("#divTabs").tabs("resize");
    });

    $(window).resize();

    var pageParameterId = $.url('?id');

    $("#iframeDepartmentInformation").attr("src", "DepartmentInformation.aspx?" + $.param({ id: pageParameterId }));
    $("#iframeSubDepartment").attr("src", "SubDepartment.aspx?" + $.param({ departmentid: pageParameterId }));
    $("#iframeDepartmentUser").attr("src", "DepartmentUser.aspx?" + $.param({ departmentid: pageParameterId }));
    $("#iframeDepartmentRole").attr("src", "../Department/DepartmentRole/DepartmentRoleList.aspx?" + $.param({ departmentid: pageParameterId }));
});