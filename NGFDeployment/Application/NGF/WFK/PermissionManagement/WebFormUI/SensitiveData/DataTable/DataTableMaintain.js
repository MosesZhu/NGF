var pageParameterId;
var pageParameterPageAction;
var pageParameterIsOrgAdmin;

var $selectOrg;
var $selectDataSource;
var $textName;
var $textareaDescription;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $selectOrg = $("#selectOrg");
    $selectDataSource = $("#selectDataSource");
    $textName = $("#textName");
    $textareaDescription = $("#textareaDescription");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    $selectOrg.on("change", selectOrg_change);
    selectOrgDataBind();

    //页面数据初始化
    initializeData();
});

function selectOrg_change() {
    selectDataSourceDataBind();
}

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

function selectDataSourceDataBind() {
    var orgId = $.trim($selectOrg.val());
    if ($.trim(orgId) == "") {
        $selectDataSource.empty();
        $selectDataSource.change();
        return;
    }

    selectDataBind({
        $select: $selectDataSource,
        url: "../DataSource/DataSourceService.asmx/GetBaseDataSourceList",
        data: $.toJSON({ orgId: orgId }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "DataTableService.asmx/GetBaseDataTableAndDataSourceInfo",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseDataTableDTO) {
    $selectOrg.val(baseDataTableDTO.Org_Id);
    $selectOrg.change();
    $selectDataSource.val(baseDataTableDTO.Data_Source_Id);
    $textName.val(baseDataTableDTO.Name);
    $textareaDescription.val(baseDataTableDTO.Description);

    if (!(baseDataTableDTO.AllowEdit) || pageParameterIsOrgAdmin == "false") {
        selectDisabled($selectOrg);
        selectDisabled($selectDataSource);
        textBoxDisabled($textName);
        textBoxDisabled($textareaDescription);

        buttonDisabled($("#buttonSave"));
    }
    else {
        checkDataTableInfoCanEdit();
    }
}

function checkDataTableInfoCanEdit() {
    //$selectDataSource，$textName 不可编辑(当且仅当被使用的情况下,base_data和base_data_table_column表)
    $.qajax({
        url: "DataTableService.asmx/CheckBaseDataTableIsUsed",
        data: $.toJSON({ id: pageParameterId }),
        success: function (result) {
            if (result.d == true) {
                $selectOrg.prop("disabled", true);
                $selectDataSource.prop("disabled", true);
                $textName.prop("readonly", true);
                $textName.removeClass();
                $textName.addClass("TextBoxLine");
            }
            else {
                $selectOrg.prop("disabled", false);
                $selectDataSource.prop("disabled", false);
                $textName.prop("readonly", false);
            }
        }
    });
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

    if ($.trim($selectDataSource.val()) == "") {
        $.messager.alert("Warning", "Data Source can't be empty!", "warning");
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

    var baseDataTableDTO = {
        Id: pageParameterId,

        Org: $.trim($selectOrg.find("option:selected").text()),
        Org_Id: $.trim($selectOrg.val()),
        DataSource: $.trim($selectDataSource.find("option:selected").text()),
        Data_Source_Id: $.trim($selectDataSource.val()),
        Name: $.trim($textName.val()),
        Description: $.trim($textareaDescription.val())
    };

    if ($.trim(baseDataTableDTO.Id) == "") {
        baseDataTableDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "DataTableService.asmx/SaveBaseDataTable",
        data: $.toJSON({ baseDataTableDTO: baseDataTableDTO, pageAction: pageParameterPageAction }),
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