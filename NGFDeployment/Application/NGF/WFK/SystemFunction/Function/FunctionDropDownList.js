var $selectOrg;
var $selectProduct;
var $selectDomain;
var $selectSystem;

//--分割线------------------------------------------------------------------------------------------------------------
///下拉框脚本

$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectDomain = $("#selectDomain");
    $selectSystem = $("#selectSystem");

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $selectDomain.on("change", selectDomain_change);
    $selectSystem.on("change", selectSystem_change);

    selectOrgDataBind();
    selectProductDataBind();
});

function selectOrg_change() {
    $('#divFunction').hide();

    selectSystemDataBind();
}

function selectProduct_change() {
    $('#divFunction').hide();

    selectDomainDataBind();
}

function selectDomain_change() {
    $('#divFunction').hide();

    selectSystemDataBind();
}

function selectSystem_change() {
    $('#divFunction').hide();
}

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name",
        empty: false
    });
}

function selectProductDataBind() {
    selectDataBind({
        $select: $selectProduct,
        url: "../Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name",
        empty: false
    });
}

function selectDomainDataBind() {
    var productId = $.trim($selectProduct.val());
    if (productId == "") {
        $selectDomain.empty();
        $selectDomain.change();
        return;
    }

    selectDataBind({
        $select: $selectDomain,
        url: "../Domain/DomainService.asmx/GetDomainList",
        data: $.toJSON({ productId: productId }),
        itemValue: "Id",
        itemText: "Name",
        empty: false
    });
}

function selectSystemDataBind() {
    var orgId = $.trim($selectOrg.val());
    var domainId = $.trim($selectDomain.val());
    if (orgId == "" || domainId == "") {
        $selectSystem.empty();
        $selectSystem.change();
        return;
    }

    selectDataBind({
        $select: $selectSystem,
        url: "../System1/SystemService.asmx/GetSystemList",
        data: $.toJSON({ orgId: orgId, domainId: domainId }),
        itemValue: "Id",
        itemText: "Name",
        empty: false
    });
}