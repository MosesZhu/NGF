var pageParameterId = $.url('?id');

$(function () {
    $.qajax({
        url: "UserService.asmx/GetUser",
        data: $.toJSON({ id: pageParameterId }),
        success: function (result) {
            $("#textOrg").val(result.d.Org);
            $("#textUserName").val(result.d.User_Name);
            $("#textRealName").val(result.d.Real_Name);
            $("#textEmployeeId").val(result.d.Employee_Id);
            $("#textEmployeeNo").val(result.d.Employee_No);
            $("#CheckBoxIsStaff").prop("checked", result.d.IsStaff);
            $("#textEmail").val(result.d.Email);
            $("#textMobilPhone").val(result.d.Mobil_Phone);
            $("#textTelphone").val(result.d.Telphone);
            $("#textCompany").val(result.d.Company);
            $("#textDepartmentCode").val(result.d.Department_Code);
            $("#textTitle").val(result.d.Title);
            $("#textGender").val(result.d.Gender);
            $("#textComputerName").val(result.d.Computer_Name);
        }
    });
});