var pageParameterDepartmentId = $.url('?departmentid');

$(function () {
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));
    $(window).on("resize", function () {
        var datagriddata = $("#datagrid1").data("datagrid");
        if (datagriddata) {
            $("#datagrid1").datagrid("resize", { height: $(window).height() - 20 });
        }
    });
    
    buildDatagrid();
    $(window).resize();
});

//datagrid1 begin-------------------------------------------------------

function buildDatagrid() {
    var queryurl = "GetDepartmentUserList.ashx?" + $.param({ departmentId: pageParameterDepartmentId });
    
    //datagrid初始化
    $('#datagrid1').datagrid({
        frozenColumns: [[
                    { field: 'Org', title: 'Org', width: 80, halign: 'center' },
                    { field: 'User_Name', title: 'User Name', width: 100, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            var str = '<a href="../User/UserFrame.aspx?' + $.param({ id: rowData.User_Id }) + '" target="_blank">' + value + '</a>';
                            return str;
                        }
                    }
                ]],
        columns: [[
                    { field: 'Real_Name', title: 'Real Name', width: 100, halign: 'center' },
                    { field: 'Employee_No', title: 'Employee No', width: 100, halign: 'center' },
                    { field: 'IsStaff', title: 'Is Staff', width: 50, halign: 'center',
                        align: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            var str = '<input type="checkbox" disabled="true" ';
                            if (value == true) {
                                str += ' checked="checked" ';
                            }
                            str += ' ></input>';
                            return str;
                        }
                    },
                    { field: 'Email', title: 'Email', width: 120, halign: 'center' },
                    { field: 'Mobil_Phone', title: 'Mobil Phone', width: 120, halign: 'center' },
                    { field: 'Telphone', title: 'Telphone', width: 120, halign: 'center' },
                    { field: 'Company', title: 'Company', width: 120, halign: 'center' },
                    { field: 'Department_Code', title: 'Department Code', width: 120, halign: 'center' },
                    { field: 'Title', title: 'Title', width: 120, halign: 'center' },
                    { field: 'Gender', title: 'Gender', width: 50, halign: 'center' }
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'User_Id', //标识字段。
        singleSelect: true, //是否单选 
        rownumbers: true, //行号 
        pagination: true, //分页控件 
        pagePosition: "top", //定义的分页栏的位置
        pageNumber: 1, //当设置了 pagination 特性时，初始化页码。
        pageSize: getDatagridPageSize($('#datagrid1')),   //当设置了 pagination 特性时，初始化页码尺寸。
        pageList: [10, 15, 20, 50, 100], //当设置了 pagination 特性时，初始化页面尺寸的选择列表。
        height: $(window).height() - 20,
        onLoadSuccess: function (data) {
            $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        }
    });

    return;
}
//datagrid1 end-------------------------------------------------------