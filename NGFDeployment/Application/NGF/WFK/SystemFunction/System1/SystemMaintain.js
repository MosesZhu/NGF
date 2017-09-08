var pageParameterId;
var pageParameterPageAction;
var pageParameterIsSystemAdmin;
var pageParameterIsOrgAdmin;

var $textareaDescription;
var $spanUrlStar;
var $textareaUrl;
var $textareaExternalBaseUrl;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsSystemAdmin = $.url('?isSystemAdmin');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $textareaDescription = $("#textareaDescription");
    $spanUrlStar = $("#spanUrlStar");
    $textareaUrl = $("#textareaUrl");
    $textareaExternalBaseUrl = $("#textareaExternalBaseUrl");

    $selectSystemType.on("change", selectSystemType_change);

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //页面数据初始化
    initializeData();
});

function selectSystemType_change() {
    if ($.trim($selectSystemType.val()) == "WebForm" || $.trim($selectSystemType.val()) == "SSRS") {
        $spanUrlStar.show();
        $textareaUrl.validatebox({
            required: true,
            validType: ['length[1,1024]', 'urlSelfDefined']
        }
        );
    } else {
        $spanUrlStar.hide();
        $textareaUrl.validatebox({
            required: false,
            validType: 'length[0,1024]'
        });
    }
}

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "SystemService.asmx/GetSystem",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseSystemDTO) {
    $selectOrg.val(baseSystemDTO.Org_Id);
    $selectProduct.val(baseSystemDTO.Product_Id);
    selectProduct_change();
    $selectDomain.val(baseSystemDTO.Domain_Id);
    $textName.val(baseSystemDTO.Name);
    $textareaDescription.val(baseSystemDTO.Description);
    $selectSystemType.val(baseSystemDTO.System_Type);
    selectSystemType_change();
    $textInstanceName.val(baseSystemDTO.Instance_Name);
    $textVersion.val(baseSystemDTO.Version);
    $textAdminRole.val(baseSystemDTO.AdminRole);
    $textareaUrl.val(baseSystemDTO.Base_Url);
    $textareaExternalBaseUrl.val(baseSystemDTO.External_Base_Url);

    //检查该笔数据是否允许编辑或者是否为系统管理员、Org管理员，若不允许或不是管理员则不可编辑
    if (!(baseSystemDTO.AllowEdit) || (pageParameterIsSystemAdmin == "false" && pageParameterIsOrgAdmin == "false")) {
        selectDisabled($selectOrg);
        selectDisabled($selectProduct);
        selectDisabled($selectDomain);
        selectDisabled($selectSystemType);

        textBoxDisabled($textName);
        textBoxDisabled($textareaDescription);
        textBoxDisabled($textInstanceName);
        textBoxDisabled($textVersion);
        textBoxDisabled($textAdminRole);
        textBoxDisabled($textareaUrl);
        textBoxDisabled($textareaExternalBaseUrl);

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

    if ($.trim($selectDomain.val()) == "") {
        $.messager.alert("Warning", "Domain can't be empty!", "warning");
        return;
    }

    var isValid = true;

    if (!$textName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaDescription.validatebox("isValid")) {
        isValid = false;
    }

    if ($.trim($selectSystemType.val()) == "") {
        $.messager.alert("Warning", "System type can't be empty!", "warning");
        return;
    }

    if (!$textVersion.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textVersion.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textAdminRole.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaUrl.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var baseUrl = $.trim($textareaUrl.val());
    if (baseUrl.substring(baseUrl.length - 1, baseUrl.length) == "/") {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    var baseSystemDTO = {
        Id: pageParameterId,
        Org_Id: $.trim($selectOrg.val()),
        Org: $.trim($selectOrg.find("option:selected").text()),
        Product_Id: $.trim($selectProduct.val()),
        Product: $.trim($selectProduct.find("option:selected").text()),
        Domain_Id: $.trim($selectDomain.val()),
        Domain: $.trim($selectDomain.find("option:selected").text()),
        Name: $.trim($textName.val()),
        Description: $.trim($textareaDescription.val()),
        System_Type: $.trim($selectSystemType.val()),
        Instance_Name: $.trim($textInstanceName.val()),
        Version: $.trim($textVersion.val()),
        AdminRole: $.trim($textAdminRole.val()),
        Base_Url: baseUrl,
        External_Base_Url: $.trim($textareaExternalBaseUrl.val())
    };

    if ($.trim(baseSystemDTO.Id) == "") {
        baseSystemDTO.Id = guidEmpty;
    }
    $.qajax({
        url: "SystemService.asmx/SaveBaseSystem",
        data: $.toJSON({ baseSystemDTO: baseSystemDTO, pageAction: pageParameterPageAction }),
        beforeSend: function (XMLHttpRequest) {
            $("#buttonSave").prop("disabled", true);
        },
        success: function (result) {
            if (result.d == "") {
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

$.extend($.fn.validatebox.defaults.rules, {
    urlSelfDefined: {
        validator: function (value, param) {
            if (value.indexOf("http://") == 0 || value.indexOf("https://") == 0) {
                return true;
            }
            return false;
        },
        message: 'Please enter a valid URL.'
    }
});