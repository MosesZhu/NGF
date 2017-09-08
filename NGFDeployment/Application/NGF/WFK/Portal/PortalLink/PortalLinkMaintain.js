var pageParameterId;
var pageParameterPageAction;
var pageParameterIsOrgAdmin;

var $selectOrg;
var $selectProduct;
var $selectPosition;
var $textName;
var $selectTarget;
var $textareaDescription;
var $textareaNavigateUrl;
var $textSortCode;
var $textSystemIconName;
var $textareaCustomIconUrl;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectPosition = $("#selectPosition");
    $textName = $("#textName");
    $selectTarget = $("#selectTarget");
    $textareaDescription = $("#textareaDescription");
    $textareaNavigateUrl = $("#textareaNavigateUrl");
    $textSortCode = $("#textSortCode");
    $textSystemIconName = $("#textSystemIconName");
    $textareaCustomIconUrl = $("#textareaCustomIconUrl");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //select绑定
    selectOrgDataBind();
    selectProductDataBind();
    selectPositionDataBind();
    selectTargetDataBind();

    $textareaCustomIconUrl.on("change", textareaCustomIconUrl_change);
    $("#buttonSelectIcon").on("click", buttonSelectIcon_click);

    //页面数据初始化
    initializeData();
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

function selectPositionDataBind() {
    selectDataBind({
        $select: $selectPosition,
        url: "PortalLinkService.asmx/GetPositionList",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function selectTargetDataBind() {
    selectDataBind({
        $select: $selectTarget,
        url: "../../SystemFunction/Function/FunctionService.asmx/GetTargetList",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function buttonSelectIcon_click() {
    $.QDialog.show(
        {
            title: "Select Icon"
        },
        {
            url: "../../SystemFunction/Function/SelectSystemIcon.aspx",
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    $textSystemIconName.val(returnValue.name);
                    $("#imgIcon").show();
                    //$("#imgIcon").attr("src", "../../SystemFunction/Function/SystemIcon/" + returnValue.name);
                    $("#imgIcon").attr("src", "./res.its?icon=" + returnValue.name);
                }
            }
        }
    );
    return false;
}

function textareaCustomIconUrl_change() {
    $("#txtEnCodeIconUrl").val("");
    var iconUrl = $.trim($textareaCustomIconUrl.val());
    if (iconUrl != "") {
        var encodeIconUrl = encodeURI(iconUrl);
        $("#txtEnCodeIconUrl").val(encodeIconUrl);
        if ($("#txtEnCodeIconUrl").validatebox("isValid")) {
            $("#imageIconUrl").show();
            $("#imageIconUrl").attr("src", iconUrl);
        } else {
            $("#imageIconUrl").hide();
            $("#imageIconUrl").attr("src", "");
        }
    } else {
        $("#imageIconUrl").hide();
        $("#imageIconUrl").attr("src", "");
    }
}
//------分割线-----------------------------------------------------------------------------------

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "PortalLinkService.asmx/GetPortalLink",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(portalLinkDTO) {
    $selectOrg.val(portalLinkDTO.Org_Id);
    $selectProduct.val(portalLinkDTO.Product_Id);
    $selectPosition.val(portalLinkDTO.Position);
    $textName.val(portalLinkDTO.Name);
    $selectTarget.val(portalLinkDTO.Target);
    $textSortCode.val(portalLinkDTO.Sort_Code);
    $textareaDescription.val(portalLinkDTO.Description);
    $textareaNavigateUrl.val(portalLinkDTO.Navigate_Url);
    $textSystemIconName.val(portalLinkDTO.System_Icon_Name);
    if (portalLinkDTO.System_Icon_Name != "") {
        $("#imgIcon").show();
        //$("#imgIcon").attr("src", "../../SystemFunction/Function/SystemIcon/" + portalLinkDTO.System_Icon_Name);
        $("#imgIcon").attr("src", "./res.its?icon=" + portalLinkDTO.System_Icon_Name);
    }

    $textareaCustomIconUrl.val(portalLinkDTO.Custom_Icon_Url);
    textareaCustomIconUrl_change();

    if (!portalLinkDTO.AllowEdit || pageParameterIsOrgAdmin == "false") {
        selectDisabled($selectOrg);
        selectDisabled($selectProduct);
        selectDisabled($selectPosition);
        selectDisabled($selectTarget);
        textBoxDisabled($textName);
        textBoxDisabled($textSortCode);
        textBoxDisabled($textareaDescription);
        textBoxDisabled($textareaNavigateUrl);
        textBoxDisabled($textSystemIconName);
        textBoxDisabled($textareaCustomIconUrl);

        $("#imgIcon").off("click");
        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {

    if ($.trim($selectOrg.val()) != "") {
        if (pageParameterPageAction == pageAction.New && !checkIsOrgAdmin()) {
            return;
        }
    }

    if ($.trim($selectProduct.val()) == "") {
        $.messager.alert("Warning", "Product can't be empty!", "warning");
        return;
    }

    if ($.trim($selectPosition.val()) == "") {
        $.messager.alert("Warning", "Position can't be empty!", "warning");
        return;
    }

    if ($.trim($selectTarget.val()) == "") {
        $.messager.alert("Warning", "Target can't be empty!", "warning");
        return;
    }

    var isValid = true;

    if (!$textName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaDescription.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaNavigateUrl.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaCustomIconUrl.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var portalLinkDTO = {
        Id: pageParameterId,

        Org_Id: $.trim($selectOrg.val()),
        Product_Id: $.trim($selectProduct.val()),
        Product: $.trim($selectProduct.find("option:selected").text()),
        Position: $.trim($selectPosition.val()),
        Name: $.trim($textName.val()),
        Target: $.trim($selectTarget.val()),
        Sort_Code: $.trim($textSortCode.val()),
        Description: $.trim($textareaDescription.val()),
        Navigate_Url: $.trim($textareaNavigateUrl.val()),
        System_Icon_Name: $.trim($textSystemIconName.val()),
        Custom_Icon_Url: $.trim($textareaCustomIconUrl.val())
    };

    if ($.trim(portalLinkDTO.Id) == "") {
        portalLinkDTO.Id = guidEmpty;
    }

    if (portalLinkDTO.Org_Id == "") {
        portalLinkDTO.Org_Id = guidEmpty;
    }

    if (portalLinkDTO.Product_Id == "") {
        portalLinkDTO.Product_Id = guidEmpty;
    }

    if (portalLinkDTO.Sort_Code == "") {
        portalLinkDTO.Sort_Code = 0;
    }

    $.qajax({
        url: "PortalLinkService.asmx/SavePortalLink",
        data: $.toJSON({ portalLinkDTO: portalLinkDTO, pageAction: pageParameterPageAction }),
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

function checkIsOrgAdmin() {
    var isOrgAdmin;
    var orgId = $.trim($selectOrg.val());
    $.qajax({
        async: false,
        url: "../../OrgUser/Org/OrgService.asmx/IsCurrentUserOrgAdmin",
        data: $.toJSON({ orgId: orgId }),
        success: function (result) {
            isOrgAdmin = result.d;
        }
    });
    return isOrgAdmin;
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