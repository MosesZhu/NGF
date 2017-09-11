var $selectCategory;
var $selectType;
var $textMessageKey;
var $textMessageCode;
var $selectStatus;
var $textEnUs;
var $textZhCn;
var $textZhTw;

$(function () {
    $selectCategory = $("#selectCategory");
    $selectType = $("#selectType");
    $textMessageKey = $("#textMessageKey");
    $textMessageCode = $("#textMessageCode");
    $selectStatus = $("#selectStatus");
    $textEnUs = $("#textEnUs");
    $textZhCn = $("#textZhCn");
    $textZhTw = $("#textZhTw");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    selectCategoryDataBind();
    selectStatusDataBind();

    $selectCategory.on("change", selectCategory_change);
    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonNew").on("click", buttonNew_click);

    IsButtonGenerateDisplay();
});

function selectCategoryDataBind() {
    selectDataBind({
        $select: $selectCategory,
        url: "../../MultiLanguage/MessageCategory/MessageCategoryService.asmx/GetMessageCategoryList",
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectTypeDataBind() {
    var messageCategoryId = $.trim($selectCategory.val());
    if (messageCategoryId == "") {
        $selectType.empty();
        return;
    }

    selectDataBind({
        $select: $selectType,
        url: "../../MultiLanguage/MessageType/MessageTypeService.asmx/GetMessageTypeList",
        data: $.toJSON({ messageCategoryId: messageCategoryId }),
        itemValue: "Id",
        itemText: "Type_Name"
    });
}

function selectStatusDataBind() {
    selectDataBind({
        $select: $selectStatus,
        url: "MessageContentService.asmx/GetMessageStatusList",
        itemType: "string",
        async: false //同步方式调用。
    });
}

function selectCategory_change() {
    selectTypeDataBind();
}

function buttonNew_click() {
    openMessageContentMaintain("", pageAction.New);
    return;
}

function buttonGenerateAll_click() {
    var messageServiceUrl = $("#HiddenFieldMessageServiceUrl").val();
    var url = messageServiceUrl + "/GenerateAll";
    $.ajax({
        async: false,
        url: url,
        type: 'get',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        beforeSend: function (XMLHttpRequest) {
            buttonDisabled($("#buttonGenerateAll"), "Button100_Disabled");
        },
        success: function (data) {
            var result = data.msg;
            if ($.trim(result) == "") {
                $.messager.alert("Information", "Generate all message success!", "info");
            }
            else {
                $.messager.alert("Generate all message failed", result, "error");
            }
        },
        error: function (XMLHttpRequest, textStatus, thrown) {
            $.messager.alert("Error", "Generate all message failed!", "error");
        },
        complete: function (XMLHttpRequest, textStatus) {
            $("#buttonGenerateAll").prop("disabled", false);
            $("#buttonGenerateAll").removeClass();
            $("#buttonGenerateAll").addClass("Button100");
            $("#buttonGenerateAll").on("click", buttonGenerateAll_click);
        }
    });
}

function buttonGenerateIncremental_click() {
    var messageServiceUrl = $("#HiddenFieldMessageServiceUrl").val();
    var url = messageServiceUrl + "/GenerateIncremental";
    $.ajax({
        async: false,
        url: url,
        type: 'get',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        beforeSend: function (XMLHttpRequest) {
            buttonDisabled($("#buttonGenerateIncremental"), "Button140_Disabled");
        },
        success: function (data) {
            var result = data.msg;
            if ($.trim(result) == "") {
                $.messager.alert("Information", "Generate incremental message success!", "info");
            }
            else {
                $.messager.alert("Generate incremental message failed", result, "error");
            }
        },
        error: function (XMLHttpRequest, textStatus, thrown) {
            $.messager.alert("Error", "Generate incremental message failed!", "error");
        },
        complete: function (XMLHttpRequest, textStatus) {
            $("#buttonGenerateIncremental").prop("disabled", false);
            $("#buttonGenerateIncremental").removeClass();
            $("#buttonGenerateIncremental").addClass("Button140");
            $("#buttonGenerateIncremental").on("click", buttonGenerateIncremental_click);
        }
    });
}

function datagrid1Edit() {
    var baseMultiLanguageTextDTO = $("#datagrid1").datagrid("getSelected");
    if (baseMultiLanguageTextDTO == null) {
        //未选中行，不处理
        return;
    }
    openMessageContentMaintain(baseMultiLanguageTextDTO.Id, pageAction.Edit);

    return;
}

function openMessageContentMaintain(id, action) {
    $.QDialog.show(
        {
            title: 'Message Content Maintain'
        },
        {
            url: "MessageContentMaintain.aspx?" + $.param({ PageAction: action, id: id }),
            width: 0.8,
            height: 0.6,
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
    if (baseMultiLanguageTextDTO.Status == "Approve") {
        $.messager.alert("Warning", "Message cannot be deleted when status is 'Approve'!", "warning");
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to delete?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "MessageContentService.asmx/DeleteBaseMessageContent",
                    data: $.toJSON({ messageContentId: baseMultiLanguageTextDTO.Id }),
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

function datagrid1Approve() {
    var baseMultiLanguageTextDTO = $("#datagrid1").datagrid("getSelected");
    if (baseMultiLanguageTextDTO == null) {
        //未选中行，不处理
        return;
    }
    if (baseMultiLanguageTextDTO.Status == "Approve") {
        $.messager.alert("Warning", "Message cannot be approved when status is 'Approve'!", "warning");
        return;
    }

    $.messager.confirm("Confirm", "Are you sure to approve?",
        function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "MessageContentService.asmx/ApproveMessage",
                    data: $.toJSON({ messageContentId: baseMultiLanguageTextDTO.Id }),
                    success: function (result) {
                        if ($.trim(result.d) == "") {
                            $('#datagrid1').datagrid("reload");
                            $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                            $.messager.alert("Information", "Approve success!", "info");
                        }
                        else {
                            $.messager.alert("Approve failed", result.d, "error");
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
        CategoryId: $.trim($selectCategory.val()),
        TypeId: $.trim($selectType.val()),
        MessageKey: encodeURI($.trim($textMessageKey.val())),
        MessageCode: encodeURI($.trim($textMessageCode.val())),
        Status: $.trim($selectStatus.val()),
        EnUs: encodeURI($.trim($textEnUs.val())),
        ZhCn: encodeURI($.trim($textZhCn.val())),
        ZhTw: encodeURI($.trim($textZhTw.val()))
    };

    var queryurl = "GetBaseMessageContentList.ashx?" + $.param(vArguments);
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
                    { field: 'Message_Category', title: 'Category', width: 100, halign: 'center' },
                    { field: 'Message_Type', title: 'Type', width: 100, halign: 'center' },
                    { field: 'Name', title: 'Message Key', width: 200, halign: 'center' },
                    { field: 'Code', title: 'Message Code', width: 100, halign: 'center' },
                    { field: 'En_Us', title: 'EN-US', width: 200, halign: 'center' },
                    { field: 'Zh_Cn', title: 'ZH-CN', width: 200, halign: 'center' },
                    { field: 'Zh_Tw', title: 'ZH-TW', width: 200, halign: 'center' },
                    { field: 'Status', title: 'Status', width: 60, align: 'center' }
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
                    '-',
                    {
                        id: 'buttonApprove',
                        text: 'Approve',
                        iconCls: 'icon-ok',
                        handler: datagrid1Approve
                    },
                    '-'
                ],
        onDblClickRow: datagrid1Edit
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
    IsButtonApproveDisplay();

    $(window).resize();

    return;
}

function IsButtonApproveDisplay() {
    $.qajax({
        url: "MessageContentService.asmx/IsCurrentUserMessageAdmin",
        async: false,
        success: function (result) {
            if (!result.d) {
                $("#buttonApprove").hide();
            }
        }
    });
}

function IsButtonGenerateDisplay() {
    $.qajax({
        url: "MessageContentService.asmx/IsCurrentUserMessageAdmin",
        success: function (result) {
            if (result.d) {
                $("#buttonGenerateAll").on("click", buttonGenerateAll_click);
                $("#buttonGenerateIncremental").on("click", buttonGenerateIncremental_click);
                $("#buttonGenerateAll").show();
                $("#buttonGenerateIncremental").show();
            }
        }
    });
}
//datagrid1 end-------------------------------------------------------