var $selectProduct;
var $selectSystem;
var $textClassName;

$(function () {
    $selectProduct = $("#selectProduct");
    $selectSystem = $("#selectSystem");
    $textClassName = $("#textClassName");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    //select绑定
    selectProductDataBind();

    $selectProduct.on("change", selectProduct_change);

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonExport").on("click", buttonExport_click);
    $("#buttonImport").on("click", buttonImport_click);
});

function selectProductDataBind() {
    selectDataBind({
        $select: $selectProduct,
        url: "../../SystemFunction/Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectSystemDataBind() {
    var produtName = $.trim($selectProduct.find('option:selected').text());
    if (produtName == "") {
        $selectSystem.empty();
        return;
    }

    selectDataBind({
        $select: $selectSystem,
        url: "PageMultiLanguageService.asmx/GetSystemList",
        data: $.toJSON({ productName: produtName }),
        itemType: "string"
    });
}

function selectProduct_change() {
    selectSystemDataBind();
}

//--------------------------------------------------------------------------------------------
function datagrid1Edit() {
    var baseMultiLanguagePageDTO = $("#datagrid1").datagrid("getSelected");
    if (baseMultiLanguagePageDTO == null) {
        //未选中行，不处理
        return;
    }
    $.QDialog.show(
        {
            title: 'Page Multi Language Maintain'
        },
        {
            url: "PageMultiLanguageMaintain.aspx?"
                + $.param({
                    product: baseMultiLanguagePageDTO.Product_Name,
                    system: baseMultiLanguagePageDTO.System_Name,
                    className: baseMultiLanguagePageDTO.Class_Name
                }),
            width: 0.95,
            height: 0.95,
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    $('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
    return;
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
                    url: "PageMultiLanguageService.asmx/DeletePageMultiLanguage",
                    data: $.toJSON({ productName: baseMultiLanguagePageDTO.Product_Name, systemName: baseMultiLanguagePageDTO.System_Name, className: baseMultiLanguagePageDTO.Class_Name }),
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

//datagrid1 begin------------------------------------------------------------------------

function getQueryUrl() {
    var vArguments = {
        ProductName: $.trim($selectProduct.find('option:selected').text()),
        SystemName: $.trim($selectSystem.find('option:selected').text()),
        ClassName: encodeURI($.trim($textClassName.val()))
    };

    var queryurl = "GetPageMultiLanguageList.ashx?" + $.param(vArguments);
    return queryurl;
}

function buttonInquiry_click() {
    if ($.trim($selectProduct.val()) == "") {
        $.messager.alert("Warning", "Product can't be empty!", "warning");
        return;
    }

    if ($.trim($selectSystem.val()) == "") {
        $.messager.alert("Warning", "System can't be empty!", "warning");
        return;
    }
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'Product_Name', title: 'Product', width: 150, halign: 'center' },
                    { field: 'System_Name', title: 'System', width: 200, halign: 'center' },
                    { field: 'Class_Name', title: 'Class Name', width: 400, halign: 'center' }
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
    var productName = $.trim($selectProduct.find('option:selected').text());
    if (productName == "") {
        $.messager.alert("Warning", "Product can't be empty!", "warning");
        return;
    }

    var systemName = $.trim($selectSystem.find('option:selected').text());
    if (systemName == "") {
        $.messager.alert("Warning", "System can't be empty!", "warning");
        return;
    }

    window.open("PageMultiLanguageExport.aspx?" + $.param({ productName: encodeURI(productName), systemName: encodeURI(systemName), className: encodeURI($.trim($textClassName.val())) }));
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
            url: "../../CommonPage/FileUpload.aspx?function=PageMultiLanguage",
            onCloseCallback: function (returnValue) {
                var fileName = $.trim(returnValue);
                if (fileName != "") {
                    $.qajax({
                        url: "PageMultiLanguageService.asmx/ImportPageMultiLanguage",
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