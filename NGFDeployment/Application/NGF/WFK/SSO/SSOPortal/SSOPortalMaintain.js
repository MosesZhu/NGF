var $selectOrg;
var $selectProduct;
var $selectAuthenticationType;
var $textPortalInternalUrl;
var $textPortalInternalUrlBackup1;
var $textPortalInternalUrlBackup2;
var $textPortalInternalUrlBackup3;
var $textPortalExternalUrl;
var $textPortalExternalUrlBackup1;
var $textPortalExternalUrlBackup2;
var $textPortalExternalUrlBackup3;
var $portalInternalUrls;
var $portalExternalUrls;
var pageParameterId;
var pageParameterPageAction;
var isUrl;

$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectAuthenticationType = $("#selectAuthenticationType");
    $textPortalInternalUrl = $("#textPortalInternalUrl");
    $textPortalInternalUrlBackup1 = $("#textPortalInternalUrlBackup1");
    $textPortalInternalUrlBackup2 = $("#textPortalInternalUrlBackup2");
    $textPortalInternalUrlBackup3 = $("#textPortalInternalUrlBackup3");
    $textPortalExternalUrl = $("#textPortalExternalUrl");
    $textPortalExternalUrlBackup1 = $("#textPortalExternalUrlBackup1");
    $textPortalExternalUrlBackup2 = $("#textPortalExternalUrlBackup2");
    $textPortalExternalUrlBackup3 = $("#textPortalExternalUrlBackup3");
    $portalInternalUrls = $("td[name='portalInternalUrls'] :text");
    $portalExternalUrls = $("td[name='portalExternalUrls'] :text");
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    selectOrgDataBind();
    selectProductDataBind();
    selectAuthenticationTypeDataBind();

    //页面数据初始化
    initializeData();

    $selectAuthenticationType.on("change", selectAuthenticationType_change);
    $textPortalInternalUrl.on("blur", "", { url: $textPortalInternalUrl }, textUrl_blur);
    $textPortalInternalUrlBackup1.on("blur", "", { url: $textPortalInternalUrlBackup1 }, textUrl_blur);
    $textPortalInternalUrlBackup2.on("blur", "", { url: $textPortalInternalUrlBackup2 }, textUrl_blur);
    $textPortalInternalUrlBackup3.on("blur", "", { url: $textPortalInternalUrlBackup3 }, textUrl_blur);
    $textPortalExternalUrl.on("blur", "", { url: $textPortalExternalUrl }, textUrl_blur);
    $textPortalExternalUrlBackup1.on("blur", "", { url: $textPortalExternalUrlBackup1 }, textUrl_blur);
    $textPortalExternalUrlBackup2.on("blur", "", { url: $textPortalExternalUrlBackup2 }, textUrl_blur);
    $textPortalExternalUrlBackup3.on("blur", "", { url: $textPortalExternalUrlBackup3 }, textUrl_blur);
    $portalInternalUrls.on("focus", "", { url: $portalInternalUrls }, textUrl_focus);
    $portalExternalUrls.on("focus", "", { url: $portalExternalUrls }, textUrl_focus);
    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);
});

function textUrl_focus(e) {
    textUrl = e.data.url;
    textUrl.validatebox({ validType: null });
}

function textUrl_blur(e) {
    textUrl = e.data.url;
    var result = validateTextUrl(textUrl);
}

function validateTextUrl(textUrl) {
    textValue = textUrl.val();
    textUrl.val(encodeURI(textValue));
    textUrl.validatebox({ validType: 'url' });
    if (textUrl.validatebox("isValid")) {
        isUrl = true;
        textUrl.validatebox({ validType: null });
    }
    else {
        isUrl = false;
    }
    textUrl.val(textValue);
    return isUrl;
}

function selectAuthenticationType_change() {
    textUrlStatus();
}

function textUrlStatus() {
    if ($selectAuthenticationType.val() == "1") {
        $portalInternalUrls.prop("readonly", false);
        $portalExternalUrls.prop("readonly", true);
        $portalExternalUrls.val("");
        portalUrlsRequired(true, false);
        $("#spanInternal").css("display", "block");
        $("#spanExternal").css("display", "none");
    }
    else if ($selectAuthenticationType.val() == "2") {
        $portalInternalUrls.prop("readonly", true);
        $portalExternalUrls.prop("readonly", false);
        $portalInternalUrls.val("");
        portalUrlsRequired(false, true);
        $("#spanInternal").css("display", "none");
        $("#spanExternal").css("display", "block");
    }
    else if ($selectAuthenticationType.val() == "3") {
        $portalInternalUrls.prop("readonly", false);
        $portalExternalUrls.prop("readonly", false);
        portalUrlsRequired(true, true);
        $("#spanInternal").css("display", "block");
        $("#spanExternal").css("display", "block");
    }
    else {
        $portalInternalUrls.prop("readonly", true);
        $portalExternalUrls.prop("readonly", true);
        $portalInternalUrls.val("");
        $portalExternalUrls.val("");
        portalUrlsRequired(false, false);
        $("#spanInternal").css("display", "none");
        $("#spanExternal").css("display", "none");
    }
}

function portalUrlsRequired(isRequired1, isRequired2) {
    $textPortalInternalUrl.validatebox({
        required: isRequired1
    });

    $textPortalExternalUrl.validatebox({
        required: isRequired2
    });
    if (!isRequired1) {
        $portalInternalUrls.validatebox("validate");
    }
    if (!isRequired2) {
        $portalExternalUrls.validatebox("validate");
    }
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
        url: "../../SystemFunction/Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectAuthenticationTypeDataBind() {
    selectDataBind({
        $select: $selectAuthenticationType,
        url: "SSOPortalService.asmx/GetAuthenticationTypeList",
        itemValue: "Authentication_Type",
        itemText: "AuthenticationType",
        async: false //同步方式调用。
    });
}

function initializeData() {
    if (pageParameterPageAction == pageAction.New) {
        var orgId = $.url("?orgId");
        var productId = $.url("?productId");
        var authenticationType = $.url("?authenticationType");
        $selectOrg.val(orgId);
        $selectProduct.val(productId);
        $selectAuthenticationType.val(authenticationType);
        textUrlStatus();
    }
    else {
        $.qajax({
            url: "SSOPortalService.asmx/GetSSOPortal",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(ssoPortalDTO) {
    $selectOrg.val(ssoPortalDTO.Org_Id);
    $selectProduct.val(ssoPortalDTO.Product_Id);
    $selectAuthenticationType.val(ssoPortalDTO.Authentication_Type);
    $textPortalInternalUrl.val(ssoPortalDTO.Portal_Internal_Url);
    $textPortalInternalUrlBackup1.val(ssoPortalDTO.Portal_Internal_Url_Backup1);
    $textPortalInternalUrlBackup2.val(ssoPortalDTO.Portal_Internal_Url_Backup2);
    $textPortalInternalUrlBackup3.val(ssoPortalDTO.Portal_Internal_Url_Backup3);
    $textPortalExternalUrl.val(ssoPortalDTO.Portal_External_Url);
    $textPortalExternalUrlBackup1.val(ssoPortalDTO.Portal_External_Url_Backup1);
    $textPortalExternalUrlBackup2.val(ssoPortalDTO.Portal_External_Url_Backup2);
    $textPortalExternalUrlBackup3.val(ssoPortalDTO.Portal_External_Url_Backup3);
    textUrlStatus();

    //检查该笔数据是否允许编辑，若不允许则不可编辑
    if (!(ssoPortalDTO.AllowEdit)) {
        selectDisabled($selectOrg);
        selectDisabled($selectProduct);
        selectDisabled($selectAuthenticationType);
        textBoxDisabled($portalInternalUrls);
        textBoxDisabled($portalExternalUrls);

        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {
    if ($.trim($selectOrg.val()) == "") {
        $.messager.alert("Warning", "Org can't be empty!", "warning");
        return;
    }

    if ($.trim($selectProduct.val()) == "") {
        $.messager.alert("Warning", "Product can't be empty!", "warning");
        return;
    }

    if ($.trim($selectAuthenticationType.val()) == "") {
        $.messager.alert("Warning", "AuthenticationType can't be empty!", "warning");
        return;
    }

    var isValid = true;
    if (!validateTextUrl($textPortalInternalUrl)) {
        isValid = false;
    }
    if (!validateTextUrl($textPortalInternalUrlBackup1)) {
        isValid = false;
    }
    if (!validateTextUrl($textPortalInternalUrlBackup2)) {
        isValid = false;
    }
    if (!validateTextUrl($textPortalInternalUrlBackup3)) {
        isValid = false;
    }
    if (!validateTextUrl($textPortalExternalUrl)) {
        isValid = false;
    }
    if (!validateTextUrl($textPortalExternalUrlBackup1)) {
        isValid = false;
    }
    if (!validateTextUrl($textPortalExternalUrlBackup2)) {
        isValid = false;
    }
    if (!validateTextUrl($textPortalExternalUrlBackup3)) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var ssoPortalDTO = {
        Id: pageParameterId,

        Org_Id: $.trim($selectOrg.val()),
        Org_Name: $.trim($selectOrg.find("option:selected").text()),
        Product_Id: $.trim($selectProduct.val()),
        Product_Name: $.trim($selectProduct.find("option:selected").text()),
        Authentication_Type: $.trim($selectAuthenticationType.val()),
        Portal_Internal_Url: $.trim($textPortalInternalUrl.val()),
        Portal_Internal_Url_Backup1: $.trim($textPortalInternalUrlBackup1.val()),
        Portal_Internal_Url_Backup2: $.trim($textPortalInternalUrlBackup2.val()),
        Portal_Internal_Url_Backup3: $.trim($textPortalInternalUrlBackup3.val()),
        Portal_External_Url: $.trim($textPortalExternalUrl.val()),
        Portal_External_Url_Backup1: $.trim($textPortalExternalUrlBackup1.val()),
        Portal_External_Url_Backup2: $.trim($textPortalExternalUrlBackup2.val()),
        Portal_External_Url_Backup3: $.trim($textPortalExternalUrlBackup3.val())
    };

    if ($.trim(ssoPortalDTO.Id) == "") {
        ssoPortalDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "SSOPortalService.asmx/SaveSSOPortal",
        data: $.toJSON({ ssoPortalDTO: ssoPortalDTO, pageAction: pageParameterPageAction }),
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

function validateUrl(obj) {
    if (obj.length == 0) {
        return;
    }
    $(obj).each(function (i) {
        var isValid = obj[i].validatebox("isValid");
        if (isValid) {
        }
    })
    return false;
}