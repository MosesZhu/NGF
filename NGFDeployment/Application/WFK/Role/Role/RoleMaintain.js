/// <reference name="ITS.WebFramework.CommonResource.Scripts.References.js" assembly="ITS.WebFramework.CommonResource" />

var pageParameterId;
var pageParameterRoleType;
var pageParameterPageAction;

var $hiddenParentRoleId;
var $textParentRoleName;
var $textName;
var $textDescription;
var $textRoleType;
var $textRoleCardinality;

var $textUserPropertyName1;
var $textUserPropertyName2;
var $textUserPropertyName3;
var $textUserPropertyName4;
var $textUserPropertyName5;
var $textUserPropertyName6;
var $textUserPropertyName7;
var $textUserPropertyName8;
var $textUserPropertyName9;
var $textUserPropertyName10;
var $selectUserPropertyDatatype1;
var $selectUserPropertyDatatype2;
var $selectUserPropertyDatatype3;
var $selectUserPropertyDatatype4;
var $selectUserPropertyDatatype5;
var $selectUserPropertyDatatype6;
var $selectUserPropertyDatatype7;
var $selectUserPropertyDatatype8;
var $selectUserPropertyDatatype9;
var $selectUserPropertyDatatype10;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterRoleType = $.url('?roleType');
    pageParameterPageAction = $.url('?PageAction');

    $hiddenParentRoleId = $("#HiddenParentRoleId");
    $textParentRoleName = $("#textParentRoleName");
    $textName = $("#textName");
    $textDescription = $("#textDescription");
    $textRoleType = $("#textRoleType");
    $textRoleCardinality = $("#textRoleCardinality");

    $textUserPropertyName1 = $("#textUserPropertyName1");
    $textUserPropertyName2 = $("#textUserPropertyName2");
    $textUserPropertyName3 = $("#textUserPropertyName3");
    $textUserPropertyName4 = $("#textUserPropertyName4");
    $textUserPropertyName5 = $("#textUserPropertyName5");
    $textUserPropertyName6 = $("#textUserPropertyName6");
    $textUserPropertyName7 = $("#textUserPropertyName7");
    $textUserPropertyName8 = $("#textUserPropertyName8");
    $textUserPropertyName9 = $("#textUserPropertyName9");
    $textUserPropertyName10 = $("#textUserPropertyName10");
    $selectUserPropertyDatatype1 = $("#selectUserPropertyDatatype1");
    $selectUserPropertyDatatype2 = $("#selectUserPropertyDatatype2");
    $selectUserPropertyDatatype3 = $("#selectUserPropertyDatatype3");
    $selectUserPropertyDatatype4 = $("#selectUserPropertyDatatype4");
    $selectUserPropertyDatatype5 = $("#selectUserPropertyDatatype5");
    $selectUserPropertyDatatype6 = $("#selectUserPropertyDatatype6");
    $selectUserPropertyDatatype7 = $("#selectUserPropertyDatatype7");
    $selectUserPropertyDatatype8 = $("#selectUserPropertyDatatype8");
    $selectUserPropertyDatatype9 = $("#selectUserPropertyDatatype9");
    $selectUserPropertyDatatype10 = $("#selectUserPropertyDatatype10");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //select数据绑定
    selectPropertyDatatypeBind();

    //页面数据初始化
    $textRoleType.val(pageParameterRoleType);
    if ($.trim(pageParameterId) != "") {
        $.qajax({
            url: "RoleService.asmx/GetRole",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                if (result.d != null) {
                    if (pageParameterPageAction == pageAction.New) {
                        var parentRoleDTO = result.d;
                        $hiddenParentRoleId.val(parentRoleDTO.Id);
                        $textParentRoleName.val(parentRoleDTO.Name);
                        $textRoleType.val(parentRoleDTO.Role_Type);
                    } else {
                        var roleDTO = result.d;
                        $hiddenParentRoleId.val(roleDTO.Parent_Role_Id);
                        $textParentRoleName.val(roleDTO.ParentRoleName);
                        $textName.val(roleDTO.Name);
                        $textDescription.val(roleDTO.Description);
                        $textRoleType.val(roleDTO.Role_Type);
                        $textRoleCardinality.val(roleDTO.Role_Cardinality);
                        $textUserPropertyName1.val(roleDTO.User_Property_Name_1);
                        $textUserPropertyName2.val(roleDTO.User_Property_Name_2);
                        $textUserPropertyName3.val(roleDTO.User_Property_Name_3);
                        $textUserPropertyName4.val(roleDTO.User_Property_Name_4);
                        $textUserPropertyName5.val(roleDTO.User_Property_Name_5);
                        $textUserPropertyName6.val(roleDTO.User_Property_Name_6);
                        $textUserPropertyName7.val(roleDTO.User_Property_Name_7);
                        $textUserPropertyName8.val(roleDTO.User_Property_Name_8);
                        $textUserPropertyName9.val(roleDTO.User_Property_Name_9);
                        $textUserPropertyName10.val(roleDTO.User_Property_Name_10);
                        $selectUserPropertyDatatype1.val(roleDTO.User_Property_Datatype_1);
                        $selectUserPropertyDatatype2.val(roleDTO.User_Property_Datatype_2);
                        $selectUserPropertyDatatype3.val(roleDTO.User_Property_Datatype_3);
                        $selectUserPropertyDatatype4.val(roleDTO.User_Property_Datatype_4);
                        $selectUserPropertyDatatype5.val(roleDTO.User_Property_Datatype_5);
                        $selectUserPropertyDatatype6.val(roleDTO.User_Property_Datatype_6);
                        $selectUserPropertyDatatype7.val(roleDTO.User_Property_Datatype_7);
                        $selectUserPropertyDatatype8.val(roleDTO.User_Property_Datatype_8);
                        $selectUserPropertyDatatype9.val(roleDTO.User_Property_Datatype_9);
                        $selectUserPropertyDatatype10.val(roleDTO.User_Property_Datatype_10);
                    }
                }
            }
        });
    }
});

function buttonSave_click() {
    if (!CheckCardinality()) {
        return;
    }

    var isValid = true;

    if (!$textName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textDescription.validatebox("isValid")) {
        isValid = false;
    }

    prePro = 0; //初始化栏位号
    spacePro = 0;

    var isContinuous; //循环读取权限栏位值检查是否依次填写
    for (var i = 1; i <= 10; i++) {
        isContinuous = CheckPropertyContinuous(i, $("#textUserPropertyName" + i), $("#selectUserPropertyDatatype" + i));
        //只有上一个权限被填写了，下一个权限才能生效；
        if (!isContinuous) {
            return;
        }
    }

    if (prePro != 0 && spacePro != prePro + 1 && spacePro != 0) {
        return;
    }

    if (!isValid) {
        return;
    }

    var roleDto = {
        Parent_Role_Id: $.trim($hiddenParentRoleId.val()),
        ParentRoleName: $.trim($textParentRoleName.val()),
        Name: $.trim($textName.val()),
        Description: $.trim($textDescription.val()),
        Role_Type: $.trim($textRoleType.val()),
        Role_Cardinality: $.trim($textRoleCardinality.val()),
        User_Property_Name_1: $.trim($textUserPropertyName1.val()),
        User_Property_Datatype_1: $.trim($selectUserPropertyDatatype1.val()),
        User_Property_Name_2: $.trim($textUserPropertyName2.val()),
        User_Property_Datatype_2: $.trim($selectUserPropertyDatatype2.val()),
        User_Property_Name_3: $.trim($textUserPropertyName3.val()),
        User_Property_Datatype_3: $.trim($selectUserPropertyDatatype3.val()),
        User_Property_Name_4: $.trim($textUserPropertyName4.val()),
        User_Property_Datatype_4: $.trim($selectUserPropertyDatatype4.val()),
        User_Property_Name_5: $.trim($textUserPropertyName5.val()),
        User_Property_Datatype_5: $.trim($selectUserPropertyDatatype5.val()),
        User_Property_Name_6: $.trim($textUserPropertyName6.val()),
        User_Property_Datatype_6: $.trim($selectUserPropertyDatatype6.val()),
        User_Property_Name_7: $.trim($textUserPropertyName7.val()),
        User_Property_Datatype_7: $.trim($selectUserPropertyDatatype7.val()),
        User_Property_Name_8: $.trim($textUserPropertyName8.val()),
        User_Property_Datatype_8: $.trim($selectUserPropertyDatatype8.val()),
        User_Property_Name_9: $.trim($textUserPropertyName9.val()),
        User_Property_Datatype_9: $.trim($selectUserPropertyDatatype9.val()),
        User_Property_Name_10: $.trim($textUserPropertyName10.val()),
        User_Property_Datatype_10: $.trim($selectUserPropertyDatatype10.val())
    };

    if (pageParameterPageAction == pageAction.New) {
        roleDto.Id = guidEmpty;
    }
    else {
        roleDto.Id = pageParameterId;
    }

    $.qajax({
        url: "RoleService.asmx/SaveBaseRole",
        data: $.toJSON({ roleDTO: roleDto, pageAction: pageParameterPageAction }),
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

function CheckCardinality() {
    //为空则返回
    var str = $.trim($textRoleCardinality.val());
    if (str == "") {
        $.messager.alert("Warning", "Please input role cardinality!", "warning");
        return false;
    }

    //    //判断输入的一个数是不是正整数
    //    var re = /^[0-9]*[1-9][0-9]*$/;
    //    if (re.test(str)) {
    //        return true;
    //    }
    //    else {
    //        $.messager.alert("Warning", "Cardinality must input integer!", "warning");
    //        $textRoleCardinality.val("");
    //        $textRoleCardinality.focus();
    //        return false;
    //    }
    return true;
}


var prePro; //最新一个不为空的栏位号
var spacePro; //首个为空的栏位号
//检查该栏位用户权限填写是否合法
function CheckPropertyContinuous(num, propertyName, propertyDatatype) {
    var isContinuous = true;
    //判断是否连续
    if ($.trim(propertyName.val()) != "" && $.trim(propertyDatatype.val()) != "") {
        prePro = num;
    } else if ($.trim(propertyName.val()) != "" || $.trim(propertyDatatype.val()) != "") {
        prePro = -1;        //权限名和权限值的类型必须一起填写
    } else if ($.trim(propertyName.val()) == "" || $.trim(propertyDatatype.val()) == "") {
        if (spacePro == 0) {
            spacePro = num;
        }
    }

    //优先满足“必须按顺序填写”
    if ((spacePro < prePro && spacePro != 0) || (prePro == -1 && spacePro != 0)) {
        $.messager.alert("Warning", "You should fill in [User Property] orderly!", "warning");
        isContinuous = false;
    }

    if (!isContinuous) {//不合法直接return
        return isContinuous;
    }
    //再判断是否权限类型一起维护
    if (prePro == -1) {
        $.messager.alert("Warning", "You should fill in [User Property Name] and [User Property Datatype] together!", "warning");
        isContinuous = false;
    }
    return isContinuous;
}

function selectPropertyBaseBind($selectObj) {
    selectDataBind({
        $select: $selectObj,
        url: "RoleService.asmx/GetUserPropertyDatatypeList",
        itemType: "string"
    });
}
function selectPropertyDatatypeBind() {
    selectPropertyBaseBind($selectUserPropertyDatatype1);
    selectPropertyBaseBind($selectUserPropertyDatatype2);
    selectPropertyBaseBind($selectUserPropertyDatatype3);
    selectPropertyBaseBind($selectUserPropertyDatatype4);
    selectPropertyBaseBind($selectUserPropertyDatatype5);
    selectPropertyBaseBind($selectUserPropertyDatatype6);
    selectPropertyBaseBind($selectUserPropertyDatatype7);
    selectPropertyBaseBind($selectUserPropertyDatatype8);
    selectPropertyBaseBind($selectUserPropertyDatatype9);
    selectPropertyBaseBind($selectUserPropertyDatatype10);
}