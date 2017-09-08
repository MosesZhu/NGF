var pageParameterId;
var pageParameterPageAction;
var pageParameterIsSystemAdmin;

var $selectOrg;
var $selectProduct;
var $selectDomain;
var $selectSystem;
var $textName;
var $textareaDescription;
var $textareaAssembly;
var $textareaProcess;
var $textTimeSlice;
var $textLastDatetime;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsSystemAdmin = $.url('?isSystemAdmin');

    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectDomain = $("#selectDomain");
    $selectSystem = $("#selectSystem");
    $textName = $("#textName");
    $textareaDescription = $("#textareaDescription");
    $textareaAssembly = $("#textareaAssembly");
    $textareaProcess = $("#textareaProcess");
    $textTimeSlice = $("#textTimeSlice");
    $textLastDatetime = $("#textLastDatetime");

    $(window).on("resize", function () {
        $textLastDatetime.datetimebox("resize", $textLastDatetime.parent("td").width() * 0.99);
    });
    $(window).resize();

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //select绑定
    selectOrgDataBind();
    selectProductDataBind();

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $selectDomain.on("change", selectDomain_change);

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

function selectProductDataBind() {
    selectDataBind({
        $select: $selectProduct,
        url: "../../SystemFunction/Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectDomainDataBind() {
    var productId = $.trim($selectProduct.val());
    if (productId == "") {
        $selectDomain.empty();
        $selectDomain.change();
        return;
    }

    selectDataBind({
        $select: $selectDomain,
        url: "../../SystemFunction/Domain/DomainService.asmx/GetDomainList",
        data: $.toJSON({ productId: productId }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectSystemDataBind() {
    var orgId = $.trim($selectOrg.val());
    var domainId = $.trim($selectDomain.val());
    if (orgId == "" || domainId == "") {
        $selectSystem.empty();
        $selectSystem.change();
        return;
    }

    selectDataBind({
        $select: $selectSystem,
        url: "../../SystemFunction/System1/SystemService.asmx/GetSystemList",
        data: $.toJSON({ orgId: orgId, domainId: domainId }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectOrg_change() {
    selectSystemDataBind();
}

function selectProduct_change() {
    selectDomainDataBind();
}

function selectDomain_change() {
    selectSystemDataBind();
}

//--------------------------------------------------------------
function initializeData() {
    $textLastDatetime.datetimebox('disable');
    if (pageParameterPageAction == pageAction.New) {
        $textTimeSlice.val('0');
    }
    else {
        $.qajax({
            url: "ConfigJobService.asmx/GetBaseJob",
            data: $.toJSON({ baseJobId: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseJobDTO) {
    $selectOrg.val(baseJobDTO.Org_Id);
    selectOrg_change();
    $selectProduct.val(baseJobDTO.Product_Id);
    selectProduct_change();
    $selectDomain.val(baseJobDTO.Domain_Id);
    selectDomain_change();
    $selectSystem.val(baseJobDTO.System_Id);
    $textName.val(baseJobDTO.Name);
    $textareaDescription.val(baseJobDTO.Description);
    $textareaAssembly.val(baseJobDTO.Assembly);
    $textareaProcess.val(baseJobDTO.Process);
    $textTimeSlice.val(baseJobDTO.Time_Slice);
    $textLastDatetime.datetimebox("setValue", datetimeformatter(serializerStringConvertDate(baseJobDTO.Last_Datetime)));

    if (!baseJobDTO.AllowEdit || pageParameterIsSystemAdmin == "false") {
        selectDisabled($selectOrg);
        selectDisabled($selectProduct);
        selectDisabled($selectDomain);
        selectDisabled($selectSystem);
        textBoxDisabled($textName);
        textBoxDisabled($textareaDescription);
        textBoxDisabled($textareaAssembly);
        textBoxDisabled($textareaProcess);
        textBoxDisabled($textTimeSlice);
        textBoxDisabled($textLastDatetime);
        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {
    if ($.trim($selectOrg.val()) == "") {
        $.messager.alert("Warning", "Org can't be empty!", "warning");
        return;
    }

    if ($.trim($selectProduct.val()) == "") {
        $.messager.alert("Warning", "Product can't be empty!", "warning");
        return;
    }

    if ($.trim($selectDomain.val()) == "") {
        $.messager.alert("Warning", "Domain can't be empty!", "warning");
        return;
    }

    if ($.trim($selectSystem.val()) == "") {
        $.messager.alert("Warning", "System can't be empty!", "warning");
        return;
    }

    if (pageParameterPageAction == pageAction.New && !checkIsSystemAdmin()) {
        $.messager.alert("Warning", "You don't have permisson to add because you're not this system admin!", "warning");
        return;
    }

    var isValid = true;
    if (!$textName.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textareaProcess.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textareaAssembly.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textLastDatetime.datetimebox("isValid")) {
        isValid = false;
    }
    if (!isValid) {
        return;
    }

    var baseJobDTO = {
        Id: pageParameterId,
        System_Id: $.trim($selectSystem.val()),
        Name: $.trim($textName.val()),
        Description: $.trim($textareaDescription.val()),
        Assembly: $.trim($textareaAssembly.val()),
        Process: $.trim($textareaProcess.val()),
        Time_Slice: $.trim($textTimeSlice.val())
    };

    if ($.trim(baseJobDTO.Id) == "") {
        baseJobDTO.Id = guidEmpty;
    }
    if ($.trim(baseJobDTO.System_Id) == "") {
        baseJobDTO.System_Id = guidEmpty;
    }
    if ($.trim(baseJobDTO.Last_Datetime) == "") {
        baseJobDTO.Last_Datetime = new Date();
    }
    $.qajax({
        url: "ConfigJobService.asmx/SaveBaseJob",
        data: $.toJSON({ baseJobDTO: baseJobDTO, pageAction: pageParameterPageAction }),
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
    datetime: {
        validator: function (value, param) {
            if (!value) {
                return false;
            }
            var ss = value.split(' ');
            var ss1 = ss[0].split('/');
            var ss2 = ss[1].split(':');
            var y1 = parseInt(ss1[0], 10);
            var M1 = parseInt(ss1[1], 10);
            var d1 = parseInt(ss1[2], 10);
            var h1 = parseInt(ss2[0], 10);
            var m1 = parseInt(ss2[1], 10);
            var s1 = parseInt(ss2[2], 10);
            if (!isNaN(y1) && !isNaN(M1) && !isNaN(d1) && !isNaN(h1) && !isNaN(m1) && !isNaN(s1)) {
                if (y1 > 9999 || y1 < 1000) {
                    return false;
                }
                if (M1 > 12 || M1 < 1) {
                    return false;
                }
                if (d1 > 31 || d1 < 1) {
                    return false;
                }
                if (h1 > 24 || h1 < 0) {
                    return false;
                }
                if (m1 > 59 || m1 < 0) {
                    return false;
                }
                if (s1 > 59 || s1 < 0) {
                    return false;
                }

                var data2 = new Date(y1, M1 - 1, d1, h1, m1, s1);
                var y2 = data2.getFullYear();
                var M2 = data2.getMonth() + 1;
                var d2 = data2.getDate();
                var h2 = data2.getHours();
                var m2 = data2.getMinutes();
                var s2 = data2.getSeconds();

                if (y1 != y2 || M1 != M2 || d1 != d2 || h1 != h2 || m1 != m2 || s1 != s2) {
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        },
        message: 'Please enter a datetime(format: yyyy/MM/dd hh:mm:ss).'
    },
    name: {
        validator: function (value, param) {
            var reg = /^[_a-zA-z][\w]*$/;
            var result = reg.test(value);
            return result;
        },
        message: 'Please enter a valid name.'
    },
    namespace: {
        validator: function (value, param) {
            var reg = /^[_a-zA-z][\w]*(\.?([_a-zA-z][\w]*))*$/;
            var result = reg.test(value);
            return result;
        },
        message: 'Please enter a valid value.'
    }
});

function checkIsSystemAdmin() {
    var isSystemAdmin;
    var systemId = $.trim($selectSystem.val());
    $.qajax({
        async: false,
        url: "../../SystemFunction/System1/SystemService.asmx/IsCurrentUserSystemAdmin",
        data: $.toJSON({ systemId: systemId }),
        success: function (result) {
            isSystemAdmin = result.d;
        }
    });
    return isSystemAdmin;
}