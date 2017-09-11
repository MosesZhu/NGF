var $selectPermissionOrg;
var $selectPermissionProduct;
var $selectPermissionMode;
var pageParameterSubjectCategory;

$(function () {
    $selectPermissionOrg = $("#selectPermissionOrg");
    $selectPermissionProduct = $("#selectPermissionProduct");
    $selectPermissionMode = $("#selectPermissionMode");
    pageParameterSubjectCategory = $.url('?subjectCategory');
    $("#spanSubjectCategory").text(pageParameterSubjectCategory);

    switch (pageParameterSubjectCategory) {
        case "User":
            $("#divTabs").tabs("close", "User");
            break;

        case "Role":
            $("#divTabs").tabs("close", "Role");
            break;

        case "Department":
            $("#divTabs").tabs("close", "Role");
            $("#divTabs").tabs("close", "User");
            break;

        default:
            //没有subjectCategory
            break;
    }

    $(window).on("resize", function () {
        $("#divTabs").tabs("options").height = $(window).height() - $("#divQueryConditions").height() - 120;
        $("#divTabs").tabs("options").width = $("#divMainContent").width();
        $("#divTabs").tabs("resize");
    });

    $(window).resize();

    selectPermissionOrgDataBind();
    selectPermissionProductDataBind();

    $selectPermissionOrg.on("change", selectPermissionOrg_change);
    $selectPermissionProduct.on("change", selectPermissionProduct_change);
    $selectPermissionMode.on("change", selectPermissionMode_change);

    $("#buttonSearchSubject").on("click", buttonSearchSubject_click);
    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonReset").on("click", buttonReset_click);
});

function selectPermissionOrgDataBind() {
    selectDataBind({
        $select: $selectPermissionOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectPermissionProductDataBind() {
    selectDataBind({
        $select: $selectPermissionProduct,
        url: "../../SystemFunction/Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectPermissionOrg_change() {
    selectPermissionProduct_change();
}

function selectPermissionProduct_change() {
    selectPermissionModeDataBind();
}

function selectPermissionModeDataBind() {
    var orgId = $.trim($selectPermissionOrg.val());
    var productId = $.trim($selectPermissionProduct.val());
    if (orgId == "" || productId == "") {
        $selectPermissionMode.empty();
        return;
    }

    var basePermissionModeDTO = {
        Org_Id: $.trim($selectPermissionOrg.val()),
        Product_Id: $.trim($selectPermissionProduct.val())
    };

    selectDataBind({
        $select: $selectPermissionMode,
        url: "../PermissionMode/PermissionModeService.asmx/GetBasePermissionModeListByOrgProduct",
        data: $.toJSON({ basePermissionModeDTO: basePermissionModeDTO }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });

    //设定默认Model
    $.qajax({
        url: "../PermissionMode/PermissionModeService.asmx/GetDefaultBasePermissionMode",
        data: $.toJSON({ basePermissionModeDTO: basePermissionModeDTO }),
        success: function (result) {
            if (result.d != null) {
                $selectPermissionMode.val(result.d.Id);
            }
        }
    });
}

function selectPermissionMode_change() {
    showDetail();
}

function buttonInquiry_click() {
    if ($.trim($selectPermissionOrg.val()) == "") {
        $.messager.alert("Warning", "Permission Org can't be empty!", "warning");
        return;
    }

    if ($.trim($selectPermissionProduct.val()) == "") {
        $.messager.alert("Warning", "Permission Product can't be empty!", "warning");
        return;
    }

    if ($.trim($selectPermissionMode.val()) == "") {
        $.messager.alert("Warning", "Permission Mode can't be empty!", "warning");
        return;
    }

    var subjectName = $.trim($("#textSubjectName").val());

    if (subjectName == "") {
        $.messager.alert("Warning", "Subject Name can't be empty!", "warning");
        return;
    }


    if (subjectName == "") {
        $("#hiddenSubjectId").val(guidEmpty);
        hideDetail();
        return;
    }

    $.qajax({
        url: "../Permission/ViewBaseSubjectService.asmx/GetViewBaseSubjectId",
        data: $.toJSON({ subjectCategory: pageParameterSubjectCategory, subjectName: subjectName }),
        success: function (result) {
            if (result.d == undefined || result.d == null) {
                $("#hiddenSubjectId").val(guidEmpty);
                hideDetail();
                $.messager.alert("Warning", "This subject is Invalid!", "warning");
            }
            else {
                $("#hiddenSubjectId").val(result.d);
                showDetail();
            }
        }
    });

    return;
}

function buttonSearchSubject_click() {
    var url;
    switch (pageParameterSubjectCategory) {
        case "User":
            url = "../../OrgUser/User/SelectUser.aspx";
            break;

        case "Role":
            url = "../../Role/Role/SelectRole.aspx";
            break;

        case "Department":
            url = "../../OrgUser/Department/SelectDepartment.aspx";
            break;

        default:
            //没有subjectCategory
            return;
    }

    $.QDialog.show(
        {
            title: "Select " + pageParameterSubjectCategory
        },
        {
            url: url,
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    var subjectId;
                    var subjectName;
                    switch (pageParameterSubjectCategory) {
                        case "User":
                            subjectId = returnValue.User_Id;
                            subjectName = returnValue.User_Name;
                            break;

                        case "Role":
                            subjectId = returnValue.Id;
                            subjectName = returnValue.Name;
                            break;

                        case "Department":
                            subjectId = returnValue.Id;
                            subjectName = returnValue.Department_Name;
                            break;
                        default:
                            return;
                    }

                    if (subjectId != $("#hiddenSubjectId").val()) {
                        $("#hiddenSubjectId").val(subjectId);
                        $("#textSubjectName").val(subjectName);
                        showDetail();
                    }
                }
            }
        }
    );
}

function showDetail() {
    var permissionOrgId = $.trim($selectPermissionOrg.val());
    var permissionProductId = $.trim($selectPermissionProduct.val());
    var permissionModeId = $.trim($selectPermissionMode.val());
    var subjectId = $.trim($("#hiddenSubjectId").val());
    var subjectName = $.trim($("#textSubjectName").val());

    if (permissionModeId == "" || subjectName == "") {
        hideDetail();
        return;
    }

    if ((subjectName != "") && (subjectId == "")) {
        hideDetail();
        //$("#textSubjectName").change();
        return;
    }

    var isOrgAdmin;
    $.qajax({
        url: "../../OrgUser/Org/OrgService.asmx/IsCurrentUserOrgAdmin",
        data: $.toJSON({ orgId: permissionOrgId }),
        async: false,
        success: function (result) {
            isOrgAdmin = result.d;
        }
    });

    switch (pageParameterSubjectCategory) {
        case "User":
            $("#iframeUserRole").attr("src", "../../OrgUser/User/UserRole/UserRoleList.aspx?" + $.param({ userId: subjectId, isOrgAdmin: isOrgAdmin }));
            break;

        case "Role":
            $("#iframeRoleUser").attr("src", "../../Role/RoleUser/RoleUserList.aspx?" + $.param({ roleid: subjectId, PageAction: pageAction.Edit, isOrgAdmin: isOrgAdmin, name: subjectName }));
            break;

        case "Department":
            //没有
            break;

        default:
            //没有subjectCategory
            break;
    }

    $("#iframeFunction").attr("src", "../PermissionDetail/FunctionPermission/FunctionPermission.aspx?" + $.param({ permissionOrgId: permissionOrgId, permissionProductId: permissionProductId, permissionModeId: permissionModeId, subjectCategory: pageParameterSubjectCategory, subjectId: subjectId, isOrgAdmin: isOrgAdmin }));
    $("#iframeSensitiveColumn").attr("src", "../PermissionDetail/SensitiveColumnPermission/SensitiveColumnPermissionList.aspx?" + $.param({ permissionOrgId: permissionOrgId, permissionModeId: permissionModeId, subjectCategory: pageParameterSubjectCategory, subjectId: subjectId, isOrgAdmin: isOrgAdmin }));

    $("#divDetail").show();
}

function hideDetail() {
    $("#divDetail").hide();
    $("#iframeUserRole").attr("src", "");
    $("#iframeRoleUser").attr("src", "");
    $("#iframeFunction").attr("src", "");
    $("#iframeSensitiveColumn").attr("src", "");
}

function buttonReset_click() {
    $selectPermissionOrg.val("");
    selectPermissionOrg_change();
    $selectPermissionProduct.val("");
    $("#textSubjectName").val("");
    $("#hiddenSubjectId").val(guidEmpty);
    hideDetail();
}



