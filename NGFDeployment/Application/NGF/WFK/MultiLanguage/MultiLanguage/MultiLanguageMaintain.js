var pageParameterId;
var pageParameterPageAction;

var $selectOrg;
var $selectProduct;
var $selectDomain;
var $selectSystem;
var $selectTextType;
var $textName;
var $textCode;
var $selectCode;
var $spanCode;
var $textareaEnUs;
var $textareaZhCn;
var $textareaZhTw;
var $textareaReserveLanguage1;
var $textareaReserveLanguage2;
var $textareaReserveLanguage3;
var $textareaReserveLanguage4;
var $textareaReserveLanguage5;
var $textAttribute1;
var $textAttribute2;
var $textAttribute3;
var $textAttribute4;
var $textAttribute5;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectDomain = $("#selectDomain");
    $selectSystem = $("#selectSystem");
    $selectTextType = $("#selectTextType");
    $textName = $("#textName");
    $textCode = $("#textCode");
    $selectCode = $("#selectCode");
    $spanCode = $("#spanCode");
    $textareaEnUs = $("#textareaEnUs");
    $textareaZhCn = $("#textareaZhCn");
    $textareaZhTw = $("#textareaZhTw");
    $textareaReserveLanguage1 = $("#textareaReserveLanguage1");
    $textareaReserveLanguage2 = $("#textareaReserveLanguage2");
    $textareaReserveLanguage3 = $("#textareaReserveLanguage3");
    $textareaReserveLanguage4 = $("#textareaReserveLanguage4");
    $textareaReserveLanguage5 = $("#textareaReserveLanguage5");
    $textAttribute1 = $("#textAttribute1");
    $textAttribute2 = $("#textAttribute2");
    $textAttribute3 = $("#textAttribute3");
    $textAttribute4 = $("#textAttribute4");
    $textAttribute5 = $("#textAttribute5");

    panel_autoresize($("#divMainContent"), $("#divOther"));

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $selectDomain.on("change", selectDomain_change);
    $selectSystem.on("change", selectSystem_change);
    $selectTextType.on("change", selectTextType_change);
    $selectCode.on("change", selectCode_Change);
    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    $textareaZhCn.on("change", textareaZhCn_change);
    $textareaZhTw.on("change", textareaZhTw_change);

    selectOrgDataBind();
    selectProductDataBind();
    selectTextTypeDataBind();

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

function selectTextTypeDataBind() {
    selectDataBind({
        $select: $selectTextType,
        url: "MultiLanguageService.asmx/GetLanguageTextTypeList",
        itemType: "string",
        empty: false,
        async: false //同步方式调用。
    });
}

function selectCodeDataBind() {
    var textType = $selectTextType.val();
    switch (textType) {
        case "Function":
            $("#trOrg").show();
            $("#trDomain").show();
            $("#trSystem").show();
            $selectCode.show();
            $textCode.hide();
            var systemId = $.trim($selectSystem.val());
            if (systemId == "") {
                $selectCode.empty();
                return;
            }
            selectDataBind({
                $select: $selectCode,
                url: "../../SystemFunction/Function/FunctionService.asmx/GetFunctionList",
                data: $.toJSON({ systemId: systemId }),
                itemValue: "Id",
                itemText: "CodeAndName",
                async: false //同步方式调用。
            });
            break;
        case "Domain":
            $("#trOrg").hide();
            $("#trDomain").hide();
            $("#trSystem").hide();
            $selectCode.show();
            $textCode.hide();
            var productId = $.trim($selectProduct.val());
            if (productId == "") {
                $selectCode.empty();
                $selectCode.change();
                return;
            }
            selectDataBind({
                $select: $selectCode,
                url: "../../SystemFunction/Domain/DomainService.asmx/GetDomainList",
                data: $.toJSON({ productId: productId }),
                itemValue: "Id",
                itemText: "Name",
                async: false //同步方式调用。
            });
            break;
        case "System":
            $("#trOrg").show();
            $("#trDomain").show();
            $("#trSystem").hide();
            $selectCode.show();
            $textCode.hide();
            var orgId = $.trim($selectOrg.val());
            var domainId = $.trim($selectDomain.val());
            if (orgId == "" || domainId == "") {
                $selectCode.empty();
                $selectCode.change();
                return;
            }

            selectDataBind({
                $select: $selectCode,
                url: "../../SystemFunction/System1/SystemService.asmx/GetSystemList",
                data: $.toJSON({ orgId: orgId, domainId: domainId }),
                itemValue: "Id",
                itemText: "Name",
                async: false //同步方式调用。
            });
            break;
        default:
            $("#trOrg").show();
            $("#trDomain").show();
            $("#trSystem").show();
            $selectCode.empty();
            $selectCode.hide();
            $textCode.show();
            break;
    }


}

function setLanguageValue() {
    var textType = $.trim($selectTextType.val());
    if (textType != "Function") {
        return;
    }
    var functionId = $selectCode.val();
    if ($.trim(functionId) == "") {
        $textareaEnUs.val("");
        $textareaZhCn.val("");
        $textareaZhTw.val("");
        return;
    }
    $.qajax({
        url: "MultiLanguageService.asmx/GetFunctionName",
        data: $.toJSON({ functionId: functionId }),
        success: function (result) {
            $textareaEnUs.val(result.d);
            $textareaZhCn.val(result.d);
            $textareaZhTw.val(result.d);
        }
    });
}

function setNameRequired() {
    var textType = $selectTextType.val();
    if (textType == "Content") {
        $("#spanName").show();
    }
    else {
        $("#spanName").hide();
    }
}

function selectOrg_change() {
    selectSystemDataBind();
    selectCodeDataBind();
}

function selectProduct_change() {
    selectDomainDataBind();
    selectCodeDataBind();
}

function selectDomain_change() {
    selectSystemDataBind();
    selectCodeDataBind();
}

function selectSystem_change() {
    selectCodeDataBind();
    setLanguageValue();
}

function selectTextType_change() {
    selectCodeDataBind();
    setLanguageValue();
    setNameRequired();
    var textType = $.trim($selectTextType.val());
    if (textType == "Domain" || textType == "System" || textType == "Function") {
        $spanCode.text(textType);
        $("#trName").hide();
        $textName.val("");
    }
    else {
        $spanCode.text("Code");
        $("#trName").show();
    }
}

function selectCode_Change() {
    setLanguageValue();
}

//------分割线-----------------------------------------------------------------------------------

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "MultiLanguageService.asmx/GetMultiLanguage",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseMultiLanguageTextDTO) {
    var textType = baseMultiLanguageTextDTO.Text_Type;
    $selectTextType.val(textType);
    selectTextType_change();
    $selectOrg.val(baseMultiLanguageTextDTO.Org_Id);
    selectOrg_change();
    $selectProduct.val(baseMultiLanguageTextDTO.Product_Id);
    selectProduct_change();
    $selectDomain.val(baseMultiLanguageTextDTO.Domain_Id);
    selectDomain_change();
    $selectSystem.val(baseMultiLanguageTextDTO.System_Id);
    selectSystem_change();

    $textName.val(baseMultiLanguageTextDTO.Name);

    if (textType == "Domain" || textType == "System" || textType == "Function") {
        $selectCode.val(baseMultiLanguageTextDTO.Code);
    }
    else {
        $textCode.val(baseMultiLanguageTextDTO.Code);
    }

    $textareaEnUs.val(baseMultiLanguageTextDTO.En_Us);
    $textareaZhCn.val(baseMultiLanguageTextDTO.Zh_Cn);
    $textareaZhTw.val(baseMultiLanguageTextDTO.Zh_Tw);
    $textareaReserveLanguage1.val(baseMultiLanguageTextDTO.Reserve_Lang1);
    $textareaReserveLanguage2.val(baseMultiLanguageTextDTO.Reserve_Lang2);
    $textareaReserveLanguage3.val(baseMultiLanguageTextDTO.Reserve_Lang3);
    $textareaReserveLanguage4.val(baseMultiLanguageTextDTO.Reserve_Lang4);
    $textareaReserveLanguage5.val(baseMultiLanguageTextDTO.Reserve_Lang5);
    $textAttribute1.val(baseMultiLanguageTextDTO.Attribute1);
    $textAttribute2.val(baseMultiLanguageTextDTO.Attribute2);
    $textAttribute3.val(baseMultiLanguageTextDTO.Attribute3);
    $textAttribute4.val(baseMultiLanguageTextDTO.Attribute4);
    $textAttribute5.val(baseMultiLanguageTextDTO.Attribute5);

    if (!(baseMultiLanguageTextDTO.AllowEdit)) {
        selectDisabled($selectOrg);
        selectDisabled($selectProduct);
        selectDisabled($selectDomain);
        selectDisabled($selectSystem);
        selectDisabled($selectTextType);

        textBoxDisabled($textCode);
        textBoxDisabled($textareaEnUs);
        textBoxDisabled($textareaZhCn);
        textBoxDisabled($textareaZhTw);
        textBoxDisabled($textareaReserveLanguage1);
        textBoxDisabled($textareaReserveLanguage2);
        textBoxDisabled($textareaReserveLanguage3);
        textBoxDisabled($textareaReserveLanguage4);
        textBoxDisabled($textareaReserveLanguage5);
        textBoxDisabled($textAttribute1);
        textBoxDisabled($textAttribute2);
        textBoxDisabled($textAttribute3);
        textBoxDisabled($textAttribute4);
        textBoxDisabled($textAttribute5);

        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {
    var textType = $.trim($selectTextType.val());
    if (textType == "") {
        $.messager.alert("Warning", "Text Type can't be empty!", "warning");
        return;
    }

    var isValid = true;

    if (textType != "Domain" && textType != "System" && textType != "Function" && !$textCode.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaEnUs.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaZhCn.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaZhTw.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    if (!checkSelect())
        return;

    if (textType == "Function") {
        if ($.trim($selectCode.val()) == "") {
            $.messager.alert("Warning", "Code can't be empty!", "warning");
            return;
        }

        if ($.trim($selectSystem.val()) == "") {
            $.messager.alert("Warning", "System can't be empty when text type is Function!", "warning");
            return;
        }
    }
    if (textType == "Content" && $.trim($textName.val()) == "") {
        $.messager.alert("Warning", "Name can't be empty!", "warning");
        return;
    }
    if (textType == "Domain" && $.trim($selectCode.val()) == "") {
        $.messager.alert("Warning", "Domain can't be empty!", "warning");
        return;
    }
    if (textType == "System" && $.trim($selectCode.val()) == "") {
        $.messager.alert("Warning", "System can't be empty!", "warning");
        return;
    }

    var baseMultiLanguageTextDTO = {
        Id: pageParameterId,

        System_Id: textType == "System" ? $.trim($selectCode.val()) : $.trim($selectSystem.val()),
        System: $selectSystem.find("option:selected").text(),
        Text_Type: $.trim($selectTextType.val()),
        Name: $.trim($textName.val()),
        Code: textType == "Domain" || textType == "System" || textType == "Function" ? $.trim($selectCode.val()).toString() : $.trim($textCode.val()),
        CodeDisplay: $.trim($selectCode.val()) == "" ? $.trim($textCode.val()) : $selectCode.find("option:selected").text(),
        En_Us: $.trim($textareaEnUs.val()),
        Zh_Cn: $.trim($textareaZhCn.val()),
        Zh_Tw: $.trim($textareaZhTw.val()),
        Reserve_Lang1: $.trim($textareaReserveLanguage1.val()),
        Reserve_Lang2: $.trim($textareaReserveLanguage2.val()),
        Reserve_Lang3: $.trim($textareaReserveLanguage3.val()),
        Reserve_Lang4: $.trim($textareaReserveLanguage4.val()),
        Reserve_Lang5: $.trim($textareaReserveLanguage5.val()),
        Attribute1: $.trim($textAttribute1.val()),
        Attribute2: $.trim($textAttribute2.val()),
        Attribute3: $.trim($textAttribute3.val()),
        Attribute4: $.trim($textAttribute4.val()),
        Attribute5: $.trim($textAttribute5.val())
    };

    if ($.trim(baseMultiLanguageTextDTO.Id) == "") {
        baseMultiLanguageTextDTO.Id = guidEmpty;
    }

    if ($.trim(baseMultiLanguageTextDTO.System_Id) == "") {
        baseMultiLanguageTextDTO.System_Id = guidEmpty;
    }

    $.qajax({
        url: "MultiLanguageService.asmx/SaveBaseMultiLanguage",
        data: $.toJSON({ baseMultiLanguageTextDTO: baseMultiLanguageTextDTO, pageAction: pageParameterPageAction }),
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

function checkSelect() {
    var textType = $selectTextType.val();
    if (textType == "Domain" || textType == "System") {
        return true;
    }
    var orgId = $.trim($selectOrg.val());
    var productId = $.trim($selectProduct.val());
    var domainId = $.trim($selectDomain.val());
    var systemId = $.trim($selectSystem.val());
    if (systemId == "" && (orgId != "" || productId != "" || domainId != "")) {
        $.messager.alert("Warning", "System can't be empty when any of Org,Product,Domain is not empty!", "warning");
        return false;
    }
    return true;
}

function textareaZhCn_change() {
    var zhTw = $.trim($textareaZhTw.val());
    if (zhTw != "") {
        return;
    }
    $.qajax({
        url: "MultiLanguageService.asmx/ToTraditionalChinese",
        data: $.toJSON({ simplified: $.trim($textareaZhCn.val()) }),
        success: function (result) {
            $textareaZhTw.val(result.d);
        }
    });
}

function textareaZhTw_change() {
    var zhCn = $.trim($textareaZhCn.val());
    if (zhCn != "") {
        return;
    }
    $.qajax({
        url: "MultiLanguageService.asmx/ToSimplifiedChinese",
        data: $.toJSON({ traditional: $.trim($textareaZhTw.val()) }),
        success: function (result) {
            $textareaZhCn.val(result.d);
        }
    });
}