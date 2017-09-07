﻿using System.Web.Optimization;
using System.Web.UI;

namespace NGF.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkID=303951
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/WebFormsJs").Include(
            //                "~/Scripts/WebForms/WebForms.js",
            //                "~/Scripts/WebForms/WebUIValidation.js",
            //                "~/Scripts/WebForms/MenuStandards.js",
            //                "~/Scripts/WebForms/Focus.js",
            //                "~/Scripts/WebForms/GridView.js",
            //                "~/Scripts/WebForms/DetailsView.js",
            //                "~/Scripts/WebForms/TreeView.js",
            //                "~/Scripts/WebForms/WebParts.js"));

            //// Order is very important for these files to work, they have explicit dependencies
            //bundles.Add(new ScriptBundle("~/bundles/MsAjaxJs").Include(
            //        "~/Scripts/WebForms/MsAjax/MicrosoftAjax.js",
            //        "~/Scripts/WebForms/MsAjax/MicrosoftAjaxApplicationServices.js",
            //        "~/Scripts/WebForms/MsAjax/MicrosoftAjaxTimer.js",
            //        "~/Scripts/WebForms/MsAjax/MicrosoftAjaxWebForms.js"));

            // Use the Development version of Modernizr to develop with and learn from. Then, when you’re
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                            "~/Scripts/modernizr-*"));

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "jquery",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/jquery-2.2.3.min.js"
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "uriAnchor",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/jquery.uriAnchor.js"
                });            

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "respond",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/respond.min.js",
                    DebugPath = "~/Scripts/respond.js",
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "fastclick",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/fastclick.min.js",
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "AdminLTE",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/AdminLTE.js",
                });
            ScriptManager.ScriptResourceMapping.AddDefinition(
                "slimscroll",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/jquery.slimscroll.min.js",
                });
            ScriptManager.ScriptResourceMapping.AddDefinition(
                "ngf.framework",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/ngf.framework.js",
                });
            ScriptManager.ScriptResourceMapping.AddDefinition(
                "ngf.portal",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/ngf.portal.js",
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "icheck",
                new ScriptResourceDefinition
                {
                    Path = "~/Content/iCheck/icheck.min.js",
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "cookie",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/jquery.cookie.js",
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "bootstrap-contextmenu",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/bootstrap-contextmenu.js",
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "bootstrap-table",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/bootstrap-table.js",
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "bootstrap-table.en-US",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/bootstrap-table-en-US.js",
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "bootstrap-table.zh-CN",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/bootstrap-table-zh-CN.js",
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "bootstrap-table.zh-TW",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/bootstrap-table-zh-TW.js",
                });


            ScriptManager.ScriptResourceMapping.AddDefinition(
                "alertifyjs",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/alertify.js",
                });

            ScriptManager.ScriptResourceMapping.AddDefinition(
                "wresize",
                new ScriptResourceDefinition
                {
                    Path = "~/Scripts/jquery.wresize.js",
                });
            

        }
    }
}