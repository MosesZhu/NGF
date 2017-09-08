/// <reference path="file://F:/Work/Test/wfk/FineUI/js/lib/ext-base.js" />
/// <reference path="file://F:/Work/Test/wfk/FineUI/js/lib/ext-all-debug.js" />

var currentPermissionModeId = ""; //当前的PermissionModeId

function onReady() {
    var buttonExpand = Ext.getCmp(IDS.buttonExpand);
    var buttonCollapse = Ext.getCmp(IDS.buttonCollapse);
    var mainMenu = Ext.getCmp(IDS.mainMenu);
    var mainTabStrip = Ext.getCmp(IDS.mainTabStrip);
    var windowSourceCode = Ext.getCmp(IDS.windowSourceCode);
    var ContentPanel1 = Ext.getCmp(IDS.ContentPanel1);
    var leftPanel = Ext.getCmp("RegionPanel1_Region2");
    var textFind = Ext.getCmp("RegionPanel1_Region2_Toolbar3_TextFind");

    leftPanel.on("resize", function (e) {
        var leftPanelWidth = leftPanel.getWidth();
        setCookie("leftPanelWidth", leftPanelWidth, 365);
        textFind.setWidth(leftPanelWidth - 100);
    });

    function getExpandedPanel() {
        var panel = null;
        mainMenu.items.each(function (item) {
            if (!item.collapsed) {
                panel = item;
            }
        });
        return panel;
    }

    // 点击全部展开按钮
    buttonExpand.on('click', function () {
        if (IDS.menuType == "menu") {
            mainMenu.expandAll();
        } else {
            var expandedPanel = getExpandedPanel();
            if (expandedPanel) {
                expandedPanel.items.itemAt(0).expandAll();
            }
        }
    });

    // 点击全部折叠按钮
    buttonCollapse.on('click', function () {
        if (IDS.menuType == "menu") {
            mainMenu.collapseAll();
        } else {
            var expandedPanel = getExpandedPanel();
            if (expandedPanel) {
                expandedPanel.items.itemAt(0).collapseAll();
            }
        }
    });

    function createToolbar(id) {

        // 由工具栏上按钮获得当前标签页中的iframe节点
        function getCurrentIframeNode(button) {
            // 注意：button.ownerCt 是工具栏，button.ownerCt.ownerCt 就是当前激活的标签页。
            return Ext.DomQuery.selectNode('iframe', button.ownerCt.ownerCt.el.dom);
        }

        var addToFavoritButton = new Ext.Button({
            text: '加入到我的最爱',
            type: "button",
            cls: "x-btn-text-icon",
            icon: "./res.axd?icon=AwardStarAdd",
            listeners: {
                click: function (button, e) {
                    //alert(getCurrentIframeNode(button).src);
                    //window.open(getCurrentIframeNode(button).src, "_blank");
                    var str = Ext.getCmp(IDS.mainTabStrip).getActiveTab().id;
                    if ($.trim(str) == "") {
                        return;
                    }
                    var functionId = str.substr(str.length - 36);
                    var jsonData = '{"functionId":"' + functionId + '"}';
                    $.ajax({
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "post",
                        url: "PortalService.asmx/AddToFavorites",
                        data: jsonData,
                        success: function (result) {
                            if ($.trim(result.d) == "") {
                                alert("Add to favorites success!");
                            }
                            else {
                                alert(result.d);
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest.responseText);
                        }
                    });
                    e.stopEvent();
                }
            }
        });

        var openNewWindowButton = new Ext.Button({
            text: '新标签页中打开',
            type: "button",
            cls: "x-btn-text-icon",
            icon: "./res.axd?icon=TabGo",
            listeners: {
                click: function (button, e) {
                    window.open(getCurrentIframeNode(button).src, "_blank");
                    e.stopEvent();
                }
            }
        });

        var refreshButton = new Ext.Button({
            text: '刷新',
            type: "button",
            cls: "x-btn-text-icon",
            icon: "./res.axd?icon=Reload",
            listeners: {
                click: function (button, e) {
                    getCurrentIframeNode(button).contentWindow.location.reload();
                    e.stopEvent();
                }
            }
        });

        switch (language) {
            case "EN":
                addToFavoritButton.setText("Add To My Favorites");
                openNewWindowButton.setText("Open In New Window");
                refreshButton.setText("Refresh");
                break;
            case "ZH_CN":
                addToFavoritButton.setText("添加到收藏夹");
                openNewWindowButton.setText("新窗口中打开");
                refreshButton.setText("刷新");
                break;
            case "ZH_TW":
                addToFavoritButton.setText("加入到我的最愛");
                openNewWindowButton.setText("新視窗中打開");
                refreshButton.setText("刷新");
                break;
        }

        var path = '';
        if (id) {
            if (typeof (id) == 'string') {
                id = getNode(id);
            }
            if (id != null) {
                path = id.getPath('text').substring(2).replace(/\//g, ' > ');
                if (path.split(' > ').length > 2) {
                    var pos = path.indexOf(' > ');
                    path = path.substring(pos + 2);
                }
            }
        }

        return new Ext.Toolbar({
            items: [{ xtype: 'tbtext', text: path, style: 'font-weight: bold; color: black' },
                    '->', addToFavoritButton, '-', refreshButton, '-', openNewWindowButton]
        });
    }


    // 初始化主框架中的树(或者Accordion+Tree)和选项卡互动，以及地址栏的更新
    X.util.initTreeTabStrip(mainMenu, mainTabStrip, createToolbar);


    // 公开添加新标签页的方法
    window.addNewTab = function (id, url, text, icon) {
        var node = getNode(id);
        if (node != null) {
            X.util.addMainTab(mainTabStrip, node, createToolbar);
            return;
        }
        var paramCount = arguments;
        if (paramCount.length == 1) {
            var data = '{"functionId":"' + id + '"}';
            $.ajax({
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "post",
                url: "PortalService.asmx/GetFunction",
                data: data,
                success: function (result) {
                    var functionDTO = $.parseJSON(result.d);
                    var _url = functionDTO.url;
                    var _text = functionDTO.text;
                    var _icon = functionDTO.icon;
                    X.util.addMainTab(mainTabStrip, id, _url, _text, _icon, createToolbar);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.responseText);
                }
            });
        }
        else {
            X.util.addMainTab(mainTabStrip, id, url, text, icon, createToolbar);
        }
    };

    var isToggle = false;
    window.ToggleHeadPanel = function (button) {
        isToggle = !isToggle;
        var panel = Ext.getCmp('RegionPanel1_Region1');
        if (isToggle) {
            //$('#RegionPanel1_Region1_ContentPanel1').hide();			
            //panel.autoHeight = false; 
            //panel.setHeight(26);
            //panel.doComponentLayout();
            //panel.setSize("100%", "32px");
            //$("#ext-gen12").hide();
            $("#" + ContentPanel1.id).parent().hide();
            button.setIcon("/WFK/images/igpnl_down.gif");
            //Ext.getCmp('RegionPanel1_Region1').collapse();
            //Ext.getCmp('RegionPanel1_Region1').expand();	
        } else {
            //$('#RegionPanel1_Region1_ContentPanel1').show();
            //panel.autoHeight = true; 
            panel.setHeight(67);
            //panel.doComponentLayout();
            //panel.setSize("100%", "76px");
            //$("#ext-gen12").show();
            $("#" + ContentPanel1.id).parent().show();
            button.setIcon("/WFK/images/igpnl_up.gif");
            //Ext.getCmp('RegionPanel1_Region1').expand();	
        }
        setCookie("isCollapsed", isToggle, 365);
        Ext.getCmp('PageManager1').doLayout();
        //panel.syncSize();
        //Ext.getCmp('RegionPanel1_Region2').syncSize();
        //Ext.getCmp('RegionPanel1_mainRegion').syncSize();

        //Ext.getCmp('RegionPanel1_Region1').syncHeight();
        /*
        Ext.getCmp('RegionPanel1_Region1').getLayout().runLayout();		
        Ext.getCmp('RegionPanel1_Region1').collapse();	
        */
        //alert(Ext.getCmp('RegionPanel1_Region1').autoHeight );		
    };

    if (getCookie("isCollapsed") == "true") {
        $("#buttonToggleHeadPanel").click();
    }

    var allowRightMouseSelection = function (e) {
        var disallow = this.ignoreRightMouseSelection && e.button !== 0;

        return !disallow;
    };

    //document.domain="qcorp.com";
    mainMenu.items.each(function (panel) {
        var tree = panel.items.itemAt(0);
        tree.selModel.ignoreRightMouseSelection = true;
        tree.on("contextmenu", function (node, e) {
            //          Register the context node with the menu so that a Menu Item's handler function can access
            //          it via its parentMenu property.
            return false;
            node.select();
            var c = node.getOwnerTree().contextMenu;
            c.contextNode = node;
            c.showAt(e.getXY());
        });
    });
    /*
    treePanel.contextMenu= new Ext.menu.Menu({
    items: [{
    id: 'delete-node',
    text: 'Delete Node'
    }],
    listeners: {
    itemclick: function(item) {
    switch (item.id) {
    case 'delete-node':
    var n = item.parentMenu.contextNode;
    if (n.parentNode) {
    n.remove();
    }
    break;
    }
    }
    }
    });
    */

    setInterval(function () {
        $.ajax({
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "post",
            url: "PortalService.asmx/GetPermessionModeId",
            success: function (result) {
                var newPermissionModeId = result.d;
                if ($.trim(currentPermissionModeId) == "") {
                    currentPermissionModeId = newPermissionModeId;
                    return;
                }

                if (currentPermissionModeId != newPermissionModeId) {
                    currentPermissionModeId = newPermissionModeId;
                    alert("Permission Mode is changed.Please Login again.");
                    window.location = "ssologout.aspx";
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //                if ($.trim(XMLHttpRequest.responseText) != "") {
                //                    alert(XMLHttpRequest.responseText);
                //                }
            }
        });
    }, 180000);         //3分钟循环执行一次。

    setInterval(function () {
        $.ajax({
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "post",
            url: "PortalService.asmx/CheckSessionValid",
            success: function (result) {
                var status = result.d;
                if (status != true) {
                    alert("Session Status is not active.Please Login again.");
                    window.location = "ssologout.aspx";
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //                alert(XMLHttpRequest.responseText);
            }
        });
    }, 180000);   //3分钟循环执行一次。

}

//设置cookie
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function findNode() {
    var flag = 0;
    var mainMenu = Ext.getCmp(IDS.mainMenu);
    var expandedPanel = null;
    mainMenu.items.each(function (item) {
        if (!item.collapsed) {
            expandedPanel = item;
        }
    });
    if (expandedPanel == null) {
        alert('Please expand the panel you want to search!');
        return;
    }
    var tree = expandedPanel.items.itemAt(0);
    var findText = $("#RegionPanel1_Region2_Toolbar3_TextFind").val().toLowerCase();
    var rootNode = tree.getRootNode();
    var listNodes = [];
    rootNode.cascade(function () {
        listNodes.push(this);
    });

    for (var i = 1; i < listNodes.length; i++) {
        if (listNodes[i].isSelected()) {
            flag = i;
            break;
        }
    }

    if (flag == listNodes.length - 1) {
        flag = 0;
    }

    for (var i = flag + 1; i < listNodes.length; i++) {
        if (listNodes[i].text.toLowerCase().indexOf(findText) != -1) {
            var path = listNodes[i].getPath();
            tree.expandPath(path);
            tree.selectPath(path);
            flag = i;
            return;
        }
    }

    if (flag > 0) {
        for (var i = 1; i <= flag; i++) {
            if (listNodes[i].text.toLowerCase().indexOf(findText) != -1) {
                var path = listNodes[i].getPath();
                tree.expandPath(path);
                tree.selectPath(path);
                flag = i;
                return;
            }
        }
    }

    alert("Not Found!");

    return;
}

function getNode(id) {
    var node = null;
    var mainMenu = Ext.getCmp(IDS.mainMenu);
    for (var i = 0; i < mainMenu.items.length; i++) {
        var tree = mainMenu.items.itemAt(i).items.itemAt(0);
        node = tree.getNodeById(id);
        if (node != null) {
            break;
        }
    }
    return node;
}

function openFunctionInNewTab(systemName, functionName) {
    var data = $.toJSON({ systemName: systemName, functionName: functionName });
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "post",
        url: "PortalService.asmx/GetFunctionId",
        data: data,
        success: function (result) {
            var functionId = result.d;
            if (functionId == "00000000-0000-0000-0000-000000000000") {
                alert("Function not found!");
            }
            else {
                var node = getNode(functionId);
                if (node == null) {
                    alert("You don't have permission to access this function!");
                }
                else {
                    addNewTab(functionId);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseText);
        }
    });
}
