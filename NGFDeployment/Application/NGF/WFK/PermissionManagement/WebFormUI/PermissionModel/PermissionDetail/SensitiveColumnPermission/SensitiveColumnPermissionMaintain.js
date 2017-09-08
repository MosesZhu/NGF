var pageParameterPermissionOrgId;
var pageParameterPermissionModeId;
var pageParameterSubjectCategory;
var pageParameterSubjectId;

var $textOrg;
var $selectDataSource;
var $selectDataTable;
var $selectDataColumn;

$(function () {
    pageParameterPermissionOrgId = $.url('?permissionOrgId');
    pageParameterPermissionModeId = $.url('?permissionModeId');
    pageParameterSubjectCategory = $.url('?subjectCategory');
    pageParameterSubjectId = $.url('?subjectId');

    $textOrg = $("#textOrg");
    $selectDataSource = $("#selectDataSource");
    $selectDataTable = $("#selectDataTable");
    $selectDataColumn = $("#selectDataColumn");

    $selectDataSource.on("change", selectDataSource_change);
    $selectDataTable.on("change", selectDataTable_change);

    textOrgDataBind();

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);
});

function selectDataSource_change() {
    selectDataTableDataBind();
}

function selectDataTable_change() {
    selectDataColumnDataBind();
}

function textOrgDataBind() {
    $.qajax({
        url: "../../../OrgUser/Org/OrgService.asmx/GetOrg",
        data: $.toJSON({ id: pageParameterPermissionOrgId }),
        success: function (result) {
            if (result.d!=null) {
                $("#textOrg").val(result.d.Name);
                selectDataSourceDataBind();
            }
            else {
                $.messager.alert("Error", result.d, "error");
            }
        }
    });
}

function selectDataSourceDataBind() {
    selectDataBind({
        $select: $selectDataSource,
        url: "../../../SensitiveData/DataSource/DataSourceService.asmx/GetBaseDataSourceList",
        data: $.toJSON({ orgId: pageParameterPermissionOrgId }),
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

function selectDataTableDataBind() {
    var dataSourceId = $.trim($selectDataSource.val());
    if (dataSourceId == "") {
        $selectDataTable.empty();
        $selectDataTable.change();
        return;
    }

    selectDataBind({
        $select: $selectDataTable,
        url: "../../../SensitiveData/DataTable/DataTableService.asmx/GetBaseDataTableList",
        data: $.toJSON({ dataSourceId: dataSourceId }),
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

function selectDataColumnDataBind() {
    var dataTableId = $.trim($selectDataTable.val());
    if (dataTableId == "") {
        $selectDataColumn.empty();
        $selectDataColumn.change();
        return;
    }

    selectDataBind({
        $select: $selectDataColumn,
        url: "../../../SensitiveData/DataTableColumn/DataTableColumnService.asmx/GetSensitiveColumnList",
        data: $.toJSON({ dataTableId: dataTableId }),
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

function buttonSave_click() {
    if ($.trim($selectDataSource.val()) == "") {
        $.messager.alert("Warning", "Data Source can't be empty!", "warning");
        return;
    }

    if ($.trim($selectDataTable.val()) == "") {
        $.messager.alert("Warning", "Data Table can't be empty!", "warning");
        return;
    }

    if ($.trim($selectDataColumn.val()) == "") {
        $.messager.alert("Warning", "Data Column can't be empty!", "warning");
        return;
    }

    var basePermissionDTO = {
        Id: guidEmpty,
        Permission_Mode_Id: pageParameterPermissionModeId,
        Subject_Category: pageParameterSubjectCategory,
        Subject_Id: pageParameterSubjectId,

        Resource_Org_Id: pageParameterPermissionOrgId,
        Resource_Category: "SensitiveColumn",
        Resource_Id: $.trim($selectDataColumn.val())
    };

    $.qajax({
        url: "../../Permission/PermissionService.asmx/InsertBasePermission",
        data: $.toJSON({ basePermissionDTO: basePermissionDTO }),
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
        },
    });
    return;
}

function buttonCancel_click() {
    parent.$.QDialog.hide(false);
}