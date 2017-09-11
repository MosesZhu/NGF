$(function () {
    $("#buttonSearchScope").on("click", buttonSearchScope_click);
});

function buttonSearchScope_click() {
    if (!$checkBoxIsPublic.prop("checked")) {
        return false;
    }
    $.QDialog.show(
        {
            title: "Select Scope"
        },
        {
            url: "../../OrgUser/Department/SelectScope.aspx?",
            width: 0.9,
            height: 0.9,
            onCloseCallback: function (baseDepartmentDTOs) {
                if (baseDepartmentDTOs != null) {
                    var arrayScopes = getArrayScopes(baseDepartmentDTOs);
                    $.each(arrayScopes, function (index, baseFunctionScopeDTO) {
                        appendScopeDiv(baseFunctionScopeDTO);
                    });
                }
            }
        }
    );
    return false;
}

function getArrayScopes(baseDepartmentDTOs) {
    var arrayScopes = [];
    $.each(baseDepartmentDTOs, function (index, item) {
        var scopeName = (item.TreeType == "Org"
                        ? item.Department_Code
                        : item.Department_Name);
        arrayScopes.push({
            Scope_Category: item.TreeType,
            Scope_Id: item.Id,
            ScopeName: scopeName
        });
    });

    var scopes = getFunctionScopes();
    
    var newArrayScopes = [];
    for (var i = 0; i < arrayScopes.length; i++) {
        var isExists = false;
        for (var j = 0; j < scopes.length; j++) {
            if (arrayScopes[i].Scope_Id == scopes[j].Scope_Id) {
                isExists = true;
                break;
            }
        }
        if (isExists == false) {
            newArrayScopes.push(arrayScopes[i]);
        }
    }
    return newArrayScopes;
}

function appendScopeDiv(baseFunctionScopeDTO) {
    var $divSingleScope = $('<div name="divSingleScope" style="float:left;"></div>');
    var $spanSingleScope = $('<span></span>');
    $spanSingleScope.text(baseFunctionScopeDTO.Scope_Category + '_' + baseFunctionScopeDTO.ScopeName);

    var $buttonDeleteScope = $('<input type="button" value="" class="ButtonDelete" />');
    $buttonDeleteScope.on("click", function () {
        $divSingleScope.remove();
    });

    $divSingleScope
        .append($spanSingleScope)
        .append('&nbsp;&nbsp;')
        .append($buttonDeleteScope)
        .append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

    $divSingleScope.data("functionscope", baseFunctionScopeDTO);

    $divScope.append($divSingleScope);
}

function getFunctionScopes() {
    var $divSingleScopes = $("div[name='divSingleScope']", $divScope);
    var scopes = [];
    $divSingleScopes.each(function () {
        var scope = $(this).data("functionscope");
        scope.Created_Date = serializerStringConvertDate(scope.Created_Date);
        scope.Modified_Date = serializerStringConvertDate(scope.Modified_Date);
        scopes.push(scope);
    });
    return scopes;
}
