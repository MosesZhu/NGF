var $selectPermissionOrg;
var $selectPermissionProduct;
var $selectPermissionMode;
var $selectSubjectCategory;
var $textSubjectName;
var $hiddenSubjectId;
//var $selectResourceOrg;
var $selectResourceCategory;
var $textResourceName;
var $hiddenResourceId;
var $textName;
var $textDescription;
var $selectResourceProduct;
var $selectResourceDomain;
var $textSystem;
var $textFunction;
var $textDataSource;
var $textDatatable;

//document.ready begin-------------------------------------------------
$(function () {
    $selectPermissionOrg = $("#selectPermissionOrg");
    $selectPermissionProduct = $("#selectPermissionProduct");
    $selectPermissionMode = $("#selectPermissionMode");
    $selectSubjectCategory = $("#selectSubjectCategory");
    $textSubjectName = $("#textSubjectName");
    $hiddenSubjectId = $("#hiddenSubjectId");
    //$selectResourceOrg = $("#selectResourceOrg");
    $selectResourceCategory = $("#selectResourceCategory");
    $textResourceName = $("#textResourceName");
    $hiddenResourceId = $("#hiddenResourceId");
    $textName = $("#textName");
    $textDescription = $("#textDescription");

    $selectResourceProduct = $("#selectResourceProduct");
    $selectResourceDomain = $("#selectResourceDomain");
    $textSystem = $("#textSystem");
    $textFunction = $("#textFunction");
    $textDataSource = $("#textDataSource");
    $textDatatable = $("#textDatatable");


    $selectPermissionOrg.on("change", selectPermissionOrg_change);
    $selectPermissionProduct.on("change", selectPermissionProduct_change);
    $selectSubjectCategory.on("change", dropDownListSubjectCategory_change);
    $textSubjectName.on("change", textBoxSubjectName_change);
    $("#buttonSearchSubject").on("click", buttonSearchSubject_click);

    $selectResourceCategory.on("change", dropDownListResourceCategory_change);
    $textResourceName.on("change", textBoxResourceName_change);
    $("#imgSearchResource").on("click", imgSearchResource_click);
    $selectResourceProduct.on("change", selectResourceProduct_change);

    selectPermissionOrgDataBind();
    selectPermissionProductDataBind();
    selectSubjectCategoryDataBind();
    selectResourceCategoryDataBind();
    //selectResourceOrgDataBind();
    selectResourceProductDataBind();
});
//document.ready end-------------------------------------------------

//DropDownList DataBind begin-------------------------------------------------
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

function selectResourceProductDataBind() {
    selectDataBind({
        $select: $selectResourceProduct,
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
        itemText: "Name"
    });
}

function selectResourceProduct_change() {
    selectResourceDomainDataBind();
}

function selectResourceDomainDataBind() {
    var productId = $selectResourceProduct.val();
    if ($.trim(productId) == "") {
        $selectResourceDomain.empty();
        return;
    }

    selectDataBind({
        $select: $selectResourceDomain,
        url: "../../SystemFunction/Domain/DomainService.asmx/GetDomainList",
        data: $.toJSON({ productId: productId }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectSubjectCategoryDataBind() {
    selectDataBind({
        $select: $selectSubjectCategory,
        url: "PermissionService.asmx/GetSubjectCategoryList",
        itemType: "string",
        async: false
    });
}

function selectResourceCategoryDataBind() {
    selectDataBind({
        $select: $selectResourceCategory,
        url: "PermissionService.asmx/GetResourceCategoryList",
        itemType: "string",
        async: false
    });
}

//function selectResourceOrgDataBind() {
//    selectDataBind({
//        $select: $selectResourceOrg,
//        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
//        itemValue: "Id",
//        itemText: "Name"
//    });
//}
//DropDownList DataBind end-------------------------------------------------

//Subject begin-------------------------------------------------
function dropDownListSubjectCategory_change() {
    $textSubjectName.val("");
    $hiddenSubjectId.val(guidEmpty);
}

function textBoxSubjectName_change() {
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
        url: "ViewBaseSubjectService.asmx/GetViewBaseSubjectId",
        data: $.toJSON({ subjectCategory: subjectCategory, subjectName: subjectName }),
        success: function (result) {
            if (result.d == undefined || result.d == null) {
                //如果不是有效的subject， 那么把hiddenSubjectId置为空，让subjectName模糊查询.
                $hiddenSubjectId.val(guidEmpty);
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

//Resource begin-------------------------------------------------
function dropDownListResourceCategory_change() {
    $textResourceName.val("");
    $hiddenResourceId.val(guidEmpty);
}

function textBoxResourceName_change() {
    var resourceCategory = $.trim($selectResourceCategory.val());
    if (resourceCategory == "") {
        $textResourceName.val("");
        $textResourceName.val(guidEmpty);
        return;
    }

    var resourceName = $.trim($textResourceName.val());
    if (resourceName == "") {
        $hiddenResourceId.val(guidEmpty);
        return;
    }

    $.qajax({
        url: "ViewBaseResourceService.asmx/GetViewBaseResourceId",
        data: $.toJSON({ resourceCategory: resourceCategory, resourceName: resourceName }),
        success: function (result) {
            if (result.d == undefined || result.d == null) {
                //如果不是有效的Resource， 那么把hiddenResourceId置为空，让resourceName模糊查询.
                $hiddenResourceId.val(guidEmpty);
            }
            else {
                $hiddenResourceId.val(result.d);
            }
        }
    });
}

function imgSearchResource_click() {
    var resourceCategory = $.trim($selectResourceCategory.val());
    if (resourceCategory == "") {
        return false;
    }

    switch (resourceCategory) {
        case "System":
            var urlSystem = "../../PopupPage/ResourceCategory/System1/SelectSystem.aspx";
            showSubjectDialog(resourceCategory, urlSystem);
            break;

        case "Function":
            var urlFunction = "../../PopupPage/ResourceCategory/Function/SelectFunction.aspx";
            showSubjectDialog(resourceCategory, urlFunction);
            break;

        case "Operation":
            var urlOperation = "../../PopupPage/ResourceCategory/Operation/SelectOperation.aspx";
            showSubjectDialog(resourceCategory, urlOperation);
            break;

        case "SensitiveColumn":
            var urlSensitiveColumn = "../../PopupPage/ResourceCategory/SensitiveColumn/SelectSensitiveColumn.aspx";
            showSubjectDialog(resourceCategory, urlSensitiveColumn);
            break;

        default:
            //没有选择resourceCategory或者resourceCategory不对，不弹出窗口
    }
    return false;
}

function showResourceDialog(resourceCategory, resourceUrl) {
    $.QDialog.show(
        {
            title: "Select " + resourceCategory
        },
        {
            width: 0.9,
            height: 0.9,
            url: resourceUrl,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    switch (resourceCategory) {
                        case "System":
                            $hiddenResourceId.val(returnValue.Id);
                            $textResourceName.val(returnValue.Name);
                            break;

                        case "Function":
                            $hiddenResourceId.val(returnValue.Id);
                            $textResourceName.val(returnValue.Name);
                            break;

                        case "Operation":
                            $hiddenResourceId.val(returnValue.Id);
                            $textResourceName.val(returnValue.Name);
                            break;

                        case "SensitiveColumn":
                            $hiddenResourceId.val(returnValue.Id);
                            $textResourceName.val(returnValue.Name);
                            break;
                    }
                }
            }
        }
    );
}
//Resource end-------------------------------------------------