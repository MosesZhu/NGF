var $textValidDate;
var isOrgAdmin;

$(function () {
    $textValidDate = $("#textValidDate");
    $(window).on("resize", function () {
        $textValidDate.datebox("resize", $textValidDate.parent("td").width() * 0.99);
    });

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    $(window).resize();

    initializeData();

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonReset").on("click", buttonReset_click);
    $("#buttonNew").on("click", buttonNew_click);
});

function initializeData() {
    $textValidDate.datebox("setValue", dateformatter(new Date()));
}

function buttonNew_click() {
    openDataPermissionMaintain("", pageAction.New);
    return;
}

function datagrid1Edit() {
    var baseDataPermissionDTO = $("#datagrid1").datagrid("getSelected");
    if (baseDataPermissionDTO == null) {
        //未选中行，不处理
        return;
    }

    openDataPermissionMaintain(baseDataPermissionDTO.Id, pageAction.Edit);

    return;
}

function openDataPermissionMaintain(id, action) {

    $.QDialog.show(
            {
                title: 'Data Permission Maintain'
            },
            {
                url: "DataPermissionMaintain.aspx?" + $.param({ PageAction: action, id: id, isOrgAdmin: isOrgAdmin }),
                width: 0.9,
                height: 0.9,
                onCloseCallback: function (returnValue) {
                    if (returnValue == true) {
                        //$("#buttonInquiry").click();
                        $('#datagrid1').datagrid("reload");
                        $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                    }
                }
            }
        );
}

function datagrid1Delete() {
    var baseDataPermissionDTO = $("#datagrid1").datagrid("getSelected");
    if (baseDataPermissionDTO == null) {
        //未选中行，不处理
        return;
    }

    if (!isOrgAdmin) {
        $.messager.alert("Warning", "You don't have permession to delete because you're not this org admin!", "warning");
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to delete?", function (confirmresult) {
        if (confirmresult == true) {

            $.qajax({
                url: "DataPermissionService.asmx/DeleteBaseDataPermission",
                data: $.toJSON({ id: baseDataPermissionDTO.Id }),
                success: function (result) {
                    if ($.trim(result.d) == "") {
                        //$("#buttonInquiry").click();
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
    var isValid = true;

    if (!$textValidDate.datebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return "";
    }

    var vArguments =
        {
            Org_Id: $.trim($selectPermissionOrg.val()),
            Data_Source_Id: $.trim($selectDataSource.val()),
            Data_Id: $.trim($selectData.val()),
            Subject_Category: $.trim($selectSubjectCategory.val()),
            Subject_Id: $.trim($hiddenSubjectId.val()),
            ValidDate: $.trim($textValidDate.datebox("getValue")),
            Permission_Mode_Id: $.trim($selectPermissionMode.val())
        };

    var queryurl = "GetBaseDataPermissionList.ashx?" + $.param(vArguments);
    return queryurl;
}

function buttonInquiry_click() {
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    if ($.trim($selectPermissionOrg.val()) == "") {
        $.messager.alert("Warning", "Permission Org can't be empty!", "warning");
        return;
    }

    if ($.trim($selectPermissionProduct.val()) == "") {
        $.messager.alert("Warning", "Permission Product can't be empty!", "warning");
        return;
    }

    if ($.trim($selectPermissionMode.val()) == "") {
        $.messager.alert("Warning", "Permission Mode can't be empty!", "warning");
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        frozenColumns: [[
                    { field: 'PermissionOrg', title: 'Permission Org', width: 120, halign: 'center' },
                    { field: 'PermissionProduct', title: 'Permission Product', width: 120, halign: 'center' },
                    { field: 'Subject_Category', title: 'Subject Category', width: 100, halign: 'center' },
                    { field: 'SubjectName', title: 'Subject Name', width: 100, halign: 'center' }
                ]],
        columns: [[
                    { field: 'DataSource', title: 'Data Source', width: 100, halign: 'center' },
                    { field: 'Data', title: 'Data', width: 100, halign: 'center' },
                    { field: 'PermissionMode', title: 'Permission Mode', width: 100, halign: 'center' },
                    { field: 'AuthorizedValues', title: 'Authorized Values', width: 200, halign: 'center' },
                    { field: 'Effective_Date', title: 'Effective Date', width: 100, halign: 'center',
                        formatter: function (value, row, index) {
                            return dateformatter(value);
                        }
                    },
                    { field: 'Expiration_Date', title: 'Expiration Date', width: 100, halign: 'center',
                        formatter: function (value, row, index) {
                            return dateformatter(value);
                        }
                    }
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl1, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'Id', //标识字段。
        singleSelect: true, //是否单选 
        rownumbers: true, //行号 
        pagination: true, //分页控件 
        pagePosition: "top", //定义的分页栏的位置
        pageNumber: 1, //当设置了 pagination 特性时，初始化页码。
        pageSize: getDatagridPageSize($('#datagrid1')),   //当设置了 pagination 特性时，初始化页码尺寸。
        pageList: [10, 15, 20, 50, 100], //当设置了 pagination 特性时，初始化页面尺寸的选择列表。
        loadFilter: datagrid1LoadFilter, //返回过滤的数据显示
        onBeforeLoad: function (param) {
            var queryurl2 = getQueryUrl();
            if ($.trim(queryurl2) == "") {
                return false;
            }
            $('#datagrid1').datagrid('options').url = queryurl2;
            return true;
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        toolbar: [
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
                ],
        onDblClickRow: datagrid1Edit
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    var orgId = $.trim($selectPermissionOrg.val());
    $.qajax({
        async: false,
        url: "../../OrgUser/Org/OrgService.asmx/IsCurrentUserOrgAdmin",
        data: $.toJSON({ orgId: orgId }),
        success: function (result) {
            isOrgAdmin = result.d;
        }
    });

    $(window).resize();

    return;
}

function datagrid1LoadFilter(data) {
    $.each(data.rows, function (i, t) {
        t.Effective_Date = serializerStringConvertDate(t.Effective_Date);
        t.Expiration_Date = serializerStringConvertDate(t.Expiration_Date);
        t.Created_Date = serializerStringConvertDate(t.Created_Date);
        t.Modified_Date = serializerStringConvertDate(t.Modified_Date);
    });

    var data1 = escapeHtmlData(data);
    return data1;
}

function buttonReset_click() {
    $selectPermissionOrg.val("");
    selectPermissionOrg_change();
    $selectPermissionProduct.val("");
    //$selectOrg.val("");
    //selectOrg_change();
    $selectSubjectCategory.val("");
    $textSubjectName.val("");
    $hiddenSubjectId.val("");
    $hiddenResourceId.val("");
}
//datagrid1 end-------------------------------------------------------

