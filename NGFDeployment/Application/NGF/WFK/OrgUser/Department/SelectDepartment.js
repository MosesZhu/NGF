var pageParameterIsSingleSelect;

var $selectOrg;
var $textParentDeptartmentCode;
var $textDepartmentCode;
var $textDepartmentName;
var $textRealName;
var $textDescription;
var $selectLevel;
var $textManagerName;

$(function () {
    pageParameterIsSingleSelect = $.trim($.url('?IsSingleSelect'));
    if (pageParameterIsSingleSelect == "N") {
        pageParameterIsSingleSelect = false;
    } else {
        pageParameterIsSingleSelect = true;
    }
    
    $selectOrg = $("#selectOrg");
    $textParentDeptartmentCode = $("#textParentDeptartmentCode");
    $textDepartmentCode = $("#textDepartmentCode");
    $textDepartmentName = $("#textDepartmentName");
    $textRealName = $("#textRealName");
    $textDescription = $("#textDescription");
    $selectLevel = $("#selectLevel");
    $textManagerName = $("#textManagerName");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    selectOrgDataBind();
    selectLevelDataBind();

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonReset").on("click", buttonReset_click);
    $("#buttonOk").on("click", buttonOk_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    $("#buttonInquiry").click();
});

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectLevelDataBind() {
    selectDataBind({
        $select: $selectLevel,
        url: "../Department/DepartmentService.asmx/GetDepartmentLevelList",
        itemType: "string"
    });
}

//datagrid1 begin-------------------------------------------------------
function getQueryUrl() {
    var vArguments = {
        Org_Id: encodeURI($.trim($selectOrg.val())),
        Parent_Deptartment_Code: encodeURI($.trim($textParentDeptartmentCode.val())),
        Department_Code: encodeURI($.trim($textDepartmentCode.val())),
        Department_Name: encodeURI($.trim($textDepartmentName.val())),
        Real_Name: encodeURI($.trim($textRealName.val())),
        Description: encodeURI($.trim($textDescription.val())),
        Level: encodeURI($.trim($selectLevel.val())),
        ManagerName: encodeURI($.trim($textManagerName.val())),
        Is_Virtual_Department: $.trim($("input:radio[name='RadioIsVirtualDepartment']:checked").val())
    };
    var queryurl = "../Department/GetDepartmentList.ashx?" + $.param(vArguments);

    return queryurl;
}

function buttonInquiry_click() {
    var queryurl1 = getQueryUrl();
    if ($.trim(queryurl1) == "") {
        return;
    }

    //datagrid初始化
    $('#datagrid1').datagrid({
        frozenColumns: [[
                    { field: 'ck', checkbox: true, width: 50, halign: 'center', align: 'center', hidden: pageParameterIsSingleSelect },
                    { field: 'Org', title: 'Org', width: 100, halign: 'center' },
                    { field: 'Parent_Deptartment_Code', title: 'Parent', width: 120, halign: 'center' },
                    { field: 'Department_Code', title: 'Department Code', width: 120, halign: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            var str = '<a href="DepartmentFrame.aspx?' + $.param({ id: rowData.Id }) + '" target="_blank">' + value + '</a>';
                            return str;
                        }
                    }
                ]],
        columns: [[
                    { field: 'Department_Name', title: 'Department Name', width: 120, halign: 'center' },
                    { field: 'Real_Name', title: 'Real Name', width: 120, halign: 'center' },
                    { field: 'Description', title: 'Description', width: 150, halign: 'center' },
                    { field: 'Level', title: 'Level', width: 50, halign: 'center' },
                    { field: 'ManagerName', title: 'ManagerName', width: 100, halign: 'center' },
                    { field: 'Is_Virtual_Department', title: 'Is Virtual Department', width: 120, halign: 'center',
                        align: 'center',
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
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl1, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'Id', //标识字段。
        singleSelect: pageParameterIsSingleSelect, //是否单选 
        selectOnCheck: true, //如果设置为true，单击一个复选框，将始终选择行
        checkOnSelect: true, //如果设置为true，选择一行,复选框将被选中
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
        onDblClickRow: buttonOk_click
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
    
    $("#buttonOk").removeAttr("disabled");

    $(window).resize();

    return;
}
//datagrid1 end-------------------------------------------------------

function buttonReset_click() {
    $selectOrg.val("");
    $textParentDeptartmentCode.val("");
    $textDepartmentCode.val("");
    $textDepartmentName.val("");
    $textRealName.val("");
    $textDescription.val("");
    $selectLevel.val("");
    $textManagerName.val("");

    var $radioIsVirtualDepartmentBoth = $("#RadioIsVirtualDepartmentBoth");
    $radioIsVirtualDepartmentBoth.prop("checked", true);
}

function buttonOk_click() {
    var returnvalue;
    if (pageParameterIsSingleSelect) {
        returnvalue = $('#datagrid1').datagrid('getSelected');
    }
    else {
        returnvalue = $('#datagrid1').datagrid('getChecked');
    }

    if (!returnvalue) {
        //未选中行，不处理
        return;
    }

    parent.$.QDialog.hide(returnvalue);
}

function buttonCancel_click() {
    parent.$.QDialog.hide(null);
}