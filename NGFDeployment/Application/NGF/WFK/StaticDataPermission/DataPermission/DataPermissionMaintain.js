var pageParameterId;
var pageParameterPageAction;
var pageParameterIsOrgAdmin;

var $textEffectiveDate;
var $textExpirationDate;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $textEffectiveDate = $("#textEffectiveDate");
    $textExpirationDate = $("#textExpirationDate");

    $(window).on("resize", function () {
        $textEffectiveDate.datebox("resize", $textEffectiveDate.parent("td").width() * 0.99);
        $textExpirationDate.datebox("resize", $textExpirationDate.parent("td").width() * 0.99);

        var height = $(window).height() - $("#divDataPermission").height() - $("#divCommand").height() - 60;
        $("#divDataPermissionValue").height(height);
    });
    $(window).resize();

    initializeData();

    $("#divCommand").show();
    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);
});

function initializeData() {
    //页面数据初始化
    if (pageParameterPageAction == pageAction.New) {
        $selectData.on("change", selectData_change);
        var currentDate = new Date();
        $textEffectiveDate.datebox("setValue", dateformatter(currentDate));
        $textExpirationDate.datebox("setValue", dateformatter(new Date(currentDate.getFullYear() + 3, currentDate.getMonth(), currentDate.getDate())));
    }
    else {
        $.qajax({
            url: "DataPermissionService.asmx/GetBaseDataPermission",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
                setiframeDataPermissionValue();
            }
        });
    }
}

function setPageData(baseDataPermissionDTO) {
    $selectPermissionOrg.val(baseDataPermissionDTO.Permission_Org_Id);
    $selectPermissionOrg.prop("disabled", true);

    $selectPermissionProduct.val(baseDataPermissionDTO.Permission_Product_Id);
    $selectPermissionProduct.change();
    $selectPermissionProduct.prop("disabled", true);

    $selectPermissionMode.val(baseDataPermissionDTO.Org_Id);
    $selectPermissionMode.prop("disabled", true);

    //$selectOrg.val(baseDataPermissionDTO.Org_Id);
    //$selectOrg.change();
    //$selectOrg.prop("disabled", true);
    selectDataSourceDataBind();
    $selectDataSource.val(baseDataPermissionDTO.Data_Source_Id);
    $selectDataSource.change();
    $selectDataSource.prop("disabled", true);

    $selectData.val(baseDataPermissionDTO.Data_Id);
    $selectData.prop("disabled", true);

    $selectSubjectCategory.val(baseDataPermissionDTO.Subject_Category);
    $textSubjectName.val(baseDataPermissionDTO.SubjectName);
    $hiddenSubjectId.val(baseDataPermissionDTO.Subject_Id);
    $textEffectiveDate.datebox("setValue", dateformatter(serializerStringConvertDate(baseDataPermissionDTO.Effective_Date)));
    $textExpirationDate.datebox("setValue", dateformatter(serializerStringConvertDate(baseDataPermissionDTO.Expiration_Date)));
    $selectPermissionMode.val(baseDataPermissionDTO.Permission_Mode_Id);

    if (!(baseDataPermissionDTO.AllowEdit) || pageParameterIsOrgAdmin == "false") {
        selectDisabled($selectSubjectCategory);
        selectDisabled($selectPermissionOrg);
        selectDisabled($selectPermissionProduct);
        selectDisabled($selectPermissionMode);
        selectDisabled($selectDataSource);
        selectDisabled($selectData);
        textBoxDisabled($textSubjectName);
        $textEffectiveDate.datebox("disable");
        $textExpirationDate.datebox("disable");

        buttonDisabled($("#buttonSearchSubject"));
        buttonDisabled($("#buttonSave"));
    }
}

function selectData_change() {
    setiframeDataPermissionValue();
}

function setiframeDataPermissionValue() {
    var dataId = $.trim($selectData.val());
    if (!dataId) {
        $("#iframeDataPermissionValue").attr("src", "");
        return;
    }

    $("#iframeDataPermissionValue").attr("src", "DataPermissionValue.aspx?" + $.param({ dataPermissionId: pageParameterId, dataId: dataId }));
}

function buttonSave_click() {

    var isValid = true;
    if ($.trim($selectPermissionOrg.val()) == "") {
        $.messager.alert("Warning", "Permission Org can't be empty!", "warning");
        return;
    }
    if (pageParameterPageAction == pageAction.New && !checkIsOrgAdmin()) {
        $.messager.alert("Warning", "You don't have permisson to add because you're not this org admin!", "warning");
        return;
    }
    if ($.trim($selectPermissionProduct.val()) == "") {
        $.messager.alert("Warning", "Permission Product can't be empty!", "warning");
        return;
    }

    if ($.trim($selectPermissionMode.val()) == "") {
        $.messager.alert("Warning", "Permission Mode can't be empty!", "warning");
        return;
    }

    //    if ($.trim($selectOrg.val()) == "") {
    //        $.messager.alert("Warning", "Org can't be empty!", "warning");
    //        return;
    //    }

    if ($.trim($selectDataSource.val()) == "") {
        $.messager.alert("Warning", "Data Source can't be empty!", "warning");
        return;
    }

    if ($.trim($selectData.val()) == "") {
        $.messager.alert("Warning", "Static Data can't be empty!", "warning");
        return;
    }

    if ($.trim($selectSubjectCategory.val()) == "") {
        $.messager.alert("Warning", "Subject Category can't be empty!", "warning");
        return;
    }

    if (!$textSubjectName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textEffectiveDate.datebox("isValid")) {
        isValid = false;
    }

    if (!$textExpirationDate.datebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var textEffectiveDateValue = new Date($textEffectiveDate.datebox("getValue"));
    var textExpirationDateValue = new Date($textExpirationDate.datebox("getValue"));
    if (textEffectiveDateValue > textExpirationDateValue) {
        $.messager.alert("Warning", "Effective Date(" + $textEffectiveDate.datebox("getValue") + ") must be less or equal than  Expiration Date("
                                    + $textExpirationDate.datebox("getValue") + ")", "warning");
        return;
    }

    var baseDataPermissionDTO = {
        Id: pageParameterId,

        Org_Id: $.trim($selectPermissionOrg.val()),
        Data_Source_Id: $.trim($selectDataSource.val()),
        Data_Id: $.trim($selectData.val()),
        Subject_Category: $.trim($selectSubjectCategory.val()),
        SubjectName: $.trim($textSubjectName.val()),
        Subject_Id: $.trim($hiddenSubjectId.val()),
        Effective_Date: $.trim($textEffectiveDate.datebox("getValue")),
        Expiration_Date: $.trim($textExpirationDate.datebox("getValue")),
        Permission_Mode_Id: $.trim($selectPermissionMode.val())
    };

    if ($.trim(baseDataPermissionDTO.Id) == "") {
        baseDataPermissionDTO.Id = guidEmpty;
    }

    var permissionValues;
    try {
        permissionValues = document.getElementById("iframeDataPermissionValue").contentWindow.window.getpermissionValues();
    }
    catch (e) {
        $.messager.alert("Error", e.message, "error");
        return;
    }

    $.qajax({
        url: "DataPermissionService.asmx/SaveBaseDataPermission",
        data: $.toJSON({ baseDataPermissionDTO: baseDataPermissionDTO, permissionValues: permissionValues, pageAction: pageParameterPageAction }),
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
    var orgId = $.trim($selectPermissionOrg.val());
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
