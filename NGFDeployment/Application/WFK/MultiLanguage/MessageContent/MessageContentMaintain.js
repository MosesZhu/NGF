var pageParameterId;
var pageParameterPageAction;

var $selectCategory;
var $selectType;
var $textMessageKey;
var $textMessageCode;
var $textareaEnUs;
var $textareaZhCn;
var $textareaZhTw;
var $textStatus;
var isMessageAdmin;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    $selectCategory = $("#selectCategory");
    $selectType = $("#selectType");
    $textMessageKey = $("#textMessageKey");
    $textMessageCode = $("#textMessageCode");
    $textStatus = $("#textStatus");
    $textareaEnUs = $("#textareaEnUs");
    $textareaZhCn = $("#textareaZhCn");
    $textareaZhTw = $("#textareaZhTw");

    $selectCategory.on("change", selectCategory_change);
    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    $textareaZhCn.on("change", textareaZhCn_change);
    $textareaZhTw.on("change", textareaZhTw_change);

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
        async: false //同步方式调用。
    });
}

function selectTypeDataBind() {
    var messageCategoryId = $.trim($selectCategory.val());
    if (messageCategoryId == "") {
        $selectType.empty();
        return;
    }

    selectDataBind({
        $select: $selectType,
        url: "../../MultiLanguage/MessageType/MessageTypeService.asmx/GetMessageTypeList",
        data: $.toJSON({ messageCategoryId: messageCategoryId }),
        itemValue: "Id",
        itemText: "Type_Name",
        async: false //同步方式调用。
    });
}

function selectCategory_change() {
    selectTypeDataBind();
}

function initializeData() {
    if (pageParameterPageAction == pageAction.New) {
        $textStatus.val("New");
    }
    else {
        $.qajax({
            url: "MessageContentService.asmx/GetBaseMessageContent",
            data: $.toJSON({ messageContentId: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseMultiLanguageTextDTO) {
    $selectCategory.val(baseMultiLanguageTextDTO.Message_Category_Id);
    selectCategory_change();

    $selectType.val(baseMultiLanguageTextDTO.System_Id);
    $textMessageKey.val(baseMultiLanguageTextDTO.Name);
    $textMessageCode.val(baseMultiLanguageTextDTO.Code);
    $textareaEnUs.val(baseMultiLanguageTextDTO.En_Us);
    $textareaZhCn.val(baseMultiLanguageTextDTO.Zh_Cn);
    $textareaZhTw.val(baseMultiLanguageTextDTO.Zh_Tw);
    $textStatus.val(baseMultiLanguageTextDTO.Status);

    selectDisabled($selectCategory);
    selectDisabled($selectType);
    textBoxDisabled($textMessageKey);
    isMessageAdmin = IsMessageAdmin();
    if (!(baseMultiLanguageTextDTO.AllowEdit) || (isMessageAdmin == false && baseMultiLanguageTextDTO.status == "Approve")) {
        textBoxDisabled($textEndMessageCode);
        textBoxDisabled($textareaEnUs);
        textBoxDisabled($textareaZhCn);
        textBoxDisabled($textareaZhTw);
        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {
    var status;
    $.qajax({
        url: "MessageContentService.asmx/GetBaseMessageContent",
        data: $.toJSON({ messageContentId: pageParameterId }),
        async: false,
        success: function (result) {
            status = result.d.Status;
        }
    });
    if (status == "Approve" && isMessageAdmin == false) {
        $.messager.alert("Warning", "Only Message Admin can edit message when status is Approve!", "warning");
    }

    var typeId = $.trim($selectType.val());
    if (typeId == "") {
        $.messager.alert("Warning", "Type can't be empty!", "warning");
        return;
    }

    var isValid = true;
    if (!$textMessageKey.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textareaEnUs.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textareaZhCn.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textareaZhTw.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var baseMultiLanguageTextDTO =
    {
        Id: pageParameterId,
        System_Id: typeId,
        Name: $.trim($textMessageKey.val()),
        En_Us: $.trim($textareaEnUs.val()),
        Zh_Cn: $.trim($textareaZhCn.val()),
        Zh_Tw: $.trim($textareaZhTw.val()),
        Status: $.trim($textStatus.val())
    };

    if ($.trim(baseMultiLanguageTextDTO.Id) == "") {
        baseMultiLanguageTextDTO.Id = guidEmpty;
    }
    if (baseMultiLanguageTextDTO.System_Id == "") {
        baseMultiLanguageTextDTO.System_Id = guidEmpty;
    }

    $.qajax({
        url: "MessageContentService.asmx/SaveBaseMessageContent",
        data: $.toJSON({ baseMultiLanguageTextDTO: baseMultiLanguageTextDTO, pageAction: pageParameterPageAction }),
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

function IsMessageAdmin() {
    var isMessageAdmin = false;
    $.qajax({
        url: "MessageContentService.asmx/IsCurrentUserMessageAdmin",
        async: false,
        success: function (result) {
            isMessageAdmin = result.d;
        }
    });
    return isMessageAdmin;
}

function textareaZhCn_change() {
    var zhTw = $.trim($textareaZhTw.val());
    if (zhTw != "") {
        return;
    }
    $.qajax({
        url: "../MultiLanguage/MultiLanguageService.asmx/ToTraditionalChinese",
        data: $.toJSON({ simplified: $.trim($textareaZhCn.val()) }),
        success: function (result) {
            $textareaZhTw.val(result.d);
        }
    });
}

function textareaZhTw_change() {
    var zhCn = $.trim($textareaZhCn.val());
    if (zhCn != "") {
        return;
    }
    $.qajax({
        url: "../MultiLanguage/MultiLanguageService.asmx/ToSimplifiedChinese",
        data: $.toJSON({ traditional: $.trim($textareaZhTw.val()) }),
        success: function (result) {
            $textareaZhCn.val(result.d);
        }
    });
}