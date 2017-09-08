/// <reference name="ITS.WebFramework.CommonResource.Scripts.References.js" assembly="ITS.WebFramework.CommonResource" />

var pageParameterId;
var pageParameterPageAction;

var $selectSite;
var $textName;
var $textareaDescription;
var $textOrgAdminRole;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    $selectSite = $("#selectSite");
    $textName = $("#textName");
    $textareaDescription = $("#textareaDescription");
    $textOrgAdminRole = $("#textOrgAdminRole");

    $("#buttonSearchSubject").on("click", buttonSearchSubject_click);
    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    selectSiteDataBind();

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
                    $textOrgAdminRole.val(returnValue.Name);
                }
            }
        }
    );
}

function selectSiteDataBind() {
    selectDataBind({
        $select: $selectSite,
        url: "OrgService.asmx/GetSiteList",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "OrgService.asmx/GetOrg",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseOrgDTO) {
    $selectSite.val(baseOrgDTO.Site);
    $textName.val(baseOrgDTO.Name);
    $textareaDescription.val(baseOrgDTO.Description);
    $textOrgAdminRole.val(baseOrgDTO.Org_Admin_Role);

    if (!(baseOrgDTO.AllowEdit)) {
        selectDisabled($selectSite);
        textBoxDisabled($textName);
        textBoxDisabled($textareaDescription);
        textBoxDisabled($textOrgAdminRole);
        $("#buttonSearchSubject").off("click");
        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {

    if ($.trim($selectSite.val()) == "") {
        $.messager.alert("Warning", "Site can't be empty!", "warning");
        return;
    }

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

    var baseOrgDTO = {
        Id: pageParameterId,

        Site: $.trim($selectSite.val()),
        Name: $.trim($textName.val()),
        Description: $.trim($textareaDescription.val()),
        Org_Admin_Role: $.trim($textOrgAdminRole.val())
    };

    if ($.trim(baseOrgDTO.Id) == "") {
        baseOrgDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "OrgService.asmx/SaveBaseOrg",
        data: $.toJSON({ baseOrgDTO: baseOrgDTO, pageAction: pageParameterPageAction }),
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