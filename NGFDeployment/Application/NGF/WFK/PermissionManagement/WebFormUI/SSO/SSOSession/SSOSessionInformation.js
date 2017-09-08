var pageParameterId;

$(function () {
    pageParameterId = $.url('?id');
    initializeData();
});

function initializeData() {
    $.qajax({
        url: "SSOSessionService.asmx/GetSSOSession",
        data: $.toJSON({ ssoSessionId: pageParameterId }),
        success: function (result) {
            $("#textOrg").val(result.d.Org);
            $("#textProduct").val(result.d.Product);
            $("#textDomain").val(result.d.Domain);
            $("#textUser").val(result.d.User_Name);
            $("#textClientIp").val(result.d.Client_Ip);
            $("#textData").val(result.d.Data);
            $("#textSessionType").val(result.d.Session_Type);
            $("#textLanguage").val(result.d.Language);
            $("#textStatus").val(result.d.Status);
            $("#textLogonTime").val(datetimeformatter(serializerStringConvertDate(result.d.Logon_Time)));
            $("#textLastAccessTime").val(datetimeformatter(serializerStringConvertDate(result.d.Last_Access_Time)));
        }
    });
}