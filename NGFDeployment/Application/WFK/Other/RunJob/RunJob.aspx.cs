using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ITS.WebFramework.PermissionManagement.Business.Job;

namespace ITS.WebFramework.PermissionManagement.WebFormUI.Other.RunJob
{
    public partial class RunJob : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ButtonRunLogSendMailProcess_Click(object sender, EventArgs e)
        {
            LogSendMailBusiness logSendMailBusiness = new LogSendMailBusiness();
            logSendMailBusiness.Run();
        }

        protected void ButtonRunQueuePermissionProcess_Click(object sender, EventArgs e)
        {
            QueuePermissionBusiness queuePermissionBusiness = new QueuePermissionBusiness();
            queuePermissionBusiness.Run();
        }

        protected void ButtonRunSSOSessionStatusProcess_Click(object sender, EventArgs e)
        {
            SSOSessionStatusBusiness ssoSessionStatusBusiness = new SSOSessionStatusBusiness();
            ssoSessionStatusBusiness.Run();
        }

        protected void ButtonRunSyncStaffInsertProcess_Click(object sender, EventArgs e)
        {
            SyncStaffBusiness syncStaffBusiness = new SyncStaffBusiness();
            syncStaffBusiness.RunInsert();
        }

        protected void ButtonRunSyncStaffUpdateProcess_Click(object sender, EventArgs e)
        {
            SyncStaffBusiness syncStaffBusiness = new SyncStaffBusiness();
            syncStaffBusiness.RunUpdate();
        }

        protected void ButtonRunSystemMaintenanceProcess_Click(object sender, EventArgs e)
        {
            SystemMaintenanceBusiness systemMaintenanceBusiness = new SystemMaintenanceBusiness();
            systemMaintenanceBusiness.Run();
        }

        protected void ButtonRunAllPermissionRecomputeProcess_Click(object sender, EventArgs e)
        {
            AllPermissionRecomputeBusiness allPermissionRecomputeBusiness = new AllPermissionRecomputeBusiness();
            allPermissionRecomputeBusiness.Run();
        }
    }
}