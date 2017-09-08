$(function () {

    /*
    1、WebService请求类型都为Post，WebService的Url为“[WebServiceUrl]/[WebMethod]”
    2、contentType声明为Json
    3、data要用Json的字符串格式传入
    4、设置了dataType为json后，result就直接为返回的Json对象。

    */

    $("#btnAlert").click(function () {
        window.alert("window.alert");
    });


    //调用无参数方法
    $("#btnHelloWorld").click(function () {
        $.qajax({
            url: "JqueryTestService.asmx/HelloWorld",
            data: "{}",
            success: function (result) {
                $.messager.alert("Error", result.d, "error");
            }
        });
    });

    //传入1个参数
    $("#btnHello").click(function () {
        $.qajax({
            url: "JqueryTestService.asmx/Hello",
            data: "{name:'KiMoGiGi'}",
            success: function (result) {
                $.messager.alert("Question", result.d, "question");
            }
        });
    });

    //返回泛型列表
    $("#btnArray").click(function () {
        $.qajax({
            url: "JqueryTestService.asmx/CreateArray",
            data: "{i:10}",
            success: function (result) {
                $.messager.alert("Information", result.d.join(" | "), "info");
            }
        });
    });

    //返回复杂类型
    $("#btnPerson").click(function () {
        $.qajax({
            url: "JqueryTestService.asmx/GetPerson",
            data: "{name:'KiMoGiGi',age:26}",
            success: function (result) {
                var person = result.d;
                var showText = [];
                for (var p in person) {
                    showText.push(p + ":" + person[p]);
                }
                $.messager.alert("Warning", showText.join("\r\n"), "warning");
            }
        });
    });

    $("#btnConfirm").click(function () {
        $.messager.confirm('Confirm', 'Are you sure to exit this system?', function (r) {
            $.messager.alert("Information", r, "info");
            if (r) {
                // exit action;
            }
        });
    });

    $("#btnPrompt").click(function () {
        $.messager.prompt('Prompt', 'Please enter your name:', function (r) {
            if (r) {
                $.messager.alert("Information", "Hello " + r, "info");
            }
        });
    });
    $("#btnTrim").click(function () {
        var t1 = $.trim(undefined); // ""
        var t2 = $.trim(null);      // ""
        var t3 = $.trim(" test ");  // "test"
        var t4 = $.trim("");        // ""
        var t5 = $.trim(" ");       // ""
        debugger;
        return;
    });

    $("#buttonTestAjax").click(function () {
        $.qajax({
            url: "JqueryTestService.asmx/GetData10",
            data: "{i:10}",
            success: function (result) {
                //alert(result.d.join(" | "));
                //debugger;
                var divs = $("form > div"); // $("div", $("form"));
            }
        });
    });

    $("#buttonTestToJSONDate").click(function () {
        var date1 = new Date();
        var data2 = $.toJSON(date1);
        alert(data2); //测试结果为在IE8下面，毫秒被弄丢掉了。firefox,Google chrome 正常。
    });

    $("#buttonTestJob").click(function () {
        $.qajax({
            url: "JqueryTestService.asmx/RunJob",
            data: "{}",
            success: function (result) {
                alert("Success!");
            }
        });
    });

    $("#buttonTestOpenInNewTab").click(function () {
        openInNewTab("PermissionManagement", "Org");
    });

    function openInNewTab(systemName, functionName) {
        $.qajax({
            url: "JqueryTestService.asmx/GetFunctionId",
            data: $.toJSON({ systemName: systemName, functionName: functionName }),
            success: function (result) {
                if ($.trim(result.d) != "") {
                    parent.addNewTab(result.d);
                }
            }
        });
    }

    $("#buttonQDialog1").click(function () {
        var url = "JqueryTest.aspx";


        $.QDialog.show(
                    {
                        title: 'JqueryTest'
                    },
                    {
                        url: url,
                        width: 0.9,
                        height: 0.9
                    }
                );
    });

    $("#buttonQDialog2").click(function () {

        showError("012345678901234567890123456789012345678901234567890123456789x\r\n012345678901234567890123456789012345678901234567890123456789x\r\n012345678901234567890123456789012345678901234567890123456789x");


        //        $.QDialog.show(
        //                    {
        //                        title: 'Org Inquiry'
        //                    },
        //                    {
        //                        $content: $("#divContent"),
        //                        width: 0.9,
        //                        height: 0.9,
        //                        shadow: false,
        //                        onCloseCallback: function (returnValue) {
        //                            $.messager.alert("", "divContent Close", "info");
        //                        }
        //                    }
        //                );
    });

    $("#buttonOpenUrlNewTab").click(function () {
        openUrlInNewTab($("#textUrl").val());
    });

    $("#buttonOpenFunctionNewTab").click(function () {
        openFunctionInNewTab("PermissionManagement", $("#textFunctionName").val());
    });



    $("#buttonDialog").click(function () {
        //showInformation("Test.");   
        $.messager.alert("Error", "Test1", "error", function () {
            //showInformation("Test.");    

            $.QDialog.show(
                                {
                                    title: 'Org Inquiry'
                                },
                                {
                                    $content: $("#divContent"),
                                    width: 0.8,
                                    height: 0.7,
                                    onCloseCallback: function (returnValue) {
                                        $.messager.alert("", "divContent Close", "info");
                                    }
                                }
                            );

        });

        //        $('#dd').dialog({
        //            title: 'My Dialog',
        //            width: 400,
        //            height: 200,
        //            closed: false,
        //            cache: false,
        //            modal: true
        //        });   

    });

});

//        $(function () {
//            var xx = $.toJSON({ type: 'Search' });

//            //debugger;
//            var CommonResourceUrl = "http://aic0-s2.qcs.qcorp.com/wfK_common/Styles/its/default/Images/";
//            $(".easyui-image").each(function (i) {

//                var imageName = "";
//                //var dataoptions = $.parseJSON("{" + $(this).attr("data-options") + "}");
//                var dataoptions = $.parseJSON(xx);
//                switch (dataoptions.type) {
//                    case "Search":
//                        imageName = "Button_Search.gif";
//                        break;

//                    default:
//                }

//                $(this).attr("src", CommonResourceUrl + imageName);
//                $(this).attr("alt", dataoptions.type);
//            });
//        });

function ErrorTestCallback(parameters) {
    alert(parameters);
}

