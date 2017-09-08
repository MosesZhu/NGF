var pageParameterPermissionOrgId;
var pageParameterPermissionModeId;
var pageParameterSubjectCategory;
var pageParameterSubjectId;
var pageParameterIsOrgAdmin;

$(function () {
    pageParameterPermissionOrgId = $.url('?permissionOrgId');
    pageParameterPermissionModeId = $.url('?permissionModeId');
    pageParameterSubjectCategory = $.url('?subjectCategory');
    pageParameterSubjectId = $.url('?subjectId');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));
    $(window).on("resize", function () {
        var datagriddata = $("#datagrid1").data("datagrid");
        if (datagriddata) {
            $("#datagrid1").datagrid("resize", { height: $(window).height() - 20 });
        }
    });

    inquiryData();
    $(window).resize();
});

function datagrid1Add() {
    if (pageParameterIsOrgAdmin == "false") {
        $.messager.alert("Warning", "You don't have permission to add because you're not this org admin!", "warning");
        return;
    }

    $.QDialog.show(
        {
            title: 'Add Sensitive Column Permission'
        },
        {
            url: "SensitiveColumnPermissionMaintain.aspx?" + $.param({ permissionOrgId: pageParameterPermissionOrgId, permissionModeId: pageParameterPermissionModeId, subjectCategory: pageParameterSubjectCategory, subjectId: pageParameterSubjectId }),
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    //inquiryData();
                    $('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
}

function datagrid1Delete() {
    var dto = $("#datagrid1").datagrid("getSelected");
    if (dto == null) {
        //未选中行，不处理
        return;
    }

    if (pageParameterIsOrgAdmin == "false") {
        $.messager.alert("Warning", "You don't have permission to delete because you're not this org admin!", "warning");
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to delete?", function (confirmresult) {
        if (confirmresult == true) {
            $.qajax({
                url: "../../Permission/PermissionService.asmx/DeleteBasePermission",
                data: $.toJSON({ id: dto.Id }),
                success: function (result) {
                    if (result.d == "") {
                        //inquiryData();
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
function inquiryData() {
    var queryurl = "GetSensitiveColumnPermissionList.ashx?" + $.param({ permissionModeId: pageParameterPermissionModeId, subjectCategory: pageParameterSubjectCategory, subjectId: pageParameterSubjectId });
    if ($.trim(queryurl) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'ResourceOrg', title: 'Org', width: 100, halign: 'center' },
                    { field: 'DataSource', title: 'Data Source', width: 100, halign: 'center' },
                    { field: 'Table', title: 'Table', width: 120, halign: 'center' },
                    { field: 'Resource_Name', title: 'Column', width: 150, halign: 'center' },
                    { field: 'ColumnDescription', title: 'Description', width: 400, halign: 'center' }
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'Id', //标识字段。
        singleSelect: true, //是否单选 
        rownumbers: true, //行号 
        pagination: true, //分页控件 
        pagePosition: "top", //定义的分页栏的位置
        pageNumber: 1, //当设置了 pagination 特性时，初始化页码。
        pageSize: getDatagridPageSize($('#datagrid1')),   //当设置了 pagination 特性时，初始化页码尺寸。
        pageList: [10, 15, 20, 50, 100], //当设置了 pagination 特性时，初始化页面尺寸的选择列表。
        height: $(window).height() - 20,
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        toolbar: [
            {
                text: 'Add',
                iconCls: 'icon-add',
                handler: datagrid1Add
            },
            '-',
            {
                text: 'Delete',
                iconCls: 'icon-remove',
                handler: datagrid1Delete
            },
            '-'
        ]
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    return;
}