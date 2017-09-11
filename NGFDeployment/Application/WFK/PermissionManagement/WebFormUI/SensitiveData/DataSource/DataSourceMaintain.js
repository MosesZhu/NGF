var pageParameterId;
var pageParameterPageAction;
var pageParameterIsOrgAdmin;

var $selectOrg;
var $textEnvironment;
var $textName;
var $textareaDescription;
var $selectProvider;
var $textareaConnectionString;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $selectOrg = $("#selectOrg");
    $textEnvironment = $("#textEnvironment");
    $textName = $("#textName");
    $textareaDescription = $("#textareaDescription");
    $selectProvider = $("#selectProvider");
    $textareaConnectionString = $("#textareaConnectionString");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);
    $("#buttonTest").on("click", buttonTest_click);

    $selectProvider.on("change", selectProvider_change);

    selectOrgDataBind();
    selectProviderDataBind();

    //页面数据初始化
    initializeData();
});

function selectProvider_change() {
    var providerValue = $selectProvider.val();
    if ($.trim(providerValue) == "MsOracle") {
        $("#textareaConnectionStringForSample").val("Data Source=****;User Id=****;Password=****;");
    }
    else if ($.trim(providerValue) == "SqlClient") {
        $("#textareaConnectionStringForSample").val("data source=****;initial catalog=****;persist security info=False;user id=****;password=****;packet size=4096");
    }
    else if ($.trim(providerValue) == "Oracle") {
        $("#textareaConnectionStringForSample").val("Data Source=****;User Id=****;Password=****;");
    }
    else if ($.trim(providerValue) == "") {
        $("#textareaConnectionStringForSample").val("");
    }
}

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectProviderDataBind() {
    selectDataBind({
        $select: $selectProvider,
        url: "DataSourceService.asmx/GetProviderList",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "DataSourceService.asmx/GetBaseDataSource",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseDataSourceDTO) {
    $selectOrg.val(baseDataSourceDTO.Org_Id);
    $textEnvironment.val(baseDataSourceDTO.Environment);
    $textName.val(baseDataSourceDTO.Name);
    $textareaDescription.val(baseDataSourceDTO.Description);
    $selectProvider.val(baseDataSourceDTO.Provider);
    $selectProvider.change();
    $textareaConnectionString.val(baseDataSourceDTO.Connection_String);

    if (!(baseDataSourceDTO.AllowEdit) || pageParameterIsOrgAdmin == "false") {
        selectDisabled($selectOrg);
        selectDisabled($selectProvider);
        textBoxDisabled($textEnvironment);
        textBoxDisabled($textName);
        textBoxDisabled($textareaDescription);
        textBoxDisabled($textareaConnectionString);

        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {
    var isValid = true;

    if ($.trim($selectOrg.val()) == "") {
        $.messager.alert("Warning", "Org can't be empty!", "warning");
        return;
    }

    if (pageParameterPageAction == pageAction.New && !checkIsOrgAdmin()) {
        $.messager.alert("Warning", "You don't have permisson to add because you're not this org admin!", "warning");
        return;
    }

    if (!$textEnvironment.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textareaDescription.validatebox("isValid")) {
        isValid = false;
    }

    if ($.trim($selectProvider.val()) == "") {
        $.messager.alert("Warning", "Provider can't be empty!", "warning");
        return;
    }

    if (!$textareaConnectionString.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var baseDataSourceDTO = {
        Id: pageParameterId,

        Org: $.trim($selectOrg.find("option:selected").text()),
        Org_Id: $.trim($selectOrg.val()),
        Environment: $.trim($textEnvironment.val()),
        Name: $.trim($textName.val()),
        Description: $.trim($textareaDescription.val()),
        Provider: $.trim($selectProvider.val()),
        Connection_String: $.trim($textareaConnectionString.val())
    };

    if ($.trim(baseDataSourceDTO.Id) == "") {
        baseDataSourceDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "DataSourceService.asmx/SaveBaseDataSource",
        data: $.toJSON({ baseDataSourceDTO: baseDataSourceDTO, pageAction: pageParameterPageAction }),
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

function buttonTest_click() {
    var isValid = true;

    if ($.trim($selectProvider.val()) == "") {
        $.messager.alert("Warning", "Provider can't be empty!", "warning");
        return;
    }

    if (!$textareaConnectionString.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var baseDataSourceDTO = {
        Provider: $.trim($selectProvider.val()),
        Connection_String: $.trim($textareaConnectionString.val())
    };

    $.qajax({
        url: "DataSourceService.asmx/TestBaseDataSourceConnectString",
        data: $.toJSON({ baseDataSourceDTO: baseDataSourceDTO }),
        success: function (result) {
            if ($.trim(result.d) == "") {
                $.messager.alert("Information", "Connect success!", "info");
            }
            else {
                $.messager.alert("Error", "Connect Failed:" + result.d, "error");
            }
        }
    });
    return;
}

function checkIsOrgAdmin() {
    var isOrgAdmin;
    var orgId = $.trim($selectOrg.val());
    $.qajax({
        async: false,
        url: "../../OrgUser/Org/OrgService.asmx/IsCurrentUserOrgAdmin",
        data: $.toJSON({ orgId: orgId }),
        success: function (result) {
            isOrgAdmin = result.d;
        }
    });
    return isOrgAdmin;
}