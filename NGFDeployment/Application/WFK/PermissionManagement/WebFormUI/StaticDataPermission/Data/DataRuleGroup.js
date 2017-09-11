function initializeDataRuleGroup(dataId) {
    if ($.trim(dataId) == "" || $.trim(dataId) == guidEmpty) {
        return;
    }

    $("#divRuleGroup").data("GroupCount", 0);

    $.qajax({
        url: "DataRuleGroupService.asmx/GetBaseDataRuleGroupList",
        data: $.toJSON({ dataId: dataId }),
        success: function (result) {
            $.each(result.d, function (i, baseDataRuleGroupDTO) {
                createDataRuleGroup(baseDataRuleGroupDTO);
            });
        }
    });
}

function createDataRuleGroup(baseDataRuleGroupDTO) {
    var $divRuleGroupContent = processRuleGroupContent($("div[name='divRuleGroupTemplate']").clone(), baseDataRuleGroupDTO);
    $("#divRuleGroup").append($divRuleGroupContent);
    $divRuleGroupContent.show();
    $(window).resize();
}

function processRuleGroupContent($divRuleGroupContent, baseDataRuleGroupDTO) {
    $divRuleGroupContent.attr("name", "divRuleGroupContent");
    $divRuleGroupContent.attr("id", "divRuleGroupContent_" + (new Date()).valueOf().toString());

    //设置RuleGroup的Sequence
    calculateSequence($divRuleGroupContent);

    $(":button[name='buttonDelete']", $divRuleGroupContent).on("click", function () {
        $divRuleGroupContent.remove();
        recalculateSequence();
    });

    var $datagridItem = $("[name='datagridItem']", $divRuleGroupContent);
    datagrid_autoresize($("div[name='divDatagridItem']", $divRuleGroupContent), $datagridItem);

    if (baseDataRuleGroupDTO) {
        $divRuleGroupContent.data("groupId", baseDataRuleGroupDTO.Id);
        $(":input[name='selectCondition']", $divRuleGroupContent).val(baseDataRuleGroupDTO.And_Or);
        buildDatagridItem($datagridItem, baseDataRuleGroupDTO.Id);
    }
    else {
        $divRuleGroupContent.data("groupId", guidEmpty);
        buildDatagridItem($datagridItem, null);
    }

    return $divRuleGroupContent;
}

function calculateSequence($divRuleGroupContent) {
    //设置RuleGroup的Sequence
    var groupCount = $("#divRuleGroup").data("GroupCount");
    if (!groupCount) {
        groupCount = 0;
    }
    groupCount++;

    $("span[name='spanSequence']", $divRuleGroupContent).text(groupCount);
    $("#divRuleGroup").data("GroupCount", groupCount);
}

function recalculateSequence() {
    var groupCount = 0;

    var $divRuleGroupContents = $("div[name='divRuleGroupContent']", $("#divRuleGroup"));
    $divRuleGroupContents.each(function (index, domdivRuleGroupContent) {
        groupCount++;
        $("span[name='spanSequence']", $(domdivRuleGroupContent)).text(groupCount);
    });

    $("#divRuleGroup").data("GroupCount", groupCount);
}

function getBaseDataRuleGroupDTOs(dataId) {
    if ($.trim(dataId) == "") {
        dataId = guidEmpty;
    }
    
    var baseDataRuleGroupDTOs = [];
    var $divRuleGroupContents = $("div[name='divRuleGroupContent']", $("#divRuleGroup"));

    $divRuleGroupContents.each(function (index, domdivRuleGroupContent) {
        var $divRuleGroupContent = $(domdivRuleGroupContent);
        var baseDataRuleGroupDTO = {
            Id: $divRuleGroupContent.data("groupId"),
            Data_Id: dataId,
            And_Or: $.trim($(":input[name='selectCondition']", $divRuleGroupContent).val()),
            ListBaseDataRuleItemDTO: getBaseDataRuleItemDTOs($("[name='datagridItem']", $divRuleGroupContent))
        };

        baseDataRuleGroupDTOs.push(baseDataRuleGroupDTO);
    });

    return baseDataRuleGroupDTOs;
}
