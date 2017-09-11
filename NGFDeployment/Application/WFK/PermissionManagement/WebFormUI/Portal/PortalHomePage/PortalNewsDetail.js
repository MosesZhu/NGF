var pageParameterId;

var $spanSubject;
var $spanPublisher;
var $spanPublishDate;
var $divContent;

$(function () {
    pageParameterId = $.url('?id');
    $spanSubject = $("#spanSubject");
    $spanPublisher = $("#spanPublisher");
    $spanPublishDate = $("#spanPublishDate");
    $divContent = $("#divContent");

    //页面数据初始化
    initializeData();
});

function initializeData() {
    loadNews();
}

function loadNews() {
    $.qajax({
        url: "PortalHomePageService.asmx/GetPortalNewsDetail",
        data: $.toJSON({ newsId: pageParameterId }),
        success: function (result) {
            setPage(result.d);
            insertNewStatus(result.d);
        }
    });
}

function setPage(portalNewsDTO) {
    document.title = escapeHtmlData(portalNewsDTO.Subject);
    $spanSubject.html(escapeHtmlData(portalNewsDTO.Subject));
    $spanPublisher.html("Publisher: " + portalNewsDTO.PostUser);
    var publishDate = serializerStringConvertDate(portalNewsDTO.Created_Date);
    $spanPublishDate.html("Publish Date: " + dateFormatter(publishDate));
    $divContent.html(portalNewsDTO.Content);
}

function insertNewStatus(portalNewsDTO) {
    if (portalNewsDTO.Status == "read") {
        return;
    }
    var portalNewsStatusDTO = {
        Id: pageParameterId,
        News_Id: portalNewsDTO.Id,
        Status: "read",
        Read_Date: new Date()
    };
    if ($.trim(portalNewsStatusDTO.Id) == "") {
        portalNewsStatusDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "PortalHomePageService.asmx/InsertNewsStatus",
        data: $.toJSON({ portalNewsStatusDTO: portalNewsStatusDTO })
    });
    return;

}

function dateFormatter(date) {
    var y = date.getFullYear();
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var w = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")[date.getDay()];
    //var w = date.getDay();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var week;
    return y + '/' + (M < 10 ? ('0' + M) : M) + '/' + (d < 10 ? ('0' + d) : d) + '(' + w + ') '
    + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s);
}