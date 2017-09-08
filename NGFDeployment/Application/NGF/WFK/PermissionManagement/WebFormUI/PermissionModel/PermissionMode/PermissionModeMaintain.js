var pageParameterId;
var pageParameterPageAction;
var pageParameterIsOrgAdmin;

var $selectOrg;
var $selectProduct;
var $textName;
var $textareaDescription;
var $checkboxIsDefault;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $textName = $("#textName");
    $textareaDescription = $("#textareaDescription");
    $checkboxIsDefault = $("#CheckboxIsDefault");

    selectOrgDataBind();
    selectProductDataBind();

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

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

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "PermissionModeService.asmx/GetBasePermissionMode",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(basePermissionModeDTO) {
    $selectOrg.val(basePermissionModeDTO.Org_Id);
    $selectProduct.val(basePermissionModeDTO.Product_Id);
    $textName.val(basePermissionModeDTO.Name);
    $textareaDescription.val(basePermissionModeDTO.Description);
    $checkboxIsDefault.prop("checked", basePermissionModeDTO.IsDefault);

    //检查该笔数据是否允许编辑，若不允许则不可编辑
    if (!(basePermissionModeDTO.AllowEdit) || pageParameterIsOrgAdmin == "false") {
        selectDisabled($selectOrg);
        selectDisabled($selectProduct);
        textBoxDisabled($textName);
        textBoxDisabled($textareaDescription);

        $checkboxIsDefault.prop("disabled", true);

        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {
    var isValid = true;

    if ($.trim($selectOrg.val()) == "") {
        $.messager.alert("Warning", "Org can't be empty!", "warning");
        return;
    }

    if (pageParameterPageAction == pageAction.New && !checkIsOrgAdmin()) {
        $.messager.alert("Warning", "You don't have permisson to add because you're not this org admin!", "warning");
        return;
    }

    if ($.trim($selectProduct.val()) == "") {
        $.messager.alert("Warning", "Product can't be empty!", "warning");
        return;
    }

    if (!$textName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaDescription.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var basePermissionModeDTO = {
        Id: pageParameterId,
        Org_Id: $.trim($selectOrg.val()),
        Product_Id: $.trim($selectProduct.val()),
        Name: $.trim($textName.val()),
        Description: $.trim($textareaDescription.val()),
        IsDefault: $checkboxIsDefault.prop("checked")
    };

    if ($.trim(basePermissionModeDTO.Id) == "") {
        basePermissionModeDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "PermissionModeService.asmx/SaveBasePermissionMode",
        data: $.toJSON({ basePermissionModeDTO: basePermissionModeDTO, pageAction: pageParameterPageAction }),
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