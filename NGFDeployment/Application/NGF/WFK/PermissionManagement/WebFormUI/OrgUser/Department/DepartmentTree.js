$(function () {
    datagrid_autoresize($("#divMainContent"), $("#treegrid1"));

    $(window).on("resize", function () {
        var datagriddata = $("#treegrid1").data("datagrid");
        if (datagriddata) {
            $("#treegrid1").datagrid("resize", { height: $(window).height() - 50 });
        }
    });

    var baseurl = "GetDepartmentTreeList.ashx?" + $.param({ First: true, TreeType: "Root" });
    $('#treegrid1').treegrid({
        url: baseurl,
        idField: 'Id',
        treeField: 'Department_Code',
        columns: [[
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
        striped: true,
        singleSelect: true,
        animate: false,
        height: $(window).height() - 50,
        onBeforeExpand: function (rowData) {
            $("#treegrid1").treegrid("options").url = "GetDepartmentTreeList.ashx?" + $.param({ First: false, TreeType: rowData.TreeType, Id: rowData.Id });
            return true;
        },
        loadFilter: function (data) {
            var data1 = escapeHtmlData(data);
            return data1;
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        }
    });

    $(window).resize();
});