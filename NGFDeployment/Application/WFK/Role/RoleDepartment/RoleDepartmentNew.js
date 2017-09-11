var pageParameterRoleId = $.url('?roleid');
var pageParameterPageAction = $.url('?PageAction');

var $textRoleName;
var $textDepartmentCode;


$(function () {
    $textRoleName = $("#textRoleName");
    $textDepartmentCode = $("#textDepartmentCode");

    $("#buttonSearchDepartment").on("click", buttonSearchDepartment_click);

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    initializeData();
});

function initializeData() {
    //页面数据初始化
    $.qajax({
        url: "../Role/RoleService.asmx/GetRole",
        data: $.toJSON({ id: pageParameterRoleId }),
        success: function (result) {
            if (result.d != null) {
                $textRoleName.val(result.d.Name);
            }
            else {
                $.messager.alert("Error", "Role does not exist!", "error");
            }
        }
    });
}

function buttonSave_click() {
    var isValid = true;

    if (!$textDepartmentCode.validatebox("isValid")) {
        return false;
    }

    var strDepartmentCode = $.trim($textDepartmentCode.val());
    if (strDepartmentCode == "") {
        $.messager.alert("Warning", "Please input department code!", "warning");
        return false;
    }

    var arrDepartmentCode = strDepartmentCode.toUpperCase().split(";"); //转大写，拆分成数组
    arrDepartmentCode.sort();
    var currCode;
    var nextCode;
    //拼接成一段新的字符串，去除空数据
    for (var i = 0; i < arrDepartmentCode.length - 1; i++) {
        currCode = $.trim(arrDepartmentCode[i]);
        nextCode = $.trim(arrDepartmentCode[i + 1]);
        if (currCode == "" || nextCode == "") {
            continue;
        }

        if (currCode == nextCode) {
            $.messager.alert("Warning", "There is the same department code：" + currCode, "warning");
            isValid = false;
            break;
        }
    }

    if (!isValid) {
        return false;
    }

    var baseRoleDepartmentDTO = {
        Role_Id: pageParameterRoleId,
        Department_Code: $.trim($textDepartmentCode.val())
    };

    $.qajax({
        url: "RoleDepartmentService.asmx/SaveBaseRoleDepartment",
        data: $.toJSON({ roleDepartmentDTO: baseRoleDepartmentDTO }),
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

function buttonSearchDepartment_click() {
    $.QDialog.show(
        {
            title: "Select Department"
        },
        {
            url: "../../OrgUser/Department/SelectDepartment.aspx?" + $.param({ IsSingleSelect: "N" }),
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    var departmentCodes = [];

                    $.each(returnValue, function (index, item) {
                        departmentCodes.push(item.Department_Code);
                    });

                    var currentDepartmentCodes = $.trim($textDepartmentCode.val());
                    if (currentDepartmentCodes != "") {
                        currentDepartmentCodes = currentDepartmentCodes + ";" + departmentCodes.join(";");
                    } else {
                        currentDepartmentCodes = departmentCodes.join(";");
                    }
                    $textDepartmentCode.val(currentDepartmentCodes);
                }
            }
        }
    );

    return false;
}