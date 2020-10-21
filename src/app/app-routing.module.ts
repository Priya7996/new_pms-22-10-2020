import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard} from '../app/Service/core/authentication/auth.guard';

const routes: Routes = [ 
  { path: '', loadChildren: () => import('./Components/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./Components/register/register.module').then(m => m.RegisterModule),},
  { path: 'filepath', loadChildren: () => import('./Components/filepath/filepath.module').then(m => m.FilepathModule) },
  { path: 'master', loadChildren: () => import('./Components/master/master.module').then(m => m.MasterModule) },
  { path: 'backup', loadChildren: () => import('./Components/backup/backup.module').then(m => m.BackupModule) },
  { path: 'reason', loadChildren: () => import('./Components/reason/reason.module').then(m => m.ReasonModule) },
  { path: 'alarm', loadChildren: () => import('./Components/alarm/alarm.module').then(m => m.AlarmModule) },
  { path: 'alert', loadChildren: () => import('./Components/alert/alert.module').then(m => m.AlertModule) },
  { path: 'connectionlog', loadChildren: () => import('./Components/connectionlog/connectionlog.module').then(m => m.ConnectionlogModule) },
  { path: 'notification', loadChildren: () => import('./Components/notification/notification.module').then(m => m.NotificationModule) },
  { path: 'dashboard', loadChildren: () => import('./Components/dashboard/dashboard.module').then(m => m.DashboardModule), },
  { path: 'hmi', loadChildren: () => import('./Components/hmi/hmi.module').then(m => m.HmiModule) },
  { path: 'alarmreport', loadChildren: () => import('./Components/alarm-history-report/alarm-history-report.module').then(m => m.AlarmHistoryReportModule) },
  { path: 'report', loadChildren: () => import('./Components/report/report.module').then(m => m.ReportModule) },
  { path: 'cyclechart', loadChildren: () => import('./Components/cycle-time-chart/cycle-time-chart.module').then(m => m.CycleTimeChartModule) },
  { path: 'cyclestart', loadChildren: () => import('./Components/cycle-time-start-to-start/cycle-time-start-to-start.module').then(m => m.CycleTimeStartToStartModule) },
  { path: 'allshiftchart', loadChildren: () => import('./Components/all-shift-chart/all-shift-chart.module').then(m => m.AllShiftChartModule) },
  { path: 'cyclestop', loadChildren: () => import('./Components/cycle-time-stop-to-start/cycle-time-stop-to-start.module').then(m => m.CycleTimeStopToStartModule) },
   { path: 'machine_registration', loadChildren: () => import('./Components/machine-registration/machine-registration.module').then(m => m.MachineRegistrationModule) },

   { path: 'oee', loadChildren: () => import('./Components/oee/oee.module').then(m => m.OeeModule) },
  { path: 'user_management', loadChildren: () => import('./Components/user-management/user-management.module').then(m => m.UserManagementModule) },
  { path: 'operator_registration', loadChildren: () => import('./Components/operator-registration/operator-registration.module').then(m => m.OperatorRegistrationModule) },
  { path: 'shift', loadChildren: () => import('./Components/shift/shift.module').then(m => m.ShiftModule) },
  // { path: 'operator_allocation', loadChildren: () => import('./Components/operator-allocation/operator-allocation.module').then(m => m.OperatorAllocationModule) },
  { path: 'operator_allocation', loadChildren: () => import('./Components/operator-allocation/operator-allocation.module').then(m => m.OperatorAllocationModule) },
  { path: 'machine', loadChildren: () => import('./Components/machinenew/machinenew.module').then(m => m.MachinenewModule) },
  { path: 'machine_status', loadChildren: () => import('./Components/machine-status/machine-status.module').then(m => m.MachineStatusModule) },
  { path: 'approval', loadChildren: () => import('./Components/approval/approval.module').then(m => m.ApprovalModule) },
  { path: 'admin_user', loadChildren: () => import('./Components/admin-user/admin-user.module').then(m => m.AdminUserModule) },
  { path: 'setting', loadChildren: () => import('./Components/setting/setting.module').then(m => m.SettingModule) },
  { path: 'customer_details', loadChildren: () => import('./Components/customer-details/customer-details.module').then(m => m.CustomerDetailsModule) },
  { path: 'device_registration', loadChildren: () => import('./Components/device-registration/device-registration.module').then(m => m.DeviceRegistrationModule) },
  { path: 'device_details', loadChildren: () => import('./Components/device-details/device-details.module').then(m => m.DeviceDetailsModule) },
  { path: 'machine_view', loadChildren: () => import('./Components/machine-view/machine-view.module').then(m => m.MachineViewModule) },
  { path: 'machine_details', loadChildren: () => import('./Components/machine-details/machine-details.module').then(m => m.MachineDetailsModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'part_documentation', loadChildren: () => import('./Components/part-doucumentation/part-doucumentation.module').then(m => m.PartDoucumentationModule) },
  { path: 'machine-lmw', loadChildren: () => import('./Components/machine-lmw/machine-lmw.module').then(m => m.MachineLmwModule) },
  { path: 'production', loadChildren: () => import('./Components/production/production.module').then(m => m.ProductionModule) },
  { path: 'reflect', loadChildren: () => import('./Components/reflect/reflect.module').then(m => m.ReflectModule) },
  { path: 'oee-dashboard', loadChildren: () => import('./Components/oee-dashboard/oee-dashboard.module').then(m => m.OeeDashboardModule) },

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
