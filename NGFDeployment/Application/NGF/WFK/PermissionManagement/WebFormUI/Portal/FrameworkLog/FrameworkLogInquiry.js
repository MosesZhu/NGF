var $selectOrg;
var $selectProduct;
var $selectDomain;
var $selectSystem;
var $textUser;
var $hiddenUserId;
var $selectStatus;
var $textLogDateFrom;
var $textLogDateTo;
var $selectLogType;

$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectDomain = $("#selectDomain");
    $selectSystem = $("#selectSystem");
    $selectTextType = $("#selectTextType");
    $textUser = $("#textUser");
    $hiddenUserId = $("#hiddenUserId");
    $selectStatus = $("#selectStatus");
    $textLogDateFrom = $("#textLogDateFrom");
    $textLogDateTo = $("#textLogDateTo");
    $selectLogType = $("#selectLogType");

    $(window).on("resize", function () {
        $textLogDateFrom.datebox("resize", $textLogDateFrom.parent("td").width() * 0.99);
        $textLogDateTo.datebox("resize", $textLogDateTo.parent("td").width() * 0.99);
        var datagriddata = $("#datagrid1").data("datagrid");
        if (datagriddata) {
            $("#datagrid1").datagrid("resize", { height: $(window).height() - $("#divHead").height() - 70 });
        }
    });
    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));
    $(window).resize();

    //select绑定
    selectOrgDataBind();
    selectProductDataBind();
    selectStatusDataBind();
    selectLogTypeDataBind();

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $selectDomain.on("change", selectDomain_change);

    $textUser.on("change", textUser_change);
    $("#buttonSearchUser").on("click", buttonSearchUser_click);
    $("#buttonInquiry").on("click", buttonInquiry_click);

    initializeData();
});

//--------------------------------------------------------------------------------------------
function initializeData() {
    var currentDate = new Date();
    $textLogDateFrom.datebox("setValue", dateformatter(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3)));
    $textLogDateTo.datebox("setValue", dateformatter(currentDate));
}
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

function selectStatusDataBind() {
    selectDataBind({
        $select: $selectStatus,
        url: "FrameworkLogService.asmx/GetLogStatusList",
        itemType: "string"
    });
}

function selectLogTypeDataBind() {
    selectDataBind({
        $select: $selectLogType,
        url: "FrameworkLogService.asmx/GetLogTypeList",
        itemType: "string"
    });
}

function selectOrg_change() {
    selectSystemDataBind();
}

function selectProduct_change() {
    selectDomainDataBind();
}

function selectDomain_change() {
    selectSystemDataBind();
}

//------分割线---------------------------------------------------------------------------------
function textUser_change() {
    var user = $.trim($textUser.val());
    if (user == "") {
        $hiddenUserId.val(guidEmpty);
        return;
    }

    $.qajax({
        url: "../../PermissionModel/Permission/ViewBaseSubjectService.asmx/GetViewBaseSubjectId",
        data: $.toJSON({ subjectCategory: 'User', subjectName: user }),
        async: false,
        success: function (result) {
            if (result.d == undefined || result.d == null) {
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
                        $textUser.val(userName);
                    }
                }
            }
        }
    );
}

//--------------------------------------------------------------------------------------------
function openFrameworkLogInformation(id) {
    $.QDialog.show(
        {
            title: 'FrameworkLog Information'
        },
        {
            url: "FrameworkLogInformation.aspx?" + $.param({ id: id }),
            width: 0.9,
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

function datagrid1View() {
    var baseLogDTO = $("#datagrid1").datagrid("getSelected");
    if (baseLogDTO == null) {
        //未选中行，不处理
        return;
    }
    openFrameworkLogInformation(baseLogDTO.Id);
    return;
}

function datagrid1BatchClose() {
    var listBaseLogDTO = $("#datagrid1").datagrid("getSelections");
    if (listBaseLogDTO.length == 0) {
        return;
    }
    var listLogId = new Array();
    var index = 0;
    $(listBaseLogDTO).each(function (i, data) {
        if (data.Log_Type == "Error" && data.Status == "New" && data.IsSystemAdmin == true) {
            listLogId[index] = data.Id;
            index++;
        }
    });
    if (listLogId.length == 0) {
        $.messager.alert("Warning", "You don't have permisson to close because you're not this system admin!", "warning");
        return;
    }
    $.qajax({
        url: "FrameworkLogService.asmx/BatchCloseLog",
        data: $.toJSON({ listLogId: listLogId }),
        success: function (result) {
            if (result.d == "") {
                $("#datagrid1").datagrid("reload");
            }
            else {
                $.messager.alert("Error", result.d, "error");
            }
        }
    });
}

//datagrid1 begin------------------------------------------------------------------------
function getQueryUrl() {
    var isValid = true;
    if (!$textLogDateFrom.datebox("isValid")) {
        isValid = false;
    }
    if (!$textLogDateTo.datebox("isValid")) {
        isValid = false;
    }
    if (!isValid) {
        return "";
    }
    var vArguments = {
        OrgId: $.trim($selectOrg.val()),
        ProductId: $.trim($selectProduct.val()),
        DomainId: $.trim($selectDomain.val()),
        SystemId: $.trim($selectSystem.val()),
        UserId: encodeURI($.trim($hiddenUserId.val())),
        Status: $.trim($selectStatus.val()),
        LogDateFrom: $.trim($textLogDateFrom.datebox("getValue")),
        LogDateTo: $.trim($textLogDateTo.datebox("getValue")),
        LogType: $.trim($selectLogType.val())
    };

    var queryurl = "GetFrameworkLogList.ashx?" + $.param(vArguments);
    return queryurl;
}

function buttonInquiry_click() {
    textUser_change();
    if ($.trim($textUser.val()) != "" && $hiddenUserId.val() == guidEmpty) {
        return;
    }
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        frozenColumns: [[
                         { field: 'button', title: '', width: 70, halign: 'center',
                             formatter: function (value, rowData, rowIndex) {
                                 var style = "visibility:hidden;";
                                 if (rowData.Log_Type == "Error" && rowData.Status == "New" && rowData.IsSystemAdmin == true) {
                                     style = "visibility:visible;";
                                 }
                                 var buttonClose = '<input type="button" value="close" class="Button60" '
                            + 'style=' + style + ' onclick="buttonClose_click(' + '\'' + rowData.Id + '\'' + ')" />';
                                 return buttonClose;
                             }
                         }
                       ]],
        columns: [[
                    { field: 'Org_Name', title: 'Org', width: 100, halign: 'center' },
                    { field: 'Product_Name', title: 'Product', width: 100, halign: 'center' },
                    { field: 'Domain_Name', title: 'Domain', width: 100, halign: 'center' },
                    { field: 'System_Name', title: 'System', width: 150, halign: 'center' },
                    { field: 'User_Name', title: 'User', width: 100, halign: 'center' },
                    { field: 'Log_Type', title: 'Log Type', width: 80, halign: 'center' },
                    { field: 'Url', title: 'Url', width: 300, halign: 'center' },
                    { field: 'Referer', title: 'Referer', width: 300, halign: 'center' },
                    { field: 'Ip_Address', title: 'Ip Address', width: 100, halign: 'center' },
                    { field: 'User_Agent', title: 'User Agent', width: 300, halign: 'center' },
                    { field: 'Message', title: 'Message', width: 200, halign: 'center' },
                    { field: 'Log_Date', title: 'Log Date', width: 150, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            return datetimeformatter(value);
                        }
                    },
                    { field: 'Status', title: 'Status', width: 100, halign: 'center' },
                    { field: 'Is_Mail_Sent', title: 'Is Mail Sent', width: 80, halign: 'center',
                        formatter: function (value, rowData, rowData) {
                            if (value == "0") {
                                return "";
                            }
                            return "Y";
                        }
                    },
                    { field: 'System_Version', title: 'System Version', width: 100, halign: 'center' },
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl1, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'Id', //标识字段。
        singleSelect: false, //是否单选 
        rownumbers: true, //行号 
        pagination: true, //分页控件 
        pagePosition: "top", //定义的分页栏的位置
        pageNumber: 1, //当设置了 pagination 特性时，初始化页码。
        pageSize: getDatagridPageSize($('#datagrid1')),   //当设置了 pagination 特性时，初始化页码尺寸。
        pageList: [10, 15, 20, 50, 100], //当设置了 pagination 特性时，初始化页面尺寸的选择列表。
        loadFilter: datagrid1LoadFilter,
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
                        text: 'View',
                        iconCls: 'icon-edit',
                        handler: datagrid1View
                    },
                    '-',
                    {
                        text: 'Batch Close',
                        iconCls: 'icon-cancel',
                        handler: datagrid1BatchClose
                    },
                    '-'
                ],
        onDblClickRow: datagrid1View
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    $(window).resize();

    return;
}

function datagrid1LoadFilter(data) {
    $.each(data.rows, function (i, t) {
        t.Log_Date = serializerStringConvertDate(t.Log_Date);
    });

    var data1 = escapeHtmlData(data);
    return data1;
}
//datagrid1 end-------------------------------------------------------

function buttonClose_click(logId) {
    if (logId == null) {
        return;
    }
    $.qajax({
        url: "FrameworkLogService.asmx/CloseLog",
        data: $.toJSON({ logId: logId }),
        success: function (result) {
            if (result.d == "") {
                $("#datagrid1").datagrid("reload");
            }
            else {
                $.messager.alert("Error", result.d, "error");
            }
        }
    });

}