var pageParameterDataTableId;
var pageParameterIsOrgAdmin;

$(function () {
    pageParameterDataTableId = $.url('?DataTableId');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    if (pageParameterIsOrgAdmin == "false") {
        buttonDisabled($("#buttonSave"));
    }

    initializeDataTable();
    buildDatagrid();
});

function initializeDataTable() {
    $.qajax({
        url: "../DataTable/DataTableService.asmx/GetBaseDataTable",
        data: $.toJSON({ id: pageParameterDataTableId }),
        success: function (result) {
            $("#textName").val(result.d.Name);
            initializeDataSource(result.d.Data_Source_Id);
        }
    });
}

function initializeDataSource(dataSourceId) {
    $.qajax({
        url: "../DataSource/DataSourceService.asmx/GetBaseDataSource",
        data: $.toJSON({ id: dataSourceId }),
        success: function (result) {
            $("#textDataSource").val(result.d.Name);
        }
    });
}

function buildDatagrid() {
    var queryurl = "GetBaseDataTableColumnList.ashx?" + $.param({ DataTableId: pageParameterDataTableId });

    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'IsSensitive', title: 'Is Sensitive', width: 100, halign: 'center', align: 'center',
                        editor: {
                            type: 'checkbox',
                            options: { on: "Y", off: "" }
                        }
                    },
                    { field: 'Name', title: 'Column', width: 200, halign: 'center' },
                    { field: 'Description', title: 'Description', width: 300, halign: 'center' }
                ]],
        height: 400,    //高度
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'Id', //标识字段。
        singleSelect: true, //是否单选 
        rownumbers: true, //行号 
        loadFilter: datagrid1LoadFilter, //返回过滤的数据显示
        onClickRow: datagrid1ClickRow,
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        }
    });

    $(window).resize();
}

function datagrid1LoadFilter(data) {
    $.each(data.rows, function (i, t) {
        t.Created_Date = serializerStringConvertDate(t.Created_Date);
        t.Modified_Date = serializerStringConvertDate(t.Modified_Date);
    });
    return data;
}

var datagrid1EditIndex = undefined;
function datagrid1EndEditing() {
    if (datagrid1EditIndex == undefined) {
        return true;
    }

    if ($('#datagrid1').datagrid('validateRow', datagrid1EditIndex)) {
        var ed = $('#datagrid1').datagrid('getEditor', { index: datagrid1EditIndex, field: 'IsSensitive' });

        var sensitiveChecked = ed.target.prop("checked");
        if (sensitiveChecked == true) {
            $('#datagrid1').datagrid('getRows')[datagrid1EditIndex]['Is_Sensitive'] = 1;
        }
        else {
            $('#datagrid1').datagrid('getRows')[datagrid1EditIndex]['Is_Sensitive'] = 0;
        }

        $('#datagrid1').datagrid('endEdit', datagrid1EditIndex);
        datagrid1EditIndex = undefined;
        return true;
    }
    else {
        return false;
    }
}
function datagrid1ClickRow(index) {
    if (datagrid1EditIndex != index) {
        if (datagrid1EndEditing()) {
            $('#datagrid1').datagrid('selectRow', index)
							.datagrid('beginEdit', index);
            datagrid1EditIndex = index;
        }
        else {
            $('#datagrid1').datagrid('selectRow', datagrid1EditIndex);
        }
    }
}

function buttonSave_click() {

    if (!datagrid1EndEditing()) {
        $.messager.alert("Warning", "Data is invalid!", "warning");
        $('#datagrid1').datagrid('selectRow', datagrid1EditIndex);
        return;
    }

    var allRows = $('#datagrid1').datagrid("getRows");

    var dto = {
        dataTableId: pageParameterDataTableId,
        baseDataTableColumnDTOs: allRows
    };

    $.qajax({
        url: "DataTableColumnService.asmx/SaveBaseDataTableColumn",
        data: $.toJSON(dto),
        beforeSend: function (XMLHttpRequest) {
            $("#buttonSave").prop("disabled", true);
        },
        success: function (result) {
            if ($.trim(result.d) == "") {
                $('#datagrid1').datagrid('acceptChanges');
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