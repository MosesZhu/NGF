var $selectOrg;
var $textUserName;
var $textRealName;
var $textEmployeeNo;
var $textEmail;
var $textMobilPhone;
var $textTelphone;
var $textCompany;
var $textDepartment;
var $textTitle;
var $selectGender;
var $textComputerName;

$(function () {
    $selectOrg = $("#selectOrg");
    $textUserName = $("#textUserName");
    $textRealName = $("#textRealName");
    $textEmployeeNo = $("#textEmployeeNo");
    $textEmail = $("#textEmail");
    $textMobilPhone = $("#textMobilPhone");
    $textTelphone = $("#textTelphone");
    $textCompany = $("#textCompany");
    $textDepartment = $("#textDepartment");
    $textTitle = $("#textTitle");
    $selectGender = $("#selectGender");
    $textComputerName = $("#textComputerName");

    panel_autoresize($("#divMainContent"), $("#divQueryConditions"));
    datagrid_autoresize($("#divMainContent"), $("#datagrid1"));

    selectOrgDataBind();
    selectGenderDataBind();

    $("#buttonInquiry").on("click", buttonInquiry_click);
    $("#buttonReset").on("click", buttonReset_click);
    $("#buttonNew").on("click", buttonNew_click);
});

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name"
    });
}

function selectGenderDataBind() {
    selectDataBind({
        $select: $selectGender,
        url: "UserService.asmx/GetGenderList",
        itemType: "string"
    });
}

function buttonNew_click() {
    openUserMaintain("", pageAction.New);
    return;
}

function datagrid1Edit() {
    var baseUserDTO = $("#datagrid1").datagrid("getSelected");
    if (baseUserDTO == null) {
        //未选中行，不处理
        return;
    } else {
        if (baseUserDTO.IsStaff) {
            $.messager.alert("Information", "Staff can not be edit!", "info");
            return;
        }
    }

    openUserMaintain(baseUserDTO.User_Id, pageAction.Edit);

    return;
}

function openUserMaintain(id, action) {
    $.QDialog.show(
        {
            title: 'User Maintain'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "UserMaintain.aspx?" + $.param({ PageAction: action, id: id }),
            onCloseCallback: function (returnValue) {
                if (returnValue == true) {
                    //$("#buttonInquiry").click();
                    $('#datagrid1').datagrid("reload");
                    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。
                }
            }
        }
    );
}

function datagrid1Delete() {
    var baseUserDTO = $("#datagrid1").datagrid("getSelected");
    if (baseUserDTO == null) {
        //未选中行，不处理
        return;
    }
    else {
        if (baseUserDTO.IsStaff) {
            $.messager.alert("Information", "Staff can not be delete!", "info");
            return;
        }
    }

    $.messager.confirm("Confirm", "Are you sure to delete?", function (confirmresult) {
        if (confirmresult == true) {
            $.qajax({
                url: "UserService.asmx/DeleteBaseUser",
                data: $.toJSON({ id: baseUserDTO.User_Id }),
                success: function (result) {
                    if (result.d == "") {
                        //$("#buttonInquiry").click();
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
    });
    return;
}

//datagrid1 begin-------------------------------------------------------

function getQueryUrl() {
    var vArguments = {
        Org_Id: encodeURI($.trim($selectOrg.val())),
        Org: encodeURI($.trim($selectOrg.find('option:selected').text())),
        User_Name: encodeURI($.trim($textUserName.val())),
        Real_Name: encodeURI($.trim($textRealName.val())),
        Employee_No: encodeURI($.trim($textEmployeeNo.val())),
        Email: encodeURI($.trim($textEmail.val())),
        Mobil_Phone: encodeURI($.trim($textMobilPhone.val())),
        Telphone: encodeURI($.trim($textTelphone.val())),
        Company: encodeURI($.trim($textCompany.val())),
        Department_Code: encodeURI($.trim($textDepartment.val())),
        Title: encodeURI($.trim($textTitle.val())),
        Gender: encodeURI($.trim($selectGender.val())),
        Computer_Name: encodeURI($.trim($textComputerName.val()))
    };

    var isStaffValue = $.trim($('input:radio[name="isStaff"]:checked').val());
    if (isStaffValue == "Yes") {
        vArguments.Is_Staff = 1;
    }

    if (isStaffValue == "No") {
        vArguments.Is_Staff = 0;
    }

    var queryurl = "GetBaseUserList.ashx?" + $.param(vArguments);

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
                    { field: 'Org', title: 'Org', width: 80, halign: 'center' },
                    { field: 'User_Name', title: 'User Name', width: 80, halign: 'center', align: 'left',
                        formatter: function (value, rowData, rowIndex) {
                            var str = '<a target="_blank" href="UserFrame.aspx?' + $.param({ id: rowData.User_Id }) + '">';
                            str += rowData.User_Name + '</a>';
                            return str;
                        }
                    }
                ]],
        columns: [[
                    { field: 'Real_Name', title: 'Real Name', width: 90, halign: 'center' },
                    { field: 'Employee_Id', title: 'Employee Id', width: 140, halign: 'center' },
                    { field: 'Employee_No', title: 'Employee No', width: 90, halign: 'center' },
                    { field: 'IsStaff', title: 'Is Staff', width: 80, halign: 'center', align: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            var str = '<input type="checkbox" disabled="true" ';
                            if (value == true) {
                                str += ' checked="checked" ';
                            }
                            str += ' ></input>';
                            return str;
                        }
                    },
                    { field: 'Email', title: 'Email', width: 100, halign: 'center' },
                    { field: 'Mobil_Phone', title: 'Mobil Phone', width: 100, halign: 'center' },
                    { field: 'Telphone', title: 'Telphone', width: 100, halign: 'center' },
                    { field: 'Company', title: 'Company', width: 150, halign: 'center' },
                    { field: 'Department_Code', title: 'Department', width: 90, halign: 'center' },
                    { field: 'Title', title: 'Title', width: 100, halign: 'center' },
                    { field: 'Gender', title: 'Gender', width: 60, halign: 'center' },
                    { field: 'Computer_Name', title: 'Computer Name', width: 100, halign: 'center' }
                ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl1, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'User_Id', //标识字段。
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
                    '-'
                ],
        onDblClickRow: datagrid1Edit
    });

    $('#datagrid1').datagrid("unselectAll"); //取消选择所有页面的行。

    $(window).resize();
    return;
}

function buttonReset_click() {
    $selectOrg.val("");
    $textUserName.val("");
    $textRealName.val("");
    $textEmployeeNo.val("");
    $textEmail.val("");
    $textMobilPhone.val("");
    $textTelphone.val("");
    $textCompany.val("");
    $textDepartment.val("");
    $textTitle.val("");
    $selectGender.val("");
    $textComputerName.val("");

    var $rdBoth = $("#rdBoth");
    $rdBoth.prop("checked", true);
}
//datagrid1 end-------------------------------------------------------