var pageParameterId;
var pageParameterPageAction;

var $selectCategory;
var $textTypeName;
var $textTypeCode;
var $textareaTypeDescription;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    $selectCategory = $("#selectCategory");
    $textTypeName = $("#textTypeName");
    $textTypeCode = $("#textTypeCode");
    $textareaTypeDescription = $("#textareaTypeDescription");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    selectCategoryDataBind();

    //页面数据初始化
    initializeData();
});

function selectCategoryDataBind() {
    selectDataBind({
        $select: $selectCategory,
        url: "../../MultiLanguage/MessageCategory/MessageCategoryService.asmx/GetMessageCategoryList",
        itemValue: "Id",
        itemText: "Name",
        empty: false,
        async: false //同步方式调用。
    });
}

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "MessageTypeService.asmx/GetBaseMessageType",
            data: $.toJSON({ messageTypeId: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(messageTypeDTO) {
    $selectCategory.val(messageTypeDTO.Category_Id);
    $textTypeName.val(messageTypeDTO.Type_Name);
    $textTypeCode.val(messageTypeDTO.Type_Code);
    $textareaTypeDescription.val(messageTypeDTO.Type_Description);
    selectDisabled($selectCategory);
    textBoxDisabled($textTypeName);

    if (!(messageTypeDTO.AllowEdit)) {
        textBoxDisabled($textTypeName);
        textBoxDisabled($textEndTypeCode);
        textBoxDisabled($textareaTypeDescription);
        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {
    var isValid = true;
    if (!$textTypeName.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textareaTypeDescription.validatebox("isValid")) {
        isValid = false;
    }
    if (!isValid) {
        return;
    }

    var baseMessageTypeDTO = {
        Id: pageParameterId,
        Category_Id: $.trim($selectCategory.val()),
        Category: $.trim($selectCategory.find("option:selected").text()),
        Type_Name: $.trim($textTypeName.val()),
        Type_Description: $.trim($textareaTypeDescription.val())
    };

    if ($.trim(baseMessageTypeDTO.Id) == "") {
        baseMessageTypeDTO.Id = guidEmpty;
    }

    if (baseMessageTypeDTO.Category_Id == "") {
        baseMessageTypeDTO.Category_Id = guidEmpty;
    }

    $.qajax({
        url: "MessageTypeService.asmx/SaveBaseMessageType",
        data: $.toJSON({ baseMessageTypeDTO: baseMessageTypeDTO, pageAction: pageParameterPageAction }),
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