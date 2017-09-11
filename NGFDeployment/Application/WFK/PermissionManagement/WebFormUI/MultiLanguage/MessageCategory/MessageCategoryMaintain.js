var pageParameterId;
var pageParameterPageAction;

var $textName;
var $textCategoryCode;
var $textareaDescription;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    $textName = $("#textName");
    $textCategoryCode = $("#textCategoryCode");
    $textareaDescription = $("#textareaDescription");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //页面数据初始化
    initializeData();
});

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "MessageCategoryService.asmx/GetBaseMessageCategory",
            data: $.toJSON({ messageCategoryId: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseMessageCategoryDTO) {
    $textName.val(baseMessageCategoryDTO.Name);
    $textCategoryCode.val(baseMessageCategoryDTO.Category_Code);
    $textareaDescription.val(baseMessageCategoryDTO.Description);
    textBoxDisabled($textName);

    if (!(baseMessageCategoryDTO.AllowEdit)) {
        textBoxDisabled($textCategoryCode);
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

    var baseMessageCategoryDTO = {
        Id: pageParameterId,
        Name: $.trim($textName.val()),
        Description: $.trim($textareaDescription.val())
    };

    if ($.trim(baseMessageCategoryDTO.Id) == "") {
        baseMessageCategoryDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "MessageCategoryService.asmx/SaveBaseMessageCategory",
        data: $.toJSON({ baseMessageCategoryDTO: baseMessageCategoryDTO, pageAction: pageParameterPageAction }),
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

$.extend($.fn.validatebox.defaults.rules, {
    name: {
        validator: function (value, param) {
            var reg = /^[_a-zA-z][\w]*$/;
            var result = reg.test(value);
            return result;
        },
        message: 'Please enter a valid name.'
    }
});