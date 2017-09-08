
function checkFile() {
    var fileName = $.trim($("#FileUpload1").val());
    if (fileName == "") {
        $.messager.alert("Warning", "Please select an xml file!", "warning");
        return false;
    }
//    var n1 = fileName.lastIndexOf('.') + 1;
//    var fileExt = fileName.substring(n1).toLowerCase();
//    if (fileExt != "xml") {
//        $.messager.alert("Warning", "Please select an xml file!", "warning");
//        return false;
//    }
    return true;
}

function callBack(fileName) {
    parent.$.QDialog.hide(fileName);
}

$("#buttonCancel").click(function () {
    parent.$.QDialog.hide("");
});