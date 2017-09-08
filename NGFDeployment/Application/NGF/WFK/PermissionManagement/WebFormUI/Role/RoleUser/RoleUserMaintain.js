/// <reference name="ITS.WebFramework.CommonResource.Scripts.References.js" assembly="ITS.WebFramework.CommonResource" />

var pageParameterRoleId;
var pageParameterId;
var pageParameterPageAction;
var pageParameterIsOrgAdmin;
var roleUser_Id;

var $textUserName;
var $textRealName;
var $textEmployeeNo;
var $textUserPropertyValue1;
var $textUserPropertyValue2;
var $textUserPropertyValue3;
var $textUserPropertyValue4;
var $textUserPropertyValue5;
var $textUserPropertyValue6;
var $textUserPropertyValue7;
var $textUserPropertyValue8;
var $textUserPropertyValue9;
var $textUserPropertyValue10;

$(function () {
    pageParameterRoleId = $.url('?RoleId');
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $textUserName = $("#textUserName");
    $textRealName = $("#textRealName");
    $textEmployeeNo = $("#textEmployeeNo");

    $textUserPropertyValue1 = $("#textUserPropertyValue1");
    $textUserPropertyValue2 = $("#textUserPropertyValue2");
    $textUserPropertyValue3 = $("#textUserPropertyValue3");
    $textUserPropertyValue4 = $("#textUserPropertyValue4");
    $textUserPropertyValue5 = $("#textUserPropertyValue5");
    $textUserPropertyValue6 = $("#textUserPropertyValue6");
    $textUserPropertyValue7 = $("#textUserPropertyValue7");
    $textUserPropertyValue8 = $("#textUserPropertyValue8");
    $textUserPropertyValue9 = $("#textUserPropertyValue9");
    $textUserPropertyValue10 = $("#textUserPropertyValue10");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //页面数据初始化
    initializeData();
});

function initializeData() {
    if (pageParameterPageAction == pageAction.Edit) {
        $.qajax({
            url: "RoleUserService.asmx/GetBaseRoleUser",
            data: $.toJSON({ roleId: pageParameterRoleId, userId: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
                roleUser_Id = result.d.Id;
            }
        });
    }
}

//页面动态添加角色权限栏位
function AddOneProperty(num, propertyName, propertyDatatype, propertyValue, notAllowEdit) {

    if (propertyName != "" && propertyName != undefined) {
        propertyValue = propertyValue == null ? "" : propertyValue;
        $("#labelUserPropertyName" + num).text(propertyName);

        switch (propertyDatatype) {
            case "Boolean": createCheckbox("#textUserPropertyValue" + num, propertyValue, notAllowEdit);
                $("#tr" + num).show();
                break;
            case "Date": createDatebox("#textUserPropertyValue" + num, propertyValue, notAllowEdit);
                $("#tr" + num).show();
                break;
            case "Datetime": createDatetimebox("#textUserPropertyValue" + num, propertyValue, notAllowEdit);
                $("#tr" + num).show();
                break;
            case "Integer": createNumberbox("#textUserPropertyValue" + num, propertyValue, 0, notAllowEdit);
                $("#tr" + num).show();
                break;
            case "Decimal": createNumberbox("#textUserPropertyValue" + num, propertyValue, 10, notAllowEdit);
                $("#tr" + num).show();
                break;
            default: createTextbox("#textUserPropertyValue" + num, propertyValue, notAllowEdit);
                $("#tr" + num).show();
                break;
        }

        return true;
    }
}
//创建　easyUI 数字验证框
function createNumberbox(id, value, precision, notAllowEdit) {
    $(id).numberbox({
        precision: precision,
        value: value
    });
    $(id).addClass("TextBox");
    if (notAllowEdit) {
        textBoxDisabled($(id));
    }
}
//创建 easyUI 文本框
function createTextbox(id, value, notAllowEdit) {
    $(id).addClass("TextBox");
    $(id).val(value);
    if (notAllowEdit) {
        textBoxDisabled($(id));
    }
}
//创建 checkbox
function createCheckbox(id, value, notAllowEdit) {
    $(id).attr("type", "checkbox");
    if (value == "true") {
        $(id).prop("checked", true);
    }
    $(id).prop("disabled", notAllowEdit);
}
//创建 easyUI 日期输入框
function createDatebox(id, value, notAllowEdit) {
    $(id).datebox({
        value: value,
        disabled: notAllowEdit,
        width: 590,
        formatter: dateformatter,
        parser: dateparser,
        validType: 'date'
    });
}
//创建 easyUI 日期(带时间)输入框
function createDatetimebox(id, value, notAllowEdit) {
    $(id).datetimebox({
        value: value,
        disabled: notAllowEdit,
        width: 590,
        showSeconds: true,
        formatter: datetimeformatter,
        parser: datetimeparser,
        validType: 'datetime'
    });
}
function setPageData(baseRoleUserDTO) {
    $textUserName.val(baseRoleUserDTO.User.User_Name);
    $textRealName.val(baseRoleUserDTO.User.Real_Name);
    $textEmployeeNo.val(baseRoleUserDTO.User.Employee_No);

    var isContinuous;
    var notAllowEdit = !(baseRoleUserDTO.AllowEdit) || pageParameterIsOrgAdmin == "false";
    for (var i = 1; i <= 10; i++) {
        isContinuous = AddOneProperty(i, baseRoleUserDTO.Role["User_Property_Name_" + i], baseRoleUserDTO.Role["User_Property_Datatype_" + i], baseRoleUserDTO["User_Property_Value_" + i], notAllowEdit);
        if (!isContinuous) {
            break;
        }
    }

    if (notAllowEdit) {
        buttonDisabled($("#buttonSave"));
    }
}

//过滤各种输入框的取值
function valueFilter(num, $textUserPropertyValue) {
    var value;
    if (!$("#tr" + num).is(":visible"))//未显示的直接为空 
    {
        return "";
    }
    else if ($textUserPropertyValue.attr("type") == "checkbox") {
        value = $textUserPropertyValue.prop("checked").toString();
    } else if ($textUserPropertyValue.attr("class").indexOf("datebox-f") >= 0) {
        value = $textUserPropertyValue.datetimebox('getValue');
    } else if ($textUserPropertyValue.attr("class").indexOf("datetimebox-f") >= 0) {
        value = $textUserPropertyValue.datebox('getValue');
    } else
        value = $textUserPropertyValue.val();
    return value;
}

function buttonSave_click() {

    var baseRoleUserDTO = {
        Id: roleUser_Id,
        Role_Id: pageParameterRoleId,
        User: { User_Id: pageParameterId, User_Name: $.trim($textUserName.val()) },
        User_Property_Value_1: valueFilter(1, $textUserPropertyValue1),
        User_Property_Value_2: valueFilter(2, $textUserPropertyValue2),
        User_Property_Value_3: valueFilter(3, $textUserPropertyValue3),
        User_Property_Value_4: valueFilter(4, $textUserPropertyValue4),
        User_Property_Value_5: valueFilter(5, $textUserPropertyValue5),
        User_Property_Value_6: valueFilter(6, $textUserPropertyValue6),
        User_Property_Value_7: valueFilter(7, $textUserPropertyValue7),
        User_Property_Value_8: valueFilter(8, $textUserPropertyValue8),
        User_Property_Value_9: valueFilter(9, $textUserPropertyValue9),
        User_Property_Value_10: valueFilter(10, $textUserPropertyValue10)
    };

    if ($.trim(baseRoleUserDTO.User.User_Id) == "") {
        baseRoleUserDTO.User.User_Id = guidEmpty;
    }

    $.qajax({
        url: "RoleUserService.asmx/SaveBaseRoleUser",
        data: $.toJSON({ roleUserDTO: baseRoleUserDTO, pageAction: pageParameterPageAction }),
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
    return true;
}

function buttonCancel_click() {
    parent.$.QDialog.hide(false);
}
