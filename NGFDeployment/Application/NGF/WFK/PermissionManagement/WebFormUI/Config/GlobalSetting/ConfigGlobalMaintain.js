var pageParameterId;
var pageParameterPageAction;

var $textKey;
var $textareaValue;
var $selectOrg;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    $textKey = $("#textKey");
    $textareaValue = $("#textareaValue");
    $selectOrg = $("#selectOrg");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //select绑定
    selectOrgDataBind();

    //页面数据初始化
    initializeData();
});

//------绑定select-----------------------------------------------------------------------------
function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "ConfigGlobalService.asmx/GetBaseConfigGlobal",
            data: $.toJSON({ configGlobalId: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseConfigGlobalDTO) {
    $textKey.val(baseConfigGlobalDTO.Key);
    $textareaValue.val(baseConfigGlobalDTO.Value);
    $selectOrg.val(baseConfigGlobalDTO.Org_Id);

    if (!baseConfigGlobalDTO.AllowEdit) {
        textBoxDisabled($textKey);
        textBoxDisabled($textareaValue);
        selectDisabled($selectOrg);

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
    if (!isValid) {
        return;
    }

    var baseConfigGlobalDTO =
    {
        Id: pageParameterId,
        Key: $.trim($textKey.val()),
        Value: $.trim($textareaValue.val()),
        Org_Id: $.trim($selectOrg.val()),
        Org: $.trim($selectOrg.find("option:selected").text())
    };

    if ($.trim(baseConfigGlobalDTO.Id) == "") {
        baseConfigGlobalDTO.Id = guidEmpty;
    }

    if (baseConfigGlobalDTO.Org_Id == "") {
        baseConfigGlobalDTO.Org_Id = guidEmpty;
    }

    $.qajax({
        url: "ConfigGlobalService.asmx/SaveBaseConfigGlobal",
        data: $.toJSON({ baseConfigGlobalDTO: baseConfigGlobalDTO, pageAction: pageParameterPageAction }),
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
    }
});