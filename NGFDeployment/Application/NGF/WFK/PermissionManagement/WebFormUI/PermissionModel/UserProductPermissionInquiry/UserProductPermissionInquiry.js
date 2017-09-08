var $selectOrg;
var $selectProduct;
var $selectPermissionMode;
var $textUserName;
var $hiddenUserId;
var $selectDomain;
var $selectSystem;

$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectPermissionMode = $("#selectPermissionMode");
    $textUserName = $("#textUserName");
    $hiddenUserId = $("#hiddenUserId");
    $selectDomain = $("#selectDomain");
    $selectSystem = $("#selectSystem");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    //select绑定
    selectOrgDataBind();
    selectProductDataBind();

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $selectDomain.on("change", selectDomain_change);

    $textUserName.on("change", textUserName_change);
    $("#buttonSearchUser").on("click", buttonSearchUser_click);

    $("#buttonInquiry").on("click", buttonInquiry_click);

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

function selectDomainDataBind() {
    var productId = $.trim($selectProduct.val());
    if (productId == "") {
        $selectDomain.empty();
        $selectDomain.change();
        return;
    }

    selectDataBind({
        $select: $selectDomain,
        url: "../../SystemFunction/Domain/DomainService.asmx/GetDomainList",
        data: $.toJSON({ productId: productId }),
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectSystemDataBind() {
    var orgId = $.trim($selectOrg.val());
    var domainId = $.trim($selectDomain.val());
    if (orgId == "" || domainId == "") {
        $selectSystem.empty();
        $selectSystem.change();
        return;
    }

    selectDataBind({
        $select: $selectSystem,
        url: "../../SystemFunction/System1/SystemService.asmx/GetSystemList",
        data: $.toJSON({ orgId: orgId, domainId: domainId }),
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectPermissionModeDataBind() {
    var orgId = $.trim($selectOrg.val());
    var productId = $.trim($selectProduct.val());
    if (orgId == "" || productId == "") {
        $selectPermissionMode.empty();
        return;
    }

    var basePermissionModeDTO = {
        Org_Id: $.trim($selectOrg.val()),
        Product_Id: $.trim($selectProduct.val())
    };

    selectDataBind({
        $select: $selectPermissionMode,
        url: "../PermissionMode/PermissionModeService.asmx/GetBasePermissionModeListByOrgProduct",
        data: $.toJSON({ basePermissionModeDTO: basePermissionModeDTO }),
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });

    //设定默认Model
    $.qajax({
        url: "../PermissionMode/PermissionModeService.asmx/GetDefaultBasePermissionMode",
        data: $.toJSON({ basePermissionModeDTO: basePermissionModeDTO }),
        success: function (result) {
            if (result.d != null) {
                $selectPermissionMode.val(result.d.Id);
            }
        }
    });
}

function selectOrg_change() {
    selectSystemDataBind();
}

function selectProduct_change() {
    selectDomainDataBind();
    selectPermissionModeDataBind();
}

function selectDomain_change() {
    selectSystemDataBind();
}

function textUserName_change() {
    var userName = $.trim($textUserName.val());
    if (userName == "") {
        $hiddenUserId.val(guidEmpty);
        return;
    }

    $.qajax({
        url: "../../PermissionModel/Permission/ViewBaseSubjectService.asmx/GetViewBaseSubjectId",
        data: $.toJSON({ subjectCategory: 'User', subjectName: userName }),
        async: false,
        success: function (result) {
            if (result.d == undefined || result.d == null) {
                $textUserName.val("");
                $hiddenUserId.val(guidEmpty);
                $.messager.alert("Warning", "This user is Invalid!", "warning");
            }
            else {
                $hiddenUserId.val(result.d);
            }
        }
    });
}

function buttonSearchUser_click() {
    $.QDialog.show(
        {
            title: "Select User"
        },
        {
            url: "../../OrgUser/User/SelectUser.aspx",
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    var userId = returnValue.User_Id; ;
                    var userName = returnValue.User_Name;

                    if (userId != $hiddenUserId.val()) {
                        $hiddenUserId.val(userId);
                        $textPostUser.val(userName);
                    }
                }
            }
        }
    );
}

//datagrid1 begin------------------------------------------------------------------------

function getQueryUrl() {
    var vArguments = {
        OrgId: $.trim($selectOrg.val()),
        ProductId: $.trim($selectProduct.val()),
        PermissionModeId: $.trim($selectPermissionMode.val()),
        UserId: $.trim($hiddenUserId.val()),
        DomainId: $.trim($selectDomain.val()),
        SystemId: $.trim($selectSystem.val())
    };

    var queryurl = "GetUserProductPermissionList.ashx?" + $.param(vArguments);
    return queryurl;
}

function buttonInquiry_click() {
    if ($.trim($selectOrg.val()) == "") {
        $.messager.alert("Warning", "Org can't be empty!", "warning");
        return;
    }

    if ($.trim($selectProduct.val()) == "") {
        $.messager.alert("Warning", "Product can't be empty!", "warning");
        return;
    }

    if ($.trim($selectPermissionMode.val()) == "") {
        $.messager.alert("Warning", "Permission Mode can't be empty!", "warning");
        return;
    }

    var userName = $.trim($textUserName.val());

    if (userName == "") {
        $.messager.alert("Warning", "User can't be empty!", "warning");
        return;
    }
    textUserName_change();
    if (userName != "" && $hiddenUserId.val() == guidEmpty) {
        return;
    }
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'User_Name', title: 'User', width: 100, halign: 'center' },
                    { field: 'Org_Name', title: 'Org', width: 100, halign: 'center' },
                    { field: 'Product_Name', title: 'Product', width: 100, halign: 'center' },
                    { field: 'Permission_Mode', title: 'Permission Mode', width: 100, halign: 'center' },
                    { field: 'Domain_Name', title: 'Domain', width: 100, halign: 'center' },
                    { field: 'System_Name', title: 'System', width: 100, halign: 'center' },
                    { field: 'Function_Code', title: 'Function Code', width: 150, halign: 'center' },
                    { field: 'Function_Name', title: 'Function Name', width: 150, halign: 'center' },
                    { field: 'Node_Type', title: 'Node Type', width: 100, halign: 'center' },
                    { field: 'Navigate_Url', title: 'Navigate Url', width: 300, halign: 'center' },
                    { field: 'External_Navigate_Url', title: 'External Navigate Url', width: 300, halign: 'center' },
                    { field: 'Target', title: 'Target', width: 100, halign: 'center' }
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
        loadFilter: function (data) {
            var data1 = escapeHtmlData(data);
            return data1;
        },
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
        }
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    $(window).resize();

    return;
}