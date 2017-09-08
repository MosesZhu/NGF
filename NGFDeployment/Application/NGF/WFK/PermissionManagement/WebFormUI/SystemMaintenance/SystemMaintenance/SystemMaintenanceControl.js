var $selectOrg;
var $selectProduct;
var $selectCategory;
var $selectDomain;
var $selectSystem;
var $selectSystemGroup;
var $textSystem;

$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectCategory = $("#selectCategory");
    $selectDomain = $("#selectDomain");
    $selectSystem = $("#selectSystem");
    $selectSystemGroup = $("#selectSystemGroup");
    $textSystem = $("#textSystem");

    selectOrgDataBind();
    selectProductDataBind();
    selectCategoryDataBind();
    bySystemOrBySystemGroupDataBind();

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $selectCategory.on("change", selectCategory_change);
    $selectDomain.on("change", selectDomain_change);
});

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
        url: "../../SystemFunction/Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function bySystemOrBySystemGroupDataBind() {
    if ($.trim($selectCategory.val()) == "System") {
        $("#trDomainSystem").show();
        $("#trSystemGroup").hide();
        $selectSystemGroup.val("");
        $textSystem.val("");
        selectDomainDataBind();
    }
    else if ($.trim($selectCategory.val()) == "SystemGroup") {
        $("#trDomainSystem").hide();
        $("#trSystemGroup").show();
        $selectDomain.val("");
        $selectSystem.val("");
        selectSystemGroupDataBind();
    }
    else {
        $("#trDomainSystem").hide();
        $("#trSystemGroup").hide();
        $selectDomain.val("");
        $selectSystem.val("");
        $selectSystemGroup.val("");
        $textSystem.val("");
    }
}

function selectOrg_change() {
    if ($.trim($selectCategory.val()) == "System") {
        selectSystemDataBind();
    }
    else if ($.trim($selectCategory.val()) == "SystemGroup") {
        selectSystemGroupDataBind();
        textSystemDataBind();
    }
    else {
        return;
    }
}

function selectProduct_change() {
    bySystemOrBySystemGroupDataBind();
}

function selectCategory_change() {
    bySystemOrBySystemGroupDataBind();
}

function selectDomain_change() {
    selectSystemDataBind();
}

function selectCategoryDataBind() {
    selectDataBind({
        $select: $selectCategory,
        url: "SystemMaintenanceService.asmx/GetCategoryList",
        itemType: "string",
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
        url: "../../SystemFunction/Domain/DomainService.asmx/GetDomainList",
        data: $.toJSON({ productId: productId }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectSystemDataBind() {
    var orgId = $.trim($selectOrg.val());
    var productId = $.trim($selectProduct.val());
    var domainId = $.trim($selectDomain.val());
    if (orgId == "" || productId == "" || domainId == "") {
        $selectSystem.empty();
        $selectSystem.change();
        return;
    }

    selectDataBind({
        $select: $selectSystem,
        url: "SystemMaintenanceService.asmx/GetSystemList",
        data: $.toJSON({ orgId: orgId, productId: productId, domainId: domainId }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectSystemGroupDataBind() {
    var orgId = $selectOrg.val();
    var productId = $selectProduct.val();
    if ($.trim(orgId) == "" || $.trim(productId) == "") {
        $selectSystemGroup.empty();
        return;
    }

    selectDataBind({
        $select: $selectSystemGroup,
        url: "../SystemGroup/SystemGroupService.asmx/GetSystemGroupList",
        data: $.toJSON({ orgId: orgId, productId: productId }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function textSystemDataBind() {
    var systemGroupId = $selectSystemGroup.val();
    if ($.trim(systemGroupId) == "") {
        $textSystem.val("");
        return;
    }
    $.qajax({
        url: "../SystemGroup/SystemGroupService.asmx/GetSystemGroup",
        data: $.toJSON({ id: systemGroupId }),
        success: function (result) {
            if ($.trim(result.d) != "") {
                $textSystem.val(result.d.System_List);
            }
        }
    });
}

$.extend($.fn.validatebox.defaults.rules, {
    datetime: {
        validator: function (value, param) {
            if (!value) {
                return false;
            }
            var ss = value.split(' ');
            var ss1 = ss[0].split('/');
            var ss2 = ss[1].split(':');
            var y1 = parseInt(ss1[0], 10);
            var M1 = parseInt(ss1[1], 10);
            var d1 = parseInt(ss1[2], 10);
            var h1 = parseInt(ss2[0], 10);
            var m1 = parseInt(ss2[1], 10);
            var s1 = parseInt(ss2[2], 10);
            if (!isNaN(y1) && !isNaN(M1) && !isNaN(d1) && !isNaN(h1) && !isNaN(m1) && !isNaN(s1)) {
                if (y1 > 9999 || y1 < 1000) {
                    return false;
                }
                if (M1 > 12 || M1 < 1) {
                    return false;
                }
                if (d1 > 31 || d1 < 1) {
                    return false;
                }
                if (h1 > 24 || h1 < 0) {
                    return false;
                }
                if (m1 > 59 || m1 < 0) {
                    return false;
                }
                if (s1 > 59 || s1 < 0) {
                    return false;
                }

                var data2 = new Date(y1, M1 - 1, d1, h1, m1, s1);
                var y2 = data2.getFullYear();
                var M2 = data2.getMonth() + 1;
                var d2 = data2.getDate();
                var h2 = data2.getHours();
                var m2 = data2.getMinutes();
                var s2 = data2.getSeconds();

                if (y1 != y2 || M1 != M2 || d1 != d2 || h1 != h2 || m1 != m2 || s1 != s2) {
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        },
        message: 'Please enter a date(format: yyyyMMdd hh:mm:ss).'
    }
});