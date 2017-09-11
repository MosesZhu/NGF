var pageParameterDataPermissionId;
var pageParameterDataId;

var permissionColumn;
var permissionValues;

$(function () {
    pageParameterDataPermissionId = $.url('?dataPermissionId');
    pageParameterDataId = $.url('?dataId');

    $(window).on("resize", function () {
        var height = $(window).height() - 20;
        var datagriddata = $("#datagrid1").data("datagrid");
        if (datagriddata) {
            $("#datagrid1").datagrid("resize", { height: height });
        }
        else {
            $("#datagrid1").height(height);
        }
    });

    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    setTimeout(function () { initializeData(); }, 100);
});

function initializeData() {
    permissionColumn = "";
    permissionValues = [];

    //页面数据初始化
    if ($.trim(pageParameterDataPermissionId) == "" || $.trim(pageParameterDataPermissionId) == guidEmpty) {
        setTimeout(function () { buildDatagrid1(); }, 0);
    }
    else {
        $.qajax({
            url: "DataPermissionService.asmx/GetBaseDataPermissionValue",
            data: $.toJSON({ dataPermissionId: pageParameterDataPermissionId }),
            success: function (result) {
                if (result.d) {
                    permissionValues = result.d;
                }
                setTimeout(function () { buildDatagrid1(); }, 0);
            }
        });
    }
}

function buildDatagrid1() {
    $.qajax({
        url: "../Data/DataSelectedColumnService.asmx/GetBaseDataSelectedColumn",
        data: $.toJSON({ dataId: pageParameterDataId }),
        success: function (result) {
            if (result.d) {
                buildDatagrid2(pageParameterDataId, result.d);
            }
        }
    });
}

function buildDatagrid2(dataId, baseDataSelectedColumnDTOs) {
    var columns =
        [
            { field: 'Select_WilliamChen', checkbox: true, width: 50, halign: 'center', align: 'center' }
        ];

    for (var i = 0; i < baseDataSelectedColumnDTOs.length; i++) {
        columns.push({ field: baseDataSelectedColumnDTOs[i]["Column"].toLowerCase(), title: baseDataSelectedColumnDTOs[i]["Display_Name"], width: 100, halign: 'center' });
        if (baseDataSelectedColumnDTOs[i]["IsAuthorityData"]) {
            permissionColumn = baseDataSelectedColumnDTOs[i]["Column"].toLowerCase();
        }
    }

    var queryurl = "GetOptionsOriginalData.ashx?" + $.param({ dataId: dataId });

    $('#datagrid1').datagrid({
        columns: [columns],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        //idField: 'Id', //标识字段。
        singleSelect: false, //是否单选 
        selectOnCheck: true, //如果设置为true，单击一个复选框，将始终选择行
        checkOnSelect: true, //如果设置为true，选择一行,复选框将被选中
        rownumbers: true, //行号 
        pagination: true, //分页控件 
        pagePosition: "top", //定义的分页栏的位置
        pageNumber: 1, //当设置了 pagination 特性时，初始化页码。
        pageSize: getDatagridPageSize($('#datagrid1')),   //当设置了 pagination 特性时，初始化页码尺寸。
        pageList: [10, 15, 20, 50, 100], //当设置了 pagination 特性时，初始化页面尺寸的选择列表。
        loadFilter: datagrid1LoadFilter, //返回过滤的数据显示
        onLoadSuccess: datagrid1LoadSuccess,
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        onCheck:datagrid1Check,
        onUncheck: datagrid1Uncheck,
        onCheckAll: datagrid1CheckAll,
        onUncheckAll: datagrid1UncheckAll
    });

    $(window).resize();
}

function datagrid1LoadFilter(data) {
    $.each(data.rows, function (index, row) {
        row.Select_WilliamChen = false;
        if (permissionColumn) {
            for (var j = 0; j < permissionValues.length; j++) {
                if (row[permissionColumn] == permissionValues[j]) {
                    row.Select_WilliamChen = true;
                    break;
                }
            }
        }
    });
    return data;
}

//查询初始化标记，为了区分是页面点击selectRow还是程序代码主动调用selectRow
var initFlag;

function datagrid1LoadSuccess(data) {
    initFlag = true;
    $.each(data.rows, function (index, item) {
        if (item.Select_WilliamChen) {
            $('#datagrid1').datagrid('selectRow', index);
        }
    });
    initFlag = false;
}

function datagrid1Check(rowIndex, rowData) {
    if (initFlag != false) {
        return;
    }

    if (permissionColumn) {
        var permissionValue = rowData[permissionColumn];

        initFlag = true;
        var rows = $('#datagrid1').datagrid('getRows');
        $.each(rows, function (index, row) {
            if (index != rowIndex) {
                if (row[permissionColumn] == permissionValue) {
                    $('#datagrid1').datagrid('selectRow', index);
                }
            }
        });
        initFlag = false;

        permissionValuesAddValue(permissionValue);
    }
}

function datagrid1Uncheck(rowIndex, rowData) {
    if (initFlag != false) {
        return;
    }

    if (permissionColumn) {
        var permissionValue = rowData[permissionColumn];

        initFlag = true;
        var rows = $('#datagrid1').datagrid('getRows');
        $.each(rows, function (index, row) {
            if (index != rowIndex) {
                if (row[permissionColumn] == permissionValue) {
                    $('#datagrid1').datagrid('unselectRow', index);
                }
            }
        });
        initFlag = false;

        permissionValuesRemoveValue(permissionValue);
    }
}

function datagrid1CheckAll(rows) {
    if (permissionColumn) {
        $.each(rows, function (index, row) {
            var permissionValue = row[permissionColumn];
            permissionValuesAddValue(permissionValue);
        });
    }
}

function datagrid1UncheckAll(rows) {
    if (permissionColumn) {
        $.each(rows, function (index, row) {
            var permissionValue = row[permissionColumn];
            permissionValuesRemoveValue(permissionValue);
        });
    }
}

function permissionValuesAddValue(permissionValue) {
    var isexist = false;
    for (var i = 0; i < permissionValues.length; i++) {
        if (permissionValues[i] == permissionValue) {
            isexist = true;
            break;
        }
    }
    if (isexist == false) {
        permissionValues.push(permissionValue);
    }
    permissionValues = permissionValues.sort();
}

function permissionValuesRemoveValue(permissionValue) {
    for (var j = permissionValues.length - 1; j >= 0; j--) {
        if (permissionValues[j] == permissionValue) {
            permissionValues.splice(j, 1);
        }
    }
    permissionValues = permissionValues.sort();
}

function getpermissionValues() {
    return permissionValues;
}