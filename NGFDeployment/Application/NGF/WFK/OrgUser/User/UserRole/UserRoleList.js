var pageParameterUserId;
var pageParameterIsOrgAdmin;

$(function () {
    pageParameterUserId = $.url('?userId');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    datagrid_autoresize($("#divMainContent"), $("#treegrid1"));
    $(window).on("resize", function () {
        var datagriddata = $("#treegrid1").data("datagrid");
        if (datagriddata) {
            $("#treegrid1").datagrid("resize", { height: $(window).height() - 30 });
        }
    });

    inquiryData();
});


function getQueryUrl() {
    var vArguments = { UserId: pageParameterUserId };
    var queryurl = "GetUserRoleList.ashx?" + $.param(vArguments);
    return queryurl;
}

function inquiryData() {
    var queryurl = getQueryUrl();
    if ($.trim(queryurl) == "") {
        return;
    }

    $('#divDetail').hide();
    $('#treegrid1').treegrid({
        url: queryurl,
        idField: 'Role_Id',
        treeField: 'RoleName',
        frozenColumns: [[
                    { field: 'Select', checkbox: true, width: 50, halign: 'center', align: 'center' },
                    { field: 'RoleName', title: 'Role', width: 400, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            if ($.trim(rowData.Role.Parent_Role_Id) == "") {
                                return value;
                            }
                            else {
                                var str = '<a href="../../../Role/Role/RoleFrame.aspx?' + $.param({ PageAction: pageAction.View, id: rowData.Role_Id }) + '" target="_blank">' + value + '</a>';
                                return str;
                            }
                        }
                    }
                ]],
        columns: [[
                    { field: 'Description', title: 'Description', width: 200, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.Role.Description;
                        }
                    },
                    { field: 'Role_Type', title: 'Role Type', width: 100, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.Role.Role_Type;
                        }
                    },
                    { field: 'Role_Cardinality', title: 'Role Cardinality', width: 100, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return rowData.Role.Role_Cardinality;
                        }
                    }
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        singleSelect: false, //是否单选 
        selectOnCheck: true, //如果设置为true，单击一个复选框，将始终选择行
        checkOnSelect: true, //如果设置为true，选择一行,复选框将被选中
        animate: true,
        rownumbers: true,
        loadFilter: treegrid1LoadFilter, //返回过滤的数据显示
        onLoadSuccess: function (row, data) {
            if (data) {
                $.each(data.rows, function (index, item) {
                    if (item.Select) {
                        $('#treegrid1').treegrid('select', item.Role_Id);
                    }
                });
            }
            $('#divDetail').show();
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        toolbar: [
                    {
                        text: 'Save',
                        iconCls: 'icon-save',
                        handler: treegrid1Save
                    },
                    '-'
                ]
    });

    $(window).resize();
}

function treegrid1LoadFilter(data) {
    $.each(data.rows, function (i, t) {
        t.Created_Date = serializerStringConvertDate(t.Created_Date);
        t.Modified_Date = serializerStringConvertDate(t.Modified_Date);

        t.Role.Created_Date = serializerStringConvertDate(t.Role.Created_Date);
        t.Role.Modified_Date = serializerStringConvertDate(t.Role.Modified_Date);

        t.User.Created_Date = serializerStringConvertDate(t.User.Created_Date);
        t.User.Modified_Date = serializerStringConvertDate(t.User.Modified_Date);
    });
    var data1 = escapeHtmlData(data);
    return data1;
}


function treegrid1Save() {
    if (pageParameterIsOrgAdmin == "false") {
        $.messager.alert("Warning", "You don't have permission to save beacuse you're not this org admin!", "warning");
        return;
    }
    var baseRoleUserDTOSelected = $("#treegrid1").treegrid("getSelections");

    $.qajax({
        url: "../../../Role/RoleUser/RoleUserService.asmx/SaveBaseRoleUsers",
        data: $.toJSON({ userId: pageParameterUserId, baseRoleUserDTOSelected: baseRoleUserDTOSelected }),
        success: function (result) {
            if ($.trim(result.d) == "") {
                inquiryData();
                $.messager.alert("Information", "Save success!", "info");
            }
            else {
                $.messager.alert("Save failed", result.d, "error");
            }
        }
    });

    return;
}