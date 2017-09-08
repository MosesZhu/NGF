var $selectOrg;
var $selectProduct;
var $selectAuthenticationType;
var authenticationTypeList;

$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectAuthenticationType = $("#selectAuthenticationType");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    selectOrgDataBind();
    selectProductDataBind();
    selectAuthenticationTypeDataBind();

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonNew").on("click", buttonNew_click);
});

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectProductDataBind() {
    selectDataBind({
        $select: $selectProduct,
        url: "../../SystemFunction/Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectAuthenticationTypeDataBind() {
    selectDataBind({
        $select: $selectAuthenticationType,
        url: "SSOPortalService.asmx/GetAuthenticationTypeList",
        itemValue: "Authentication_Type",
        itemText: "AuthenticationType",
        async: false //同步方式调用。
    });
}

function buttonNew_click() {
    openSsoPortalMaintain("", pageAction.New, $selectOrg.val(), $selectProduct.val(), $selectAuthenticationType.val());
    return;
}

function datagrid1Edit() {
    var ssoPortalDTO = $("#datagrid1").datagrid("getSelected");
    if (ssoPortalDTO == null) {
        //未选中行，不处理
        return;
    }
    openSsoPortalMaintain(ssoPortalDTO.Id, pageAction.Edit, "", "", "");

    return;
}

function openSsoPortalMaintain(id, action, orgId, productId, authenticationType) {
    $.QDialog.show(
        {
            title: 'SSO Portal Maintain'
        },
        {
            url: "SSOPortalMaintain.aspx?" + $.param({ PageAction: action, id: id, orgId: orgId, productId: productId,
                authenticationType: authenticationType
            }),
            width: 0.75,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    $('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
}

function datagrid1Delete() {
    var ssoPortalDTO = $("#datagrid1").datagrid("getSelected");
    if (ssoPortalDTO == null) {
        //未选中行，不处理
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to delete?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "SSOPortalService.asmx/DeleteSSOPortal",
                    data: $.toJSON({ id: ssoPortalDTO.Id }),
                    success: function (result) {
                        if ($.trim(result.d) == "") {
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
        }
    );
    return;
}

//datagrid1 begin-------------------------------------------------------
function getQueryUrl() {
    var vArguments = {
        OrgId: encodeURI($.trim($selectOrg.val())),
        ProductId: encodeURI($.trim($selectProduct.val())),
        AuthenticationType: encodeURI($.trim($selectAuthenticationType.val()))
    };

    var queryurl = "GetSSOPortalList.ashx?" + $.param(vArguments);
    return queryurl;
}

function buttonInquiry_click() {
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }
    getAuthenticationTypeList();

    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'Org_Name', title: 'Org', width: 45, halign: 'center' },
                    { field: 'Product_Name', title: 'Product', width: 49, halign: 'center' },
                    { field: 'Authentication_Type', title: 'Authentication Type', width: 110, halign: 'center',
                        formatter: function (value, row, index) {
                            return typeConvert(value);
                        }
                    },
                    { field: 'Portal_Internal_Url', title: 'Portal Internal Url', width: 105, halign: 'center' },
                    { field: 'Portal_Internal_Url_Backup1', title: 'Portal Internal Url1', width: 107, halign: 'center' },
                    { field: 'Portal_Internal_Url_Backup2', title: 'Portal Internal Url2', width: 107, halign: 'center' },
                    { field: 'Portal_Internal_Url_Backup3', title: 'Portal Internal Url3', width: 107, halign: 'center' },
                    { field: 'Portal_External_Url', title: 'Portal External Url', width: 105, halign: 'center' },
                    { field: 'Portal_External_Url_Backup1', title: 'Portal External Url1', width: 110, halign: 'center' },
                    { field: 'Portal_External_Url_Backup2', title: 'Portal External Url2', width: 110, halign: 'center' },
                    { field: 'Portal_External_Url_Backup3', title: 'Portal External Url3', width: 110, halign: 'center' }
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

    $(window).resize();

    return;
}

function getAuthenticationTypeList() {
    $.qajax({
        url: "SSOPortalService.asmx/GetAuthenticationTypeList",
        success: function (result) {
            authenticationTypeList = result.d;
        }
    });
}

function typeConvert(type) {
    var result;
    if (authenticationTypeList != undefined && authenticationTypeList.length >= type && type >= 1) {
        if (authenticationTypeList[type - 1].Authentication_Type == type) {
            result = authenticationTypeList[type - 1].AuthenticationType;
        }
        else {
            $(authenticationTypeList).each(function (i) {
                if (authenticationTypeList[i].Authentication_Type == type) {
                    result = authenticationTypeList[i].AuthenticationType;
                    return false;
                }
            })
        }
        return result;
    }
    return type;
}
//datagrid1 end-------------------------------------------------------