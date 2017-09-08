var $selectOrg;
var $selectProduct;
var $selectDomain;
var $textName;
var $textDescription;
var $selectSystemType;
var $textInstanceName;
var $textVersion;
var $textAdminRole;

$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectDomain = $("#selectDomain");
    $textName = $("#textName");
    $textDescription = $("#textDescription");
    $selectSystemType = $("#selectSystemType");
    $textInstanceName = $("#textInstanceName");
    $textVersion = $("#textVersion");
    $textAdminRole = $("#textAdminRole");

    $selectProduct.on("change", selectProduct_change);

    selectOrgDataBind();
    selectProductDataBind();
    selectSystemTypeDataBind();

    $("#buttonSearchRole").on("click", buttonSearchRole_click);
});

function selectProduct_change() {
    selectDomainDataBind();
}

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectProductDataBind() {
    selectDataBind({
        $select: $selectProduct,
        url: "../Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectDomainDataBind() {
    var productId = $selectProduct.val();
    if ($.trim(productId) == "") {
        $selectDomain.empty();
        return;
    }

    selectDataBind({
        $select: $selectDomain,
        url: "../Domain/DomainService.asmx/GetDomainList",
        data: $.toJSON({ productId: productId }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectSystemTypeDataBind() {
    selectDataBind({
        $select: $selectSystemType,
        url: "SystemService.asmx/GetSystemTypeList",
        itemType: "string",
        async: false //同步方式调用。
    });
}


function buttonSearchRole_click() {
    $.QDialog.show(
        {
            title: "Select Role"
        },
        {
            url: "../../Role/Role/SelectRole.aspx",
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    $textAdminRole.val(returnValue.Name);
                }
            }
        }
    );
    return false;
}