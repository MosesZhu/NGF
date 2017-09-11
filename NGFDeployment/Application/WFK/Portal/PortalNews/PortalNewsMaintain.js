/// <reference name="ITS.WebFramework.CommonResource.Scripts.References.js" assembly="ITS.WebFramework.CommonResource" />

var pageParameterId;
var pageParameterPageAction;
var pageParameterIsOrgAdmin;

var $selectOrg;
var $selectProduct;
var $textareaSubject;
var $textPostUser;
var $hiddenUserId;
var $textDueDate;
var $iframePortalNewsContent;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $textareaSubject = $("#textareaSubject");
    $textPostUser = $("#textPostUser");
    $hiddenUserId = $("#hiddenUserId");
    $textDueDate = $("#textDueDate");
    $iframePortalNewsContent = $("#iframePortalNewsContent");

    $(window).on("resize", function () {
        $textDueDate.datebox("resize", $textDueDate.parent("td").width() * 0.99);
        var contentHeight = $(window).height() - $("#tableHead").height() - $("#divCommand").height() - 50;
        $("#divContent").height(contentHeight);
    });
    $(window).resize();

    $textPostUser.on("change", textPostUser_change);
    $("#buttonSearchUser").on("click", buttonSearchUser_click);

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    //select绑定
    selectOrgDataBind();
    selectProductDataBind();

    //页面数据初始化
    initializeData();
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

//------分割线-----------------------------------------------------------------------------------

function initializeData() {
    if (pageParameterPageAction == pageAction.New) {
        $textPostUser.val(currentUserName);
        $hiddenUserId.val(currentUserId);
        var currentDate = new Date();
        $textDueDate.datebox("setValue", dateformatter(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())));
        $iframePortalNewsContent.attr("src", "PortalNewsContent.aspx");
    }
    else {
        $.qajax({
            url: "PortalNewsService.asmx/GetPortalNews",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(portalNewsDTO) {
    $selectOrg.val(portalNewsDTO.Org_Id);
    $selectProduct.val(portalNewsDTO.Product_Id);
    $textareaSubject.val(portalNewsDTO.Subject);
    $textPostUser.val(portalNewsDTO.PostUser);
    $hiddenUserId.val(portalNewsDTO.Post_User_Id);
    $textDueDate.datebox("setValue", dateformatter(serializerStringConvertDate(portalNewsDTO.Due_Date)));
    $iframePortalNewsContent.attr("src", "PortalNewsContent.aspx?" + $.param({ id: portalNewsDTO.Id }));

    if (!portalNewsDTO.AllowEdit || pageParameterIsOrgAdmin == "false" || (currentUserId != portalNewsDTO.Post_User_Id && currentUserId != portalNewsDTO.Created_User_Id)) {
        selectDisabled($selectOrg);
        selectDisabled($selectProduct);
        textBoxDisabled($textareaSubject);
        textBoxDisabled($textPostUser);
        $textDueDate.datebox("disable");

        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {
    if ($.trim($selectOrg.val()) == "") {
        $.messager.alert("Warning", "Org can't be empty!", "warning");
        return;
    }

    if (pageParameterPageAction == pageAction.New && !checkIsOrgAdmin()) {
        $.messager.alert("Warning", "You don't have permisson to add because you're not this org admin!", "warning");
        return;
    }

    if ($.trim($selectProduct.val()) == "") {
        $.messager.alert("Warning", "Product can't be empty!", "warning");
        return;
    }

    var isValid = true;
    if (!$textareaSubject.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textPostUser.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textDueDate.datebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    textPostUser_change();
    if ($hiddenUserId.val() == guidEmpty) {
        return;
    }

    var content = document.getElementById("iframePortalNewsContent").contentWindow.getPortalNewsContent();
    if ($.trim(content) == "") {
        $.messager.alert("Warning", "Content can't be empty!", "warning");
        return;
    }

    var portalNewsDTO = {
        Id: pageParameterId,

        Org_Id: $.trim($selectOrg.val()),
        Product_Id: $.trim($selectProduct.val()),
        Subject: $.trim($textareaSubject.val()),
        PostUser: encodeURI($.trim($textPostUser.val())),
        Post_User_Id: encodeURI($.trim($hiddenUserId.val())),
        Due_Date: $.trim($textDueDate.datebox("getValue")),
        Content: $.trim(content)
    };

    if ($.trim(portalNewsDTO.Id) == "") {
        portalNewsDTO.Id = guidEmpty;
    }

    if (portalNewsDTO.Org_Id == "") {
        portalNewsDTO.Org_Id = guidEmpty;
    }

    if (portalNewsDTO.Product_Id == "") {
        portalNewsDTO.Product_Id = guidEmpty;
    }

    $.qajax({
        url: "PortalNewsService.asmx/SavePortalNews",
        data: $.toJSON({ portalNewsDTO: portalNewsDTO, pageAction: pageParameterPageAction }),
        beforeSend: function (XMLHttpRequest) {
            $("#buttonSave").prop("disabled", true);
        },
        success: function (result) {
            if ($.trim(result.d) == "") {
                $.messager.alert("Information", "Save success!", "info",
                    function () {
                        parent.$.QDialog.hide(true);
                    });
            }
            else {
                $.messager.alert("Error", result.d, "error");
            }
        },
        complete: function () {
            $("#buttonSave").prop("disabled", false);
        }
    });
    return;
}

function buttonCancel_click() {
    parent.$.QDialog.hide(false);
}

function checkIsOrgAdmin() {
    var isOrgAdmin;
    var orgId = $.trim($selectOrg.val());
    $.qajax({
        url: "../../OrgUser/Org/OrgService.asmx/IsCurrentUserOrgAdmin",
        data: $.toJSON({ orgId: orgId }),
        async: false,
        success: function (result) {
            isOrgAdmin = result.d;
        }
    });
    return isOrgAdmin;
}