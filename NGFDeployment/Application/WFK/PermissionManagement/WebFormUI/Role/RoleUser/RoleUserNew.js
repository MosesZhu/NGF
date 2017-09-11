var pageParameterRoleId;
var pageParameterPageAction;

var $textRoleName;
var $textUserName;

$(function () {
    pageParameterRoleId = $.url('?roleid');
    pageParameterPageAction = $.url('?PageAction');

    $textRoleName = $("#textRoleName");
    $textUserName = $("#textUserName");

    $("#buttonSearchUser").on("click", buttonSearchUser_click);

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

    if (!$textUserName.validatebox("isValid")) {
        return false;
    }

    var strUserName = $.trim($textUserName.val());
    if (strUserName == "") {
        $.messager.alert("Warning", "Please input user name!", "warning");
        return false;
    }

    var arrUserName = strUserName.toUpperCase().split(";"); //转大写，拆分成数组
    arrUserName.sort();
    var currName;
    var nextName;
    //拼接成一段新的字符串，去除空数据
    for (var i = 0; i < arrUserName.length - 1; i++) {
        currName = $.trim(arrUserName[i]);
        nextName = $.trim(arrUserName[i + 1]);
        if (currName == "" || nextName == "") {
            continue;
        }

        if (currName == nextName) {
            $.messager.alert("Warning", "There is the same user name：" + currName, "warning");
            isValid = false;
            break;
        }
    }

    if (!isValid) {
        return false;
    }

    var baseRoleUserDTO = {
        Role_Id: pageParameterRoleId,
        User: { User_Name: $.trim($textUserName.val()) }
    };

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

function buttonSearchUser_click() {
    $.QDialog.show(
        {
            title: "Select User"
        },
        {
            url: "../../OrgUser/User/SelectUser.aspx?" + $.param({ IsSingleSelect: "N" }),
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    var userNames = [];

                    $.each(returnValue, function (index, item) {
                        userNames.push(item.User_Name);
                    });
                    var currentUserNames = $.trim($textUserName.val());
                    if (currentUserNames != "") {
                        currentUserNames = currentUserNames + ";" + userNames.join(";");
                    } else {
                        currentUserNames = userNames.join(";");
                    }
                    $textUserName.val(currentUserNames);
                }
            }
        }
    );

    return false;
}