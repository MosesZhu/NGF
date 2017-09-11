var pageParameterId;
var pageParameterPageAction;

var $selectOrg;
var $textUserName;
var $textRealName;
var $textEmployeeId;
var $textEmployeeNo;
var $textPassword;
var $textEmail;
var $textMobilPhone;
var $textTelphone;
var $textCompany;
var $textDepartmentCode;
var $textTitle;
var $selectGender;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    $selectOrg = $("#selectOrg");
    $textUserName = $("#textUserName");
    $textRealName = $("#textRealName");
    $textEmployeeId = $("#textEmployeeId");
    $textEmployeeNo = $("#textEmployeeNo");
    $textPassword = $("#textPassword");
    $textEmail = $("#textEmail");
    $textMobilPhone = $("#textMobilPhone");
    $textTelphone = $("#textTelphone");
    $textCompany = $("#textCompany");
    $textDepartmentCode = $("#textDepartmentCode");
    $textTitle = $("#textTitle");
    $selectGender = $("#selectGender");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    selectOrgDataBind();
    selectGenderDataBind();

    //页面数据初始化
    if (pageParameterPageAction != pageAction.New) {
        initializeData();
    }
});

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectGenderDataBind() {
    selectDataBind({
        $select: $selectGender,
        url: "UserService.asmx/GetGenderList",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function initializeData() {
    $.qajax({
        url: "UserService.asmx/GetUser",
        data: $.toJSON({ id: pageParameterId }),
        success: function (result) {
            if (result.d != null) {
                $selectOrg.val(result.d.Org_Id);
                $textUserName.val(result.d.User_Name);
                $textRealName.val(result.d.Real_Name);
                $textEmployeeId.val(result.d.Employee_Id);
                $textEmployeeNo.val(result.d.Employee_No);
                $textPassword.val(result.d.Password);
                $textEmail.val(result.d.Email);
                $textMobilPhone.val(result.d.Mobil_Phone);
                $textTelphone.val(result.d.Telphone);
                $textCompany.val(result.d.Company);
                $textDepartmentCode.val(result.d.Department_Code);
                $textTitle.val(result.d.Title);
                $selectGender.val(result.d.Gender);
            }
        }
    });
}

function buttonSave_click() {

    if ($.trim($selectOrg.val()) == "") {
        $.messager.alert("Warning", "Org can't be empty!", "warning");
        return;
    }

    if ($.trim($selectGender.val()) == "") {
        $.messager.alert("Warning", "Gender can't be empty!", "warning");
        return;
    }

    var isValid = true;

    if (!$textUserName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textRealName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textPassword.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textEmail.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textCompany.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textDepartmentCode.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var userName = $.trim($textUserName.val()).toLowerCase();
    if (userName == "everyone") {
        $.messager.alert("Warning", "User Name can't be everyone!", "warning");
        return;
    }

    var userDTO = {
        User_Id: pageParameterId,
        Org_Id: $.trim($selectOrg.val()),
        User_Name: $.trim($textUserName.val()),
        Real_Name: $.trim($textRealName.val()),
        Employee_Id: $.trim($textEmployeeId.val()),
        Employee_No: $.trim($textEmployeeNo.val()),
        Password: $.trim($textPassword.val()),
        Email: $.trim($textEmail.val()),
        Mobil_Phone: $.trim($textMobilPhone.val()),
        Telphone: $.trim($textTelphone.val()),
        Company: $.trim($textCompany.val()),
        Department_Code: $.trim($textDepartmentCode.val()),
        Title: $.trim($textTitle.val()),
        Gender: $.trim($selectGender.val())
    };

    if ($.trim(userDTO.User_Id) == "") {
        userDTO.User_Id = guidEmpty;
    }

    $.qajax({
        url: "UserService.asmx/SaveBaseUser",
        data: $.toJSON({ userDTO: userDTO, pageAction: pageParameterPageAction }),
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