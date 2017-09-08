var $selectOrg;
var $selectProduct;
var $textSubject;
var $textPostUser;
var $textDueDateFrom;
var $textDueDateTo;
var $hiddenUserId;

//--分割线------------------------------------------------------------------------------------------------------------
$(function () {
    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $textSubject = $("#textSubject");
    $textPostUser = $("#textPostUser");
    $textDueDateFrom = $("#textDueDateFrom");
    $textDueDateTo = $("#textDueDateTo");
    $hiddenUserId = $("#hiddenUserId");

    $(window).on("resize", function () {
        $textDueDateFrom.datebox("resize", $textDueDateFrom.parent("td").width() * 0.99);
        $textDueDateTo.datebox("resize", $textDueDateTo.parent("td").width() * 0.99);
    });

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));
    $(window).resize();

    //select绑定
    selectOrgDataBind();
    selectProductDataBind();

    $textPostUser.on("change", textPostUser_change);
    $("#buttonSearchUser").on("click", buttonSearchUser_click);

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

function textPostUser_change() {
    var postUser = $.trim($textPostUser.val());
    if (postUser == "") {
        $hiddenUserId.val(guidEmpty);
        return;
    }

    $.qajax({
        url: "../../PermissionModel/Permission/ViewBaseSubjectService.asmx/GetViewBaseSubjectId",
        data: $.toJSON({ subjectCategory: 'User', subjectName: postUser }),
        async: false,
        success: function (result) {
            if (result.d == undefined || result.d == null) {
                $textPostUser.val("");
                $hiddenUserId.val(guidEmpty);
                $.messager.alert("Warning", "This post user is Invalid!", "warning");
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

//------分割线---------------------------------------------------------------------------------

function buttonNew_click() {
    openPortalNewsMaintain("", pageAction.New, "");
    return;
}

function datagrid1Edit() {
    var portalNewsDTO = $("#datagrid1").datagrid("getSelected");
    if (portalNewsDTO == null) {
        //未选中行，不处理
        return;
    }
    openPortalNewsMaintain(portalNewsDTO.Id, pageAction.Edit, portalNewsDTO.IsOrgAdmin);

    return;
}

function openPortalNewsMaintain(id, action, isOrgAdmin) {
    $.QDialog.show(
        {
            title: 'News Maintain'
        },
        {
            url: "PortalNewsMaintain.aspx?" + $.param({ PageAction: action, id: id, isOrgAdmin: isOrgAdmin }),
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

function datagrid1Delete() {
    var portalNewsDTO = $("#datagrid1").datagrid("getSelected");
    if (portalNewsDTO == null) {
        //未选中行，不处理
        return;
    }

    if (!portalNewsDTO.IsOrgAdmin || (currentUserId != portalNewsDTO.Post_User_Id && currentUserId != portalNewsDTO.Created_User_Id)) {
        $.messager.alert("Warning", "You don't have permession to delete!", "warning");
        return;
    }
    $.messager.confirm("Confirm", "Are you sure to delete?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "PortalNewsService.asmx/DeletePortalNews",
                    data: $.toJSON({ id: portalNewsDTO.Id }),
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
    var isValid = true;
    if (!$textDueDateFrom.datebox("isValid")) {
        isValid = false;
    }
    if (!$textDueDateTo.datebox("isValid")) {
        isValid = false;
    }
    if (!isValid) {
        return "";
    }
    var vArguments = {
        OrgId: $.trim($selectOrg.val()),
        ProductId: $.trim($selectProduct.val()),
        Subject: encodeURI($.trim($textSubject.val())),
        PostUserId: encodeURI($.trim($hiddenUserId.val())),
        DueDateFrom: $.trim($textDueDateFrom.datebox("getValue")),
        DueDateTo: $.trim($textDueDateTo.datebox("getValue"))
    };

    var queryurl = "GetPortalNewsList.ashx?" + $.param(vArguments);
    return queryurl;
}

function buttonInquiry_click() {
    textPostUser_change();
    if ($.trim($textPostUser.val()) != "" && $hiddenUserId.val() == guidEmpty) {
        return;
    }
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'Org', title: 'Org', width: 100, halign: 'center' },
                    { field: 'Product', title: 'Product', width: 100, halign: 'center' },
                    { field: 'Subject', title: 'Subject', width: 300, halign: 'center' },
                    { field: 'PostUser', title: 'Posted by', width: 100, halign: 'center' },
                    { field: 'Due_Date', title: 'Due Date', width: 100, halign: 'center',
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

function datagrid1LoadFilter(data) {
    $.each(data.rows, function (i, t) {
        t.Due_Date = serializerStringConvertDate(t.Due_Date);
        t.Created_Date = serializerStringConvertDate(t.Created_Date);
        t.Modified_Date = serializerStringConvertDate(t.Modified_Date);
    });

    var data1 = escapeHtmlData(data);
    return data1;
}
//datagrid1 end-------------------------------------------------------