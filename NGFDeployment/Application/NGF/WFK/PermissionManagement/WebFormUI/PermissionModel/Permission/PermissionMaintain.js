var pageParameterId;
var pageParameterIsOrgAdmin;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //页面数据初始化
    initializeEdit();
});

function initializeEdit() {
    $.qajax({
        url: "PermissionService.asmx/GetBasePermission",
        data: $.toJSON({ id: pageParameterId }),
        success: function (result) {
            $("#textPermissionOrg").val(result.d.PermissionOrg);
            $("#textPermissionProduct").val(result.d.PermissionProduct);
            $("#textPermissionMode").val(result.d.PermissionMode);
            $("#textSubjectCategory").val(result.d.Subject_Category);
            $("#textSubjectName").val(result.d.Subject_Name);
            //$("#textResourceOrg").val(result.d.ResourceOrg);
            $("#textResourceCategory").val(result.d.Resource_Category);
            $("#textResourceName").val(result.d.Resource_Name);
            $("#textName").val(result.d.Name);
            $("#textareaDescription").val(result.d.Description);

            if ($.trim(result.d.Resource_Category).toLowerCase() == "system") {
                $("#textProduct").val(result.d.Product);
                $("#textDomain").val(result.d.Domain);
                $("#trProduct").show();
                $("#trDomain").show();
                $("#trSystem").hide();
                $("#trFunction").hide();
                $("#trDatasource").hide();
                $("#trDatatable").hide();
            } else if ($.trim(result.d.Resource_Category).toLowerCase() == "function") {
                $("#textProduct").val(result.d.Product);
                $("#textDomain").val(result.d.Domain);
                $("#textSystem").val(result.d.System);
                $("#trProduct").show();
                $("#trDomain").show();
                $("#trSystem").show();
                $("#trFunction").hide();
                $("#trDatasource").hide();
                $("#trDatatable").hide();
            } else if ($.trim(result.d.Resource_Category).toLowerCase() == "operation") {
                $("#textProduct").val(result.d.Product);
                $("#textDomain").val(result.d.Domain);
                $("#textSystem").val(result.d.System);
                $("#textFunction").val(result.d.Function);
                $("#trProduct").show();
                $("#trDomain").show();
                $("#trSystem").show();
                $("#trFunction").show();
                $("#trDatasource").hide();
                $("#trDatatable").hide();
            } else if ($.trim(result.d.Resource_Category).toLowerCase() == "sensitivecolumn") {
                $("#textDataSource").val(result.d.DataSource);
                $("#textDatatable").val(result.d.Datatable);
                $("#trProduct").hide();
                $("#trDomain").hide();
                $("#trSystem").hide();
                $("#trFunction").hide();
                $("#trDatasource").show();
                $("#trDatatable").show();
            } else {
                $("#trProduct").hide();
                $("#trDomain").hide();
                $("#trSystem").hide();
                $("#trFunction").hide();
                $("#trDatasource").hide();
                $("#trDatatable").hide();
            }
        }
    });
    if (pageParameterIsOrgAdmin == "false") {
        textBoxDisabled($("#textName"));
        textBoxDisabled($("#textareaDescription"));
        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {

    if (!$("#textareaDescription").validatebox("isValid")) {
        return;
    }

    var basePermissionDTO = {
        Id: pageParameterId,

        Name: $.trim($("#textName").val()),
        Description: $.trim($("#textareaDescription").val())
    };

    if ($.trim(basePermissionDTO.Id) == "") {
        basePermissionDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "PermissionService.asmx/UpdateBasePermission",
        data: $.toJSON({ basePermissionDTO: basePermissionDTO }),
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