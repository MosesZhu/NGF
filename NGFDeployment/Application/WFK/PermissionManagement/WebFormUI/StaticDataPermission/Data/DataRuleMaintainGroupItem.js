var pageParameterPageAction;
var pageParameterDataRuleGroupId;
var pageParameterDataRuleItemId;

var $selectRelation;
var $selectColumn;
var $selectOperator;
var $selectValueType;

$(function () {
    pageParameterPageAction = $.url('?PageAction');
    pageParameterDataRuleGroupId = $.url('?DataRuleGroupId');
    pageParameterDataRuleItemId = $.url('?DataRuleItemId');

    $selectRelation = $("#selectRelation");
    $selectColumn = $("#selectColumn");
    $selectOperator = $("#selectOperator");
    $selectValueType = $("#selectValueType");

    selectColumnDataBind($selectColumn);
    selectRelationDataBind();
    selectOperatorDataBind();
    selectValueTypeDataBind();

    $selectValueType.on("change", selectValueType_change);

    intializeData();

    $("#buttonOk").on("click", buttonOk_click);
    $("#buttonCancel").on("click", buttonCancel_click);
});

function intializeData() {
    if (pageParameterPageAction == pageAction.Edit) {
        var baseDataRuleItemDTO = parent.$.QDialog.options.getParentArgument();
        $selectRelation.val(baseDataRuleItemDTO.And_Or);
        $selectColumn.val(baseDataRuleItemDTO.Column_Id);
        $selectOperator.val(baseDataRuleItemDTO.Operator);
        $selectValueType.val(baseDataRuleItemDTO.Value_Type);
        $selectValueType.change();

        switch ($.trim(baseDataRuleItemDTO.Value_Type)) {
            case "Text":
            case "List":
                $("#textValue").val(baseDataRuleItemDTO.Value);
                break;

            case "Macro":
            case "SystemVariables":
                $("#selectValue").val(baseDataRuleItemDTO.Value);
                break;

            case "Column":
                $("#selectValue").find("option[text=\'" + baseDataRuleItemDTO.Value + "\']").prop("selected", true);
                break;
        }
    }
}

function selectColumnDataBind(edColumn) {
    var baseDataTableColumns = parent.getBaseDataTableColumns();
    if (!baseDataTableColumns) {
        baseDataTableColumns = [];
    }

    selectDataBind({
        $select: edColumn,
        data: baseDataTableColumns,
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectRelationDataBind() {
    selectDataBind({
        $select: $selectRelation,
        url: "DataRuleGroupService.asmx/GetRelations",
        itemType: "string",
        empty: false,
        async: false //同步方式调用。
    });
}

function selectOperatorDataBind() {
    selectDataBind({
        $select: $selectOperator,
        url: "DataRuleGroupService.asmx/GetOperators",
        itemType: "string",
        empty: false,
        async: false //同步方式调用。
    });
}

function selectValueTypeDataBind() {
    selectDataBind({
        $select: $selectValueType,
        url: "DataRuleGroupService.asmx/GetValueTypes",
        itemType: "string",
        empty: false,
        async: false //同步方式调用。
    });
}

function selectMacroDataBind() {
    selectDataBind({
        $select: $("#selectValue"),
        url: "DataRuleGroupService.asmx/GetMacros",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function selectSystemVariablesDataBind() {
    selectDataBind({
        $select: $("#selectValue"),
        url: "DataRuleGroupService.asmx/GetSystemVariables",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function selectValueType_change() {
    var valueType = $.trim($selectValueType.val());
    switch (valueType) {
        case "Text":
        case "List":
            $("#textValue").show();
            $("#selectValue").hide();
            break;

        case "Macro":
            $("#textValue").hide();
            $("#selectValue").show();
            selectMacroDataBind();
            break;

        case "Column":
            $("#textValue").hide();
            $("#selectValue").show();
            selectColumnDataBind($("#selectValue"));
            break;

        case "SystemVariables":
            $("#textValue").hide();
            $("#selectValue").show();
            selectSystemVariablesDataBind();
            break;

        default:
            $("#textValue").show();
            $("#selectValue").hide();
            break;
    }
    return;
}

function buttonOk_click() {
    if ($.trim($selectRelation.val()) == "") {
        $.messager.alert("Warning", "Relation can not be empty !", "warning");
        return;
    }

    if ($.trim($selectColumn.val()) == "") {
        $.messager.alert("Warning", "Column can not be empty !", "warning");
        return;
    }

    if ($.trim($selectOperator.val()) == "") {
        $.messager.alert("Warning", "Operator can not be empty !", "warning");
        return;
    }

    if ($.trim($selectValueType.val()) == "") {
        $.messager.alert("Warning", "Value Type can not be empty !", "warning");
        return;
    }

    var value;
    switch ($.trim($selectValueType.val())) {
        case "Text":
        case "List":
            value = $.trim($("#textValue").val());
            break;

        case "Macro":
        case "Column":
        case "SystemVariables":
            value = $.trim($("#selectValue").find("option:selected").text());
            break;
    }

    if (value == "") {
        $.messager.alert("Warning", "Value can not be empty !", "warning");
        return;
    }

    var baseDataRuleItemDTO = {
        Id: pageParameterDataRuleItemId,
        Data_Rule_Group_Id: pageParameterDataRuleGroupId,
        And_Or: $.trim($selectRelation.val()),
        Column_Id: $.trim($selectColumn.val()),
        Column: $.trim($selectColumn.find("option:selected").text()),
        Operator: $.trim($selectOperator.val()),
        Value_Type: $.trim($selectValueType.val()),
        Value: value,
        Created_Date : new Date()
    };

    if ($.trim(baseDataRuleItemDTO.Id) == "") {
        baseDataRuleItemDTO.Id = guidEmpty;
    }

    if ($.trim(baseDataRuleItemDTO.Data_Rule_Group_Id) == "") {
        baseDataRuleItemDTO.Data_Rule_Group_Id = guidEmpty;
    }

    parent.$.QDialog.hide(baseDataRuleItemDTO);
}

function buttonCancel_click() {
    parent.$.QDialog.hide(null);
}