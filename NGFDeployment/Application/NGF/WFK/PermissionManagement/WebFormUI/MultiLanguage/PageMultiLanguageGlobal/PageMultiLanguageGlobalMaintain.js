var pageParameterId;
var pageParameterPageAction;

var $textEnglish;
var $textChineseSimplified;
var $textChineseTraditional;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    $textEnglish = $("#textEnglish");
    $textChineseSimplified = $("#textChineseSimplified");
    $textChineseTraditional = $("#textChineseTraditional");

    $textChineseSimplified.on("change", textChineseSimplified_change);
    $textChineseTraditional.on("change", textChineseTraditional_change);

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //页面数据初始化
    initializeData();
});

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "PageMultiLanguageGlobalService.asmx/GetPageMultiLanguageGlobal",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseMultiLanguagePageDTO) {
    $textEnglish.val(baseMultiLanguagePageDTO.En_Us);
    $textChineseSimplified.val(baseMultiLanguagePageDTO.Zh_Cn);
    $textChineseTraditional.val(baseMultiLanguagePageDTO.Zh_Tw);

    if (!(baseOrgDTO.AllowEdit)) {
        textBoxDisabled($textEnglish);
        textBoxDisabled($textChineseSimplified);
        textBoxDisabled($textChineseTraditional);
        buttonDisabled($("#buttonSave"));
    }
}

function textChineseSimplified_change() {
    var chineseTraditional = $.trim($textChineseTraditional.val());
    if (chineseTraditional != "") {
        return;
    }
    $.qajax({
        url: "../MultiLanguage/MultiLanguageService.asmx/ToTraditionalChinese",
        data: $.toJSON({ simplified: $.trim($textChineseSimplified.val()) }),
        success: function (result) {
            $textChineseTraditional.val(result.d);
        }
    });
}

function textChineseTraditional_change() {
    var chineseSimplified = $.trim($textChineseSimplified.val());
    if (chineseSimplified != "") {
        return;
    }
    $.qajax({
        url: "../MultiLanguage/MultiLanguageService.asmx/ToTraditionalChinese",
        data: $.toJSON({ simplified: $.trim($textChineseTraditional.val()) }),
        success: function (result) {
            $textChineseSimplified.val(result.d);
        }
    });
}

function buttonSave_click() {
    var isValid = true;
    if (!$textEnglish.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textChineseSimplified.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textChineseTraditional.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var baseMultiLanguagePageDTO = {
        Id: pageParameterId,

        En_Us: $.trim($textEnglish.val()),
        Zh_Cn: $.trim($textChineseSimplified.val()),
        Zh_Tw: $.trim($textChineseTraditional.val())
    };

    if ($.trim(baseMultiLanguagePageDTO.Id) == "") {
        baseMultiLanguagePageDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "PageMultiLanguageGlobalService.asmx/SavePageMultiLanguageGlobal",
        data: $.toJSON({ baseMultiLanguagePageDTO: baseMultiLanguagePageDTO, pageAction: pageParameterPageAction }),
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