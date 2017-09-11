var $selectOrg;
var $selectProduct;
var $selectDomain;
var $selectSystem;
var $selectTextType;
var $textName;
var $textCode;
var $selectCode;
var $spanCode;
var $textEnUs;
var $textZhCn;
var $textZhTw;

//--分割线------------------------------------------------------------------------------------------------------------

$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectDomain = $("#selectDomain");
    $selectSystem = $("#selectSystem");
    $selectTextType = $("#selectTextType");
    $textCode = $("#textCode");
    $selectCode = $("#selectCode");
    $spanCode = $("#spanCode");
    $textName = $("#textName");
    $textEnUs = $("#textEnUs");
    $textZhCn = $("#textZhCn");
    $textZhTw = $("#textZhTw");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    //select绑定
    selectOrgDataBind();
    selectProductDataBind();
    selectTextTypeDataBind();

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $selectDomain.on("change", selectDomain_change);
    $selectSystem.on("change", selectSystem_change);
    $selectTextType.on("change", selectTextType_change);

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonNew").on("click", buttonNew_click);
});

//------绑定select-----------------------------------------------------------------------------

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

function selectTextTypeDataBind() {
    selectDataBind({
        $select: $selectTextType,
        url: "MultiLanguageService.asmx/GetLanguageTextTypeList",
        itemType: "string",
        empty: false
    });
}

function selectCodeDataBind() {
    var textType = $selectTextType.val();
    //    var systemId = $.trim($selectSystem.val());
    //    if (textType != "Function" && textType != "Domain" && textType != "System") {
    //        $selectCode.empty();
    //        $selectCode.hide();
    //        $textCode.show();
    //        return;
    //    }
    //    $selectCode.show();
    //    $textCode.hide();
    //    if (systemId == "") {
    //        $selectCode.empty();
    //        return;
    //    }
    //    selectDataBind({
    //        $select: $selectCode,
    //        url: "../../SystemFunction/Function/FunctionService.asmx/GetFunctionList",
    //        data: $.toJSON({ systemId: systemId }),
    //        itemValue: "Id",
    //        itemText: "CodeAndName",
    //        async: false //同步方式调用。
    //    });

    switch (textType) {
        case "Function":
            $("#trOrg").show();
            $("#trDomain").show();
            $("#trSystem").show();
            $selectCode.show();
            $textCode.hide();
            var systemId = $.trim($selectSystem.val());
            if (systemId == "") {
                $selectCode.empty();
                return;
            }
            selectDataBind({
                $select: $selectCode,
                url: "../../SystemFunction/Function/FunctionService.asmx/GetFunctionList",
                data: $.toJSON({ systemId: systemId }),
                itemValue: "Id",
                itemText: "CodeAndName",
                async: false //同步方式调用。
            });
            break;
        case "Domain":
            $("#trOrg").hide();
            $("#trDomain").hide();
            $("#trSystem").hide();
            $selectCode.show();
            $textCode.hide();
            var productId = $.trim($selectProduct.val());
            if (productId == "") {
                $selectCode.empty();
                $selectCode.change();
                return;
            }
            selectDataBind({
                $select: $selectCode,
                url: "../../SystemFunction/Domain/DomainService.asmx/GetDomainList",
                data: $.toJSON({ productId: productId }),
                itemValue: "Id",
                itemText: "Name"
            });
            break;
        case "System":
            $("#trOrg").show();
            $("#trDomain").show();
            $("#trSystem").hide();
            $selectCode.show();
            $textCode.hide();
            var orgId = $.trim($selectOrg.val());
            var domainId = $.trim($selectDomain.val());
            if (orgId == "" || domainId == "") {
                $selectCode.empty();
                $selectCode.change();
                return;
            }

            selectDataBind({
                $select: $selectCode,
                url: "../../SystemFunction/System1/SystemService.asmx/GetSystemList",
                data: $.toJSON({ orgId: orgId, domainId: domainId }),
                itemValue: "Id",
                itemText: "Name"
            });
            break;
        default:
            $("#trOrg").show();
            $("#trDomain").show();
            $("#trSystem").show();
            $selectCode.empty();
            $selectCode.hide();
            $textCode.show();
            break;
    }

}

function selectOrg_change() {
    selectSystemDataBind();
    selectCodeDataBind();
}

function selectProduct_change() {
    selectDomainDataBind();
    selectCodeDataBind();
}

function selectDomain_change() {
    selectSystemDataBind();
    selectCodeDataBind();
}

function selectSystem_change() {
    selectCodeDataBind();
}

function selectTextType_change() {
    selectCodeDataBind();
    var textType = $.trim($selectTextType.val());
    if (textType == "Domain" || textType == "System" || textType == "Function") {
        $spanCode.text(textType);
    }
    else {
        $spanCode.text("Code");
    }
}

//------分割线---------------------------------------------------------------------------------

function buttonNew_click() {
    openMultiLanguageMaintain("", pageAction.New);
    return;
}

function datagrid1Edit() {
    var baseMultiLanguageTextDTO = $("#datagrid1").datagrid("getSelected");
    if (baseMultiLanguageTextDTO == null) {
        //未选中行，不处理
        return;
    }
    openMultiLanguageMaintain(baseMultiLanguageTextDTO.Id, pageAction.Edit);

    return;
}

function openMultiLanguageMaintain(id, action) {
    $.QDialog.show(
        {
            title: 'Multi-Language Maintain'
        },
        {
            url: "MultiLanguageMaintain.aspx?" + $.param({ PageAction: action, id: id }),
            width: 0.9,
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
    var baseMultiLanguageTextDTO = $("#datagrid1").datagrid("getSelected");
    if (baseMultiLanguageTextDTO == null) {
        //未选中行，不处理
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to delete?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "MultiLanguageService.asmx/DeleteBaseMultiLanguage",
                    data: $.toJSON({ id: baseMultiLanguageTextDTO.Id }),
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
        DomainId: $.trim($selectDomain.val()),
        SystemId: $.trim($selectSystem.val()),
        TextType: $.trim($selectTextType.val()),
        Name: encodeURI($.trim($textName.val())),
        Code: $textCode.is(":visible") ? encodeURI($.trim($textCode.val())) : $.trim($selectCode.val()),
        EnUs: encodeURI($.trim($textEnUs.val())),
        ZhCn: encodeURI($.trim($textZhCn.val())),
        ZhTw: encodeURI($.trim($textZhTw.val()))
    };

    var queryurl = "GetMultiLanguageList.ashx?" + $.param(vArguments);
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
                    { field: 'Domain', title: 'Domain', width: 100, halign: 'center' },
                    { field: 'System', title: 'System', width: 100, halign: 'center' },
                    { field: 'Text_Type', title: 'Text Type', width: 100, halign: 'center' },
                    { field: 'Name', title: 'Name', width: 100, halign: 'center' },
                    { field: 'Code', title: 'Code', width: 100, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            if (rowData.Text_Type == "Domain") { return rowData.Domain; }
                            if (rowData.Text_Type == "System") { return rowData.System; }
                            if (rowData.Text_Type == "Function") { return rowData.Function_Code; }
                            else { return rowData.Code; }
                        }
                    },
                    { field: 'En_Us', title: 'EN-US', width: 180, halign: 'center' },
                    { field: 'Zh_Cn', title: 'ZH-CN', width: 180, halign: 'center' },
                    { field: 'Zh_Tw', title: 'ZH-TW', width: 180, halign: 'center' }
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