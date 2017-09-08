var pageParameterId = $.url('?id');

$(function () {
    //页面数据初始化
    $.qajax({
        url: "RoleService.asmx/GetRole",
        data: $.toJSON({ id: pageParameterId }),
        success: function (result) {
            if (result.d != null) {
                $("#textParentRoleName").val(result.d.ParentRoleName);
                $("#textName").val(result.d.Name);
                $("#textDescription").val(result.d.Description);
                $("#TextRoleType").val(result.d.Role_Type);
                $("#textRoleCardinality").val(result.d.Role_Cardinality);

                var isContinuous;
                for (var i = 1; i <= 10; i++) {
                    isContinuous = AddOneProperty(i, result.d["User_Property_Name_" + i], result.d["User_Property_Datatype_" + i]);
                    if (!isContinuous)
                        return;
                }
            }
        }
    });
});
//页面动态添加角色权限栏位
function AddOneProperty(num, propertyName, propertyDatatype) {
    if (propertyName != "" && propertyName != undefined && propertyDatatype != "" && propertyDatatype != undefined) {
        var trstring = "<tr>";
        trstring += '<td width="20%"><span class="Label">User Property ' + num + '</span></td>';
        trstring += '<td><input type="text" id="textUserPropertyName' + num +
        '" class="TextBoxLine" disabled="disabled" style="width:69%" value="' + propertyName + '"/>';
        trstring += '<input type="text" id="selectUserPropertyDatetype' + num +
        '" class="TextBoxLine" disabled="disabled" style="width:29%;margin-left:1%" value="' + propertyDatatype + '"/>';
        $("table").append(trstring).show();
        return true;
    } else return false;
}
