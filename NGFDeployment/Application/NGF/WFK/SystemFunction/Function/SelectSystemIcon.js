$(function () {
    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    $("#buttonOk").on("click", buttonOk_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    var width = $("#divMainContent").width();
    var height = $(window).height() - $("#divHead").height() - 30;
    //datagrid初始化
    $('#datagrid1').datagrid({
        url: "GetSystemIconList.ashx",
        idField: 'Name',
        columns: [[
                    { field: 'name', title: 'Name', width: 300, halign: 'center' },
                    { field: 'Image', title: 'Image', width: 300, halign: 'center', align: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            //var str = '<image src="SystemIcon/' + rowData.name + '"/>';
                            //return str;

                            var str = '<img src="./res.its?icon=' + rowData.name + '"/>';
                            return str;
                        }
                    }
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的
        remoteSort: false, //定义是否从服务器给数据排序。
        singleSelect: true, //是否单选 
        rownumbers: true, //行号
        width: width,
        height: height,
        pagination: true, //分页控件 
        pagePosition: "top", //定义的分页栏的位置
        pageNumber: 1, //当设置了 pagination 特性时，初始化页码。
        pageSize: getDatagridPageSize($('#datagrid1')),   //当设置了 pagination 特性时，初始化页码尺寸。
        pageList: [10, 15, 20, 50, 100], //当设置了 pagination 特性时，初始化页面尺寸的选择列表。
        loadFilter: function (data) {
            var data1 = escapeHtmlData(data);
            return data1;
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        onDblClickRow: dblClickRow
    });
    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    $(window).resize();
});

function dblClickRow() {
    var returnvalue = $("#datagrid1").datagrid("getSelected");
    if (returnvalue == null) {
        //未选中行，不处理
        return;
    }
    parent.$.QDialog.hide(returnvalue);
}

function buttonOk_click() {
    dblClickRow();
}

function buttonCancel_click() {
    parent.$.QDialog.hide(null);
}