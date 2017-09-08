var pageParameterProduct;
var pageParameterSystem;
var pageParameterClassName;

$(function () {
    pageParameterProduct = $.url('?product');
    pageParameterSystem = $.url('?system');
    pageParameterClassName = $.url('?className');

    $(window).resize(function () {
        var datagriddata = $("#datagrid1").data("datagrid");
        if (datagriddata) {
            $('#datagrid1').datagrid('resize', { height: $(window).height() - $('#tableHead').height() - $('#divButton').height() - 60 });
        }
    });
    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    initializeData();
});

function initializeData() {
    $("#textProduct").val($.trim(pageParameterProduct));
    $("#textSystem").val($.trim(pageParameterSystem));
    $("#textClassName").val($.trim(pageParameterClassName));

    inquiryData();
}
//datagrid1 begin------------------------------------------------------------------------

function getQueryUrl() {
    var vArguments = {
        ProductName: $.trim(pageParameterProduct),
        SystemName: $.trim(pageParameterSystem),
        ClassName: encodeURI($.trim(pageParameterClassName))
    };

    var queryurl = "GetControlLanguageList.ashx?" + $.param(vArguments);
    return queryurl;
}

function inquiryData() {
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'Default_Value', title: 'Default Value', width: 180, halign: 'center' },
                    { field: 'En_Us', title: 'English', width: 200, halign: 'center', editor: 'text' },
                    { field: 'Zh_Cn', title: 'Chinese Simplified', width: 200, halign: 'center', editor: 'text' },
                    { field: 'Zh_Tw', title: 'Chinese Traditional', width: 200, halign: 'center', editor: 'text' }
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl1, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'Id', //标识字段。
        singleSelect: true, //是否单选 
        rownumbers: true, //行号 
        pagination: false, //分页控件 
        //pagePosition: "top", //定义的分页栏的位置
        //pageNumber: 1, //当设置了 pagination 特性时，初始化页码。
        //pageSize: getDatagridPageSize($('#datagrid1')),   //当设置了 pagination 特性时，初始化页码尺寸。
        //pageList: [10, 15, 20, 50, 100], //当设置了 pagination 特性时，初始化页面尺寸的选择列表。
        onBeforeLoad: function (param) {
            var queryurl2 = getQueryUrl();
            if ($.trim(queryurl2) == "") {
                return false;
            }
            $('#datagrid1').datagrid('options').url = queryurl2;
            return true;
        },
        loadFilter: function (data) {
            var data1 = escapeHtmlData(data);
            return data1;
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        onLoadSuccess: function (data) {
            beginEdit();
            convertCNandTW();
        }
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    $(window).resize();

    return;
}

//datagrid1 end-------------------------------------------------------

function buttonSave_click() {
    endEdit();
    var listBaseMultiLanguagePageDTO = $('#datagrid1').datagrid('getChanges');
    if (listBaseMultiLanguagePageDTO.length == 0) {
        $.messager.alert('Warning', 'No data has been changed!', 'warning');
        beginEdit();
        return;
    }

    //必须赋值一个日期
    var date = new Date();
    $(listBaseMultiLanguagePageDTO).each(function (index, row) {
        row.Created_Date = date;
        row.Modified_Date = date;
    });

    $.qajax({
        url: "PageMultiLanguageService.asmx/SavePageMultiLanguage",
        data: $.toJSON({ listBaseMultiLanguagePageDTO: listBaseMultiLanguagePageDTO }),
        beforeSend: function (XMLHttpRequest) {
            $("#buttonSave").prop("disabled", true);
        },
        success: function (result) {
            if ($.trim(result.d) == "") {
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

function beginEdit() {
    var allRows = $('#datagrid1').datagrid('getRows');
    for (var i = 0; i < allRows.length; i++) {
        $('#datagrid1').datagrid('beginEdit', i);
    }
}

function endEdit() {
    var allRows = $('#datagrid1').datagrid('getRows');
    for (var i = 0; i < allRows.length; i++) {
        $('#datagrid1').datagrid('endEdit', i);
    }
}

function convertCNandTW() {
    var allRows = $('#datagrid1').datagrid('getRows');
    for (var i = 0; i < allRows.length; i++) {
        convertCNandTWSingle($('#datagrid1').datagrid('getEditors', i));
    }
}

function convertCNandTWSingle(editors) {
    editors[1].target.on("change", function () {
        var zhTw = $.trim(editors[2].target.val());
        if (zhTw != "") {
            return;
        }
        $.qajax({
            url: "../MultiLanguage/MultiLanguageService.asmx/ToTraditionalChinese",
            data: $.toJSON({ simplified: $.trim(editors[1].target.val()) }),
            success: function (result) {
                editors[2].target.val(result.d);
            }
        });
    });

    editors[2].target.on("change", function () {
        var zhCn = $.trim(editors[1].target.val());
        if (zhCn != "") {
            return;
        }
        $.qajax({
            url: "../MultiLanguage/MultiLanguageService.asmx/ToSimplifiedChinese",
            data: $.toJSON({ traditional: $.trim(editors[2].target.val()) }),
            success: function (result) {
                editors[1].target.val(result.d);
            }
        });
    });
}