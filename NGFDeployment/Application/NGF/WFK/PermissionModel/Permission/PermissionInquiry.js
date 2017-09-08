var isOrgAdmin;
$(function () {
    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    $("#selectResourceCategory").on("change", selectResourceCategory_change);

    //默认初始时不显示
    selectResourceCategory_change();

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonReset").on("click", buttonReset_click);
});

function selectResourceCategory_change() {
    var resourceCategory = $selectResourceCategory.val();
    if ($.trim(resourceCategory).toLowerCase() == "system") {
        $("#trProductDomain").show();
        $("#trSystemFunction").hide();
        $("#trDatasourceDatatable").hide();
    } else if ($.trim(resourceCategory).toLowerCase() == "function") {
        $("#trProductDomain").show();
        $("#trSystemFunction").show();
        $("#spanFunction").hide();
        $("#textFunction").hide();
        $("#trDatasourceDatatable").hide();
    } else if ($.trim(resourceCategory).toLowerCase() == "operation") {
        $("#trProductDomain").show();
        $("#trSystemFunction").show();
        $("#spanFunction").show();
        $("#textFunction").show();
        $("#trDatasourceDatatable").hide();
    } else if ($.trim(resourceCategory).toLowerCase() == "sensitivecolumn") {
        $("#trProductDomain").hide();
        $("#trSystemFunction").hide();
        $("#trDatasourceDatatable").show();
    } else {
        $("#trProductDomain").hide();
        $("#trSystemFunction").hide();
        $("#trDatasourceDatatable").hide();
    }
}

function datagrid1Edit() {
    var basePermissionDTO = $("#datagrid1").datagrid("getSelected");

    if (basePermissionDTO == null) {
        //未选中行，不处理
        return;
    }

    $.QDialog.show(
        {
            title: 'Permission Maintain'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "PermissionMaintain.aspx?" + $.param({ id: basePermissionDTO.Id, isOrgAdmin: isOrgAdmin }),
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    //$("#buttonInquiry").click();
                    $('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );

    return;
}

function datagrid1Delete() {
    var basePermissionDTO = $("#datagrid1").datagrid("getSelected");
    if (basePermissionDTO == null) {
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
                url: "PermissionService.asmx/DeleteBasePermission",
                data: $.toJSON({ id: basePermissionDTO.Id }),
                success: function (result) {
                    if (result.d == "") {
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
    var vArguments = {
        Permission_Mode_Id: $.trim($selectPermissionMode.val()),
        Subject_Category: $.trim($selectSubjectCategory.val()),
        Subject_Id: $.trim($hiddenSubjectId.val()),
        Subject_Name: $.trim($textSubjectName.val()),
        //Resource_Org_Id: $.trim($selectResourceOrg.val()),
        Resource_Category: $.trim($selectResourceCategory.val()),
        Resource_Id: $.trim($hiddenResourceId.val()),
        Resource_Name: $.trim($textResourceName.val()),
        Name: encodeURI($.trim($textName.val())),
        Description: encodeURI($.trim($textDescription.val())),
        Product_Id: encodeURI($.trim($selectResourceProduct.val())),
        Domain_Id: encodeURI($.trim($selectResourceDomain.val())),
        System: encodeURI($.trim($textSystem.val())),
        Function: encodeURI($.trim($textFunction.val())),
        DataSource: encodeURI($.trim($textDataSource.val())),
        Datatable: encodeURI($.trim($textDatatable.val()))
    };

    var queryurl = "GetBasePermissionList.ashx?" + $.param(vArguments);

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

    if ($.trim($selectResourceCategory.val()) == "") {
        $.messager.alert("Warning", "Resource category can't be empty!", "warning");
        return;
    }

    var columnsArray = [[{ field: 'PermissionOrg', title: 'Permission Org', width: 120, halign: 'center' },
        { field: 'PermissionProduct', title: 'Permission Product', width: 120, halign: 'center' },
        { field: 'PermissionMode', title: 'Permission Mode', width: 100, halign: 'center' },
        { field: 'Subject_Category', title: 'Subject Category', width: 100, halign: 'center' },
        { field: 'Subject_Name', title: 'Subject', width: 100, halign: 'center' },
    //{ field: 'ResourceOrg', title: 'Resource Org', width: 80, halign: 'center' },
        {field: 'Resource_Category', title: 'Resource Category', width: 100, halign: 'center' }, ]];

    var columnsAdditional;
    var resourceCategory = $.trim($selectResourceCategory.val()).toLowerCase();
    if (resourceCategory == "system") {
        columnsAdditional = [[{ field: 'Product', title: 'Resource Product', width: 120, halign: 'center' },
            { field: 'Domain', title: 'Resource Domain', width: 120, halign: 'center' },
            { field: 'Resource_Name', title: 'Resource', width: 120, halign: 'center' },
            { field: 'Name', title: 'Permission', width: 100, halign: 'center' },
            { field: 'Description', title: 'Description', width: 100, halign: 'center' }
        ]];
    } else if (resourceCategory == "function") {
        columnsAdditional = [[{ field: 'Product', title: 'Resource Product', width: 120, halign: 'center' },
            { field: 'Domain', title: 'Resource Domain', width: 120, halign: 'center' },
            { field: 'System', title: 'System', width: 80, halign: 'center' },
            { field: 'Resource_Name', title: 'Resource', width: 120, halign: 'center' },
            { field: 'Name', title: 'Permission', width: 100, halign: 'center' },
            { field: 'Description', title: 'Description', width: 100, halign: 'center' }
        ]];
    } else if (resourceCategory == "operation") {
        columnsAdditional = [[{ field: 'Product', title: 'Resource Product', width: 120, halign: 'center' },
            { field: 'Domain', title: 'Resource Domain', width: 120, halign: 'center' },
            { field: 'System', title: 'System', width: 80, halign: 'center' },
            { field: 'Function', title: 'Function', width: 150, halign: 'center' },
            { field: 'Resource_Name', title: 'Resource', width: 120, halign: 'center' },
            { field: 'Name', title: 'Permission', width: 100, halign: 'center' },
            { field: 'Description', title: 'Description', width: 100, halign: 'center' }
        ]];
    } else {
        columnsAdditional = [[{ field: 'DataSource', title: 'DataSource', width: 100, halign: 'center' },
            { field: 'Datatable', title: 'Datatable', width: 150, halign: 'center' },
            { field: 'Resource_Name', title: 'Resource', width: 120, halign: 'center' },
            { field: 'Name', title: 'Permission', width: 100, halign: 'center' },
            { field: 'Description', title: 'Description', width: 100, halign: 'center' }
        ]];
    }
    var columnsAll = [columnsArray[0].concat(columnsAdditional[0])];
    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: columnsAll,
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
        onBeforeLoad: function (param) {
            var queryurl2 = getQueryUrl();
            if ($.trim(queryurl2) == "") {
                return false;
            }
            $('#datagrid1').datagrid('options').url = queryurl2;
            return true;
        },
        loadFilter: function (data) {
            var data1 = escapeHtmlData(data);
            return data1;
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

    $.qajax({
        async: false,
        url: "../../OrgUser/Org/OrgService.asmx/IsCurrentUserOrgAdmin",
        data: $.toJSON({ orgId: $.trim($selectPermissionOrg.val()) }),
        success: function (result) {
            isOrgAdmin = result.d;
        }
    });

    $(window).resize();

    return;
}

function buttonReset_click() {
    $selectPermissionOrg.val("");
    $selectPermissionProduct.val("");
    selectPermissionOrg_change();
    $selectSubjectCategory.val("");
    $hiddenSubjectId.val("");
    $textSubjectName.val("");
    //$selectResourceOrg.val("");
    $selectResourceCategory.val("");
    selectResourceCategory_change();
    $hiddenResourceId.val("");
    $textResourceName.val("");
    $textName.val("");
    $textDescription.val("");
    $selectResourceProduct.val("");
    selectResourceProduct_change();
}
//datagrid1 end-------------------------------------------------------
