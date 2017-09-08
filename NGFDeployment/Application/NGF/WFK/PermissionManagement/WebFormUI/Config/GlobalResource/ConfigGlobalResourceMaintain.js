var pageParameterId;
var pageParameterPageAction;

var $textKey;
var $textareaValue;
var $selectType;
var $selectPosition;
var $textOrder;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    $textKey = $("#textKey");
    $textareaValue = $("#textareaValue");
    $selectType = $("#selectType");
    $selectPosition = $("#selectPosition");
    $textOrder = $("#textOrder");

    $selectType.on("change", selectType_change);
    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //select绑定
    selectTypeDataBind();
    selectPositionDataBind();

    //页面数据初始化
    initializeData();
});

//------绑定select-----------------------------------------------------------------------------
function selectTypeDataBind() {
    selectDataBind({
        $select: $selectType,
        url: "ConfigGlobalResourceService.asmx/GetGlobalResourceTypeList",
        itemType: "string",
        empty: false,
        async: false //同步方式调用。
    });
}

function selectPositionDataBind() {
    selectDataBind({
        $select: $selectPosition,
        url: "ConfigGlobalResourceService.asmx/GetGlobalResourcePositionList",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function selectType_change() {
    var type = $.trim($selectType.val());
    if (type == "css") {
        $textareaValue.validatebox({
            required: true,
            validType: 'cssvalue'
        });
        $selectPosition.val("");
        selectDisabled($selectPosition);
    }
    else {
        $textareaValue.validatebox({
            required: true,
            validType: 'jsvalue'
        });
        $selectPosition.prop("disabled", false);
        $selectPosition.removeClass();
        $selectPosition.addClass("Dropdownlist");
    }
}

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "ConfigGlobalResourceService.asmx/GetBaseConfigGlobalResource",
            data: $.toJSON({ configGlobalResourceId: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseConfigGlobalResourceDTO) {
    $textKey.val(baseConfigGlobalResourceDTO.Key);
    $textareaValue.val(baseConfigGlobalResourceDTO.Value);
    $selectType.val(baseConfigGlobalResourceDTO.Type);
    selectType_change();
    $selectPosition.val(baseConfigGlobalResourceDTO.Position);
    $textOrder.val(baseConfigGlobalResourceDTO.Sort_Code);

    if (!baseConfigGlobalDTO.AllowEdit) {
        textBoxDisabled($textKey);
        textBoxDisabled($textareaValue);
        selectDisabled($selectType);
        selectDisabled($selectPosition);
        textBoxDisabled($textOrder);

        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {
    var isValid = true;
    if (!$textKey.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textareaValue.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textOrder.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    if ($.trim($selectType.val()) == "javascript" && $.trim($selectPosition.val()) == "") {
        $.messager.alert("Warning", "Position can't be empty!", "warning");
        return;
    }

    var baseConfigGlobalResourceDTO =
    {
        Id: pageParameterId,
        Key: $.trim($textKey.val()),
        Value: $.trim($textareaValue.val()),
        Type: $.trim($selectType.val()),
        Position: $.trim($selectPosition.val()),
        Sort_Code: $.trim($textOrder.val())
    };

    if ($.trim(baseConfigGlobalResourceDTO.Id) == "") {
        baseConfigGlobalResourceDTO.Id = guidEmpty;
    }
    $.qajax({
        url: "ConfigGlobalResourceService.asmx/SaveBaseConfigGlobalResource",
        data: $.toJSON({ baseConfigGlobalResourceDTO: baseConfigGlobalResourceDTO, pageAction: pageParameterPageAction }),
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

//----------------------------------------------------------------------------
$.extend($.fn.validatebox.defaults.rules, {
    namespace: {
        validator: function (value, param) {
            var reg = /^[_a-zA-z][\w]*(\.?([_a-zA-z][\w]*))*$/;
            var result = reg.test(value);
            return result;
        },
        message: 'Please enter a valid value.'
    },
    cssvalue: {
        validator: function (value, param) {
            var reg = /\.css$/;
            var result = reg.test(value);
            return result;
        },
        message: 'Value must be ended with ".css".'
    },
    jsvalue: {
        validator: function (value, param) {
            var reg = /\.js$/;
            var result = reg.test(value);
            return result;
        },
        message: 'Value must be ended with ".js".'
    }
});