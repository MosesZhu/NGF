var pageParameterId = $.url('?id');

$(function () {
    $.qajax({
        url: "DepartmentService.asmx/GetDepartment",
        data: $.toJSON({ id: pageParameterId }),
        success: function (result) {
            $("#textOrg").val(result.d.Org);
            $("#textParentDeptartmentCode").val(result.d.Parent_Deptartment_Code);
            $("#textDepartmentCode").val(result.d.Department_Code);
            $("#textDepartmentName").val(result.d.Department_Name);
            $("#textRealName").val(result.d.Real_Name);
            $("#textDescription").val(result.d.Description);
            $("#textLevel").val(result.d.Level);
            $("#textManagerName").val(result.d.ManagerName);
            $("#CheckBoxIsVirtualDepartment").prop("checked", result.d.IsVirtualDepartment);
        }
    });
});