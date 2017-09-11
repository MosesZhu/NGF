var $selectOrg;
var $selectProduct;
var $selectPosition;
var $textName;
var $selectTarget;
var $textDescription;
var $textSortCode;

//--分割线------------------------------------------------------------------------------------------------------------
$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectPosition = $("#selectPosition");
    $textName = $("#textName");
    $selectTarget = $("#selectTarget");
    $textDescription = $("#textDescription");
    $textSortCode = $("#textSortCode");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    //select绑定
    selectOrgDataBind();
    selectProductDataBind();
    selectPositionDataBind();
    selectTargetDataBind();

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonNew").on("click", buttonNew_click);
});

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectProductDataBind() {
    selectDataBind({
        $select: $selectProduct,
        url: "../../SystemFunction/Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectPositionDataBind() {
    selectDataBind({
        $select: $selectPosition,
        url: "PortalLinkService.asmx/GetPositionList",
        itemType: "string"
    });
}

function selectTargetDataBind() {
    selectDataBind({
        $select: $selectTarget,
        url: "../../SystemFunction/Function/FunctionService.asmx/GetTargetList",
        itemType: "string"
    });
}

//------分割线---------------------------------------------------------------------------------

function buttonNew_click() {
    openPortalLinkMaintain("", pageAction.New, "");
    return;
}

function datagrid1Edit() {
    var portalLinkDTO = $("#datagrid1").datagrid("getSelected");
    if (portalLinkDTO == null) {
        //未选中行，不处理
        return;
    }
    openPortalLinkMaintain(portalLinkDTO.Id, pageAction.Edit, portalLinkDTO.IsOrgAdmin);

    return;
}

function openPortalLinkMaintain(id, action, isOrgAdmin) {
    $.QDialog.show(
        {
            title: 'Portal Link Maintain'
        },
        {
            url: "PortalLinkMaintain.aspx?" + $.param({ PageAction: action, id: id, isOrgAdmin: isOrgAdmin }),
            width: 0.8,
            height: 0.8,
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
    var portalLinkDTO = $("#datagrid1").datagrid("getSelected");
    if (portalLinkDTO == null) {
        //未选中行，不处理
        return;
    }

    if (!portalLinkDTO.IsOrgAdmin) {
        $.messager.alert("Warning", "You don't have permession to delete because you're not this org admin!", "warning");
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to delete?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "PortalLinkService.asmx/DeletePortalLink",
                    data: $.toJSON({ id: portalLinkDTO.Id }),
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

//datagrid1 begin------------------------------------------------------------------------

function getQueryUrl() {
    var vArguments = {
        OrgId: $.trim($selectOrg.val()),
        ProductId: $.trim($selectProduct.val()),
        Position: $.trim($selectPosition.val()),
        Name: encodeURI($.trim($textName.val())),
        Target: $.trim($selectTarget.val()),
        Description: encodeURI($.trim($textDescription.val())),
        SortCode: $.trim($textSortCode.val())
    };

    var queryurl = "GetPortalLinkList.ashx?" + $.param(vArguments);
    return queryurl;
}

function buttonInquiry_click() {
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'Org', title: 'Org', width: 100, halign: 'center' },
                    { field: 'Product', title: 'Product', width: 100, halign: 'center' },
                    { field: 'Position', title: 'Position', width: 100, halign: 'center' },
                    { field: 'Name', title: 'Name', width: 100, halign: 'center' },
                    { field: 'Description', title: 'Description', width: 180, halign: 'center' },
                    { field: 'Navigate_Url', title: 'Navigate Url', width: 180, halign: 'center' },
                    { field: 'Target', title: 'Target', width: 100, halign: 'center' },
                    { field: 'Sort_Code', title: 'Sort Code', width: 100, halign: 'center' }
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
//datagrid1 end-------------------------------------------------------