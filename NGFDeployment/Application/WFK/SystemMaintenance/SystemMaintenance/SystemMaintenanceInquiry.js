var $textMaintainDate;
var $checkboxExpiredAndClosed;

$(function () {
    $textMaintainDate = $("#textMaintainDate");
    $checkboxExpiredAndClosed = $("#checkboxExpiredAndClosed");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    selectCategoryDataBind();
    bySystemOrBySystemGroupDataBind();

    $(window).on("resize", function () {
        $textMaintainDate.datetimebox("resize", $textMaintainDate.parent("td").width() * 0.99);
    });

    $(window).resize();

    $selectSystemGroup.on("change", selectSystemGroup_change);
    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonNew").on("click", buttonNew_click);
});

function selectSystemGroup_change() {
    textSystemDataBind();
}

function buttonNew_click() {
    openSystemMaintain("", pageAction.New, $selectOrg.val(), $selectProduct.val());
    return;
}

function datagrid1Copy() {
    var baseSystemMaintenanceDTO = $("#datagrid1").datagrid("getSelected");
    openSystemMaintain(baseSystemMaintenanceDTO.Id, pageAction.New, "", "");
    return;
}

function datagrid1Edit() {
    var baseSystemMaintenanceDTO = $("#datagrid1").datagrid("getSelected");
    if (baseSystemMaintenanceDTO == null) {
        //未选中行不处理
        return;
    }
    if (baseSystemMaintenanceDTO.Status == "Expired" || baseSystemMaintenanceDTO.Status == "Closed") {
        //当status为Expired和Closed时，不可修改
        $.messager.alert("Warning", "当status为Expired和Closed时，不可修改。", "warning");
        return;
    }
    openSystemMaintain(baseSystemMaintenanceDTO.Id, pageAction.Edit, "", "");

    return;
}

function datagrid1Close() {
    var baseSystemMaintenanceDTO = $("#datagrid1").datagrid("getSelected");
    if (baseSystemMaintenanceDTO == null) {
        //未选中行不处理
        return;
    }
    if (baseSystemMaintenanceDTO.Status == "Expired" || baseSystemMaintenanceDTO.Status == "Closed") {
        //当status为Expired和Closed时，不可关闭
        $.messager.alert("Warning", "当status为Expired和Closed时，不可关闭。", "warning");
        return;
    }
    $.messager.confirm("Confirm", "Are you sure to close?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "SystemMaintenanceService.asmx/CloseSystemMaintenance",
                    data: $.toJSON({ id: baseSystemMaintenanceDTO.Id }),
                    success: function (result) {
                        if ($.trim(result.d) == "") {
                            $('#datagrid1').datagrid("reload");
                            $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                            $.messager.alert("Information", "Close success!", "info");
                        }
                        else {
                            $.messager.alert("Close failed", result.d, "error");
                        }
                    }
                });
            }
        }
    );

    return;
}

function openSystemMaintain(id, action, orgId, productId) {
    $.QDialog.show(
        {
            title: 'System Maintenance Maintain'
        },
        {
            url: "SystemMaintenanceMaintain.aspx?" + $.param({ PageAction: action, id: id, orgId: orgId, productId: productId }),
            width: 0.9,
            height: 0.92,
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
    var baseSystemMaintenanceDTO = $("#datagrid1").datagrid("getSelected");
    if (baseSystemMaintenanceDTO == null) {
        //未选中行，或者当status不为NotStart时，不处理
        return;
    }
    if (baseSystemMaintenanceDTO.Status != "NotStart") {
        //当status不为NotStart时，不可删除
        $.messager.alert("Warning", "当status不为NotStart时，不可删除。", "warning");
        return;
    }
    $.messager.confirm("Confirm", "Are you sure to delete?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "SystemMaintenanceService.asmx/DeleteSystemMaintenance",
                    data: $.toJSON({ id: baseSystemMaintenanceDTO.Id }),
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

//datagrid1 begin-------------------------------------------------------
function getQueryUrl() {
    var domainOrSystemGroup;
    var systemOrSystemList;
    if ($.trim($selectCategory.val()) == "System") {
        domainOrSystemGroup = $.trim($selectDomain.val());
        systemOrSystemList = $.trim($selectSystem.val());
    }
    else {
        domainOrSystemGroup = $.trim($selectSystemGroup.val());
        systemOrSystemList = $.trim($textSystem.val());
    }
    var vArguments = {
        OrgId: encodeURI($.trim($selectOrg.val())),
        ProductId: encodeURI($.trim($selectProduct.val())),
        Maintenance_Category: encodeURI($.trim($selectCategory.val())),
        MaintainDate: encodeURI($.trim($textMaintainDate.val())),
        Domain_Id: encodeURI($.trim($selectDomain.val())),
        System_Id: encodeURI($.trim($selectSystem.val())),
        System_Group_Id: encodeURI($.trim($selectSystemGroup.val())),
        System_Group: encodeURI($.trim($textSystem.val())),
        IsCheckedExpiredAndClosed: encodeURI($.trim($checkboxExpiredAndClosed.prop("checked").toString()))
    };

    var queryurl = "GetSystemMaintenanceList.ashx?" + $.param(vArguments);
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
                    { field: 'Org', title: 'Org', width: 50, halign: 'center' },
                    { field: 'Product', title: 'Product', width: 70, halign: 'center' },
                    { field: 'Maintenance_Category', title: 'Category', width: 70, halign: 'center' },
                    { field: 'System_Group', title: 'System Group', width: 80, halign: 'center'
                        //                    ,
                        //                        formatter: function (value, row, index) {
                        //                            if (row.Maintenance_Category == "System") {
                        //                                return row.Domain;
                        //                            }
                        //                            return value;
                        //                        }
                    },
                    { field: 'System_List', title: 'System List', width: 80, halign: 'center',
                        formatter: function (value, row, index) {
                            if (row.Maintenance_Category == "System") {
                                return row.System;
                            }
                            return value;
                        }
                    },
                    { field: 'Description', title: 'Description', width: 80, halign: 'center' },
                    { field: 'Maintenance_Role', title: 'Maintenance Role', width: 100, halign: 'center' },
                    { field: 'Status', title: 'Status', width: 50, halign: 'center' },
                    { field: 'Effective_Date', title: 'Effective Date', width: 90, halign: 'center',
                        formatter: function (value, row, index) {
                            return datetimeformatter(value);
                        }
                    },
                    { field: 'Expiration_Date', title: 'Expiration Date', width: 90, halign: 'center',
                        formatter: function (value, row, index) {
                            return datetimeformatter(value);
                        }
                    },
                    { field: 'Created_Date', title: 'Created Date', width: 70, halign: 'center',
                        formatter: function (value, row, index) {
                            return datetimeformatter(value);
                        }
                    },
                    { field: 'Created_By', title: 'Created By', width: 70, halign: 'center' },
                    { field: 'Closed_Date', title: 'Closed Date', width: 70, halign: 'center',
                        formatter: function (value, row, index) {
                            if (parseInt(value.getFullYear().toString(), 10) < 1901) {
                                return "";
                            }
                            return datetimeformatter(value);
                        }
                    },
                    { field: 'Closed_By', title: 'Closed By', width: 70, halign: 'center' }
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
            $.each(data.rows, function (i, t) {
                t.Effective_Date = serializerStringConvertDate(t.Effective_Date);
                t.Expiration_Date = serializerStringConvertDate(t.Expiration_Date);
                t.Created_Date = serializerStringConvertDate(t.Created_Date);
                t.Closed_Date = serializerStringConvertDate(t.Closed_Date);
            });

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
                        text: 'Copy',
                        iconCls: 'icon-edit',
                        handler: datagrid1Copy
                    },
                    '-',
                    {
                        text: 'Close',
                        iconCls: 'icon-edit',
                        handler: datagrid1Close
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
