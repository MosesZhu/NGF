﻿$(function () {
    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonReset").on("click", buttonReset_click);
    $("#buttonNew").on("click", buttonNew_click);
});

function buttonNew_click() {
    openDataMaintain("", pageAction.New, "");
    return;
}

function datagrid1Edit() {
    var baseDataDTO = $("#datagrid1").datagrid("getSelected");
    if (baseDataDTO == null) {
        //未选中行，不处理
        return;
    }
    openDataMaintain(baseDataDTO.Id, pageAction.Edit, baseDataDTO.IsOrgAdmin);

    return;
}

function openDataMaintain(id, action, isOrgAdmin) {
    $.QDialog.show(
        {
            title: 'Static Data Maintain'
        },
        {
            url: "DataMaintain.aspx?" + $.param({ PageAction: action, id: id, isOrgAdmin: isOrgAdmin }),
            width: 0.9,
            height: 0.9,
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
    var baseDataDTO = $("#datagrid1").datagrid("getSelected");
    if (baseDataDTO == null) {
        //未选中行，不处理
        return;
    }

    if (!baseDataDTO.IsOrgAdmin) {
        $.messager.alert("Warning", "You don't have permession to delete because you're not this org admin!", "warning");
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to delete?", function (confirmresult) {
        if (confirmresult == true) {

            $.qajax({
                url: "DataService.asmx/DeleteBaseData",
                data: $.toJSON({ id: baseDataDTO.Id }),
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
    var vArguments =
        {
            Org_Id: $.trim($selectOrg.val()),
            Data_Source_Id: $.trim($selectDataSource.val()),
            Table_Id: $.trim($selectDataTable.val()),
            Name: encodeURI($.trim($textName.val())),
            Description: encodeURI($.trim($textDescription.val()))
        };

    var queryurl = "GetBaseDataList.ashx?" + $.param(vArguments);
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
                    { field: 'Org', title: 'Org', width: 150, halign: 'center' },
                    { field: 'DataSource', title: 'Data Source', width: 150, halign: 'center' },
                    { field: 'Table', title: 'Data Table', width: 150, halign: 'center' },
                    { field: 'Name', title: 'Static Data', width: 150, halign: 'center' },
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

function buttonReset_click() {
    $selectOrg.val("");
    selectOrg_change();
    $textName.val("");
    $textDescription.val("");
}
//datagrid1 end-------------------------------------------------------