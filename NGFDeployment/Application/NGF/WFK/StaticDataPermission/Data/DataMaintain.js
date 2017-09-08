var pageParameterId;
var pageParameterPageAction;
var pageParameterIsOrgAdmin;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $(window).on("resize", function () {
        var height = $(window).height() - $("#divStaticData").panel("panel").height() - $("#divCommand").height() - 50;

        $("#datagridSelectedColumn").datagrid("resize", { height: height * 0.4 });
        $("#divConditionRules").panel("resize", { height: height * 0.55 });
    });

    panel_autoresize($("#divMainContent"), $("#divStaticData"));
    panel_autoresize($("#divMainContent"), $("#datagridSelectedColumn"));
    panel_autoresize($("#divMainContent", "divConditionRules"));
    $(window).resize();

    initializeData();

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);
    $("#divCommand").show();
});

function initializeData() {
    //页面数据初始化
    if (pageParameterPageAction == pageAction.New) {
        $selectDataTable.on("change", selectDataTable_change);
    }
    else {
        $.qajax({
            url: "DataService.asmx/GetBaseData",
            data: $.toJSON({ id: pageParameterId }),
            async: false,
            success: function (result) {
                setPageData(result.d);
            }
        });

        buildDatagridSelectedColumn();
    }

    initializeDataRuleGroup(pageParameterId);
}

function setPageData(baseDataDTO) {
    $selectOrg.val(baseDataDTO.Org_Id);
    $selectOrg.change();
    $selectOrg.prop("disabled", true);
    $selectDataSource.val(baseDataDTO.Data_Source_Id);
    $selectDataSource.change();
    $selectDataSource.prop("disabled", true);
    $selectDataTable.val(baseDataDTO.Table_Id);
    $selectDataTable.prop("disabled", true);
    $textName.val(baseDataDTO.Name);
    $textDescription.val(baseDataDTO.Description);

    if (!(baseDataDTO.AllowEdit) || pageParameterIsOrgAdmin == "false") {
        selectDisabled($selectOrg);
        selectDisabled($selectDataSource);
        selectDisabled($selectDataTable);
        textBoxDisabled($textName);
        textBoxDisabled($textDescription);

        buttonDisabled($("#buttonSave"));
    }
    else {
        checkBaseDataInfoIsUsed();
    }
}

function checkBaseDataInfoIsUsed() {
    //如果base_data的信息被base_data_permission所使用,那么当前base_data的信息就不能再被编辑
    $.qajax({
        url: "DataService.asmx/CheckBaseDataIsUsed",
        data: $.toJSON({ id: pageParameterId }),
        success: function (result) {
            if (result.d == true) {
                $textName.prop("readonly", true);
                $textName.removeClass();
                $textName.addClass("TextBoxLine");

                $textDescription.prop("readonly", true);

                $("#buttonSave").off("click");
                $("#buttonSave").prop("disabled", true);
                $("#buttonSave").removeClass();
                $("#buttonSave").addClass("aspNetDisabled");
            }
            else {
                $textName.prop("readonly", false);
                $textDescription.prop("readonly", false);
                $("#buttonSave").prop("disabled", false);
            }
        }
    });
}

function selectDataTable_change() {
    $selectDataTable.data("baseDataTableColumns", null);
    buildDatagridSelectedColumn();
}

function buildDatagridSelectedColumn() {
    var dataTableId = $.trim($selectDataTable.val());
    if (dataTableId == "") {
        $('#datagridSelectedColumn').datagrid('loadData', { total: 0, rows: [] });
        return;
    }

    var queryurl = "GetBaseDataSelectedColumnList.ashx?" + $.param({ dataId: pageParameterId, dataTableId: dataTableId });

    $('#datagridSelectedColumn').datagrid({
        columns: [[
                    { field: 'Select', title: 'Select', width: 150, halign: 'center', align: 'center',
                        editor: {
                            type: 'checkbox',
                            options: { on: "Y", off: "" }
                        }
                    },
                    { field: 'Column', title: 'Column', width: 200, halign: 'center' },
                    { field: 'Display_Name', title: 'Display Name', width: 200, halign: 'center',
                        editor: {
                            type: 'validatebox',
                            options: { required: false, validType: 'length[0,100]' }
                        }
                    },
                    { field: 'IsAuthorityData', title: 'Is Authority Data', width: 150, halign: 'center', align: 'center',
                        editor: {
                            type: 'checkbox',
                            options: { on: "Y", off: "" }
                        }
                    }
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'Id', //标识字段。
        singleSelect: true, //是否单选 
        rownumbers: true, //行号 
        pagination: false, //分页控件 
        loadFilter: datagridSelectedColumnLoadFilter, //返回过滤的数据显示
        onLoadSuccess: function (data) {
            $('#datagridSelectedColumn').datagrid("unselectAll"); //取消选择所有页面的行。
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        onClickRow: datagridSelectedColumnClickRow
    });

    $('#datagridSelectedColumn').data("editIndex", undefined);
}

function datagridSelectedColumnLoadFilter(data) {
    $.each(data.rows, function (i, t) {
        t.Created_Date = serializerStringConvertDate(t.Created_Date);
        t.Modified_Date = serializerStringConvertDate(t.Modified_Date);
    });
    return data;
}

function datagridSelectedColumnEndEditing() {
    var datagridSelectedColumnEditIndex = $('#datagridSelectedColumn').data("editIndex");
    if (datagridSelectedColumnEditIndex == undefined) {
        return true;
    }

    if ($('#datagridSelectedColumn').datagrid('validateRow', datagridSelectedColumnEditIndex)) {
        var edIsAuthorityData = $('#datagridSelectedColumn').datagrid('getEditor', { index: datagridSelectedColumnEditIndex, field: 'IsAuthorityData' });
        if (edIsAuthorityData != null) {
            var isAuthorityData = edIsAuthorityData.target.prop("checked");
            $('#datagridSelectedColumn').datagrid('getRows')[datagridSelectedColumnEditIndex]['Is_Authority_Data'] = (isAuthorityData == true ? 1 : 0);

            if (isAuthorityData == true) {
                var rows = $('#datagridSelectedColumn').datagrid('getRows');
                for (var i = 0; i < rows.length; i++) {
                    if (i == datagridSelectedColumnEditIndex) {
                        var edSelectI = $('#datagridSelectedColumn').datagrid('getEditor', { index: i, field: 'Select' });
                        edSelectI.target.prop("checked", true);
                        rows[i]['Select'] = "Y";
                    }
                    else {
                        if ($.trim(rows[i]['IsAuthorityData']) != "") {
                            rows[i]['IsAuthorityData'] = "";
                            rows[i]['Is_Authority_Data'] = 0;
                            $('#datagridSelectedColumn').datagrid('refreshRow', i);
                        }
                    }
                }
            }
        }

        $('#datagridSelectedColumn').datagrid('endEdit', datagridSelectedColumnEditIndex);
        $('#datagridSelectedColumn').data("editIndex", undefined);
        return true;
    }
    else {
        return false;
    }
}
function datagridSelectedColumnClickRow(index) {
    var datagridSelectedColumnEditIndex = $('#datagridSelectedColumn').data("editIndex");
    if (datagridSelectedColumnEditIndex != index) {
        if (datagridSelectedColumnEndEditing()) {
            $('#datagridSelectedColumn').datagrid('selectRow', index)
						   .datagrid('beginEdit', index);
            $('#datagridSelectedColumn').data("editIndex", index);
        }
        else {
            $('#datagridSelectedColumn').datagrid('selectRow', datagridSelectedColumnEditIndex);
        }
    }
    else {
        $('#datagridSelectedColumn').datagrid('selectRow', index)
						   .datagrid('beginEdit', index);
    }
}

function isAuthorityDataCheck() {
    var rows = $('#datagridSelectedColumn').datagrid('getRows');

    for (var i = 0; i < rows.length; i++) {
        if ($.trim(rows[i]['IsAuthorityData']) != "") {
            return true;
        }
    }

    return false;
}

function getBaseDataTableColumns() {
    var baseDataTableColumns = $selectDataTable.data("baseDataTableColumns");

    if (!baseDataTableColumns) {
        var dataTableId = $selectDataTable.val();
        if (dataTableId) {
            $.qajax({
                url: "../../SensitiveData/DataTableColumn/DataTableColumnService.asmx/GetBaseDataTableColumnList",
                data: $.toJSON({ dataTableId: dataTableId }),
                async: false,
                success: function (result) {
                    if (result.d) {
                        baseDataTableColumns = result.d;
                        $selectDataTable.data("baseDataTableColumns", baseDataTableColumns);
                    }
                }
            });
        }
    }

    return baseDataTableColumns;
}

function checkBaseDataRuleGroupInfos(baseDataRuleGroupDTOs) {
    var baseDataGroup;
    var baseRuleItem;
    for (var i = 0; i < baseDataRuleGroupDTOs.length; i++) {
        baseDataGroup = baseDataRuleGroupDTOs[i];
        baseDataGroup.Sort_Code = i + 1;
        if ($.trim(baseDataGroup.And_Or) == "") {
            $.messager.alert("Warning", "Group Item " + (i + 1) + ": Group Relation can not be empty !", "warning");
            return false;
        }
        if (baseDataGroup.ListBaseDataRuleItemDTO.length == 0) {
            $.messager.alert("Warning", "Group Item " + (i + 1) + ": Group Items' Rows Count must be >= 1 at least !", "warning");
            return false;
        }
        for (var j = 0; j < baseDataGroup.ListBaseDataRuleItemDTO.length; j++) {
            baseRuleItem = baseDataGroup.ListBaseDataRuleItemDTO[j];
            baseRuleItem.Sort_Code = j + 1;
            if ($.trim(baseRuleItem.And_Or) == "" || $.trim(baseRuleItem.Column_Id) == "" || $.trim(baseRuleItem.Operator) == ""
             || $.trim(baseRuleItem.Value_Type) == "" || $.trim(baseRuleItem.Value) == "") {
                $.messager.alert("Warning", "Group Item " + (i + 1) + ": Rule Item can not be empty !", "warning");
                return false;
            }
        }
    }
    return true;
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

    if ($.trim($selectDataTable.val()) == "") {
        $.messager.alert("Warning", "Data Table can't be empty!", "warning");
        return;
    }

    if (!$textName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textDescription.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var baseDataDTO = {
        Id: pageParameterId,

        Table_Id: $.trim($selectDataTable.val()),
        Data_Source_Id: $.trim($selectDataSource.val()),
        DataSource: $selectDataSource.find("option:selected").text(),
        Name: $.trim($textName.val()),
        Description: $.trim($textDescription.val())
    };

    if ($.trim(baseDataDTO.Id) == "") {
        baseDataDTO.Id = guidEmpty;
    }

    if (!datagridSelectedColumnEndEditing()) {
        $.messager.alert("Warning", "Data is invalid!", "warning");
        var datagridSelectedColumnEditIndex = $('#datagridSelectedColumn').data("editIndex");
        $('#datagridSelectedColumn').datagrid('selectRow', datagridSelectedColumnEditIndex);
        return;
    }

    if (!isAuthorityDataCheck()) {
        $.messager.alert("Warning", "Please check one row's Is Authority Data = Y !", "warning");
        return;
    }

    var baseDataSelectedColumnDTOs = $('#datagridSelectedColumn').datagrid("getRows");

    try {
        var baseDataRuleGroupDTOs = getBaseDataRuleGroupDTOs(pageParameterId);
        if (!checkBaseDataRuleGroupInfos(baseDataRuleGroupDTOs)) {
            return;
        }
    }
    catch (e) {
        $.messager.alert("Error", e.message, "error");
        return;
    }

    $.qajax({
        url: "DataService.asmx/SaveBaseData",
        data: $.toJSON(
            {
                baseDataDTO: baseDataDTO,
                baseDataSelectedColumnDTOs: baseDataSelectedColumnDTOs,
                baseDataRuleGroupDTOs: baseDataRuleGroupDTOs,
                pageAction: pageParameterPageAction
            }
        ),
        beforeSend: function (XMLHttpRequest) {
            $("#buttonSave").prop("disabled", true);
        },
        success: function (result) {
            if ($.trim(result.d) == "") {
                $('#datagridSelectedColumn').datagrid('acceptChanges');
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