var $selectOrg;
var $selectProduct;
var $textDomain;
var $textUser;
var $hiddenUserId;
var $selectSessionType;
var $selectStatus;

$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $textDomain = $("#textDomain");
    $textUser = $("#textUser");
    $hiddenUserId = $("#hiddenUserId");
    $selectSessionType = $("#selectSessionType");
    $selectStatus = $("#selectStatus");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    selectOrgDataBind();
    selectProductDataBind();
    selectSessionTypeDataBind();
    selectStatusDataBind();

    $textUser.on("change", textUser_change);
    $("#buttonSearchUser").on("click", buttonSearchUser_click);
    $("#buttonInquiry").on("click", buttonInquiry_click);
});

//-----绑定----------------------------------------------------------------------------------
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

function selectSessionTypeDataBind() {
    selectDataBind({
        $select: $selectSessionType,
        url: "SSOSessionService.asmx/GetSessionTypeList",
        itemType: "string"
    });
}

function selectStatusDataBind() {
    selectDataBind({
        $select: $selectStatus,
        url: "SSOSessionService.asmx/GetSessionStatusList",
        itemType: "string"
    });
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
                $textUser.val("");
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
function openSSOSessionInformation(id) {
    $.QDialog.show(
        {
            title: 'SSOSession Information'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "SSOSessionInformation.aspx?" + $.param({ id: id }),

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
    var ssoSessionDTO = $("#datagrid1").datagrid("getSelected");
    if (ssoSessionDTO == null) {
        //未选中行，不处理
        return;
    }
    openSSOSessionInformation(ssoSessionDTO.Id);
    return;
}

function datagrid1BatchClose() {
    var listSSOSessionDTO = $("#datagrid1").datagrid("getSelections");
    if (listSSOSessionDTO.length == 0) {
        return;
    }
    var listSSOSessionId = new Array();
    var index = 0;
    $(listSSOSessionDTO).each(function (i, data) {
        if (data.Status == "Active") {
            listSSOSessionId[index] = data.Id;
            index++;
        }
    });
    if (listSSOSessionId.length == 0) {
        return;
    }
    $.qajax({
        url: "SSOSessionService.asmx/BatchCloseSSOSession",
        data: $.toJSON({ listSSOSessionId: listSSOSessionId }),
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
    var vArguments = {
        OrgId: $.trim($selectOrg.val()),
        ProductId: $.trim($selectProduct.val()),
        Domain: $.trim($textDomain.val()),
        UserId: encodeURI($.trim($hiddenUserId.val())),
        SessionType: $.trim($selectSessionType.val()),
        Status: $.trim($selectStatus.val())
    };

    var queryurl = "GetSSOSessionList.ashx?" + $.param(vArguments);
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
                                 var style = "visibility:visible;";
                                 if (rowData.Status != "Active") {
                                     style = "visibility:hidden;";
                                 }
                                 var buttonClose = '<input type="button" value="close" class="Button60" '
                            + 'style=' + style + ' onclick="buttonClose_click(' + '\'' + rowData.Id + '\'' + ')" />';
                                 return buttonClose;
                             }
                         }
                       ]],
        columns: [[
                    { field: 'Org', title: 'Org', width: 100, halign: 'center' },
                    { field: 'Product', title: 'Product', width: 100, halign: 'center' },
                    { field: 'Domain', title: 'Domain', width: 100, halign: 'center' },
                    { field: 'User_Name', title: 'User', width: 100, halign: 'center' },
                    { field: 'Client_Ip', title: 'Client IP', width: 100, halign: 'center' },
                    { field: 'Data', title: 'Data', width: 100, halign: 'center' },
                    { field: 'Session_Type', title: 'Session Type', width: 100, halign: 'center' },
                    { field: 'Language', title: 'Language', width: 80, halign: 'center' },
                    { field: 'Status', title: 'Status', width: 100, halign: 'center' },
                    { field: 'Logon_Time', title: 'Logon Time', width: 150, halign: 'center',
                        formatter: function (value, rowData, rowData) {
                            return datetimeformatter(value);
                        }
                    },
                    { field: 'Last_Access_Time', title: 'Last Access Time', width: 150, halign: 'center',
                        formatter: function (value, rowData, rowData) {
                            return datetimeformatter(value);
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
        t.Logon_Time = serializerStringConvertDate(t.Logon_Time);
        t.Last_Access_Time = serializerStringConvertDate(t.Last_Access_Time);
    });

    var data1 = escapeHtmlData(data);
    return data1;
}
//datagrid1 end-------------------------------------------------------

function buttonClose_click(ssoSessionId) {
    if (ssoSessionId == null) {
        return;
    }
    $.qajax({
        url: "SSOSessionService.asmx/CloseSSOSession",
        data: $.toJSON({ ssoSessionId: ssoSessionId }),
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