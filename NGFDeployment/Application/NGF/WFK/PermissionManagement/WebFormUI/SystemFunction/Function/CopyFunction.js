var systemId;
var nodeType;
var parentFunctionId;

$(function () {
    var vArguments = parent.$.QDialog.options.getParentArgument();
    $("#textDestinationOrg").val(vArguments.SelectedName.OrgName);
    $("#textDestinationProduct").val(vArguments.SelectedName.ProductName);
    $("#textDestinationDomain").val(vArguments.SelectedName.DomainName);
    $("#textDestinationSystem").val(vArguments.SelectedName.SystemName);
    $("#textDestinationFunction").val(vArguments.BaseFunctionDTO.Name);

    systemId = $.trim(vArguments.BaseFunctionDTO.System_Id);
    nodeType = $.trim(vArguments.BaseFunctionDTO.Node_Type);
    parentFunctionId = $.trim(vArguments.BaseFunctionDTO.Id);
    if (nodeType == "System") {
        parentFunctionId = "";
    }

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonCopy").on("click", buttonCopy_click);
    $("#buttonCancel").on("click", buttonCancel_click);
});

///TreeGrid
function buttonInquiry_click() {
    var systemId = $.trim($selectSystem.val());
    if (systemId == "") {
        $.messager.alert("Warning", "System can't be empty!", "warning");
        return;
    }

    var width = $("#divMainContent").width();
    var height = $(window).height() - $("#divHead").height() - 30;

    $('#treegrid1').treegrid({
        url: 'GetSystemFunctionList.ashx?' + $.param({ systemId: systemId }),
        idField: 'Id',
        treeField: 'Name',
        frozenColumns: [[
                    { field: 'Selected', title: '', width: 50, halign: 'center', align: 'center', checkbox: true },
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
        singleSelect: false,
        animate: true,
        rownumbers: true,
        width: width,
        height: height,
        loadFilter: treegrid1LoadFilter,
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        onCheck: function (rowData) {
            var currentId = rowData.Id;
            var childrenNodes = $('#treegrid1').treegrid('getChildren', currentId);
            checkedChildrenRecursion(childrenNodes);
        },
        onUncheck: function (rowData) {
            var currentId = rowData.Id;
            var childrenNodes = $('#treegrid1').treegrid('getChildren', currentId);
            unCheckedChildrenRecursion(childrenNodes);
        }
    });

    $(window).resize();
}

function treegrid1LoadFilter(data) {
    $.each(data.rows, function (i, t) {
        t.Created_Date = serializerStringConvertDate(t.Created_Date);
        t.Modified_Date = serializerStringConvertDate(t.Modified_Date);
    });
    var data1 = escapeHtmlData(data);
    return data1;
}


function checkedChildrenRecursion(childrenNodes) {
    if (childrenNodes != null) {
        var childrenNode;
        for (var i = 0; i < childrenNodes.length; i++) {
            childrenNode = $('#treegrid1').treegrid('getChildren', childrenNodes[i].Id);
            $('#treegrid1').treegrid('select', childrenNodes[i].Id);
            checkedChildrenRecursion(childrenNode);
        }
        return null;
    } else {
        return null;
    }
}

function unCheckedChildrenRecursion(childrenNodes) {
    if (childrenNodes != null) {
        var childrenNode;
        for (var i = 0; i < childrenNodes.length; i++) {
            childrenNode = $('#treegrid1').treegrid('getChildren', childrenNodes[i].Id);
            $('#treegrid1').treegrid('unselect', childrenNodes[i].Id);
            unCheckedChildrenRecursion(childrenNode);
        }
        return null;
    } else {
        return null;
    }
}

function buttonCopy_click() {
    var baseFunctions = $('#treegrid1').treegrid("getSelections");
    if (baseFunctions == undefined || baseFunctions == null || baseFunctions.length == 0) {
        //未选中行，不处理
        $.messager.alert("Warning", "No data was selected,please select it!", "warning");
        return;
    }

    if (baseFunctions.length == 1 && baseFunctions[0].Node_Type == "System") {
        $.messager.alert("Warning", "This is system data,please select some other datas again!", "warning");
        return;
    }

    var errMsg = "";
    $.each(baseFunctions, function (index, baseFunction) {
        try {
            checkSelectFunctionNode(baseFunctions, baseFunction.Id);
        } catch (error) {
            errMsg = error.message;
        }
    });

    if ($.trim(errMsg) != "") {
        $.messager.alert("Warning", errMsg, "warning");
        return;
    }

    var isValid = false;
    if (nodeType == "System" || nodeType == "Category") {
        for (var i = 0; i < baseFunctions.length; i++) {
            if (baseFunctions[i].Node_Type == "Category" || baseFunctions[i].Node_Type == "Function") {
                isValid = true;
                break;
            }
        }

        if (isValid == false) {
            $.messager.alert("Warning", "Because the node type is " + nodeType + ",you cann't copy the operation directly!", "warning");
            return;
        }

        for (var m = 0; m < baseFunctions.length; m++) {
            if (baseFunctions[m].Node_Type == "Operation") {
                var parentnode = $('#treegrid1').treegrid('getParent', baseFunctions[m].Id);
                if (parentnode != null) {
                    if (isParentNodeChecked(baseFunctions, parentnode.Id) == false) {
                        $.messager.alert("Warning", "You cann't copy the operation[" + baseFunctions[m].Name + "] directly without selecting its function[" + parentnode.Name + "],please select it again!", "warning");
                        return;
                    }
                }
            }
        }
    }

    if (nodeType == "Function") {
        var opreationName = [];
        for (var j = 0; j < baseFunctions.length; j++) {
            if (baseFunctions[j].Node_Type == "System" || baseFunctions[j].Node_Type == "Category" || baseFunctions[j].Node_Type == "Function") {
                $.messager.alert("Warning", "Because the node type is " + nodeType + ",you can only copy the operation!", "warning");
                return;
            }
            opreationName.push(baseFunctions[j].Name);
        }

        var sortedOpreationName = opreationName.sort();
        for (var k = 0; k < opreationName.length; k++) {
            if (sortedOpreationName[k] == sortedOpreationName[k + 1]) {
                $.messager.alert("Warning", "The operation of " + sortedOpreationName[k] + " is duplicate,please change it!", "warning");
                return;
            }
        }
    }

    $.qajax({
        url: "FunctionService.asmx/CopyFunction",
        data: $.toJSON({ systemId: systemId, nodeType: nodeType, parentFunctionId: parentFunctionId, baseFunctions: baseFunctions }),
        success: function (result) {
            if (result.d == "") {
                $.messager.alert("Information", "Copy success!", "info",
                    function () {
                        parent.$.QDialog.hide(true);
                    });
            }
            else {
                $.messager.alert("Error", result.d, "error");
            }
        }
    });
    return;
}

function checkSelectFunctionNode(baseFunctions, functionId) {
    var status = true;
    var parentnode = $('#treegrid1').treegrid('getParent', functionId);
    while (parentnode != null) {
        if (isParentNodeChecked(baseFunctions, parentnode.Id) == true) {
            if (status == false) {
                throw new Error("Please select a consecutive tree data!");
            }
        }
        else {
            status = false;
        }
        parentnode = $('#treegrid1').treegrid('getParent', parentnode.Id);
    }
}

function isParentNodeChecked(baseFunctions, parentFunctionId) {
    for (var i = 0; i < baseFunctions.length; i++) {
        if (baseFunctions[i].Id == parentFunctionId) {
            return true;
        }
    }
    return false;
}

function buttonCancel_click() {
    parent.$.QDialog.hide(false);
}