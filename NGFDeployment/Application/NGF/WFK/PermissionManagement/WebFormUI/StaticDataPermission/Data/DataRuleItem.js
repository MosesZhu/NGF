function buildDatagridItem($datagridItem, dataRuleGroupId) {
    var queryurl = "GetBaseDataRuleItemList.ashx?" + $.param({ "dataRuleGroupId": dataRuleGroupId });

    $datagridItem.datagrid({
        columns: [[
            { field: 'And_Or', title: 'Relation', width: 80, halign: 'center', align: 'center' },
            { field: 'Column', title: 'Column', width: 120, halign: 'center' },
            { field: 'Operator', title: 'Operator', width: 50, halign: 'center', align: 'center' },
            { field: 'Value_Type', title: 'ValueType', width: 80, halign: 'center' },
            { field: 'Value', title: 'Value', width: 200, halign: 'center' }
        ]],
        nowrap: false, //True 就会把数据显示在一行里。
        striped: true, //True 就把行条纹化。（即奇偶行使用不同背景色）
        border: true,  //定义了是否显示Panel的边框。
        collapsible: false, //是否可折叠的 
        url: queryurl, //从远程站点请求数据的 URL。
        remoteSort: false, //定义是否从服务器给数据排序。
        idField: 'Id', //标识字段。
        singleSelect: true, //是否单选 
        rownumbers: true, //行号 
        pagination: false, //分页控件
        toolbar: [
                    {
                        text: 'Add',
                        iconCls: 'icon-add',
                        handler: function () {
                            datagridItemAdd($datagridItem, dataRuleGroupId);
                        }
                    },
                    '-',
                    {
                        text: 'Edit',
                        iconCls: 'icon-edit',
                        handler: function () {
                            datagridItemEdit($datagridItem, dataRuleGroupId);
                        }
                    },
                    '-',
                    {
                        text: 'Delete',
                        iconCls: 'icon-remove',
                        handler: function () {
                            datagridItemDelete($datagridItem);
                        }
                    },
                    '-'
                ],
        loadFilter: datagridItemLoadFilter, //返回过滤的数据显示
        onLoadError: function (data) {
            $.messager.alert("Error", data.responseText, "error");
        },
        onDblClickRow: function () {
            datagridItemEdit($datagridItem, dataRuleGroupId);
        }
    });
}

function datagridItemLoadFilter(data) {
    $.each(data.rows, function (i, t) {
        t.Created_Date = serializerStringConvertDate(t.Created_Date);
        t.Modified_Date = serializerStringConvertDate(t.Modified_Date);
    });
    return data;
}

//var dataRuleItemDto;
function datagridItemAdd($datagridItem, dataRuleGroupId) {
    $.QDialog.show(
        {
            title: 'Data Maintain---Select Item'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "DataRuleMaintainGroupItem.aspx?" + $.param({ PageAction: pageAction.New, DataRuleGroupId: dataRuleGroupId, DataRuleItemId: guidEmpty }),
            onCloseCallback: function (dataRuleItemDTO) {
                if (dataRuleItemDTO) {
                    $datagridItem.datagrid("appendRow", dataRuleItemDTO);
                    $datagridItem.datagrid("unselectAll");
                }
            }
        }
    );
}

function datagridItemEdit($datagridItem, dataRuleGroupId) {
    var baseDataRuleItemDTO = $datagridItem.datagrid("getSelected");
    if (baseDataRuleItemDTO == null) {
        //未选中行，不处理
        return;
    }

    var rowIndex = $datagridItem.datagrid("getRowIndex", baseDataRuleItemDTO);
    $.QDialog.show(
        {
            title: 'Data Maintain---Select Item'
        },
        {
            width: 0.9,
            height: 0.9,
            url: "DataRuleMaintainGroupItem.aspx?" + $.param({ PageAction: pageAction.Edit, DataRuleGroupId: dataRuleGroupId, DataRuleItemId: baseDataRuleItemDTO.Id }),
            getParentArgument: function () {
                return baseDataRuleItemDTO;
            },
            onCloseCallback: function (dataRuleItemDTO) {
                if (dataRuleItemDTO) {
                    $datagridItem.datagrid('updateRow', {
                        index: rowIndex,
                        row: dataRuleItemDTO
                    });
                    $datagridItem.datagrid("unselectAll");
                }
            }
        }
    );
}

function datagridItemDelete($datagridItem) {
    var baseDataRuleItemDTO = $datagridItem.datagrid("getSelected");
    if (baseDataRuleItemDTO == null) {
        //未选中行，不处理
        return;
    }

    var getRowIndex = $datagridItem.datagrid("getRowIndex", baseDataRuleItemDTO);
    $datagridItem.datagrid("deleteRow", getRowIndex);
}

function getBaseDataRuleItemDTOs($datagridItem) {
    var baseDataRuleItemDTOs = $datagridItem.datagrid('getRows');
    return baseDataRuleItemDTOs;
}