$(function () {
    datagrid_autoresize($("#divMainContent"), $("#treegrid1"));

    $(window).on("resize", function () {
        var datagriddata = $("#treegrid1").data("datagrid");
        if (datagriddata) {
            $("#treegrid1").datagrid("resize", { height: $(window).height() - 50 });
        }
    });

    $("#buttonOk").on("click", buttonOk_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    var baseurl = "GetDepartmentTreeList.ashx?" + $.param({ First: true, TreeType: "Root" });
    $("#treegrid1").data("First", true);
    $('#treegrid1').treegrid({
        url: baseurl,
        idField: 'Id',
        treeField: 'Department_Code',
        columns: [[
                   { field: 'Select', title: 'Select', width: 50, halign: 'center', align: 'center',
                       formatter: function (value, rowData, rowIndex) {
                           var str = '<input name="Select" ScopeId="' + rowData.Id + '" type="checkbox"';
                           if (rowData.TreeType == "Root" || rowData.TreeType == "Site") {
                               str += ' disabled="true" ';
                           }
                           str += ' ></input>';
                           return str;
                       }
                   },

                     { field: 'Department_Code', title: 'Code', width: 180, halign: 'center',
                         formatter: function (value, rowData, rowIndex) {
                             if (rowData.TreeType == "Department") {
                                 var str = '<a href="DepartmentFrame.aspx?' + $.param({ id: rowData.Id }) + '" target="_blank">' + value + '</a>';
                                 return str;
                             }
                             else {
                                 return value;
                             }
                         }
                     },
                    { field: 'Department_Name', title: 'Name', width: 180, halign: 'center' },
                    { field: 'Real_Name', title: 'Real Name', width: 180, halign: 'center' },
                    { field: 'Description', title: 'Description', width: 200, halign: 'center' },
                    { field: 'ManagerName', title: 'Manager Name', width: 180, halign: 'center' }
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        singleSelect: false, //是否单选 
        selectOnCheck: true, //如果设置为true，单击一个复选框，将始终选择行
        checkOnSelect: true, //如果设置为true，选择一行,复选框将被选中
        animate: true,
        rownumbers: true,
        loadFilter: treegrid1LoadFilter, //返回过滤的数据显示
        height: $(window).height() - 50,
        onBeforeExpand: function (rowData) {
            $("#treegrid1").treegrid("options").url = "GetDepartmentTreeList.ashx?" + $.param({ First: false, TreeType: rowData.TreeType, Id: rowData.Id });
            $("#treegrid1").data("First", false);
            return true;
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        }
    });
    $(window).resize();
});

function treegrid1LoadFilter(data) {
    var isFirst = $("#treegrid1").data("First");
    if (isFirst) {
        $.each(data.rows, function (i, t) {
            t.Created_Date = serializerStringConvertDate(t.Created_Date);
            t.Modified_Date = serializerStringConvertDate(t.Modified_Date);
        });
    } else {
        $.each(data, function (i, t) {
            t.Created_Date = serializerStringConvertDate(t.Created_Date);
            t.Modified_Date = serializerStringConvertDate(t.Modified_Date);
        });
    }
    var data1 = escapeHtmlData(data);
    return data1;
}

function buttonOk_click() {
    var arrayDatas = [];
    var rowDatas = $('#treegrid1').treegrid("getData");
    getRowsData(rowDatas[0], arrayDatas);

    var selectScopes = [];
    var checkeds = $(":checkbox:checked[name='Select']", $('#treegrid1').treegrid("getPanel"));
    checkeds.each(function (i) {
        var scopeId = $(this).attr("ScopeId");
        $.each(arrayDatas, function (j, arrayData) {
            if (scopeId == arrayData.Id) {
                selectScopes.push(arrayData);
            }
        });
    });

    if (selectScopes.length == 0) {
        //未选中行，不处理
        return;
    }

    parent.$.QDialog.hide(selectScopes);
}


function getRowsData(rowData, arrayDatas) {
    arrayDatas.push(rowData);
    if (rowData.children == undefined || rowData.children == null || rowData.children.length ==0) {
        return;
    }
    $.each(rowData.children, function (i, childrenData) {
        getRowsData(childrenData, arrayDatas);
    });
}

function buttonCancel_click() {
    parent.$.QDialog.hide(null);
}