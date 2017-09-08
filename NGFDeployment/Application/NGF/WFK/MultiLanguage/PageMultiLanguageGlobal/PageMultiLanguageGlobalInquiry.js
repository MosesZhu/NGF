var $textLanguageText;
var $radioEnglish;
var $radioChineseSimplified;
var $radioChineseTraditional;


$(function () {
    $textLanguageText = $("#textLanguageText");
    $radioEnglish = $("#radioEnglish");
    $radioChineseSimplified = $("#radioChineseSimplified");
    $radioChineseTraditional = $("#radioChineseTraditional");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonNew").on("click", buttonNew_click);
    $("#buttonExport").on("click", buttonExport_click);
    $("#buttonImport").on("click", buttonImport_click);
});

//begin new,edit,delete-----------------------------------------------
function buttonNew_click() {
    openMultiLanguageGlobalMaintain("", pageAction.New);
    return;
}

function datagrid1Edit() {
    var baseMultiLanguagePageDTO = $("#datagrid1").datagrid("getSelected");
    if (baseMultiLanguagePageDTO == null) {
        //未选中行，不处理
        return;
    }

    openMultiLanguageGlobalMaintain(baseMultiLanguagePageDTO.Id, pageAction.Edit);

    return;
}

function openMultiLanguageGlobalMaintain(id, action) {
    $.QDialog.show(
        {
            title: 'Page Multi Language Global Maintain'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "PageMultiLanguageGlobalMaintain.aspx?" + $.param({ PageAction: action, id: id }),
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    $('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
}

function datagrid1Delete() {
    var baseMultiLanguagePageDTO = $("#datagrid1").datagrid("getSelected");
    if (baseMultiLanguagePageDTO == null) {
        //未选中行，不处理
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to delete?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "PageMultiLanguageGlobalService.asmx/DeletePageMultiLanguageGlobal",
                    data: $.toJSON({ id: baseMultiLanguagePageDTO.Id }),
                    success: function (result) {
                        if ($.trim(result.d) == "") {
                            $('#datagrid1').datagrid("reload");
                            $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                            $.messager.alert("Information", "Delete success!", "info");
                        }
                        else {
                            $.messager.alert("Delete failed", result.d, "error");
                        }
                    }
                });
            }
        }
    );
    return;
}
//end new,edit,delete-----------------------------------------------

//datagrid1 begin------------------------------------------------------------------------

function getQueryUrl() {
    var sortColumn = "";

    if ($radioEnglish.prop("checked") == true) {
        sortColumn = "English";
    }
    else if ($radioChineseSimplified.prop("checked") == true) {
        sortColumn = "Chinese Simplified";
    }
    else if ($radioChineseTraditional.prop("checked") == true) {
        sortColumn = "Chinese Traditional";
    }

    var vArguments = {
        LanguageText: encodeURI($.trim($textLanguageText.val())),
        SortColumn: encodeURI(sortColumn)
    };

    var queryurl = "GetPageMultiLanguageGlobalList.ashx?" + $.param(vArguments);
    return queryurl;
}

function buttonInquiry_click() {
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'En_Us', title: 'English', width: 250, halign: 'center' },
                    { field: 'Zh_Cn', title: 'Chinese Simplified', width: 250, halign: 'center' },
                    { field: 'Zh_Tw', title: 'Chinese Traditional', width: 250, halign: 'center' }
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
        pagination: true, //分页控件 
        pagePosition: "top", //定义的分页栏的位置
        pageNumber: 1, //当设置了 pagination 特性时，初始化页码。
        pageSize: getDatagridPageSize($('#datagrid1')),   //当设置了 pagination 特性时，初始化页码尺寸。
        pageList: [10, 15, 20, 50, 100], //当设置了 pagination 特性时，初始化页面尺寸的选择列表。
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
        toolbar: [
                    {
                        text: 'Edit',
                        iconCls: 'icon-edit',
                        handler: datagrid1Edit
                    },
                    '-',
                    {
                        text: 'Delete',
                        iconCls: 'icon-remove',
                        handler: datagrid1Delete
                    },
                    '-'
                ],
        onDblClickRow: datagrid1Edit
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    $(window).resize();

    return;
}

//datagrid1 end-------------------------------------------------------


//导出
function buttonExport_click() {
    var sortColumn = "";

    if ($radioEnglish.prop("checked") == true) {
        sortColumn = "English";
    }
    else if ($radioChineseSimplified.prop("checked") == true) {
        sortColumn = "Chinese Simplified";
    }
    else if ($radioChineseTraditional.prop("checked") == true) {
        sortColumn = "Chinese Traditional";
    }

    window.open("PageMultiLanguageGlobalExport.aspx?" + $.param({ SortColumn: encodeURI(sortColumn) }));
}

//导入
function buttonImport_click() {
    $.QDialog.show(
        {
            title: 'File Upload'
        },
        {
            width: 0.8,
            height: 0.3,
            url: "../../CommonPage/FileUpload.aspx?function=PageMultiLanguageGlobal",
            onCloseCallback: function (returnValue) {
                var fileName = $.trim(returnValue);
                if (fileName != "") {
                    $.qajax({
                        url: "PageMultiLanguageGlobalService.asmx/ImportPageMultiLanguageGlobal",
                        data: $.toJSON({ fileName: fileName }),
                        beforeSend: function (XMLHttpRequest) {
                            $("#buttonImport").prop("disabled", true);
                        },
                        success: function (result) {
                            if ($.trim(result.d) == "") {
                                $.messager.alert("Information", "Import success!", "info",
                                    function () {
                                        $('#datagrid1').datagrid("reload");
                                        $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                                    });
                            }
                            else {
                                $.messager.alert("Error", result.d, "error",
                                    function () {
                                        $('#datagrid1').datagrid("reload");
                                        $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                                    });
                            }
                        },
                        complete: function () {
                            $("#buttonImport").prop("disabled", false);
                        }
                    });
                }
            }
        }
    );
}