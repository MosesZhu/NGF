var pageParameterSystemId;
var pageParameterParentFunctionId;
var pageParameterFunctionId;
var pageParameterPageAction;
var baseUrl;
var pageParameterIsSystemAdmin;
var pageParameterIsOrgAdmin;

var $textOrg;
var $textProduct;
var $textDomain;
var $textSystem;
var $textParentFunction;
var $selectNodeType;
var $textCode;
var $textName;
var $spanInstanceTypeStar;
var $selectInstanceType;
var $spanAssemblyStar;
var $textAssembly;
var $spanFormStar;
var $textFormClass;
var $spanUrlStar;
var $textInputUrl;
var $textCompleteUrl;
var $spanTargetStar;
var $selectTarget;
var $textSystemIconName;
var $textareaCustomIconUrl;
var $textareaDescription;
var $checkBoxIsPublic;
var $divScope;

$(function () {
    pageParameterSystemId = $.url('?systemId');
    pageParameterParentFunctionId = $.url('?parentFunctionId');
    pageParameterFunctionId = $.url('?functionId');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsSystemAdmin = $.url('?isSystemAdmin');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $textOrg = $("#textOrg");
    $textProduct = $("#textProduct");
    $textDomain = $("#textDomain");
    $textSystem = $("#textSystem");
    $textParentFunction = $("#textParentFunction");
    $selectNodeType = $("#selectNodeType");
    $textCode = $("#textCode");
    $textName = $("#textName");
    $spanInstanceTypeStar = $("#spanInstanceTypeStar");
    $selectInstanceType = $("#selectInstanceType");
    $spanAssemblyStar = $("#spanAssemblyStar");
    $textAssembly = $("#textAssembly");
    $spanFormStar = $("#spanFormStar");
    $textFormClass = $("#textFormClass");
    $spanUrlStar = $("#spanUrlStar");
    $textInputUrl = $("#textInputUrl");
    $textCompleteUrl = $("#textCompleteUrl");
    $spanTargetStar = $("#spanTargetStar");
    $selectTarget = $("#selectTarget");
    $textSystemIconName = $("#textSystemIconName");
    $textareaCustomIconUrl = $("#textareaCustomIconUrl");
    $textareaDescription = $("#textareaDescription");
    $checkBoxIsPublic = $("#checkBoxIsPublic");
    $divScope = $("#divScope");

    selectNodeTypeDataBind();
    selectInstanceTypeDataBind();
    selectTargetDataBind();

    $selectNodeType.on("change", selectNodeType_change);
    $selectInstanceType.on("change", selectInstanceType_change);
    $textInputUrl.on("change", textInputUrl_change);

    $("#buttonSelectIcon").on("click", buttonSelectIcon_click);

    $textareaCustomIconUrl.on("change", textareaCustomIconUrl_change);
    $checkBoxIsPublic.on("change", checkBoxIsPublic_change);

    //页面数据初始化
    initializeData();

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);
});

function selectNodeTypeDataBind() {
    selectDataBind({
        $select: $selectNodeType,
        url: "../Function/FunctionService.asmx/GetNodeTypeList",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function selectInstanceTypeDataBind() {
    selectDataBind({
        $select: $selectInstanceType,
        url: "../Function/FunctionService.asmx/GetInstanceTypeList",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function selectTargetDataBind() {
    selectDataBind({
        $select: $selectTarget,
        url: "../Function/FunctionService.asmx/GetTargetList",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function selectNodeType_change() {
    if ($.trim($selectNodeType.val()) == "Function") {
        $spanInstanceTypeStar.show();
        $selectInstanceType.prop("disabled", false);
        $spanFormStar.show();
        $textFormClass.validatebox({ required: true });
        $textFormClass.prop("disabled", false);
        $spanTargetStar.show();
        $selectTarget.prop("disabled", false);

        if ($.trim($selectInstanceType.val()) != "") {
            if ($.trim($selectInstanceType.val()) == "WebForm" || $.trim($selectInstanceType.val()) == "SSRS" || $.trim($selectInstanceType.val()) == "ActiveX") {
                $spanAssemblyStar.hide();
                $textAssembly.validatebox({ required: false });
                $textAssembly.prop("disabled", true);
                $textAssembly.val("");

                $spanUrlStar.show();
                $textInputUrl.prop("disabled", false);
                $textInputUrl.validatebox({ required: true, validType: ['length[1,1024]'] });
            } else {
                $spanAssemblyStar.show();
                $textAssembly.validatebox({ required: true });
                $textAssembly.prop("disabled", false);

                $spanUrlStar.hide();
                $textInputUrl.prop("disabled", true);
                $textInputUrl.val("");
                $textCompleteUrl.val("");


            }
        } else {
            $spanAssemblyStar.hide();
            $textAssembly.validatebox({ required: false });
            $textAssembly.prop("disabled", true);
            $spanUrlStar.hide();
            $textInputUrl.prop("disabled", true);
        }
    } else {
        $spanInstanceTypeStar.hide();
        $selectInstanceType.prop("disabled", true);
        $selectInstanceType.get(0).selectedIndex = 0;

        $spanAssemblyStar.hide();
        $textAssembly.validatebox({ required: false });
        $textAssembly.prop("disabled", true);
        $textAssembly.val("");

        $spanFormStar.hide();
        $textFormClass.validatebox({ required: false });
        $textFormClass.prop("disabled", true);
        $textFormClass.val("");

        $spanUrlStar.hide();
        $textInputUrl.prop("disabled", true);
        $textInputUrl.val("");
        $textCompleteUrl.val("");

        $spanTargetStar.hide();
        $selectTarget.prop("disabled", true);
        $selectTarget.get(0).selectedIndex = 0;

        $textSystemIconName.val("");
    }
}

function selectInstanceType_change() {
    selectNodeType_change();
}

function textInputUrl_change() {
    var inputUrl = $.trim($textInputUrl.val());
    if (inputUrl.length >= 7 && inputUrl.substring(0, 7).toLowerCase() == "http://") {
        inputUrl = encodeURI(inputUrl);
        $textCompleteUrl.val(inputUrl);
    }
    else {
        inputUrl = encodeURI(inputUrl);
        $textCompleteUrl.val(baseUrl + inputUrl);
    }
}

function textareaCustomIconUrl_change() {
    $("#txtEnCodeIconUrl").val("");
    var iconUrl = $.trim($textareaCustomIconUrl.val());
    if (iconUrl != "") {
        var encodeIconUrl = encodeURI(iconUrl);
        $("#txtEnCodeIconUrl").val(encodeIconUrl);
        if ($("#txtEnCodeIconUrl").validatebox("isValid")) {
            $("#imageIconUrl").show();
            $("#imageIconUrl").attr("src", iconUrl);
        } else {
            $("#imageIconUrl").hide();
            $("#imageIconUrl").attr("src", "");
        }
    } else {
        $("#imageIconUrl").hide();
        $("#imageIconUrl").attr("src", "");
    }
}

function checkBoxIsPublic_change() {
    if (!$checkBoxIsPublic.prop("checked")) {
        $divScope.empty();
    }
}

function initializeData() {
    var vArguments = parent.$.QDialog.options.getParentArgument();
    $textOrg.val(vArguments.SelectedName.OrgName);
    $textProduct.val(vArguments.SelectedName.ProductName);
    $textDomain.val(vArguments.SelectedName.DomainName);
    $textSystem.val(vArguments.SelectedName.SystemName);
    $textParentFunction.val(vArguments.SelectedName.ParentFunctionName);
    baseUrl = vArguments.SelectedName.Base_Url;

    var hasChildren = vArguments.SelectedName.HasChildren;
    if (hasChildren == true) {
        $selectNodeType.prop("disabled", true);
    }

    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "FunctionService.asmx/GetFunction",
            data: $.toJSON({ id: pageParameterFunctionId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
        $.qajax({
            url: "FunctionService.asmx/GetFunctionScope",
            data: $.toJSON({ functionId: pageParameterFunctionId }),
            success: function (result) {
                if (result.d) {
                    $.each(result.d, function (index, baseFunctionScopeDTO) {
                        appendScopeDiv(baseFunctionScopeDTO);
                    });
                }
            }
        });
    } else {
        $selectInstanceType.val(vArguments.SelectedName.SystemInstancetype);
        $checkBoxIsPublic.prop("checked", false);
    }
}

function setPageData(baseFunctionDTO) {
    $selectNodeType.val(baseFunctionDTO.Node_Type);
    selectNodeType_change();
    $textCode.val(baseFunctionDTO.Code);
    $textName.val(baseFunctionDTO.Name);
    $selectInstanceType.val(baseFunctionDTO.Instance_Type);
    selectInstanceType_change();
    $textAssembly.val(baseFunctionDTO.Assembly);
    $textFormClass.val(baseFunctionDTO.Form_Class);
    $textInputUrl.val(baseFunctionDTO.Navigate_Url);
    var inputUrl = $.trim($textInputUrl.val());
    if (inputUrl != "") {
        if (inputUrl.length >= 7 && inputUrl.substring(0, 7).toLowerCase() == "http://") {
            inputUrl = encodeURI(inputUrl);
            $textCompleteUrl.val(inputUrl);
        }
        else {
            inputUrl = encodeURI(inputUrl);
            $textCompleteUrl.val(baseUrl + inputUrl);
        }
    } else {
        $textCompleteUrl.val(inputUrl);
    }

    $selectTarget.val(baseFunctionDTO.Target);
    $textSystemIconName.val(baseFunctionDTO.System_Icon_Name);

    if (baseFunctionDTO.System_Icon_Name != "") {
        $("#imgIcon").show();
        //$("#imgIcon").attr("src", "SystemIcon/" + baseFunctionDTO.System_Icon_Name);
        $("#imgIcon").attr("src", "./res.its?icon=" + baseFunctionDTO.System_Icon_Name);
    }

    $textareaCustomIconUrl.val(baseFunctionDTO.Custom_Icon_Url);
    textareaCustomIconUrl_change();

    $textareaDescription.val(baseFunctionDTO.Description);
    $checkBoxIsPublic.prop("checked", baseFunctionDTO.IsPublic);

    if (!(baseFunctionDTO.AllowEdit) || (pageParameterIsSystemAdmin == "false" && pageParameterIsOrgAdmin == "false")) {
        selectDisabled($selectNodeType);
        selectDisabled($selectInstanceType);
        selectDisabled($selectTarget);
        textBoxDisabled($textCode);
        textBoxDisabled($textName);
        textBoxDisabled($textAssembly);
        textBoxDisabled($textFormClass);
        textBoxDisabled($textInputUrl);
        textBoxDisabled($textareaCustomIconUrl);
        textBoxDisabled($textareaDescription);

        $checkBoxIsPublic.prop("disabled", true);

        buttonDisabled($("#buttonSave"));
    }
}

function buttonSelectIcon_click() {
    $.QDialog.show(
        {
            title: "Select Icon"
        },
        {
            url: "SelectSystemIcon.aspx",
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    $textSystemIconName.val(returnValue.name);
                    $("#imgIcon").show();
                    //$("#imgIcon").attr("src", "SystemIcon/" + returnValue.name);
                    $("#imgIcon").attr("src", "./res.its?icon=" + returnValue.name);
                }
            }
        }
    );
    return false;
}

function buttonSave_click() {
    if ($.trim($selectNodeType.val()) == "") {
        $.messager.alert("Warning", "Node type can't be empty!", "warning");
        return;
    }

    var isValid = true;

    if (!$textCode.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textName.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    if ($spanInstanceTypeStar.is(":visible")) {
        if ($.trim($selectInstanceType.val()) == "") {
            $.messager.alert("Warning", "Instance type can't be empty!", "warning");
            return;
        }
    }

    if ($spanAssemblyStar.is(":visible")) {
        if (!$textAssembly.validatebox("isValid")) {
            isValid = false;
        }
    }

    if ($spanFormStar.is(":visible")) {
        if (!$textFormClass.validatebox("isValid")) {
            isValid = false;
        }
    }

    if (!isValid) {
        return;
    }

    if (!$textInputUrl.prop("disabled")) {
        if (!$textInputUrl.validatebox("isValid")) {
            return;
        }
        var inputUrl = $textInputUrl.val();
        if (inputUrl.indexOf("http://") != 0 && inputUrl.indexOf("https://") != 0 && inputUrl.indexOf("/") != 0) {
            $.messager.alert("Warning", "The url must begin with the character of 'http://' , 'https://' or '/',please input it again!", "warning");
            return;
        }
    }

    if ($spanUrlStar.is(":visible")) {
        if (!$textCompleteUrl.validatebox("isValid")) {
            $.messager.alert("Warning", "Invidate url,please check it!", "warning");
            return;
        }
    }

    if ($spanTargetStar.is(":visible")) {
        if ($.trim($selectTarget.val()) == "") {
            $.messager.alert("Warning", "Target can't be empty!", "warning");
            return;
        }
    }

    //    if (!$("#txtEnCodeIconUrl").validatebox("isValid")) {
    //        $.messager.alert("Warning", "Invidate custom icon url,please check it!", "warning");
    //        return;
    //    }

    if (!$textareaDescription.validatebox("isValid")) {
        return;
    }

    saveFunction();
    return;
}

function saveFunction() {
    var baseFunctionDTO = {
        Id: pageParameterFunctionId,
        System_Id: pageParameterSystemId,
        Parent_Function_Id: pageParameterParentFunctionId,
        Code: $.trim($textCode.val()),
        Name: $.trim($textName.val()),
        Description: $.trim($textareaDescription.val()),
        Assembly: $.trim($textAssembly.val()),
        Form_Class: $.trim($textFormClass.val()),
        Navigate_Url: $.trim($textInputUrl.val()),
        Target: $.trim($selectTarget.val()),
        Instance_Type: $.trim($selectInstanceType.val()),
        IsPublic: $checkBoxIsPublic.prop("checked"),
        System_Icon_Name: $.trim($textSystemIconName.val()),
        Custom_Icon_Url: $.trim($textareaCustomIconUrl.val()),
        Node_Type: $.trim($selectNodeType.val())
    };

    if ($.trim(baseFunctionDTO.Id) == "") {
        baseFunctionDTO.Id = guidEmpty;
    }
    var arrayScopes = [];
    if ($checkBoxIsPublic.prop("checked")) {
        arrayScopes = getFunctionScopes();
    }
    var functionScopes = arrayScopes;

    $.qajax({
        url: "FunctionService.asmx/SaveBaseFunction",
        data: $.toJSON({ baseFunctionDTO: baseFunctionDTO, functionScopes: functionScopes, pageAction: pageParameterPageAction }),
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
}

function buttonCancel_click() {
    parent.$.QDialog.hide(false);
}
