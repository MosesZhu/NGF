var $textMaintenanceRole;
var $textEffectiveDate;
var $textExpirationDate;
var $textareaDescription;
var $textCreatedBy;
var $textCreatedDate;
var $textClosedBy;
var $textClosedDate;
var $textStatus;
var pageParameterId;
var pageParameterPageAction;

$(function () {
    $textMaintenanceRole = $("#textMaintenanceRole");
    $maintenanceRoleId = $("#maintenanceRoleId");
    $textEffectiveDate = $("#textEffectiveDate");
    $textExpirationDate = $("#textExpirationDate");
    $textareaDescription = $("#textareaDescription");
    $textCreatedBy = $("#textCreatedBy");
    $textCreatedDate = $("#textCreatedDate");
    $textClosedBy = $("#textClosedBy");
    $textClosedDate = $("#textClosedDate");
    $textStatus = $("#textStatus");
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    initializeData();

    $(window).on("resize", function () {
        $textEffectiveDate.datetimebox("resize", $textEffectiveDate.parent("td").width() * 0.99);
        $textExpirationDate.datetimebox("resize", $textExpirationDate.parent("td").width() * 0.99);
    });

    $(window).resize();

    $selectSystem.on("change", selectSystem_change);
    $selectSystemGroup.on("change", selectSystemGroup_change);
    $("#buttonSearchRole").on("click", buttonSearchRole_click);
    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);
});

function initializeData() {
    textBoxDisabled($textStatus);
    textBoxDisabled($textSystem);

    if (pageParameterId != "") {
        $.qajax({
            url: "SystemMaintenanceService.asmx/GetSystemMaintenance",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
    else {
        var orgId = $.url("?orgId");
        var productId = $.url("?productId");
        $selectOrg.val(orgId);
        $selectProduct.val(productId);
        bySystemOrBySystemGroupDataBind();
    }
}

function setPageData(baseSystemMaintenanceDTO) {
    $selectOrg.val(baseSystemMaintenanceDTO.Org_Id);
    $selectProduct.val(baseSystemMaintenanceDTO.Product_Id);
    $selectCategory.val(baseSystemMaintenanceDTO.Maintenance_Category);
    bySystemOrBySystemGroupDataBind();
    if ($selectCategory.val().toLowerCase() == "system") {
        $selectDomain.val(baseSystemMaintenanceDTO.Domain_Id);
        selectSystemDataBind();
        $selectSystem.val(baseSystemMaintenanceDTO.System_Group_Id);
    }
    else if ($selectCategory.val().toLowerCase() == "systemgroup") {
        $selectSystemGroup.val(baseSystemMaintenanceDTO.System_Group_Id);
        $textSystem.val(baseSystemMaintenanceDTO.System_List);
    }
    else {

    }
    $textMaintenanceRole.val(baseSystemMaintenanceDTO.Maintenance_Role);
    $textEffectiveDate.datetimebox("setValue",
                     datetimeformatter(serializerStringConvertDate(baseSystemMaintenanceDTO.Effective_Date)));
    $textExpirationDate.datetimebox("setValue",
                     datetimeformatter(serializerStringConvertDate(baseSystemMaintenanceDTO.Expiration_Date)));
    $textareaDescription.val(baseSystemMaintenanceDTO.Description);
    $textStatus.val(baseSystemMaintenanceDTO.Status);

    if (pageParameterPageAction == pageAction.New) {
        pageParameterId = "";
        $textStatus.val("");
    }

    //检查该笔数据是否允许编辑，若不允许则不可编辑
    if (!(baseSystemMaintenanceDTO.AllowEdit)) {
        selectDisabled($selectOrg);
        selectDisabled($selectProduct);
        selectDisabled($selectCategory);
        selectDisabled($selectDomain);
        selectDisabled($selectSystem);
        selectDisabled($selectSystemGroup);

        textBoxDisabled($textSystem);
        textBoxDisabled($textMaintenanceRole);
        textBoxDisabled($textEffectiveDate);
        textBoxDisabled($textExpirationDate);
        textBoxDisabled($textareaDescription);

        $("#buttonSearchRole").off("click");
        buttonDisabled($("#buttonSave"));
    }
}

function selectSystem_change() {
    textMaintenanceRoleDataBind();
}

function selectSystemGroup_change() {
    textSystemDataBind();
    textMaintenanceRoleDataBind();
}

function textMaintenanceRoleDataBind() {
    var systemId;
    var systemGroupId;
    if ($selectSystem.val() == null || $.trim($selectSystem.val()) == "") {
        systemId = guidEmpty;
    }
    else {
        systemId = $selectSystem.val();
    }
    if ($selectSystemGroup.val() == null || $.trim($selectSystemGroup.val()) == "") {
        systemGroupId = guidEmpty;
    }
    else {
        systemGroupId = $selectSystemGroup.val();
    }
    if (systemId == guidEmpty && systemGroupId == guidEmpty) {
        return;
    }

    $.qajax({
        url: "SystemMaintenanceService.asmx/GetMaintenanceRole",
        data: $.toJSON({ systemId: systemId, systemGroupId: systemGroupId }),
        success: function (result) {
            $textMaintenanceRole.val(result.d);
        }
    });

    return;
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
                    $textMaintenanceRole.val(returnValue.Name);
                }
            }
        }
    );
    return false;
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

    if ($.trim($selectCategory.val()) == "") {
        $.messager.alert("Warning", "Category can't be empty!", "warning");
        return;
    }

    if ($.trim($selectCategory.val()) == "System") {
        if ($.trim($selectSystem.val()) == "") {
            $.messager.alert("Warning", "System can't be empty!", "warning");
            return;
        }
    }
    else {
        if ($.trim($selectSystemGroup.val()) == "") {
            $.messager.alert("Warning", "System can't be empty!", "warning");
            return;
        }
    }

    if ($.trim($textEffectiveDate.datetimebox("getValue")) == "") {
        $.messager.alert("Warning", "Effective Date can't be empty!", "warning");
        return;
    }

    if ($.trim($textExpirationDate.datetimebox("getValue")) == "") {
        $.messager.alert("Warning", "Expiration Date can't be empty!", "warning");
        return;
    }

    var isValid = true;

    if (!$textMaintenanceRole.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textEffectiveDate.datetimebox("isValid")) {
        isValid = false;
    }

    if (!$textExpirationDate.datetimebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var textEffectiveDateValue = new Date($textEffectiveDate.datetimebox("getValue"));
    var textExpirationDateValue = new Date($textExpirationDate.datetimebox("getValue"));
    if (textEffectiveDateValue > textExpirationDateValue || new Date() > textExpirationDateValue) {
        $.messager.alert("Warning", "Effective Date(" + $textEffectiveDate.datetimebox("getValue")
             + ") or the time of now must be less or equal than  Expiration Date(" + $textExpirationDate.datetimebox("getValue")
             + ")", "warning");
        return;
    }

    var systemOrSystemGroupId;
    if ($.trim($selectCategory.val()) == "System") {
        systemOrSystemGroupId = $.trim($selectSystem.val());
    }
    else {
        systemOrSystemGroupId = $.trim($selectSystemGroup.val());
    }
    var baseSystemMaintenanceDTO = {
        Id: pageParameterId,

        Org_Id: $.trim($selectOrg.val()),
        Product_Id: $.trim($selectProduct.val()),
        Maintenance_Category: $.trim($selectCategory.val()),
        System_Group_Id: systemOrSystemGroupId,
        Maintenance_Role: $.trim($textMaintenanceRole.val()),
        Effective_Date: $textEffectiveDate.datetimebox("getValue"),
        Expiration_Date: $textExpirationDate.datetimebox("getValue"),
        Description: $.trim($textareaDescription.val())
    };

    if ($.trim(baseSystemMaintenanceDTO.Id) == "") {
        baseSystemMaintenanceDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "SystemMaintenanceService.asmx/SaveSystemMaintenance",
        data: $.toJSON({ baseSystemMaintenanceDTO: baseSystemMaintenanceDTO, pageAction: pageParameterPageAction }),
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
