var $textSystemGroupName;
var $textareaSystemGroupDescription;
var $textGoupAdminRole;
var $divdatagrid1;
var pageParameterId;
var pageParameterPageAction;
var systemList;
var system;

$(function () {
    $textSystemGroupName = $("#textSystemGroupName");
    $textareaSystemGroupDescription = $("#textareaSystemGroupDescription");
    $textGoupAdminRole = $("#textGoupAdminRole");
    $divdatagrid1 = $("#divdatagrid1");
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    datagrid_autoresize($("#divMainContent"), $("#divdatagrid1"));

    $(window).on("resize", function () {
        var datagriddata = $("#datagrid1").data("datagrid");
        if (datagriddata) {
            $("#datagrid1").datagrid("resize", { height: $(window).height() - $("#divMainContent").height() - 80 });
        }
    });
    $(window).resize();

    //页面数据初始化
    initializeData();

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $("#buttonSearchRole").on("click", buttonSearchRole_click);
    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);
});

function selectOrg_change() {
    datagrid1DataBind();
}

function selectProduct_change() {
    datagrid1DataBind();
}

//datagrid1 begin-------------------------------------------------------
function getQueryUrl() {
    var vArguments = {
        Org_Id: encodeURI($.trim($selectOrg.val())),
        Product_Id: encodeURI($.trim($selectProduct.val()))
    };

    var queryurl = "../../SystemFunction/System1/GetBaseSystemList.ashx?" + $.param(vArguments);

    return queryurl;
}

function datagrid1DataBind() {
    if ($.trim($selectOrg.val()) == "" || $.trim($selectProduct.val()) == "") {
        $divdatagrid1.hide();
        return;
    }
    else {
        $divdatagrid1.show();
    }
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        columns: [[
                    { field: 'Id', title: 'IsChecked', width: 200, halign: 'center', checkbox: true },
                    { field: 'Domain', title: 'Domain', width: 200, halign: 'center' },
                    { field: 'Name', title: 'System', width: 200, halign: 'center' }
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
        pageSize: 10, //getDatagridPageSize($('#datagrid1')),   //当设置了 pagination 特性时，初始化页码尺寸。
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
        onLoadSuccess: function (data) {
            var row = data.rows;
            $(row).each(function (i) {
                $(system).each(function (j) {
                    if (system[j] == row[i].Name) {
                        $('#datagrid1').datagrid("checkRow", i);
                        system.splice(j, 1);
                    }
                })
            })
        }
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    $(window).resize();

    return;
}
//datagrid1 end-------------------------------------------------------

function initializeData() {
    if (pageParameterPageAction == pageAction.New) {
        var orgId = $.url("?orgId");
        var productId = $.url("?productId");
        $selectOrg.val(orgId);
        $selectProduct.val(productId);
        datagrid1DataBind();
    }
    else {
        $.qajax({
            url: "SystemGroupService.asmx/GetSystemGroup",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseSystemGroupDTO) {
    $selectOrg.val(baseSystemGroupDTO.Org_Id);
    $selectProduct.val(baseSystemGroupDTO.Product_Id);
    $textSystemGroupName.val(baseSystemGroupDTO.Name);
    $textareaSystemGroupDescription.val(baseSystemGroupDTO.Description);
    $textGoupAdminRole.val(baseSystemGroupDTO.AdminRole);

    systemList = baseSystemGroupDTO.System_List;
    system = systemList.split(',');

    datagrid1DataBind();

    //检查该笔数据是否允许编辑，若不允许则不可编辑
    if (!(baseSystemGroupDTO.AllowEdit)) {
        selectDisabled($selectOrg);
        selectDisabled($selectProduct);
        textBoxDisabled($textSystemGroupName);
        textBoxDisabled($textareaSystemGroupDescription);
        textBoxDisabled($textGoupAdminRole);

        $('#datagrid1').prop("disabled", true);

        $("#buttonSearchRole").off("click");

        buttonDisabled($("#buttonSave"));
    }
}

function buttonSearchRole_click() {
    $.QDialog.show(
        {
            title: "Select Role"
        },
        {
            url: "../../Role/Role/SelectRole.aspx",
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (returnValue) {
                if (returnValue != null) {
                    $textGoupAdminRole.val(returnValue.Name);
                }
            }
        }
    );
    return false;
}

function buttonSave_click() {
    if ($.trim($selectOrg.val()) == "") {
        $.messager.alert("Warning", "Org can't be empty!", "warning");
        return;
    }

    if ($.trim($selectProduct.val()) == "") {
        $.messager.alert("Warning", "Product can't be empty!", "warning");
        return;
    }

    var isValid = true;

    if (!$textareaSystemGroupDescription.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textSystemGroupName.validatebox("isValid")) {
        isValid = false;
    }

    if (!$textGoupAdminRole.validatebox("isValid")) {
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var baseSystemDTOs = $("#datagrid1").datagrid("getChecked");
    var systemList = "";
    $(baseSystemDTOs).each(function (i) {
        if (systemList != "") {
            systemList = systemList + ",";
        }
        systemList = systemList + baseSystemDTOs[i].Name;
    });

    $(system).each(function (i) {
        if (systemList != "") {
            systemList = systemList + ",";
        }
        systemList = systemList + system[i];
    });

    var baseSystemGroupDTO = {
        Id: pageParameterId,

        Org_Id: $.trim($selectOrg.val()),
        Product_Id: $.trim($selectProduct.val()),
        AdminRole: $.trim($textGoupAdminRole.val()),
        Name: $.trim($textSystemGroupName.val()),
        Description: $.trim($textareaSystemGroupDescription.val()),
        System_List: systemList
    };

    if ($.trim(baseSystemGroupDTO.Id) == "") {
        baseSystemGroupDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "SystemGroupService.asmx/SaveSystemGroup",
        data: $.toJSON({ baseSystemGroupDTO: baseSystemGroupDTO, pageAction: pageParameterPageAction }),
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