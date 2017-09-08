//var $selectOrg;
var $selectDataSource;
var $selectData;
var $selectSubjectCategory;
var $selectPermissionOrg;
var $selectPermissionProduct;
var $selectPermissionMode;
var $textSubjectName;
var $hiddenSubjectId;

$(function () {
    //$selectOrg = $("#selectOrg");
    $selectDataSource = $("#selectDataSource");
    $selectData = $("#selectData");
    $selectSubjectCategory = $("#selectSubjectCategory");
    $selectPermissionOrg = $("#selectPermissionOrg");
    $selectPermissionProduct = $("#selectPermissionProduct");
    $selectPermissionMode = $("#selectPermissionMode");
    $textSubjectName = $("#textSubjectName");
    $hiddenSubjectId = $("#hiddenSubjectId");

    $selectPermissionOrg.on("change", selectPermissionOrg_change);
    $selectPermissionProduct.on("change", selectPermissionProduct_change);
    //$selectOrg.on("change", selectOrg_change);
    $selectDataSource.on("change", selectDataSource_change);

    selectPermissionOrgDataBind();
    selectPermissionProductDataBind();
    //selectOrgDataBind();

    $selectSubjectCategory.on("change", selectSubjectCategory_change);
    $textSubjectName.on("change", textSubjectName_change);
    $("#buttonSearchSubject").on("click", buttonSearchSubject_click);
    selectSubjectCategoryDataBind();
});

function selectPermissionOrg_change() {
    selectPermissionProduct_change();
    selectDataSourceDataBind();
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
        url: "../../PermissionModel/PermissionMode/PermissionModeService.asmx/GetBasePermissionModeListByOrgProduct",
        data: $.toJSON({ basePermissionModeDTO: basePermissionModeDTO }),
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

//function selectOrg_change() {
//    selectDataSourceDataBind();
//}

function selectDataSource_change() {
    selectDataDataBind();
}

function selectPermissionOrgDataBind() {
    selectDataBind({
        $select: $selectPermissionOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

function selectPermissionProductDataBind() {
    selectDataBind({
        $select: $selectPermissionProduct,
        url: "../../SystemFunction/Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

//function selectOrgDataBind() {
//    selectDataBind({
//        $select: $selectOrg,
//        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
//        itemValue: "Id",
//        itemText: "Name",
//        async: false
//    });
//}

function selectDataSourceDataBind() {
    //var orgId = $.trim($selectOrg.val());
    var orgId = $.trim($selectPermissionOrg.val());
    if (orgId == "") {
        $selectDataSource.empty();
        $selectDataSource.change();
        return;
    }

    selectDataBind({
        $select: $selectDataSource,
        url: "../../SensitiveData/DataSource/DataSourceService.asmx/GetBaseDataSourceList",
        data: $.toJSON({ orgId: orgId }),
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

function selectDataDataBind() {
    var dataSourceId = $.trim($selectDataSource.val());
    if (dataSourceId == "") {
        $selectData.empty();
        $selectData.change();
        return;
    }

    selectDataBind({
        $select: $selectData,
        url: "../Data/DataService.asmx/GetBaseDataList",
        data: $.toJSON({ dataSourceId: dataSourceId }),
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

function selectSubjectCategoryDataBind() {
    selectDataBind({
        $select: $selectSubjectCategory,
        url: "../../PermissionModel/Permission/PermissionService.asmx/GetSubjectCategoryList",
        itemType: "string",
        async: false
    });
}

//Subject begin-------------------------------------------------
function selectSubjectCategory_change() {
    $textSubjectName.val("");
    $hiddenSubjectId.val(guidEmpty);
}

function textSubjectName_change() {
    var subjectCategory = $.trim($selectSubjectCategory.val());
    if (subjectCategory == "") {
        $textSubjectName.val("");
        $hiddenSubjectId.val(guidEmpty);
        return;
    }

    var subjectName = $.trim($textSubjectName.val());
    if (subjectName == "") {
        $hiddenSubjectId.val(guidEmpty);
        return;
    }

    $.qajax({
        url: "../../PermissionModel/Permission/ViewBaseSubjectService.asmx/GetViewBaseSubjectId",
        data: $.toJSON({ subjectCategory: subjectCategory, subjectName: subjectName }),
        success: function (result) {
            if (result.d == undefined || result.d == null) {
                $textSubjectName.val("");
                $hiddenSubjectId.val(guidEmpty);
                $.messager.alert("Warning", "This subject is Invalid!", "warning");
            }
            else {
                $hiddenSubjectId.val(result.d);
            }
        }
    });
}

function buttonSearchSubject_click() {
    var subjectCategory = $.trim($selectSubjectCategory.val());
    if (subjectCategory == "") {
        return false;
    }

    switch (subjectCategory) {
        case "User":
            var urlUser = "../../OrgUser/User/SelectUser.aspx";
            showSubjectDialog(subjectCategory, urlUser);
            break;

        case "Role":
            var urlRole = "../../Role/Role/SelectRole.aspx";
            showSubjectDialog(subjectCategory, urlRole);
            break;

        case "Department":
            var urlDepartment = "../../OrgUser/Department/SelectDepartment.aspx";
            showSubjectDialog(subjectCategory, urlDepartment);
            break;

        default:
            //没有选择subjectCategory或者subjectCategory不对，不弹出窗口
    }
    return false;
}

function showSubjectDialog(subjectCategory, subjectUrl) {
    $.QDialog.show(
        {
            title: "Select " + subjectCategory
        },
        {
            url: subjectUrl,
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    switch (subjectCategory) {
                        case "User":
                            $hiddenSubjectId.val(returnValue.User_Id);
                            $textSubjectName.val(returnValue.User_Name);
                            break;

                        case "Role":
                            $hiddenSubjectId.val(returnValue.Id);
                            $textSubjectName.val(returnValue.Name);
                            break;

                        case "Department":
                            $hiddenSubjectId.val(returnValue.Id);
                            $textSubjectName.val(returnValue.Department_Name);
                            break;
                    }
                }
            }
        }
    );
}
//Subject end-------------------------------------------------