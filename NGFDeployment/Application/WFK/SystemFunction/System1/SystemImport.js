var pageParameterFileName;

$(function () {
    pageParameterFileName = $.url('?fileName');
    $(window).on("resize", function () {
        var datagridData = $("#datagrid1").data("datagrid");
        if (datagridData) {
            $("#datagrid1").datagrid("resize", { height: $(window).height() - $("#divButton").height() - 70 });
        }
    });

    inquiryData();

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonClose").on("click", buttonClose_click);
});

function getQueryUrl() {
    var queryurl = "../../CommonPage/GetXmlImportList.ashx?" + $.param({ fileName: pageParameterFileName });
    return queryurl;
}

function inquiryData() {
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        frozenColumns: [[
                            { field: 'Save_Status', title: 'Save Status', width: 80, halign: 'center' },
                            { field: 'checkbox', title: 'checkbox', width: 100, halign: 'center', checkbox: true }
        ]],
        columns: [[
                    { field: 'id', title: 'Id', width: 100, halign: 'center' },
                    { field: 'org_id', title: 'Org Id', width: 200, halign: 'center' },
                    { field: 'org', title: 'Org', width: 200, halign: 'center' },
                    { field: 'product_id', title: 'Product Id', width: 200, halign: 'center' },
                    { field: 'product', title: 'Product', width: 200, halign: 'center' },
                    { field: 'domain_id', title: 'Domain Id', width: 200, halign: 'center' },
                    { field: 'domain', title: 'Domain', width: 200, halign: 'center' },
                    { field: 'admin_role_id', title: 'Admin Role Id ', width: 200, halign: 'center' },
                    { field: 'adminrole', title: 'AdminRole', width: 100, halign: 'center' },
                    { field: 'name', title: 'System', width: 200, halign: 'center' },
                    { field: 'description', title: 'Description', width: 200, halign: 'center' },
                    { field: 'instance_name', title: 'Instance Name', width: 200, halign: 'center' },
                    { field: 'system_type', title: 'System Type', width: 200, halign: 'center' },
                    { field: 'version', title: 'Version', width: 200, halign: 'center' },
                    { field: 'base_url', title: 'Base Url', width: 200, halign: 'center' },
                    { field: 'external_base_url', title: 'External Base Url', width: 200, halign: 'center' },
                    { field: 'allow_edit', title: 'Allow Edit', width: 100, halign: 'center' },
                    { field: 'allow_delete', title: 'Allow Delete', width: 100, halign: 'center' },
                    { field: 'sort_code', title: 'Sort Code', width: 100, halign: 'center' },
                    { field: 'active', title: 'Active', width: 100, halign: 'center' },
                    { field: 'created_user_id', title: 'Created User Id', width: 100, halign: 'center' },
                    { field: 'created_by', title: 'Created By', width: 100, halign: 'center' },
                    { field: 'created_date', title: 'Created Date', width: 100, halign: 'center' },
                    { field: 'modified_user_id', title: 'Modified User Id', width: 100, halign: 'center' },
                    { field: 'modified_by', title: 'Modified By', width: 100, halign: 'center' },
                    { field: 'modified_date', title: 'Modified Date', width: 100, halign: 'center' }
        ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl1, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'id', //标识字段。
        singleSelect: false, //是否单选 
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
        onLoadSuccess: function (data) {
            $('#datagrid1').datagrid("checkAll");
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        }
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    $(window).resize();

    return;
}

function buttonSave_click() {
    var listBaseSystemDTO = $('#datagrid1').datagrid("getChecked");
    if (listBaseSystemDTO.length == 0) {
        $.messager.alert("Warning", "Please select at least one data!", "warning");
        return;
    }

    $.qajax({
        url: "SystemService.asmx/ImportSystem",
        data: $.toJSON({ listBaseSystemDTO: listBaseSystemDTO }),
        success: function (result) {
            var status = result.d;
            var success = status.Success;
            var failed = status.Failed;
            for (var i = 0; i < success.length; i++) {
                var index = $('#datagrid1').datagrid('getRowIndex', success[i]);
                $('#datagrid1').datagrid('updateRow', {
                    index: index,
                    row: {
                        Save_Status: 'Success'
                    }
                });
            }
            for (var i = 0; i < failed.length; i++) {
                var index = $('#datagrid1').datagrid('getRowIndex', failed[i]);
                $('#datagrid1').datagrid('updateRow', {
                    index: index,
                    row: {
                        Save_Status: 'Failed'
                    }
                });
            }
            if (failed.length == 0) {
                $.messager.alert("Information", "All data is saved success!", "info");
            }
            else {
                $.messager.alert("Warning", "Some data is saved failed!", "warning");
            }
        }
    });

}

function buttonClose_click() {
    parent.$.QDialog.hide(true);
}

