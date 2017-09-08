var pageParameterId;
var pageParameterPageAction;

var $textName;
var $textareaDescription;
var $textImpersonateAdminRole;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    $textName = $("#textName");
    $textareaDescription = $("#textareaDescription");
    $textImpersonateAdminRole = $("#textImpersonateAdminRole");

    $("#buttonSearchSubject").on("click", buttonSearchSubject_click);
    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //页面数据初始化
    initializeData();
});

function buttonSearchSubject_click() {
    var urlRole = "../../Role/Role/SelectRole.aspx";
    showRoleDialog(urlRole);
    return false;
}

function showRoleDialog(urlRole) {
    $.QDialog.show(
        {
            title: "Select Role"
        },
        {
            width: 0.9,
            height: 0.9,
            url: urlRole,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    $textImpersonateAdminRole.val(returnValue.Name);
                }
            }
        }
    );
}

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "ProductService.asmx/GetProduct",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseProductDTO) {
    $textName.val(baseProductDTO.Name);
    $textareaDescription.val(baseProductDTO.Description);
    $textImpersonateAdminRole.val(baseProductDTO.ImpersonateAdminRole);

    //检查该笔数据是否允许编辑，若不允许则不可编辑
    if (!(baseProductDTO.AllowEdit)) {
        textBoxDisabled($textName);
        textBoxDisabled($textareaDescription);
        textBoxDisabled($textImpersonateAdminRole);
        textBoxDisabled($textareaDescription);
        textBoxDisabled($textName);
        textBoxDisabled($textareaDescription);

        $("#buttonSearchSubject").off("click");

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

    var baseProductDTO = {
        Id: pageParameterId,
        Name: $.trim($textName.val()),
        Description: $.trim($textareaDescription.val()),
        ImpersonateAdminRole: $.trim($textImpersonateAdminRole.val())
    };

    if ($.trim(baseProductDTO.Id) == "") {
        baseProductDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "ProductService.asmx/SaveBaseProduct",
        data: $.toJSON({ baseProductDTO: baseProductDTO, pageAction: pageParameterPageAction }),
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