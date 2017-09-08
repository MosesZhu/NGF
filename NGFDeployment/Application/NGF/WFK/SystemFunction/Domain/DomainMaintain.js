var pageParameterId;
var pageParameterPageAction;

var $selectProduct;
var $textName;
var $textareaDescription;

$(function () {
    pageParameterId = $.url('?id');
    pageParameterPageAction = $.url('?PageAction');

    $selectProduct = $("#selectProduct");
    $textName = $("#textName");
    $textareaDescription = $("#textareaDescription");

    $("#buttonSave").on("click", buttonSave_click);
    $("#buttonCancel").on("click", buttonCancel_click);

    selectProductDataBind();

    //页面数据初始化
    initializeData();
});

function selectProductDataBind() {
    selectDataBind({
        $select: $selectProduct,
        url: "../Product/ProductService.asmx/GetProductList",
        itemValue: "Id",
        itemText: "Name",
        async: false //同步方式调用。
    });
}

function initializeData() {
    if (pageParameterPageAction != pageAction.New) {
        $.qajax({
            url: "DomainService.asmx/GetDomain",
            data: $.toJSON({ id: pageParameterId }),
            success: function (result) {
                setPageData(result.d);
            }
        });
    }
}

function setPageData(baseDomainDTO) {
    $selectProduct.val(baseDomainDTO.Product_Id);
    $textName.val(baseDomainDTO.Name);
    $textareaDescription.val(baseDomainDTO.Description);

    //检查该笔数据是否允许编辑，若不允许则不可编辑
    if (!(baseDomainDTO.AllowEdit)) {
        selectDisabled($selectProduct);
        textBoxDisabled($textName);
        textBoxDisabled($textareaDescription);

        buttonDisabled($("#buttonSave"));
    }
}

function buttonSave_click() {
    if ($.trim($selectProduct.val()) == "") {
        $.messager.alert("Warning", "Product can't be empty!", "warning");
        return;
    }

    var isValid = true;

    if (!$textName.validatebox("isValid")) {
        isValid = false;
    }
    if (!$textareaDescription.validatebox("isValid")) {
        isValid = false;
    }
    if (!isValid) {
        return;
    }

    var baseDomainDTO = {
        Id: pageParameterId,
        Product_Id: $.trim($selectProduct.val()),
        Name: $.trim($textName.val()),
        Description: $.trim($textareaDescription.val())
    };

    if ($.trim(baseDomainDTO.Id) == "") {
        baseDomainDTO.Id = guidEmpty;
    }

    $.qajax({
        url: "DomainService.asmx/SaveBaseDomain",
        data: $.toJSON({ baseDomainDTO: baseDomainDTO, pageAction: pageParameterPageAction }),
        beforeSend: function (XMLHttpRequest) {
            $("#buttonSave").prop("disabled", true);
        },
        success: function (result) {
            if ($.trim(result.d) == "") {
                $.messager.alert("Information", "Save success!", "info",
                    function () {
                        parent.$.QDialog.hide(true);
                    });
            }
            else {
                $.messager.alert("Error", result.d, "error");
            }
        },
        complete: function () {
            $("#buttonSave").prop("disabled", false);
        }
    });
    return;
}

function buttonCancel_click() {
    parent.$.QDialog.hide(false);
}