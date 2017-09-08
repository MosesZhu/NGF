var pageParameterRoleid = $.url('?roleid');
var pageParameterPageAction = $.url('?PageAction');
var pageParameterRoleName = $.url('?name');
var pageParameterRoleType = $.url('?roleType');

$(function () {
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
    $.QDialog.show(
        {
            title: 'Role Department New'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "RoleDepartmentNew.aspx?" + $.param({ PageAction: pageAction.New, roleid: pageParameterRoleid }),
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    //$("#buttonInquiry").click();
                    //inquiryData();
                    $('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
}

function datagrid1Delete() {
    var roleDepartmentDTO = $("#datagrid1").datagrid("getSelected");
    if (roleDepartmentDTO == null) {
        //未选中行，不处理
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to delete?", function (confirmresult) {
        if (confirmresult == true) {
            $.qajax({
                url: "RoleDepartmentService.asmx/DeleteBaseRoleDepartment",
                data: $.toJSON({ id: roleDepartmentDTO.Id }),
                success: function (result) {
                    if (result.d == "") {
                        //$("#buttonInquiry").click();
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
function getQueryUrl() {
    var vArguments = { RoleId: pageParameterRoleid };
    var queryurl = "GetRoleDepartmentList.ashx?" + $.param(vArguments);
    return queryurl;
}

function inquiryData() {
    var queryurl = getQueryUrl();
    if ($.trim(queryurl) == "") {
        return;
    }

    var toolbar = [];
    if (pageParameterPageAction == pageAction.Edit && (pageParameterRoleName.toLowerCase() != "everyone" || pageParameterRoleType.toLowerCase() != "system")) {
        toolbar = [
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
        ];
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        frozenColumns: [[
                    { field: 'Org', title: 'Org', width: 80, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.Department.Org;
                        }
                    },
                    { field: 'Parent_Deptartment_Code', title: 'Parent', width: 80, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.Department.Parent_Deptartment_Code;
                        }
                    },
                    { field: 'Department_Code', title: 'Department Code', width: 120, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            var str = '<a href="../../OrgUser/Department/DepartmentFrame.aspx?' + $.param({ id: rowData.Department.Id }) + '" target="_blank">' + rowData.Department.Department_Code + '</a>';
                            return str;
                        }
                    }
                ]],
        columns: [[
                    { field: 'Department_Name', title: 'Department Name', width: 120, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.Department.Department_Name;
                        }
                    },
                    { field: 'Real_Name', title: 'Real Name', width: 150, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.Department.Real_Name;
                        }
                    },
                    { field: 'Description', title: 'Description', width: 150, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.Department.Description;
                        }
                    },
                    { field: 'Level', title: 'Level', width: 50, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.Department.Level;
                        }
                    },
                    { field: 'ManagerName', title: 'ManagerName', width: 100, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.Department.ManagerName;
                        }
                    },
                    { field: 'IsVirtualDepartment', title: 'Is Virtual', width: 60, halign: 'center',
                        align: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            var str = '<input type="checkbox" disabled="true" ';
                            if (rowData.Department.IsVirtualDepartment == true) {
                                str += ' checked="checked" ';
                            }
                            str += ' ></input>';
                            return str;
                        }
                    }
                ]],
        nowrap: true, //True 就会把数据显示在一行里。
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
        toolbar: toolbar
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
    
    return;
}
//datagrid1 end-------------------------------------------------------