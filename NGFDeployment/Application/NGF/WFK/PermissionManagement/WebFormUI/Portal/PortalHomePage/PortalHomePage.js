var $divLinks;
var isFavoriteCollapse = false;
var isNewsCollapse = false;

$(function () {
    $divLinks = $("#divLinks");
    panel_autoresize($("#divMainContent"), $("#divFavorite"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));
    $(window).on("resize", function () {
        var panelData = $("#divFavorite").data("panel");
        var datagridData = $("#datagrid1").data("datagrid");
        if (panelData) {
            $("#divFavorite").panel("resize", { height: $(window).height() / 2 - 50 });
        }
        if (datagridData) {
            $("#datagrid1").datagrid("resize", { height: $(window).height() / 2 });
        }
    });
    $(window).resize();

    //页面数据初始化
    initializeData();
});

function initializeData() {
    loadFavorite();
    loadNews();
    setLanguage();
}

function loadFavorite() {
    $.qajax({
        url: "PortalHomePageService.asmx/GetPortalFavoritList",
        data: $.toJSON({}),
        success: function (result) {
            setFavorite(result.d);
        }
    });
}

function setFavorite(listPortalFavoritDTO) {
    $divLinks.children().remove();
    $(listPortalFavoritDTO).each(function (i, data) {
        var item = $('<div class="droppable"><div class="draggable"><a style="float:left;width:90px;"></a><img src="Recycle.png" class="imgBtn"/></div></div>');
        var url;
        var reg = new RegExp("http://");
        if (reg.test(data.Navigate_Url)) {
            url = data.Navigate_Url;
        }
        else {
            url = data.Base_Url + data.Navigate_Url;
        }
        item.attr("id", "droppable" + i);
        item.attr("index", i);
        item.attr("sortcode", data.Sort_Code);
        item.children().attr("id", data.Id);
        item.children().on("mouseover", function () { $(this).addClass("linkover"); });
        item.children().on("mouseout", function () { $(this).removeClass("linkover"); });
        $("a", item).attr("href", "#");
        $("a", item).html(data.System + "->" + data.Function);
        $("a", item).on("mousedown", function (e) {
            if (e.which == 1) {
                $(".draggable").draggable("disable");
            }
        });
        $("a", item).on("mouseup", function (e) {
            if (e.which == 1) {
                $(".draggable").draggable("enable");
                parent.addNewTab(data.Function_Id);
            }

        });
        $("img", item).on("mousedown", function () {
            var favoriteId = $(this).parent().attr("id");
            $.messager.confirm("Confirm", "Are you sure to delete?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "PortalHomePageService.asmx/DeleteFavoirte",
                    data: $.toJSON({ favoriteId: favoriteId }),
                    success: function (result) {
                        if (result.d == "") {
                            $.messager.alert("Information", "Delete success!", "info",
                            function () {
                                loadFavorite();
                            });
                        }
                        else {
                            $.messager.alert("Delete failed", result.d, "error");
                        }
                    }
                });
            }
        });
        });
        $divLinks.append(item);
    });
    $(window).resize();

    $(".draggable").draggable({
        revert: true,
        onStartDrag: function (e) {
            //
        },
        onDrag: function (e) {
            //
        },
        onStopDrag: function (e) {
            var listPortalFavoritDTO = new Array();

            $(".draggable").each(function (i, data) {
                var portalFavoritDTO = {
                    Id: $(data).attr("id"),
                    Sort_Code: $(data).parent().attr("sortcode")
                }
                listPortalFavoritDTO[i] = portalFavoritDTO;
            });

            $.qajax({
                url: "PortalHomePageService.asmx/UpdateFavorite",
                data: $.toJSON({ listPortalFavoritDTO: listPortalFavoritDTO })
            });
        }
    });

    $(".droppable").droppable({
        onDragEnter: function (e, source) {
            $(this).css("border-color", "#0000FF");
            var sourceIndex = parseInt($(source).parent().attr("index"));
            var targetIndex = parseInt($(this).attr("index"));
            //前面往后面拖
            if (sourceIndex < targetIndex) {
                for (var i = sourceIndex; i < targetIndex; i++) {
                    var j = i + 1;
                    var child = $("[index='" + j + "']").children();
                    $("[index='" + i + "']").append(child);
                }
            }
            //后面往前面拖
            else {
                for (var i = sourceIndex; i > targetIndex; i--) {
                    var j = i - 1;
                    var child = $("[index='" + j + "']").children();
                    $("[index='" + i + "']").append(child);
                }
            }
            $(this).append(source);
        },
        onDragLeave: function (e, source) {
            $(this).css("border-color", "#95B8E7");
        },
        onDrop: function (e, source) {
            $(this).css("border-color", "#95B8E7");
            $(this).append(source);
        }
    });
}

function setLanguage() {
    if (language == "ZH_CN") {
        $("#divFavorite").panel("setTitle", "我的收藏夹");
        $("#datagrid1").datagrid("getPanel").panel("setTitle", "新闻");
        return;
    }
    if (language == "ZH_TW") {
        $("#divFavorite").panel("setTitle", "我的收藏夾");
        $("#datagrid1").datagrid("getPanel").panel("setTitle", "新聞");
        return;
    }
    if (language == "EN") {
        $("#divFavorite").panel("setTitle", "My Favorites");
        $("#datagrid1").datagrid("getPanel").panel("setTitle", "News");
        return;
    }
}

function getQueryUrl() {
    var queryurl = "GetPortalHomePageNewsList.ashx";
    return queryurl;
}

function loadNews() {
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }
    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'PostUser', title: 'Publisher', width: 100, halign: 'center',
                        formatter: function (value, row, index) {
                            var style = "";
                            //未读News加粗显示
                            if (row.Status == null) {
                                style += "font-weight:bold;";
                            }
                            var span = '<span style="' + style + '" >' + value + '</span>';
                            return span;
                        }
                    },
                    { field: 'Subject', title: 'Subject', width: 400, halign: 'center',
                        formatter: function (value, row, index) {
                            var style = "";
                            //未读News加粗显示
                            if (row.Status == null) {
                                style += "font-weight:bold;";
                            }

                            var link = '<a href="#" onclick="openNewsDetail(' + '\'' + row.Id + '\'' + ')" style="' + style + '">' + value + '</a>';
                            return link;
                        }
                    },
                    { field: 'Created_Date', title: 'Publish Date', width: 250, halign: 'center',
                        formatter: function (value, row, index) {
                            var style = "";
                            //未读News加粗显示
                            if (row.Status == null) {
                                style += "font-weight:bold;";
                            }
                            var span = '<span style="' + style + '" >' + dateFormatter(value) + '</span>';
                            return span;
                        }
                    }
                ]],
        title: "News",
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: true, //是否可折叠的 
        url: queryurl1, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'Id', //标识字段。
        singleSelect: true, //是否单选 
        rownumbers: true, //行号 
        pagination: true, //分页控件 
        pagePosition: "top", //定义的分页栏的位置
        pageNumber: 1, //当设置了 pagination 特性时，初始化页码。
        pageSize: getDatagridPageSize($('#datagrid1')),   //当设置了 pagination 特性时，初始化页码尺寸。
        pageList: [10, 15, 20, 50, 100], //当设置了 pagination 特性时，初始化页面尺寸的选择列表。
        loadFilter: datagrid1LoadFilter,
        onBeforeLoad: function (param) {
            var queryurl2 = getQueryUrl();
            if ($.trim(queryurl2) == "") {
                return false;
            }
            $('#datagrid1').datagrid('options').url = queryurl2;
            return true;
        },
        onLoadSuccess: function (data) {
            $('#datagrid1').datagrid("unselectAll");
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        onCollapse: function () {
            $("#divFavorite").panel("resize", { height: $(window).height() - 80 });
            isNewsCollapse = true;
        },
        onExpand: function () {
            if (isFavoriteCollapse) {
                $("#datagrid1").datagrid("resize", { height: $(window).height() - 80 });
            }
            else {
                $("#divFavorite").panel("resize", { height: $(window).height() / 2 - 50 });
                $("#datagrid1").datagrid("resize", { height: $(window).height() / 2 });
            }
            isNewsCollapse = false;
        }
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    $(window).resize();

    return;
}

function datagrid1LoadFilter(data) {
    $.each(data.rows, function (i, t) {
        t.Created_Date = serializerStringConvertDate(t.Created_Date);
        t.Modified_Date = serializerStringConvertDate(t.Modified_Date);
    });

    var data1 = escapeHtmlData(data);
    return data1;
}

function openNewsDetail(id) {
    var url = "PortalNewsDetail.aspx?" + $.param({ id: id });
    window.open(url, "PortalNewsDetail", '', "_blank");
}

function dateFormatter(date) {
    var y = date.getFullYear();
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var w = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")[date.getDay()];
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var week;
    return y + '/' + (M < 10 ? ('0' + M) : M) + '/' + (d < 10 ? ('0' + d) : d) + '(' + w + ') '
    + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s);
}

$("#divFavorite").panel({
    onCollapse: function () {
        $("#datagrid1").datagrid("resize", { height: $(window).height() - 80 })
        isFavoriteCollapse = true;
    },
    onExpand: function () {
        if (isNewsCollapse) {
            $("#divFavorite").panel("resize", { height: $(window).height() - 80 });
        }
        else {
            $("#divFavorite").panel("resize", { height: $(window).height() / 2 - 50 });
            $("#datagrid1").datagrid("resize", { height: $(window).height() / 2 });
        }
        isFavoriteCollapse = false;
    }
});