var isSystemAdmin;
var isOrgAdmin;
//--分割线------------------------------------------------------------------------------------------------------------

$(function () {
    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#treegrid1"));
    $(window).on("resize", function () {
        var datagriddata = $("#treegrid1").data("datagrid");
        if (datagriddata) {
            $("#treegrid1").datagrid("resize", { height: $(window).height() - $("#divHead").height() - 70 });
        }
    });

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonCopy").on("click", buttonCopy_click);
    $("#buttonExport").on("click", buttonExport_click);
    $("#buttonImport").on("click", buttonImport_click);
    $("#btnExport").on("click", btnExport_click);
    $("#btnClose").on("click", btnClose_click);

    $("#menuSystemAdd").on("click", addFunction);
    $("#menuSystemDelete").on("click", deleteFunctionAndAllChildren);
    $("#menuCategoryAdd").on("click", addFunction);
    $("#menuCategoryEdit").on("click", editFunction);
    $("#menuCategoryDelete").on("click", deleteFunctionAndAllChildren);
    $("#menuFunctionAdd").on("click", addOperation);
    $("#menuFunctionEdit").on("click", editFunction);
    $("#menuFunctionDelete").on("click", deleteFunctionAndAllChildren);
    $("#menuOperationEdit").on("click", editOperation);
    $("#menuOperationDelete").on("click", deleteOperation);
});

///TreeGrid 和 Menu 脚本
function buttonInquiry_click() {
    var systemId = $.trim($selectSystem.val());
    if (systemId == "") {
        $.messager.alert("Warning", "System can't be empty!", "warning");
        return;
    }

    $('#divFunction').show();
    $('#treegrid1').treegrid({
        url: 'GetSystemFunctionList.ashx?' + $.param({ systemId: systemId }),
        idField: 'Id',
        treeField: 'Name',
        frozenColumns: [[
                    { field: 'Name', title: 'Name', width: 200, halign: 'center' }
                ]],
        columns: [[
                    { field: 'Code', title: 'Code', width: 150, halign: 'center' },
                    { field: 'Node_Type', title: 'Node Type', width: 100, halign: 'center' },
                    { field: 'Instance_Type', title: 'Instance Type', width: 100, halign: 'center' },
                    { field: 'Navigate_Url', title: 'Url', width: 150, halign: 'center' },
                    { field: 'Assembly', title: 'Assembly', width: 150, halign: 'center' },
                    { field: 'Form_Class', title: 'Form', width: 150, halign: 'center' },
                    { field: 'IsPublic', title: 'Is Public', width: 100, halign: 'center', align: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            var str = '<input type="checkbox" disabled="true" ';
                            if (value == true) {
                                str += ' checked="checked" ';
                            }
                            str += ' ></input>';
                            return str;
                        }
                    }
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
        onContextMenu: treegrid1ContextMenu,
        onDblClickRow: dblClickRow
    });

    $.qajax({
        url: "../System1/SystemService.asmx/IsCurrentUserSystemAdmin",
        data: $.toJSON({ systemId: systemId }),
        async: false,
        success: function (result) {
            isSystemAdmin = result.d;
        }
    });

    $.qajax({
        url: "../../OrgUser/Org/OrgService.asmx/IsCurrentUserOrgAdmin",
        data: $.toJSON({ orgId: $.trim($selectOrg.val()) }),
        async: false,
        success: function (result) {
            isOrgAdmin = result.d;
        }
    });

    $(window).resize();
}

///右键菜单
function treegrid1ContextMenu(e, row) {
    e.preventDefault();
    $(this).treegrid('select', row.Id);

    var rightmenu = null;

    if (row.Node_Type == "System") {
        rightmenu = $('#menuSystem');
    }
    else if (row.Node_Type == "Category") {
        rightmenu = $('#menuCategory');
    }
    else if (row.Node_Type == "Function") {
        rightmenu = $('#menuFunction');
    }
    else if (row.Node_Type == "Operation") {
        rightmenu = $('#menuOperation');
    }

    if (rightmenu) {
        rightmenu.menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    }
}

function dblClickRow(row) {
    $(this).treegrid('select', row.Id);
    if (row.Node_Type == "Category" || row.Node_Type == "Function") {
        editFunction();
    }
    else if (row.Node_Type == "Operation") {
        editOperation();
    } else {
        return;
    }
}

function buttonCopy_click() {
    var systemId = $.trim($selectSystem.val());
    if (systemId == "") {
        $.messager.alert("Warning", "System can't be empty!", "warning");
        return;
    }

    if ($("#divFunction").is(":visible") != true) {
        //没有查询出当前的system
        return;
    }

    var baseFunctionDto = $("#treegrid1").treegrid("getSelected");
    if (!baseFunctionDto) {
        $.messager.alert("Warning", "You must select a target!", "warning");
        return;
    }

    if (baseFunctionDto.Node_Type == "Operation") {
        $.messager.alert("Warning", "Operation not need copy!", "warning");
        return;
    }

    if (!isSystemAdmin && !isOrgAdmin) {
        $.messager.alert("Warning", "You don't have permission to copy because you're not system admin or org admin!", "warning");
        return;
    }

    $.QDialog.show(
        {
            title: 'Copy From Function'
        },
        {
            url: "CopyFunction.aspx",
            width: 0.9,
            height: 0.9,
            getParentArgument: function () {
                var vArguments = {
                    SelectedName: {
                        OrgName: $.trim($selectOrg.find('option:selected').text()),
                        ProductName: $.trim($selectProduct.find('option:selected').text()),
                        DomainName: $.trim($selectDomain.find('option:selected').text()),
                        SystemName: $.trim($selectSystem.find('option:selected').text())
                    },
                    BaseFunctionDTO: baseFunctionDto
                };
                return vArguments;
            },
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    $("#buttonInquiry").click();
                }
            }
        }
    );
}

//--分割线------------------------------------------------------------------------------------------------------------
///Menu 事件处理脚本

function addFunction() {
    //新增 Function
    var node = $('#treegrid1').treegrid('getSelected');
    if (node) {
        if (!isSystemAdmin && !isOrgAdmin) {
            $.messager.alert("Warning", "You don't have permission to add function because you're not system admin or org admin!", "warning");
            return;
        }
        var systemId = node.System_Id;
        var parentFunctionId;
        var functionId = "";
        var action = pageAction.New;

        if (node.Node_Type == "System") {
            parentFunctionId = "";
        }
        else {
            parentFunctionId = node.Id;
        }
        var hasChildren = false;

        openFunctionMaintain(systemId, parentFunctionId, functionId, action, hasChildren, "", "");
    }
}

function editFunction() {
    //编辑 Function
    var node = $('#treegrid1').treegrid('getSelected');
    if (node) {
        var systemId = node.System_Id;
        var parentFunctionId = node.Parent_Function_Id;
        var functionId = node.Id;
        var action = pageAction.Edit;

        if (parentFunctionId == systemId) {
            parentFunctionId = "";
        }

        var hasChildren = false;
        var childrenNode = $('#treegrid1').treegrid('getChildren', functionId);
        if (childrenNode != undefined && childrenNode != null && childrenNode.length > 0) {
            hasChildren = true;
        }

        openFunctionMaintain(systemId, parentFunctionId, functionId, action, hasChildren, isSystemAdmin, isOrgAdmin);
    }
}

function deleteFunctionAndAllChildren() {
    //删除 Function
    var node = $('#treegrid1').treegrid('getSelected');
    if (node) {
        if (!isSystemAdmin && isOrgAdmin) {
            $.messager.alert("Warning", "You don't have permission to delete because you're not system admin or org admin!", "warning");
            return;
        }
        $.messager.confirm("Confirm", "Are you sure to delete?", function (confirmresult) {
            if (confirmresult == true) {
                var deleteType;
                var systemId = node.System_Id;
                var functionId = node.Id;
                if (node.Node_Type == "System") {
                    //表明是System的菜单项，要删除全部的function，Operation，FunctionScope。
                    deleteType = "SystemAllChildren";
                }
                else {
                    //"表明是Category或者是Function的菜单项，要删除" + node.Id + "及其所有子项(function，Operation，FunctionScope)。
                    deleteType = "FunctionAndAllChildren";
                }

                $.qajax({
                    url: "FunctionService.asmx/DeleteBaseFunction",
                    data: $.toJSON({ deleteType: deleteType, systemId: systemId, functionId: functionId }),
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

function addOperation() {
    //新增 Operation
    var node = $('#treegrid1').treegrid('getSelected');
    if (node) {
        if (!isSystemAdmin && !isOrgAdmin) {
            $.messager.alert("Warning", "You don't have permission to add operation because you're not system admin or org admin!", "warning");
            return;
        }
        var functionId = node.Id;
        var functionName = node.Name;
        var operationId = "";
        var action = pageAction.New;

        openOperationMaintain(functionId, functionName, operationId, action, "", "");
    }
}

function editOperation() {
    //编辑 Operation
    var node = $('#treegrid1').treegrid('getSelected');
    if (node) {
        var functionId = node.Parent_Function_Id;
        var parentnode = $('#treegrid1').treegrid('getParent', node.Id);
        var functionName = parentnode.Name;
        var operationId = node.Id;
        var action = pageAction.Edit;

        openOperationMaintain(functionId, functionName, operationId, action, isSystemAdmin, isOrgAdmin);
    }
}

function deleteOperation() {
    //删除 Operation
    var node = $('#treegrid1').treegrid('getSelected');
    if (node) {
        if (!isSystemAdmin && !isOrgAdmin) {
            $.messager.alert("Warning", "You don't have permission to delete operation because you're not system admin or org admin!", "warning");
            return;
        }
        $.messager.confirm("Confirm", "Are you sure to delete?", function (confirmresult) {
            if (confirmresult == true) {
                $.qajax({
                    url: "../Operation/OperationService.asmx/DeleteBaseOperation",
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

function openFunctionMaintain(systemId, parentFunctionId, functionId, action, hasChildren, isSystemAdmin, isOrgAdmin) {
    var orgName = $.trim($selectOrg.find('option:selected').text());
    var productName = $.trim($selectProduct.find('option:selected').text());
    var domainName = $.trim($selectDomain.find('option:selected').text());
    var systemName = $.trim($selectSystem.find('option:selected').text());
    var rootNode = $('#treegrid1').treegrid('getRoot');
    var base_Url = $.trim(rootNode.Navigate_Url);
    var systemInstancetype = $.trim(rootNode.Instance_Type);
    var parentFunctionName;
    var parentFunctionNode = $('#treegrid1').treegrid('find', parentFunctionId);
    if (parentFunctionNode != null) {
        parentFunctionName = parentFunctionNode.Name;
    }
    else {
        parentFunctionName = "";
    }

    $.QDialog.show(
        {
            title: 'Function Maintain'
        },
        {
            url: "FunctionMaintain.aspx?" + $.param({ PageAction: action, systemId: systemId, parentFunctionId: parentFunctionId, functionId: functionId, isSystemAdmin: isSystemAdmin, isOrgAdmin: isOrgAdmin }),
            width: 0.9,
            height: 0.9,
            getParentArgument: function () {
                var vArguments = {
                    SelectedName: {
                        OrgName: orgName,
                        ProductName: productName,
                        DomainName: domainName,
                        SystemName: systemName,
                        Base_Url: base_Url,
                        SystemInstancetype: systemInstancetype,
                        ParentFunctionName: parentFunctionName,
                        HasChildren: hasChildren
                    }
                };
                return vArguments;
            },
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    $("#buttonInquiry").click();
                }
            }
        }
    );
}

function openOperationMaintain(functionId, functionName, operationId, action, isSystemAdmin, isOrgAdmin) {
    $.QDialog.show(
        {
            title: 'Operation Maintain'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "../Operation/OperationMaintain.aspx?" + $.param({ PageAction: action, functionId: functionId, operationId: operationId, isSystemAdmin: isSystemAdmin, isOrgAdmin: isOrgAdmin }),
            getParentArgument: function () {
                var vArguments = {
                    SelectedName: { FunctionName: functionName }
                };
                return vArguments;
            },
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    $("#buttonInquiry").click();
                }
            }
        }
    );
}
//--分割线------------------------------------------------------------------------------------------------------------

function buttonExport_click() {
    var treegriddata = $("#treegrid1").data("treegrid");
    if (treegriddata == null) {
        $.messager.alert("Warning", "Please inquiry data first!", "warning");
    }
    var $content = $("#treegrid1").treegrid('getPanel').parent();
    $("#dialog1").dialog({
        title: "Function Export",
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
            url: "../../CommonPage/FileUpload.aspx?function=Function",
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
            title: 'Function Import'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "FunctionImport.aspx?" + $.param({ fileName: fileName }),
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
    var baseFunctionDTOs = $("#treegrid1").treegrid("getSelections");
    if (baseFunctionDTOs.length == 0) {
        $.messager.alert("Warning", "Please select data first!", "warning");
        return;
    }
    var listBaseFunctionDTO = [];
    for (var i = 0; i < baseFunctionDTOs.length; i++) {
        if (baseFunctionDTOs[i].Node_Type != "System") {
            listBaseFunctionDTO.push(baseFunctionDTOs[i]);
        }
    }
    if (listBaseFunctionDTO.length == 0) {
        $.messager.alert("Warning", "Only system node is selected!Please select at least one function node!", "warning");
        return;
    }
    $(listBaseFunctionDTO).each(function (i, data) {
        data.Created_Date = serializerStringConvertDate(data.Created_Date);
        data.Modified_Date = serializerStringConvertDate(data.Modified_Date);
        var parent = $("#treegrid1").treegrid('getParent', data.Id);
        if (parent.Node_Type == "System") {
            data.Parent_Function_Id = null;
        }
    });

    $.qajax({
        url: "FunctionService.asmx/GetFunctionXml",
        data: $.toJSON({ listBaseFunctionDTO: listBaseFunctionDTO }),
        success: function (result) {
            var formExport = $('<form action="../../CommonPage/ExportToXml.aspx" method="post" id="formExport"></form>');
            var txtContent = $('<input type="hidden" id="txtContent" name="txtContent" />');
            var txtFunction = $('<input type="hidden" id="txtFunction" name="txtFunction" />');
            var xml = result.d;
            txtContent.val(escapeHtmlData(xml));
            txtContent.appendTo(formExport);
            txtFunction.val("Function");
            txtFunction.appendTo(formExport);
            formExport.appendTo(document.body).submit();
            document.body.removeChild(formExport);
        }
    });
}

function btnClose_click() {
    $("#dialog1").dialog('close');
}