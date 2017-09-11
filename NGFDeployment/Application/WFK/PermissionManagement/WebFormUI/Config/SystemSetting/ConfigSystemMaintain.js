var pageParameterId;
var pageParameterPageAction;
var pageParameterIsSystemAdmin;

var $selectOrg;
var $selectProduct;
var $selectDomain;
var $selectSystem;
var $textKey;
var $textareaValue;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsSystemAdmin = $.url('?isSystemAdmin');

    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectDomain = $("#selectDomain");
    $selectSystem = $("#selectSystem");
    $textKey = $("#textKey");
    $textareaValue = $("#textareaValue");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //select绑定
    selectOrgDataBind();
    selectProductDataBind();

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $selectDomain.on("change", selectDomain_change);

    //页面数据初始化
    initializeData();
});

//------绑定select-----------------------------------------------------------------------------
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

function selectDomainDataBind() {
    var productId = $.trim($selectProduct.val());
    if (productId == "") {
        $selectDomain.empty();
        $selectDomain.change();
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
    var domainId = $.trim($selectDomain.val());
    if (orgId == "" || domainId == "") {
        $selectSystem.empty();
        $selectSystem.change();
        return;
    }

    selectDataBind({
        $select: $selectSystem,
        url: "../../SystemFunction/System1/SystemService.asmx/GetSystemList",
        data: $.toJSON({ orgId: orgId, domainId: domainId }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectOrg_change() {
    selectSystemDataBind();
}

function selectProduct_change() {
    selectDomainDataBind();
}

function selectDomain_change() {
    selectSystemDataBind();
}

//----------------------------------------------------------------------
function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "ConfigSystemService.asmx/GetBaseConfigSystem",
            data: $.toJSON({ configSystemId: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseConfigSystemDTO) {
    $selectOrg.val(baseConfigSystemDTO.Org_Id);
    selectOrg_change();
    $selectProduct.val(baseConfigSystemDTO.Product_Id);
    selectProduct_change();
    $selectDomain.val(baseConfigSystemDTO.Domain_Id);
    selectDomain_change();
    $selectSystem.val(baseConfigSystemDTO.System_Id);
    $textKey.val(baseConfigSystemDTO.Key);
    $textareaValue.val(baseConfigSystemDTO.Value);

    if (!baseConfigSystemDTO.AllowEdit || pageParameterIsSystemAdmin == "false") {
        selectDisabled($selectOrg);
        selectDisabled($selectProduct);
        selectDisabled($selectDomain);
        selectDisabled($selectSystem);
        textBoxDisabled($textKey);
        textBoxDisabled($textareaValue);

        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {

    if ($.trim($selectSystem.val()) == "") {
        $.messager.alert("Warning", "System can't be empty!", "warning");
        return;
    }

    if (pageParameterPageAction == pageAction.New && !checkIsSystemAdmin()) {
        $.messager.alert("Warning", "You don't have permisson to add because you're not this system admin!", "warning");
        return;
    }

    var isValid = true;
    if (!$textKey.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textareaValue.validatebox("isValid")) {
        isValid = false;
    }
    if (!isValid) {
        return;
    }

    var baseConfigSystemDTO = {
        Id: pageParameterId,
        System_Id: $.trim($selectSystem.val()),
        Key: $.trim($textKey.val()),
        Value: $.trim($textareaValue.val())
    };

    if ($.trim(baseConfigSystemDTO.Id) == "") {
        baseConfigSystemDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "ConfigSystemService.asmx/SaveBaseConfigSystem",
        data: $.toJSON({ baseConfigSystemDTO: baseConfigSystemDTO, pageAction: pageParameterPageAction }),
        beforeSend: function (XMLHttpRequest) {
            $("#buttonSave").prop("disabled", true);
        },
        success: function (result) {
            if ($.trim(result.d) == "") {
                $.messager.alert("Information", "Save success!", "info",
                    function () {
                        parent.$.QDialog.hide(true);
                    });
            }
            else {
                $.messager.alert("Error", result.d, "error");
            }
        },
        complete: function () {
            $("#buttonSave").prop("disabled", false);
        }
    });
    return;
}

function buttonCancel_click() {
    parent.$.QDialog.hide(false);
}

//----------------------------------------------------------------------------
$.extend($.fn.validatebox.defaults.rules, {
    namespace: {
        validator: function (value, param) {
            var reg = /^[_a-zA-z][\w]*(\.?([_a-zA-z][\w]*))*$/;
            var result = reg.test(value);
            return result;
        },
        message: 'Please enter a valid value.'
    }
});

function checkIsSystemAdmin() {
    var isSystemAdmin;
    var systemId = $.trim($selectSystem.val());
    $.qajax({
        async: false,
        url: "../../SystemFunction/System1/SystemService.asmx/IsCurrentUserSystemAdmin",
        data: $.toJSON({ systemId: systemId }),
        success: function (result) {
            isSystemAdmin = result.d;
        }
    });
    return isSystemAdmin;
}