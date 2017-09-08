var pageParameterId;

$(function () {
    pageParameterId = $.url('?id');
    initializeData();
});

function initializeData() {
    $.qajax({
        url: "FrameworkLogService.asmx/GetFrameworkLog",
        data: $.toJSON({ logId: pageParameterId }),
        success: function (result) {
            $("#textOrg").val(result.d.Org_Name);
            $("#textProduct").val(result.d.Product_Name);
            $("#textDomain").val(result.d.Domain_Name);
            $("#textSystem").val(result.d.System_Name);
            $("#textUser").val(result.d.User_Name);
            $("#textLogType").val(result.d.Log_Type);
            $("#textUrl").val(result.d.Url);
            $("#textReferer").val(result.d.Referer);
            $("#textIpAddress").val(result.d.Ip_Address);
            $("#textUserAgent").val(result.d.User_Agent);
            $("#textMessage").val(result.d.Message);
            $("#textStackTrace").val(result.d.Stack_Trace);
            $("#textLogDate").val(datetimeformatter(serializerStringConvertDate(result.d.Log_Date)));
            $("#textStatus").val(result.d.Status);
            $("#checkboxIsMailSent").prop("checked", result.d.Is_Mail_Sent == "1" ? true : false);
            $("#textIsMailSent").val(result.d.Is_Mail_Sent);
            $("#textMailSentDate").val(dateformatter(serializerStringConvertDate(result.d.Mail_Sent_Date)));
            $("#textSystemVersion").val(result.d.System_Version);
        }
    });
}