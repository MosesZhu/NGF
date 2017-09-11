var $selectRoleType;
var $textRoleName;
var $textDescription;

$(function () {
    $selectRoleType = $("#selectRoleType");
    $textRoleName = $("#textRoleName");
    $textDescription = $("#textDescription");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#treegrid1"));
    $(window).on("resize", function () {
        var datagriddata = $("#treegrid1").data("datagrid");
        if (datagriddata) {
            $("#treegrid1").datagrid("resize", { height: $(window).height() - $("#divHead").height() - 70 });
        }
    });

    selectRoleTypeDataBind();

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonExport").on("click", buttonExport_click);
    $("#buttonImport").on("click", buttonImport_click);
    $("#btnExport").on("click", btnExport_click);
    $("#btnClose").on("click", btnClose_click);

    $("#divMenuCategaryAdd").on("click", AddRole);
    $("#divMenuRoleAdd").on("click", AddRole);
    $("#divMenuRoleEdit").on("click", EditRole);
    $("#divMenuRoleDelete").on("click", DeleteRoleAndAllChildren);
});

function selectRoleTypeDataBind() {
    selectDataBind({
        $select: $selectRoleType,
        url: "RoleService.asmx/GetRoleTypeList",
        itemType: "string"
    });
}

function getQueryUrl() {
    var vArguments = {
        RoleType: encodeURI($.trim($selectRoleType.val())),
        RoleName: encodeURI($.trim($textRoleName.val())),
        Description: encodeURI($.trim($textDescription.val()))
    };
    var queryurl = "GetBaseRoleList.ashx?" + $.param(vArguments);
    return queryurl;
}

function buttonInquiry_click() {
    var queryurl = getQueryUrl();
    if ($.trim(queryurl) == "") {
        return;
    }

    $('#divRole').show();
    $('#treegrid1').treegrid({
        url: queryurl,
        idField: 'Id',
        treeField: 'Name',
        frozenColumns: [[
                    { field: 'Name', title: 'Role', width: 400, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            if ($.trim(rowData.Parent_Role_Id) == "") {
                                return value;
                            }
                            else {
                                var str = '<a href="RoleFrame.aspx?' + $.param({ PageAction: pageAction.Edit, id: rowData.Id, name: rowData.Name, roleType: rowData.Role_Type }) + '" target="_blank">' + value + '</a>';
                                return str;
                            }
                        }
                    }
                ]],
        columns: [[
                    { field: 'Description', title: 'Description', width: 200, halign: 'center' },
                    { field: 'Role_Type', title: 'Role Type', width: 100, halign: 'center' },
                    { field: 'Role_Cardinality', title: 'Role Cardinality', width: 100, halign: 'center' }
                ]],
        striped: true,
        singleSelect: true,
        animate: true,
        rownumbers: true,
        loadFilter: function (data) {
            var data1 = escapeHtmlData(data);
            return data1;
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        onLoadSuccess: function (row, data) {
            $('#treegrid1').treegrid('collapseAll');
        },
        onContextMenu: treegrid1ContextMenu
    });

    $(window).resize();
}

///右键菜单
function treegrid1ContextMenu(e, row) {
    if (row.Role_Type.toLowerCase() == "system" && row.Name.toLowerCase() == "everyone") {
        return;
    }

    e.preventDefault();
    $(this).treegrid('select', row.Id);

    var rightmenu;

    if (row.TreeType == "Category") {
        rightmenu = $('#menuCategary');
    }
    else {
        rightmenu = $('#menuRole');
    }

    if (rightmenu) {
        rightmenu.menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    }
}

function AddRole() {
    //新增 Role
    var node = $('#treegrid1').treegrid('getSelected');
    if (node) {
        var parentRoleId;
        if (node.TreeType == "Category") {
            parentRoleId = "";
        }
        else {
            parentRoleId = node.Id;
        }

        openRoleMaintain(parentRoleId, node.Role_Type, pageAction.New);
    }
}

function EditRole() {
    //编辑 Function
    var node = $('#treegrid1').treegrid('getSelected');
    if (node) {
        openRoleMaintain(node.Id, node.Role_Type, pageAction.Edit);
    }
}

function DeleteRoleAndAllChildren() {
    //删除 Function
    var node = $('#treegrid1').treegrid('getSelected');
    if (node) {
        $.messager.confirm("Confirm", "Are you sure to delete?", function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "RoleService.asmx/DeleteBaseRole",
                    data: $.toJSON({ id: node.Id }),
                    success: function (result) {
                        if (result.d == "") {
                            buttonInquiry_click();
                            $.messager.alert("Information", "Delete success!", "info");
                        }
                        else {
                            $.messager.alert("Delete failed", result.d, "error");
                        }
                    }
                });
            }
        });
    }
}

function openRoleMaintain(id, roleType, action) {
    $.QDialog.show(
        {
            title: 'Role Maintain'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "RoleMaintain.aspx?" + $.param({ PageAction: action, roleType: roleType, id: id }),
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    $("#buttonInquiry").click();
                }
            }
        }
    );
}

function buttonExport_click() {
    var treegriddata = $("#treegrid1").data("treegrid");
    if (treegriddata == null) {
        $.messager.alert("Warning", "Please inquiry data first!", "warning");
    }
    var $content = $("#treegrid1").treegrid('getPanel').parent();
    $("#dialog1").dialog({
        title: "Role Export",
        width: $(window).width() * 0.8,
        height: $(window).height() * 0.8,
        modal: true,
        onBeforeOpen: function () {
            $("#treegrid1").treegrid('resize', {
                height: $("#dialog1").height() - $("#dialogButton").height() - 80,
                width: $("#dialog1").width() - 30
            });

            $("#dialogContent").append($content);
            $("#treegrid1").datagrid('options').singleSelect = false;
            $("#treegrid1").treegrid('unselectAll');
            $('#pHint').hide();
            $("#dialogButton").show();
        },
        onBeforeClose: function () {
            $("#treegrid1").treegrid('resize', {
                height: $(window).height() - $("#divHead").height() - 70,
                width: $("#divMainContent").width()
            });
            $("#treegrid1").treegrid("reload");

            $("#pHint").after($content);
            $("#treegrid1").datagrid('options').singleSelect = true;
            $("#treegrid1").treegrid('unselectAll');
            $('#pHint').show();
            $("#dialogButton").hide();
        }
    }
    );
}

function buttonImport_click() {
    $.QDialog.show(
        {
            title: 'File Upload'
        },
        {
            width: 0.8,
            height: 0.3,
            url: "../../CommonPage/FileUpload.aspx?function=Role",
            onCloseCallback: function (returnValue) {
                var fileName = $.trim(returnValue);
                if (fileName != "") {
                    openFunctionImport(fileName);
                }
            }
        }
    );
}

function openFunctionImport(fileName) {
    $.QDialog.show(
        {
            title: 'Role Import'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "RoleImport.aspx?" + $.param({ fileName: fileName }),
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    $('#treegrid1').treegrid("reload");
                    $('#treegrid1').treegrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
}

function btnExport_click() {
    var baseRoleDTOs = $("#treegrid1").treegrid("getSelections");

    if (baseRoleDTOs.length == 0) {
        $.messager.alert("Warning", "Please select data first!", "warning");
        return;
    }
    var listBaseRoleDTO = [];
    for (var i = 0; i < baseRoleDTOs.length; i++) {
        if (baseRoleDTOs[i].TreeType != "Category") {
            listBaseRoleDTO.push(baseRoleDTOs[i]);
        }
    }

    if (listBaseRoleDTO.length == 0) {
        $.messager.alert("Warning", "Only top nodes are selected!Please select at least one child node!", "warning");
        return;
    }

    $(listBaseRoleDTO).each(function (i, data) {
        data.Created_Date = serializerStringConvertDate(data.Created_Date);
        data.Modified_Date = serializerStringConvertDate(data.Modified_Date);
        var parent = $("#treegrid1").treegrid('getParent', data.Id);
        if (parent.TreeType == "Category") {
            data.Parent_Role_Id = null;
        }
    });

    $.qajax({
        url: "RoleService.asmx/GetRoleXml",
        data: $.toJSON({ listBaseRoleDTO: listBaseRoleDTO }),
        success: function (result) {
            var formExport = $('<form action="../../CommonPage/ExportToXml.aspx" method="post" id="formExport"></form>');
            var txtContent = $('<input type="hidden" id="txtContent" name="txtContent" />');
            var txtFunction = $('<input type="hidden" id="txtFunction" name="txtFunction" />');
            var xml = result.d;
            txtContent.val(escapeHtmlData(xml));
            txtContent.appendTo(formExport);
            txtFunction.val("Role");
            txtFunction.appendTo(formExport);
            formExport.appendTo(document.body).submit();
            document.body.removeChild(formExport);
        }
    });
}

function btnClose_click() {
    $("#dialog1").dialog('close');
}