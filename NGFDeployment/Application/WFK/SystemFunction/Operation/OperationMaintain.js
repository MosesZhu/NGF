var pageParameterFunctionId;
var pageParameterOperationId;
var pageParameterPageAction;

var $textFunction;
var $textName;
var $textControlId;
var $textareaDescription;

$(function () {
    pageParameterFunctionId = $.url('?functionId');
    pageParameterOperationId = $.url('?operationId');
    pageParameterPageAction = $.url('?PageAction');

    $textFunction = $("#textFunction");
    $textName = $("#textName");
    $textControlId = $("#textControlId");
    $textareaDescription = $("#textareaDescription");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //页面数据初始化
    initializeData();
});

function initializeData() {
    var vArguments = parent.$.QDialog.options.getParentArgument();
    $textFunction.val(vArguments.SelectedName.FunctionName);

    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "OperationService.asmx/GetOperation",
            data: $.toJSON({ id: pageParameterOperationId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseOperationDTO) {
    $textName.val(baseOperationDTO.Name);
    $textControlId.val(baseOperationDTO.Control_Id);
    $textareaDescription.val(baseOperationDTO.Description);

    //检查该笔数据是否允许编辑，若不允许则不可编辑
    if (!(baseOperationDTO.AllowEdit)) {
        textBoxDisabled($textName);
        textBoxDisabled($textControlId);
        textBoxDisabled($textareaDescription);

        buttonDisabled($("#buttonSave"));
    }
}


function buttonSave_click() {
    var isValid = true;

    if (!$textName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaDescription.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var baseOperationDTO = {
        Id: pageParameterOperationId,
        Function_Id: pageParameterFunctionId,
        Function: $.trim($textFunction.val()),
        Name: $.trim($textName.val()),
        Control_Id: $.trim($textControlId.val()),
        Description: $.trim($textareaDescription.val())
    };

    if ($.trim(baseOperationDTO.Id) == "") {
        baseOperationDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "OperationService.asmx/SaveBaseOperation",
        data: $.toJSON({ baseOperationDTO: baseOperationDTO, pageAction: pageParameterPageAction }),
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