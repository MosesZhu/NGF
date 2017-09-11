var pageParameterIsSingleSelect;

var $selectRoleType;
var $textRoleName;

$(function () {

    pageParameterIsSingleSelect = $.trim($.url('?IsSingleSelect'));
    if (pageParameterIsSingleSelect == "N") {
        pageParameterIsSingleSelect = false;
    } else {
        pageParameterIsSingleSelect = true;
    }
    
    $selectRoleType = $("#selectRoleType");
    $textRoleName = $("#textRoleName");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#treegrid1"));

    selectRoleTypeDataBind();

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonOk").on("click", buttonOk_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    $("#buttonInquiry").click();
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
        RoleName: encodeURI($.trim($textRoleName.val()))
    };
    var queryurl = "GetBaseRoleList.ashx?" + $.param(vArguments);
    return queryurl;
}

function buttonInquiry_click() {
    var queryurl = getQueryUrl();
    if ($.trim(queryurl) == "") {
        return;
    }

    $('#treegrid1').treegrid({
        url: queryurl,
        idField: 'Id',
        treeField: 'Name',
        frozenColumns: [[
                { field: 'ck', checkbox: true, width: 50, halign: 'center', align: 'center', hidden: pageParameterIsSingleSelect },
                    { field: 'Name', title: 'Role', width: 250, halign: 'center',
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
        singleSelect: pageParameterIsSingleSelect, //是否单选 
        selectOnCheck: true, //如果设置为true，单击一个复选框，将始终选择行
        checkOnSelect: true, //如果设置为true，选择一行,复选框将被选中
//        animate: true,
        rownumbers: true,
        loadFilter: function (data) {
            var data1 = escapeHtmlData(data);
            return data1;
        },
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        onCheck: function (rowData) {

            var childers = $("#treegrid1").treegrid("getChildren", rowData.Id);
            for (var i = 0; i < childers.length; i++) {

                $("#treegrid1").treegrid("checkRow", childers[i].Id);
            }
        },
       

        onUncheck: function (rowData) {
            var childers = $("#treegrid1").treegrid("getChildren", rowData.Id);
            for (var i = 0; i < childers.length; i++) {
                $("#treegrid1").treegrid("uncheckRow", childers[i].Id);
            }
        },
        
        onDblClickRow: buttonOk_click
    });

    $("#buttonOk").removeAttr("disabled");

    $(window).resize();
}

function buttonOk_click() {


    if (pageParameterIsSingleSelect) {
        var rtvalue = $('#treegrid1').treegrid('getSelected');

       if (rtvalue == null) {
            //未选中行，不处理
            return;
        }

        //RoleType不能选
        if ($.trim(rtvalue.Parent_Role_Id) == "") {
            $.messager.alert("Warning", "Please select other role!", "warning");
            return;
        }

        parent.$.QDialog.hide(rtvalue);


    }
    else {
        var returnvalue = $('#treegrid1').treegrid('getChecked');
        if (!returnvalue) {
            //未选中行，不处理
            return;
        }
        var roles = new Array();
        var j = 0;
        $.each(returnvalue, function (index, item) {
            if (item.Parent_Role_Id != null && $.trim(item.Parent_Role_Id) != "") {
                roles[j] = item;
                j++;
            }

        });
        parent.$.QDialog.hide(roles);
        
    }

 



   
  
}

function buttonCancel_click() {
    parent.$.QDialog.hide(null);
}