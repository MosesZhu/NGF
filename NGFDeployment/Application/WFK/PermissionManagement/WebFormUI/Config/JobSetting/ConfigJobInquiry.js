﻿var $selectOrg;
var $selectProduct;
var $selectDomain;
var $selectSystem;
var $textName;
var $textDescription;
var $textProcess;

$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectDomain = $("#selectDomain");
    $selectSystem = $("#selectSystem");
    $textName = $("#textName");
    $textDescription = $("#textDescription");
    $textProcess = $("#textProcess");
    $textLastDatetimeTo = $("#textLastDatetimeTo");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    //select绑定
    selectOrgDataBind();
    selectProductDataBind();

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $selectDomain.on("change", selectDomain_change);

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonNew").on("click", buttonNew_click);
    $("#buttonExport").on("click", buttonExport_click);
    $("#buttonImport").on("click", buttonImport_click);
    $("#btnExport").on("click", btnExport_click);
    $("#btnClose").on("click", btnClose_click);
});

//------绑定select-----------------------------------------------------------------------------
function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectProductDataBind() {
    selectDataBind({
        $select: $selectProduct,
        url: "../../SystemFunction/Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectDomainDataBind() {
    var productId = $.trim($selectProduct.val());
    if (productId == "") {
        $selectDomain.empty();
        $selectDomain.change();
        return;
    }

    selectDataBind({
        $select: $selectDomain,
        url: "../../SystemFunction/Domain/DomainService.asmx/GetDomainList",
        data: $.toJSON({ productId: productId }),
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectSystemDataBind() {
    var orgId = $.trim($selectOrg.val());
    var domainId = $.trim($selectDomain.val());
    if (orgId == "" || domainId == "") {
        $selectSystem.empty();
        $selectSystem.change();
        return;
    }

    selectDataBind({
        $select: $selectSystem,
        url: "../../SystemFunction/System1/SystemService.asmx/GetSystemList",
        data: $.toJSON({ orgId: orgId, domainId: domainId }),
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectOrg_change() {
    selectSystemDataBind();
}

function selectProduct_change() {
    selectDomainDataBind();
}

function selectDomain_change() {
    selectSystemDataBind();
}

//------分割线---------------------------------------------------------------------------------
function buttonNew_click() {
    openJobMaintain("", pageAction.New, "");
    return;
}

function datagrid1Edit() {
    var baseJobDTO = $("#datagrid1").datagrid("getSelected");
    if (baseJobDTO == null) {
        //未选中行，不处理
        return;
    }
    openJobMaintain(baseJobDTO.Id, pageAction.Edit, baseJobDTO.IsSystemAdmin);
    return;
}

function openJobMaintain(id, action, isSystemAdmin) {
    $.QDialog.show(
        {
            title: 'Config Job Maintain'
        },
        {
            url: "ConfigJobMaintain.aspx?" + $.param({ PageAction: action, id: id, isSystemAdmin: isSystemAdmin }),
            width: 0.9,
            height: 0.9,
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
    var baseJobDTO = $("#datagrid1").datagrid("getSelected");
    if (baseJobDTO == null) {
        //未选中行，不处理
        return;
    }
    if (!baseJobDTO.IsSystemAdmin) {
        $.messager.alert("Warning", "You don't have permisson to edit because you're not this system admin!", "warning");
        return;
    }
    $.messager.confirm("Confirm", "Are you sure to delete?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "ConfigJobService.asmx/DeleteBaseJob",
                    data: $.toJSON({ baseJobId: baseJobDTO.Id }),
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
        OrgId: $.trim($selectOrg.val()),
        ProductId: $.trim($selectProduct.val()),
        DomainId: $.trim($selectDomain.val()),
        SystemId: $.trim($selectSystem.val()),
        Name: $.trim($textName.val()),
        Description: $.trim($textDescription.val()),
        Process: $.trim($textProcess.val())
    };

    var queryurl = "GetBaseConfigJobList.ashx?" + $.param(vArguments);
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
                    { field: 'Org', title: 'Org', width: 100, halign: 'center' },
                    { field: 'Product', title: 'Product', width: 100, halign: 'center' },
                    { field: 'Domain', title: 'Domain', width: 100, halign: 'center' },
                    { field: 'System', title: 'System', width: 150, halign: 'center' },
                    { field: 'Name', title: 'Name', width: 180, halign: 'center' },
                    { field: 'Description', title: 'Description', width: 120, halign: 'center' },
                    { field: 'Assembly', title: 'Assembly', width: 280, halign: 'center' },
                    { field: 'Process', title: 'Process', width: 300, halign: 'center' },
                    { field: 'Time_Slice', title: 'Time Slice', width: 80, align: 'right' },
                    { field: 'Last_Datetime', title: 'Last Datetime', width: 100, halign: 'center',
                        formatter: function (value, row, index) {
                            return datetimeformatter(value);
                        }
                    }
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
        loadFilter: datagrid1LoadFilter,
        onBeforeLoad: function (param) {
            var queryurl2 = getQueryUrl();
            if ($.trim(queryurl2) == "") {
                return false;
            }
            $('#datagrid1').datagrid('options').url = queryurl2;
            return true;
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

function datagrid1LoadFilter(data) {
    $.each(data.rows, function (i, t) {
        t.Last_Datetime = serializerStringConvertDate(t.Last_Datetime);
        t.Created_Date = serializerStringConvertDate(t.Created_Date);
        t.Modified_Date = serializerStringConvertDate(t.Modified_Date);
    });

    var data1 = escapeHtmlData(data);
    return data1;
}
//datagrid1 end-------------------------------------------------------

function buttonExport_click() {
    var datagriddata = $("#datagrid1").data("datagrid");
    if (datagriddata == null) {
        $.messager.alert("Warning", "Please inquiry data first!", "warning");
    }
    var $content = $("#datagrid1").datagrid('getPanel').parent();
    $("#dialog1").dialog({
        title: "Config Job Export",
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
            url: "../../CommonPage/FileUpload.aspx?function=ConfigJob",
            onCloseCallback: function (returnValue) {
                var fileName = $.trim(returnValue);
                if (fileName != "") {
                    openConfigJobImport(fileName);
                }
            }
        }
    );
}

function openConfigJobImport(fileName) {
    $.QDialog.show(
        {
            title: 'Config Job Import'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "ConfigJobImport.aspx?" + $.param({ fileName: fileName }),
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
    var listBaseConfigJobDTO = $("#datagrid1").datagrid("getSelections");
    if (listBaseConfigJobDTO.length == 0) {
        $.messager.alert("Warning", "Please select data first!", "warning");
        return;
    }
    $(listBaseConfigJobDTO).each(function (i, data) {
        data.Created_Date = serializerStringConvertDate(data.Created_Date);
        data.Modified_Date = serializerStringConvertDate(data.Modified_Date);
    });

    $.qajax({
        url: "ConfigJobService.asmx/GetConfigJobXml",
        data: $.toJSON({ listBaseConfigJobDTO: listBaseConfigJobDTO }),
        success: function (result) {
            var formExport = $('<form action="../../CommonPage/ExportToXml.aspx" method="post" id="formExport"></form>');
            var txtContent = $('<input type="hidden" id="txtContent" name="txtContent" />');
            var txtFunction = $('<input type="hidden" id="txtFunction" name="txtFunction" />');
            var xml = result.d;
            txtContent.val(escapeHtmlData(xml));
            txtContent.appendTo(formExport);
            txtFunction.val("ConfigJob");
            txtFunction.appendTo(formExport);
            formExport.appendTo(document.body).submit();
            document.body.removeChild(formExport);
        }
    });
}

function btnClose_click() {
    $("#dialog1").dialog('close');
}