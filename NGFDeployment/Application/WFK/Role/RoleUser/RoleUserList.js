/// <reference name="ITS.WebFramework.CommonResource.Scripts.References.js" assembly="ITS.WebFramework.CommonResource" />

var pageParameterRoleid;
var pageParameterPageAction;
var pageParameterRoleName;
var pageParameterRoleType;
var pageParameterIsOrgAdmin;

$(function () {
    pageParameterRoleid = $.url('?roleid');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterRoleName = $.url('?name');
    pageParameterRoleType = $.url('?roleType');
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
            title: 'Role User New'
        },
        {
            url: "RoleUserNew.aspx?" + $.param({ PageAction: pageAction.New, roleid: pageParameterRoleid }),
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    inquiryData(); //数据改变时，重新获取栏位信息
                    //$('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
}
function datagrid1Edit() {
    var roleUserDTO = $("#datagrid1").datagrid("getSelected");
    if (roleUserDTO == null) {
        //未选中行，不处理
        return;
    }
    $.QDialog.show(
        {
            title: 'Role User Maintain'
        },
        {
            url: "RoleUserMaintain.aspx?" + $.param({ PageAction: pageAction.Edit,
                id: roleUserDTO.User_Id, RoleId: roleUserDTO.Role_Id, isOrgAdmin: pageParameterIsOrgAdmin
            }),
            width: 0.8,
            height: 0.7,
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    inquiryData(); //数据改变时，重新获取栏位信息
                    //$('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
}
function datagrid1Delete() {
    var roleUserDTO = $("#datagrid1").datagrid("getSelected");
    if (roleUserDTO == null) {
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
                url: "RoleUserService.asmx/DeleteBaseRoleUser",
                data: $.toJSON({ id: roleUserDTO.Id }),
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
    var queryurl = "GetRoleUserList.ashx?" + $.param(vArguments);
    return queryurl;
}


function inquiryData() {
    var queryurl = getQueryUrl();
    var toolbar = [];
    var dynamicsColums = []; //动态栏位

    if ($.trim(queryurl) == "") {
        return;
    }

    if ($.trim(pageParameterRoleName).toLowerCase() != "everyone") {
        if (pageParameterPageAction == pageAction.Edit && ($.trim(pageParameterRoleName).toLowerCase() != "everyone" || $.trim(pageParameterRoleType).toLowerCase() != "system")) {
            toolbar = [
            {
                text: 'Add',
                iconCls: 'icon-add',
                handler: datagrid1Add
            },
            '-',
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
        ];
        };
    }
    //1.加载动态栏位
    dynamicsColums = [
                    { field: 'Real_Name', title: 'Real Name', width: 100, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.User.Real_Name;
                        }
                    },
                    { field: 'Employee_No', title: 'Employee No', width: 100, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.User.Employee_No;
                        }
                    },
                    { field: 'IsStaff', title: 'Is Staff', width: 50, halign: 'center',
                        align: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            var str = '<input type="checkbox" disabled="true" ';
                            if (rowData.User.IsStaff == true) {
                                str += ' checked="checked" ';
                            }
                            str += ' ></input>';
                            return str;
                        }
                    },
                    { field: 'Email', title: 'Email', width: 120, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.User.Email;
                        }
                    },
                    { field: 'Mobil_Phone', title: 'Mobil Phone', width: 120, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.User.Mobil_Phone;
                        }
                    },
                    { field: 'Telphone', title: 'Telphone', width: 120, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.User.Telphone;
                        }
                    },
                    { field: 'Company', title: 'Company', width: 120, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.User.Company;
                        }
                    },
                    { field: 'Department_Code', title: 'Department Code', width: 120, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.User.Department_Code;
                        }
                    },
                    { field: 'Title', title: 'Title', width: 120, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.User.Title;
                        }
                    },
                    { field: 'Gender', title: 'Gender', width: 50, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.User.Gender;
                        }
                    }];
    $.qajax({
        url: queryurl,
        async: false, //同步方式调用。
        success: function (result) {
            if (result != "" && result.rows.length != 0) {
                var roleUserObj = result.rows[0];
                //1.动态加载栏位title
                for (var i = 1; i <= 10; i++) {
                    if (roleUserObj.Role["User_Property_Name_" + i] != "" && roleUserObj.Role["User_Property_Name_" + i] != undefined) {
                        var field = { field: 'User_Property_Value_' + i, title: roleUserObj.Role["User_Property_Name_" + i], width: 120, align: 'center'
                                                    , formatter: function (value, rowData, rowIndex) {
                                                        return value;
                                                    }
                        };
                        dynamicsColums.push(field);
                    }
                }
            }
        }
    });
    //2.datagrid数据绑定在field加载完毕之后
    //datagrid初始化
    $('#datagrid1').datagrid({
        frozenColumns: [[
                    { field: 'Org', title: 'Org', width: 80, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.User.Org;
                        }
                    },
                    { field: 'User_Name', title: 'User Name', width: 100, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            var str = '<a href="../../OrgUser/User/UserFrame.aspx?' + $.param({ id: rowData.User.User_Id }) + '" target="_blank">' + rowData.User.User_Name + '</a>';
                            return str;
                        }
                    }
                ]],
        columns: [dynamicsColums],
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
        toolbar: toolbar,
        onDblClickRow: datagrid1Edit
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    return;
}

//datagrid1 end-------------------------------------------------------


