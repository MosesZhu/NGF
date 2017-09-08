var $selectOrg;
var $selectDataSource;
var $selectDataTable;
var $textName;
var $textDescription;

$(function () {
    $selectOrg = $("#selectOrg");
    $selectDataSource = $("#selectDataSource");
    $selectDataTable = $("#selectDataTable");
    $textName = $("#textName");
    $textDescription = $("#textDescription");

    $selectOrg.on("change", selectOrg_change);
    $selectDataSource.on("change", selectDataSource_change);

    selectOrgDataBind();
});

function selectOrg_change() {
    selectDataSourceDataBind();
}

function selectDataSource_change() {
    selectDataTableDataBind();
}

function selectOrgDataBind() {
    selectDataBind({
        $select: $selectOrg,
        url: "../../OrgUser/Org/OrgService.asmx/GetOrgListAll",
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

function selectDataSourceDataBind() {
    var orgId = $.trim($selectOrg.val());
    if (orgId == "") {
        $selectDataSource.empty();
        $selectDataSource.change();
        return;
    }

    selectDataBind({
        $select: $selectDataSource,
        url: "../../SensitiveData/DataSource/DataSourceService.asmx/GetBaseDataSourceList",
        data: $.toJSON({ orgId: orgId }),
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}

function selectDataTableDataBind() {
    var dataSourceId = $.trim($selectDataSource.val());
    if (dataSourceId == "") {
        $selectDataTable.empty();
        $selectDataTable.change();
        return;
    }

    selectDataBind({
        $select: $selectDataTable,
        url: "../../SensitiveData/DataTable/DataTableService.asmx/GetBaseDataTableList",
        data: $.toJSON({ dataSourceId: dataSourceId }),
        itemValue: "Id",
        itemText: "Name",
        async: false
    });
}