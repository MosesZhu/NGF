var $selectProduct;
var $textName;
var $textDescription;

$(function () {
    $selectProduct = $("#selectProduct");
    $textName = $("#textName");
    $textDescription = $("#textDescription");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    selectProductDataBind();

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonNew").on("click", buttonNew_click);
    $("#buttonExport").on("click", buttonExport_click);
    $("#buttonImport").on("click", buttonImport_click);
    $("#btnExport").on("click", btnExport_click);
    $("#btnClose").on("click", btnClose_click);
});

function selectProductDataBind() {
    selectDataBind({
        $select: $selectProduct,
        url: "../Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name"
    });
}

function buttonNew_click() {
    openDomainMaintain("", pageAction.New);
    return;
}

function datagrid1Edit() {
    var baseDomainDTO = $("#datagrid1").datagrid("getSelected");
    if (baseDomainDTO == null) {
        //未选中行，不处理
        return;
    }
    openDomainMaintain(baseDomainDTO.Id, pageAction.Edit);

    return;
}

function openDomainMaintain(id, action) {
    $.QDialog.show(
        {
            title: 'Domain Maintain'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "DomainMaintain.aspx?" + $.param({ PageAction: action, id: id }),
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    //$("#buttonInquiry").click();
                    $('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
}

function datagrid1Delete() {
    var baseDomainDTO = $("#datagrid1").datagrid("getSelected");
    if (baseDomainDTO == null) {
        //未选中行，不处理
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to delete?", function (confirmresult) {
        if (confirmresult == true) {
            $.qajax({
                url: "DomainService.asmx/DeleteBaseDomain",
                data: $.toJSON({ id: baseDomainDTO.Id }),
                success: function (result) {
                    if ($.trim(result.d) == "") {
                        //$("#buttonInquiry").click();
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
    });

    return;
}

//datagrid1 begin-------------------------------------------------------
function getQueryUrl() {
    var vArguments = {
        Product_Id: $.trim($selectProduct.val()),
        Name: encodeURI($.trim($textName.val())),
        Description: encodeURI($.trim($textDescription.val()))
    };

    var queryurl = "GetBaseDomainList.ashx?" + $.param(vArguments);
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
                    { field: 'Product', title: 'Product', width: 300, halign: 'center' },
                    { field: 'Name', title: 'Domain', width: 200, halign: 'center' },
                    { field: 'Description', title: 'Description', width: 200, halign: 'center' }
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

function buttonExport_click() {
    var datagriddata = $("#datagrid1").data("datagrid");
    if (datagriddata == null) {
        $.messager.alert("Warning", "Please inquiry data first!", "warning");
    }
    var $content = $("#datagrid1").datagrid('getPanel').parent();
    $("#dialog1").dialog({
        title: "Domain Export",
        width: $(window).width() * 0.8,
        height: $(window).height() * 0.8,
        modal: true,
        onBeforeOpen: function () {
            $("#datagrid1").datagrid('resize', {
                height: $("#dialog1").height() - $("#dialogButton").height() - 80,
                width: $("#dialog1").width() - 30
            });

            $("#dialogContent").append($content);
            $("#datagrid1").datagrid('options').singleSelect = false;
            $("#datagrid1").datagrid('unselectAll');
            $('.datagrid-toolbar').hide();
            $("#dialogButton").show();
        },
        onBeforeClose: function () {
            $("#datagrid1").datagrid('resize', {
                height: "auto",
                width: $("#divMainContent").width()
            });
            $("#datagrid1").datagrid("reload");

            $("#divMainContent").append($content);
            $("#datagrid1").datagrid('options').singleSelect = true;
            $("#datagrid1").datagrid('unselectAll');
            $('.datagrid-toolbar').show();
            $("#dialogButton").hide();
        }
    }
    );
}

function buttonImport_click() {
    $.QDialog.show(
        {
            title: 'File Upload'

        },
        {
            width: 0.8,
            height: 0.3,
            url: "../../CommonPage/FileUpload.aspx?function=Domain",
            onCloseCallback: function (returnValue) {
                var fileName = $.trim(returnValue);
                if (fileName != "") {
                    openDomainImport(fileName);
                }
            }
        }
    );
}

function openDomainImport(fileName) {
    $.QDialog.show(
        {
            title: 'Domain Import'

        },
        {
            width: 0.8,
            height: 0.8,
            url: "DomainImport.aspx?" + $.param({ fileName: fileName }),
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    $('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
}

function btnExport_click() {
    var listBaseDomainDTO = $("#datagrid1").datagrid("getSelections");
    if (listBaseDomainDTO.length == 0) {
        $.messager.alert("Warning", "Please select data first!", "warning");
        return;
    }
    $(listBaseDomainDTO).each(function (i, data) {
        data.Created_Date = serializerStringConvertDate(data.Created_Date);
        data.Modified_Date = serializerStringConvertDate(data.Modified_Date);
    });

    $.qajax({
        url: "DomainService.asmx/GetDomainXml",
        data: $.toJSON({ listBaseDomainDTO: listBaseDomainDTO }),
        success: function (result) {
            var formExport = $('<form action="../../CommonPage/ExportToXml.aspx" method="post" id="formExport"></form>');
            var txtContent = $('<input type="hidden" id="txtContent" name="txtContent" />');
            var txtFunction = $('<input type="hidden" id="txtFunction" name="txtFunction" />');
            var xml = result.d;
            txtContent.val(escapeHtmlData(xml));
            txtContent.appendTo(formExport);
            txtFunction.val("Domain");
            txtFunction.appendTo(formExport);
            formExport.appendTo(document.body).submit();
            document.body.removeChild(formExport);
        }
    });
}

function btnClose_click() {
    $("#dialog1").dialog('close');
}