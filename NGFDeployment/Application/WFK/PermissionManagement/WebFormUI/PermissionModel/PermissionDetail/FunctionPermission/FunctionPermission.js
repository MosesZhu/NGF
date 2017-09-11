var pageParameterPermissionOrgId;
var pageParameterPermissionProductId;
var pageParameterPermissionModeId;
var pageParameterSubjectCategory;
var pageParameterSubjectId;
var pageParameterIsOrgAdmin;

var $selectOrg;
var $selectProduct;
var $selectDomain;
var $selectSystem;
var arrayId;
var isSystemAdmin;

$(function () {
    pageParameterPermissionOrgId = $.url('?permissionOrgId');
    pageParameterPermissionProductId = $.url('?permissionProductId');
    pageParameterPermissionModeId = $.url('?permissionModeId');
    pageParameterSubjectCategory = $.url('?subjectCategory');
    pageParameterSubjectId = $.url('?subjectId');
    pageParameterIsOrgAdmin = $.url('?isOrgAdmin');

    $selectOrg = $("#selectOrg");
    $selectProduct = $("#selectProduct");
    $selectDomain = $("#selectDomain");
    $selectSystem = $("#selectSystem");

    $selectOrg.on("change", selectOrg_change);
    $selectProduct.on("change", selectProduct_change);
    $selectDomain.on("change", selectDomain_change);
    $selectSystem.on("change", selectSystem_change);

    selectOrgDataBind();
    selectProductDataBind();
    $selectOrg.val(pageParameterPermissionOrgId);
    $selectProduct.val(pageParameterPermissionProductId);

    selectDisabled($selectOrg);
    selectDisabled($selectProduct);
    selectOrg_change();
    selectProduct_change();

    datagrid_autoresize($("#divMainContent"), $("#treegrid1"));
    $(window).on("resize", function () {
        var datagriddata = $("#treegrid1").data("datagrid");
        if (datagriddata) {
            $("#treegrid1").datagrid("resize", { height: $(window).height() - $("#divHead").height() - 20 });
        }
    });

    $("#buttonInquiry").on("click", buttonInquiry_click);

});

//--分割线------------------------------------------------------------------------------------------------------------
///下拉框脚本
function selectOrg_change() {
    $('#divDetail').hide();

    selectSystemDataBind();
}

function selectProduct_change() {
    $('#divDetail').hide();

    selectDomainDataBind();
}

function selectDomain_change() {
    $('#divDetail').hide();

    selectSystemDataBind();
}

function selectSystem_change() {
    $('#divDetail').hide();
}

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function selectProductDataBind() {
    selectDataBind({
        $select: $selectProduct,
        url: "../../../SystemFunction/Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
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
        url: "../../../SystemFunction/Domain/DomainService.asmx/GetDomainList",
        data: $.toJSON({ productId: productId }),
        itemValue: "Id",
        itemText: "Name",
        empty: false
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
        url: "../../../SystemFunction/System1/SystemService.asmx/GetSystemList",
        data: $.toJSON({ orgId: orgId, domainId: domainId }),
        itemValue: "Id",
        itemText: "Name",
        empty: false
    });
}
//--分割线------------------------------------------------------------------------------------------------------------

///TreeGrid 和 Menu 脚本
function buttonInquiry_click() {
    var resourceOrgId = $.trim($selectOrg.val());
    var systemId = $.trim($selectSystem.val());
    if (systemId == "") {
        $.messager.alert("Warning", "System can't be empty!", "warning");
        return;
    }
    //查询初始化标记，为了区分是页面点击还是初始化时onCheck事件
    var initFlag = true;
    //选择一个节点时，第一次触发oncheck事件
    var firstCheck = true;
    //用户选择的节点FunctionId
    var selectFunctionId;
    $('#divDetail').hide();
    $('#treegrid1').treegrid({
        url: 'GetFunctionPermissionList.ashx?' + $.param({ permissionModeId: pageParameterPermissionModeId, subjectCategory: pageParameterSubjectCategory, subjectId: pageParameterSubjectId, resourceOrgId: resourceOrgId, systemId: systemId }),
        idField: 'Function_Id',
        treeField: 'FunctionName',
        frozenColumns: [[
                    { field: 'Select', checkbox: true, width: 50, halign: 'center', align: 'center' },
                    { field: 'FunctionName', title: 'Name', width: 350, halign: 'center' }
                ]],
        columns: [[
                    { field: 'FunctionCode', title: 'Code', width: 150, halign: 'center' },
                    { field: 'Node_Type', title: 'Node Type', width: 100, halign: 'center' },
                    { field: 'IsPublic', title: 'Is Public', width: 100, halign: 'center', align: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            if (value == true) {
                                return "Y";
                            } else {
                                return "";
                            }
                        }
                    }
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        singleSelect: false, //是否单选 
        selectOnCheck: true, //如果设置为true，单击一个复选框，将始终选择行
        checkOnSelect: true, //如果设置为true，选择一行,复选框将被选中
        animate: true,
        rownumbers: true, //行号 
        loadFilter: treegrid1LoadFilter, //返回过滤的数据显示
        onLoadSuccess: function (row, data) {
            if (data) {
                $.each(data.rows, function (index, item) {
                    if (item.Select) {
                        $('#treegrid1').treegrid('select', item.Function_Id);
                    }
                });
            }
            //页面初始完后，标记置为false,以便与用户选中操作区分
            initFlag = false;
            $('#divDetail').show();
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        onCheck: function (rowData) {
            //1.如果是页面初始化时选中，则返回
            if (initFlag) {
                return;
            }

            //2.如果是用户手动选中，则执行以下代码，firstCheck标记用户第一次选中
            if (firstCheck) {
                selectFunctionId = rowData.Function_Id;
                //１.先获取选中的Function的所有父节点和子节点，存放在全局变量数组中
                arrayId = new Array();
                GetParentNodeIds(selectFunctionId); //获取所有父节点
                GetChildrenNodeIds(selectFunctionId); //获取所有子节点

                //２.将选中的标记置为false，以使循环选择行触发的选中事件，不再执行该段代码
                firstCheck = false;
                $.each(arrayId, function (index, id) {
                    $('#treegrid1').treegrid('select', id);
                });

                //３.重新选择用户选择的行，以便定位到当前用户选择的数据有,下述代码没有效果，目前无法定位
                //$('#treegrid1').treegrid('select', selectFunctionId);

                //4.重置第一次选择标记为true,以便用户再次选择其他行
                firstCheck = true;
            }
        },
        onUncheck: function (rowData) {
            var crrentFunctionId = rowData.Function_Id;
            var childrenNodes = $('#treegrid1').treegrid('getChildren', crrentFunctionId);
            unCheckedChildrenRecursion(childrenNodes);
            //取消选择时要恢复选择的初始值，以防用户重新选择
            //选择一个节点时，第一次触发oncheck事件
            firstCheck = true;
        },
        toolbar: [
                    {
                        text: 'Save',
                        iconCls: 'icon-save',
                        handler: treegrid1Save
                    },
                    '-'
                ]
    });

    $.qajax({
        url: "../../../SystemFunction/System1/SystemService.asmx/IsCurrentUserSystemAdmin",
        data: $.toJSON({ systemId: $.trim($selectSystem.val()) }),
        async: false,
        success: function (result) {
            isSystemAdmin = result.d;
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

function GetParentNodeIds(currentFunctionId) {
    //因为每次选择中一个父节点时，都会触发onCheck事件，所以不用递归方法
    var parentRow = $('#treegrid1').treegrid('getParent', currentFunctionId);
    if (parentRow != null) {
        var parentId = parentRow.Function_Id;
        if (parentId != null) {
            //$('#treegrid1').treegrid('select', parentId);
            var id = new Array(parentId);
            arrayId = arrayId.concat(id);
            GetParentNodeIds(parentId);
        }
    }
}

function GetChildrenNodeIds(currentFunctionId) {
    var childrenNodes = $('#treegrid1').treegrid('getChildren', currentFunctionId);
    if (childrenNodes != null) {
        var childrenNodes1;
        for (var i = 0; i < childrenNodes.length; i++) {
            childrenNodes1 = $('#treegrid1').treegrid('getChildren', childrenNodes[i].Function_Id);
            //$('#treegrid1').treegrid('select', childrenNodes[i].Function_Id);
            var id = new Array(childrenNodes[i].Function_Id);
            arrayId = arrayId.concat(id);
            GetChildrenNodeIds(childrenNodes1);
        }
    }
}


function unCheckedChildrenRecursion(childrenNodes) {
    if (childrenNodes != null) {
        var childrenNodes1;
        for (var i = 0; i < childrenNodes.length; i++) {
            childrenNodes1 = $('#treegrid1').treegrid('getChildren', childrenNodes[i].Function_Id);
            $('#treegrid1').treegrid('unselect', childrenNodes[i].Function_Id);
            unCheckedChildrenRecursion(childrenNodes1);
        }
        return null;
    } else {
        return null;
    }
}

function treegrid1Save() {
    if (!isSystemAdmin && pageParameterIsOrgAdmin == "false") {
        $.messager.alert("Warning", "You don't have permission to save because you're not this system admin or org admin!", "warning");
        return;
    }
    var basePermissionDTO = {
        Permission_Mode_Id: pageParameterPermissionModeId,
        Subject_Category: pageParameterSubjectCategory,
        Subject_Id: pageParameterSubjectId,
        Resource_Org_Id: $.trim($selectOrg.val())
    };
    var systemId = $.trim($selectSystem.val());
    var selectionBasePermissionFunctionDTOs = $('#treegrid1').treegrid("getSelections");

    for (var i = 0; i < selectionBasePermissionFunctionDTOs.length; i++) {
        var dto = selectionBasePermissionFunctionDTOs[i];
        if ($.trim(dto.Node_Type).toLowerCase() == "category") {
            //获取所有子Id
            arrayId = new Array();
            GetChildrenNodeIds(dto.Function_Id);
            var hasSelSubFunction = false;
            for (var j = 0; j < arrayId.length; j++) {
                //判断子节点中是否有选中的Function
                hasSelSubFunction = CheckSelectSubFunction(arrayId[j], selectionBasePermissionFunctionDTOs);
                if (hasSelSubFunction == true) {
                    break; ;
                }
            }

            if (hasSelSubFunction == false) {
                $.messager.alert("Error", dto.FunctionName + " must select one function!", "error");
                return;
            }
        }
    }

    $.qajax({
        url: "../../Permission/PermissionService.asmx/SavePermissionFunction",
        data: $.toJSON({ basePermissionDTO: basePermissionDTO, systemId: systemId, basePermissionFunctionDTOs: selectionBasePermissionFunctionDTOs }),
        success: function (result) {
            if ($.trim(result.d) == "") {
                $.messager.alert("Information", "Save success!", "info");
            }
            else {
                $.messager.alert("Error", result.d, "error");
            }
        }
    });
}

//判断选中的Category是否有选中的子Function
function CheckSelectSubFunction(id, selFunctionDtos) {
    var hasSelSubFunction = false;
    for (var i = 0; i < selFunctionDtos.length; i++) {
        var dto = selFunctionDtos[i];
        if (dto.Function_Id == id && $.trim(dto.Node_Type).toLowerCase() == "function") {
            //有选中子Function
            hasSelSubFunction = true;
            break;
        }
    }

    return hasSelSubFunction;
}