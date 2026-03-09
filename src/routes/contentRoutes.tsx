import React, { lazy } from 'react';
import { dashboardMenu } from '../menu';
import { dashboardMenu1 } from '../menu_department';
import { dashboardMenu2 } from '../menu_agent';
import { dashboardMenu3 } from '../menu_admin';
import { dashboardMenu4 } from '../menu_project';

import Login from '../pages/presentation/auth/Login';

const LANDING = {
	DASHBOARD: lazy(() => import('../ekon/superadmin/Dashboard')),

	// Projects List
	add_projects: lazy(() => import('../ekon/superadmin/projects/AddProject')),
	manage_projects: lazy(() => import('../ekon/superadmin/projects/ManageProject')),
	edit_project: lazy(() => import('../ekon/superadmin/projects/EditProject')),

	// Add Task ---
	add_task: lazy(() => import('../ekon/superadmin/task/AddTask')),
	
	// Manage Task -- 
	manage_task: lazy(() => import('../ekon/superadmin/task/ManageTask')),
	todo_task: lazy(() => import('../ekon/superadmin/task/ToDoTask')),
	group_task: lazy(() => import('../ekon/superadmin/task/GroupTask')),
	pending_task: lazy(() => import('../ekon/superadmin/task/PendingTask')),
	inprogress_task: lazy(() => import('../ekon/superadmin/task/InProgressTask')),
	duesoon_task: lazy(() => import('../ekon/superadmin/task/DueSoonTask')),
	completed_task: lazy(() => import('../ekon/superadmin/task/CompletedTask')),
	edit_task: lazy(() => import('../ekon/superadmin/task/EditTask')),
	log_task: lazy(() => import('../ekon/superadmin/task/LogTask')),

	user_task: lazy(() => import('../ekon/superadmin/task/UserTask')),
	project_task: lazy(() => import('../ekon/superadmin/task/ProjectTask')),
	status_task: lazy(() => import('../ekon/superadmin/task/StatusTask')),
	category_task: lazy(() => import('../ekon/superadmin/task/CategoryTask')),


	
	// Master ---
	Profile: lazy(() => import('../ekon/superadmin/setting/Profile')),
	Projects: lazy(() => import('../ekon/superadmin/setting/project/Projects')),
	Agent: lazy(() => import('../ekon/superadmin/setting/agent/Agent')),
	Category: lazy(() => import('../ekon/superadmin/setting/category/Category')),
	status: lazy(() => import('../ekon/superadmin/setting/status/Status')),
	TeamLead: lazy(() => import('../ekon/superadmin/setting/teamlead/Teamlead')),
	skills: lazy(() => import('../ekon/superadmin/setting/skills/Skills')),

	// Reports ---
	TaskStatusSummery: lazy(() => import('../ekon/superadmin/reports/TaskStatusSummery')),
	TaskDeadlineSummery: lazy(() => import('../ekon/superadmin/reports/TaskDeadlineSummery')),
	TaskOwnerSummery: lazy(() => import('../ekon/superadmin/reports/TaskOwnerSummery')),
	TaskAssigneeSummery: lazy(() => import('../ekon/superadmin/reports/TaskAssigneeSummery')),
	TaskCompletedReports: lazy(() => import('../ekon/superadmin/reports/TaskCompletedReports')),
	DelayOneDay: lazy(() => import('../ekon/superadmin/reports/DelayOneDay')),
	DelayTwoDays: lazy(() => import('../ekon/superadmin/reports/DelayTwoDays')),
	DelayTreeDays: lazy(() => import('../ekon/superadmin/reports/DelayTreeDays')),
	DelayAWeek: lazy(() => import('../ekon/superadmin/reports/DelayAWeek')),
	DelayAMonth: lazy(() => import('../ekon/superadmin/reports/DelayAMonth')),
	TodayUpdatedTask: lazy(() => import('../ekon/superadmin/reports/TodayUpdatedTask')),
	
};


const AdminLead = {
	DASHBOARD: lazy(() => import('../ekon/admin/Dashboard')),

	// Add Task ---
	add_task: lazy(() => import('../ekon/admin/task/AddTask')),
	
	// Manage Task -- 
	manage_task: lazy(() => import('../ekon/admin/task/ManageTask')),
	todo_task: lazy(() => import('../ekon/admin/task/ToDoTask')),
	group_task: lazy(() => import('../ekon/admin/task/GroupTask')),
	pending_task: lazy(() => import('../ekon/admin/task/PendingTask')),
	inprogress_task: lazy(() => import('../ekon/admin/task/InProgressTask')),
	duesoon_task: lazy(() => import('../ekon/admin/task/DueSoonTask')),
	completed_task: lazy(() => import('../ekon/admin/task/CompletedTask')),
	edit_task: lazy(() => import('../ekon/admin/task/EditTask')),
	log_task: lazy(() => import('../ekon/admin/task/LogTask')),
	user_task: lazy(() => import('../ekon/admin/task/UserTask')),

	// Master ---
	Profile: lazy(() => import('../ekon/admin/setting/Profile')),
	Agent: lazy(() => import('../ekon/admin/setting/agent/Agent')),
	Category: lazy(() => import('../ekon/admin/setting/category/Category')),
	status: lazy(() => import('../ekon/admin/setting/status/Status')),
	
	// Reports ---
	TaskStatusSummery: lazy(() => import('../ekon/admin/reports/TaskStatusSummery')),
	TaskDeadlineSummery: lazy(() => import('../ekon/admin/reports/TaskDeadlineSummery')),
	TaskOwnerSummery: lazy(() => import('../ekon/admin/reports/TaskOwnerSummery')),
	TaskAssigneeSummery: lazy(() => import('../ekon/admin/reports/TaskAssigneeSummery')),
	TaskCompletedReports: lazy(() => import('../ekon/admin/reports/TaskCompletedReports')),
	DelayOneDay: lazy(() => import('../ekon/admin/reports/DelayOneDay')),
	DelayTwoDays: lazy(() => import('../ekon/admin/reports/DelayTwoDays')),
	DelayTreeDays: lazy(() => import('../ekon/admin/reports/DelayTreeDays')),
	DelayAWeek: lazy(() => import('../ekon/admin/reports/DelayAWeek')),
	DelayAMonth: lazy(() => import('../ekon/admin/reports/DelayAMonth')),
	TodayUpdatedTask: lazy(() => import('../ekon/admin/reports/TodayUpdatedTask')),
	
};

const Department = {
	DASHBOARD: lazy(() => import('../ekon/department/Dashboard')),

	AddLead: lazy(() => import('../ekon/department/lead/AddLead')),
	ManageLead: lazy(() => import('../ekon/department/lead/ViewLead')),
	SchoolLead: lazy(() => import('../ekon/department/lead/SchoolLead')),
	CoachingLead: lazy(() => import('../ekon/department/lead/CoachingLead')),

	Profile: lazy(() => import('../ekon/department/setting/Profile')),
	

}

const AgentLogin = {
	DASHBOARD: lazy(() => import('../ekon/agent/Dashboard')),


	// Manage Task -- 
	manage_task: lazy(() => import('../ekon/agent/task/ManageTask')),
	todo_task: lazy(() => import('../ekon/agent/task/ToDoTask')),
	group_task: lazy(() => import('../ekon/agent/task/GroupTask')),
	pending_task: lazy(() => import('../ekon/agent/task/PendingTask')),
	inprogress_task: lazy(() => import('../ekon/agent/task/InProgressTask')),
	duesoon_task: lazy(() => import('../ekon/agent/task/DueSoonTask')),
	completed_task: lazy(() => import('../ekon/agent/task/CompletedTask')),
	edit_task: lazy(() => import('../ekon/agent/task/EditTask')),
	log_task: lazy(() => import('../ekon/agent/task/LogTask')),

	// Master ---
	Profile: lazy(() => import('../ekon/agent/setting/Profile')),
	Projects: lazy(() => import('../ekon/agent/setting/project/Projects')),
	Agent: lazy(() => import('../ekon/agent/setting/agent/Agent')),
	Category: lazy(() => import('../ekon/agent/setting/category/Category')),
	status: lazy(() => import('../ekon/agent/setting/status/Status')),

	// Reports ---
	TaskStatusSummery: lazy(() => import('../ekon/agent/reports/TaskStatusSummery')),
	TaskDeadlineSummery: lazy(() => import('../ekon/agent/reports/TaskDeadlineSummery')),
	TaskOwnerSummery: lazy(() => import('../ekon/agent/reports/TaskOwnerSummery')),
	TaskAssigneeSummery: lazy(() => import('../ekon/agent/reports/TaskAssigneeSummery')),
	TaskCompletedReports: lazy(() => import('../ekon/agent/reports/TaskCompletedReports')),
	DelayOneDay: lazy(() => import('../ekon/agent/reports/DelayOneDay')),
	DelayTwoDays: lazy(() => import('../ekon/agent/reports/DelayTwoDays')),
	DelayTreeDays: lazy(() => import('../ekon/agent/reports/DelayTreeDays')),
	DelayAWeek: lazy(() => import('../ekon/agent/reports/DelayAWeek')),
	DelayAMonth: lazy(() => import('../ekon/agent/reports/DelayAMonth')),
	TodayUpdatedTask: lazy(() => import('../ekon/agent/reports/TodayUpdatedTask')),

	// Chating ---
	Chat: lazy(() => import('../ekon/agent/chat/Chat')),
	
}

const ProjectRoute = {
	DASHBOARD: lazy(() => import('../ekon/project/Dashboard')),

	// Add Task ---
	add_task: lazy(() => import('../ekon/project/task/AddTask')),
	
	// Manage Task -- 
	manage_task: lazy(() => import('../ekon/project/task/ManageTask')),
	todo_task: lazy(() => import('../ekon/project/task/ToDoTask')),
	group_task: lazy(() => import('../ekon/project/task/GroupTask')),
	pending_task: lazy(() => import('../ekon/project/task/PendingTask')),
	inprogress_task: lazy(() => import('../ekon/project/task/InProgressTask')),
	duesoon_task: lazy(() => import('../ekon/project/task/DueSoonTask')),
	completed_task: lazy(() => import('../ekon/project/task/CompletedTask')),
	edit_task: lazy(() => import('../ekon/project/task/EditTask')),
	log_task: lazy(() => import('../ekon/project/task/LogTask')),
	user_task: lazy(() => import('../ekon/project/task/UserTask')),

	// Master ---
	Profile: lazy(() => import('../ekon/project/setting/Profile')),
	
	// Reports ---
	TaskStatusSummery: lazy(() => import('../ekon/project/reports/TaskStatusSummery')),
	TaskDeadlineSummery: lazy(() => import('../ekon/project/reports/TaskDeadlineSummery')),
	TaskOwnerSummery: lazy(() => import('../ekon/project/reports/TaskOwnerSummery')),
	TaskAssigneeSummery: lazy(() => import('../ekon/project/reports/TaskAssigneeSummery')),
	TaskCompletedReports: lazy(() => import('../ekon/project/reports/TaskCompletedReports')),
	DelayOneDay: lazy(() => import('../ekon/project/reports/DelayOneDay')),
	DelayTwoDays: lazy(() => import('../ekon/project/reports/DelayTwoDays')),
	DelayTreeDays: lazy(() => import('../ekon/project/reports/DelayTreeDays')),
	DelayAWeek: lazy(() => import('../ekon/project/reports/DelayAWeek')),
	DelayAMonth: lazy(() => import('../ekon/project/reports/DelayAMonth')),
	TodayUpdatedTask: lazy(() => import('../ekon/project/reports/TodayUpdatedTask')),
	
};

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};


const presentation = [
	{
		path: dashboardMenu.dashboard.path,
		element: <LANDING.DASHBOARD />,
		exact: true,
	},

	// Projects 
	{
		path: dashboardMenu.manage_project.subMenu.addProjects.path,
		element: <LANDING.add_projects />,
		exact: true,
	}, 

	{
		path: dashboardMenu.manage_project.subMenu.manageProjects.path,
		element: <LANDING.manage_projects />,
		exact: true,
	},

	{
		path: 'superadmin/edit-project/:id',
		element: <LANDING.edit_project />,
		exact: true,
	},

	// Add Leads
	{
		path: dashboardMenu.add_task.subMenu.addTask.path,
		element: <LANDING.add_task />,
		exact: true,
	}, 
	
	// manage Lead
	{
		path: dashboardMenu.manageAstrologer.subMenu.AddAstro.path,
		element: <LANDING.manage_task />,
		exact: true,
	},
	{
		path: dashboardMenu.manageAstrologer.subMenu.ManageAstro.path,
		element: <LANDING.todo_task />,
		exact: true,
	},
	{
		path: dashboardMenu.manageAstrologer.subMenu.grouptask.path,
		element: <LANDING.group_task />,
		exact: true,
	},
	{
		path: dashboardMenu.manageAstrologer.subMenu.pendingtask.path,
		element: <LANDING.pending_task />,
		exact: true,
	}, 
	{
		path: dashboardMenu.manageAstrologer.subMenu.inProgresstask.path,
		element: <LANDING.inprogress_task />,
		exact: true,
	},
	{
		path: dashboardMenu.manageAstrologer.subMenu.duesoontask.path,
		element: <LANDING.duesoon_task />,
		exact: true,
	},
	{
		path: dashboardMenu.manageAstrologer.subMenu.completetask.path,
		element: <LANDING.completed_task />,
		exact: true,
	},


	{
		path: 'superadmin/edit-task/:id',
		element: <LANDING.edit_task />,
		exact: true,
	},

	{
		path: 'superadmin/task-log/:id',
		element: <LANDING.log_task />,
		exact: true,
	},

	{
		path: 'superadmin/user-task/:id',
		element: <LANDING.user_task />,
		exact: true,
	},

	{
		path: 'superadmin/project-task/:id',
		element: <LANDING.project_task />,
		exact: true,
	},

	{
		path: 'superadmin/category-task/:id',
		element: <LANDING.category_task />,
		exact: true,
	},

	{
		path: 'superadmin/status-task/:id',
		element: <LANDING.status_task />,
		exact: true,
	},
	

	

	// Master ===

	{
		path: dashboardMenu.masters.subMenu.Projects.path,
		element: <LANDING.Projects />,
		exact: true,
	},
	{
		path: dashboardMenu.masters.subMenu.status.path,
		element: <LANDING.status />,
		exact: true,
	},

	{
		path: dashboardMenu.masters.subMenu.skills.path,
		element: <LANDING.skills />,
		exact: true,
	},


	{
		path: dashboardMenu.masters.subMenu.category.path,
		element: <LANDING.Category />,
		exact: true,
	},
	{
		path: dashboardMenu.masters.subMenu.teamlead.path,
		element: <LANDING.TeamLead />,
		exact: true,
	},

	{
		path: dashboardMenu.masters.subMenu.members.path,
		element: <LANDING.Agent />,
		exact: true,
	},
	{
		path: dashboardMenu.masters.subMenu.profile.path,
		element: <LANDING.Profile />,
		exact: true,
	},

	// Reports --
	{
		path: dashboardMenu.reports.subMenu.report1.path,
		element: <LANDING.TaskStatusSummery />,
		exact: true,
	},
	{
		path: dashboardMenu.reports.subMenu.report2.path,
		element: <LANDING.TaskDeadlineSummery />,
		exact: true,
	},
	{
		path: dashboardMenu.reports.subMenu.report3.path,
		element: <LANDING.TaskOwnerSummery />,
		exact: true,
	},
	{
		path: dashboardMenu.reports.subMenu.report4.path,
		element: <LANDING.TaskAssigneeSummery />,
		exact: true,
	},
	{
		path: dashboardMenu.reports.subMenu.report5.path,
		element: <LANDING.TaskCompletedReports />,
		exact: true,
	},
	{
		path: dashboardMenu.reports.subMenu.report6.path,
		element: <LANDING.DelayOneDay />,
		exact: true,
	},
	{
		path: dashboardMenu.reports.subMenu.report7.path,
		element: <LANDING.DelayTwoDays />,
		exact: true,
	},
	{
		path: dashboardMenu.reports.subMenu.report8.path,
		element: <LANDING.DelayTreeDays />,
		exact: true,
	},
	{
		path: dashboardMenu.reports.subMenu.report9.path,
		element: <LANDING.DelayAWeek />,
		exact: true,
	},
	{
		path: dashboardMenu.reports.subMenu.report10.path,
		element: <LANDING.DelayAMonth />,
		exact: true,
	},
	{
		path: dashboardMenu.reports.subMenu.report11.path,
		element: <LANDING.TodayUpdatedTask />,
		exact: true,
	},


	// Admin Menu ====

	{
		path: dashboardMenu3.dashboard.path,
		element: <AdminLead.DASHBOARD />,
		exact: true,
	},
	// Add Leads
	{
		path: dashboardMenu3.add_task.subMenu.addTask.path,
		element: <AdminLead.add_task />,
		exact: true,
	}, 
	
	// manage Lead
	{
		path: dashboardMenu3.manageAstrologer.subMenu.AddAstro.path,
		element: <AdminLead.manage_task />,
		exact: true,
	},
	{
		path: dashboardMenu3.manageAstrologer.subMenu.ManageAstro.path,
		element: <AdminLead.todo_task />,
		exact: true,
	},
	{
		path: dashboardMenu3.manageAstrologer.subMenu.grouptask.path,
		element: <AdminLead.group_task />,
		exact: true,
	},
	{
		path: dashboardMenu3.manageAstrologer.subMenu.pendingtask.path,
		element: <AdminLead.pending_task />,
		exact: true,
	}, 
	{
		path: dashboardMenu3.manageAstrologer.subMenu.inProgresstask.path,
		element: <AdminLead.inprogress_task />,
		exact: true,
	},
	{
		path: dashboardMenu3.manageAstrologer.subMenu.duesoontask.path,
		element: <AdminLead.duesoon_task />,
		exact: true,
	},
	{
		path: dashboardMenu3.manageAstrologer.subMenu.completetask.path,
		element: <AdminLead.completed_task />,
		exact: true,
	},


	{
		path: 'admin/edit-task/:id',
		element: <AdminLead.edit_task />,
		exact: true,
	},

	{
		path: 'admin/task-log/:id',
		element: <AdminLead.log_task />,
		exact: true,
	},

	{
		path: 'admin/user-task/:id',
		element: <AdminLead.user_task />,
		exact: true,
	},

	// Master ===

	
	{
		path: dashboardMenu3.masters.subMenu.status.path,
		element: <AdminLead.status />,
		exact: true,
	},
	{
		path: dashboardMenu3.masters.subMenu.category.path,
		element: <AdminLead.Category />,
		exact: true,
	},

	{
		path: dashboardMenu3.masters.subMenu.members.path,
		element: <AdminLead.Agent />,
		exact: true,
	},
	{
		path: dashboardMenu3.masters.subMenu.profile.path,
		element: <AdminLead.Profile />,
		exact: true,
	},

	// Reports --
	{
		path: dashboardMenu3.reports.subMenu.report1.path,
		element: <AdminLead.TaskStatusSummery />,
		exact: true,
	},
	{
		path: dashboardMenu3.reports.subMenu.report2.path,
		element: <AdminLead.TaskDeadlineSummery />,
		exact: true,
	},
	{
		path: dashboardMenu3.reports.subMenu.report3.path,
		element: <AdminLead.TaskOwnerSummery />,
		exact: true,
	},
	{
		path: dashboardMenu3.reports.subMenu.report4.path,
		element: <AdminLead.TaskAssigneeSummery />,
		exact: true,
	},
	{
		path: dashboardMenu3.reports.subMenu.report5.path,
		element: <AdminLead.TaskCompletedReports />,
		exact: true,
	},
	{
		path: dashboardMenu3.reports.subMenu.report6.path,
		element: <AdminLead.DelayOneDay />,
		exact: true,
	},
	{
		path: dashboardMenu3.reports.subMenu.report7.path,
		element: <AdminLead.DelayTwoDays />,
		exact: true,
	},
	{
		path: dashboardMenu3.reports.subMenu.report8.path,
		element: <AdminLead.DelayTreeDays />,
		exact: true,
	},
	{
		path: dashboardMenu3.reports.subMenu.report9.path,
		element: <AdminLead.DelayAWeek />,
		exact: true,
	},
	{
		path: dashboardMenu3.reports.subMenu.report10.path,
		element: <AdminLead.DelayAMonth />,
		exact: true,
	},
	{
		path: dashboardMenu3.reports.subMenu.report11.path,
		element: <AdminLead.TodayUpdatedTask />,
		exact: true,
	},

	// Projects Menu ====

	{
		path: dashboardMenu4.dashboard.path,
		element: <ProjectRoute.DASHBOARD />,
		exact: true,
	},
	// Add Leads
	{
		path: dashboardMenu4.add_task.subMenu.addTask.path,
		element: <ProjectRoute.add_task />,
		exact: true,
	}, 
	
	// manage Lead
	{
		path: dashboardMenu4.manageAstrologer.subMenu.AddAstro.path,
		element: <ProjectRoute.manage_task />,
		exact: true,
	},
	{
		path: dashboardMenu4.manageAstrologer.subMenu.ManageAstro.path,
		element: <ProjectRoute.todo_task />,
		exact: true,
	},
	{
		path: dashboardMenu4.manageAstrologer.subMenu.grouptask.path,
		element: <ProjectRoute.group_task />,
		exact: true,
	},
	{
		path: dashboardMenu4.manageAstrologer.subMenu.pendingtask.path,
		element: <ProjectRoute.pending_task />,
		exact: true,
	}, 
	{
		path: dashboardMenu4.manageAstrologer.subMenu.inProgresstask.path,
		element: <ProjectRoute.inprogress_task />,
		exact: true,
	},
	{
		path: dashboardMenu4.manageAstrologer.subMenu.duesoontask.path,
		element: <ProjectRoute.duesoon_task />,
		exact: true,
	},
	{
		path: dashboardMenu4.manageAstrologer.subMenu.completetask.path,
		element: <ProjectRoute.completed_task />,
		exact: true,
	},


	{
		path: 'project/edit-task/:id',
		element: <ProjectRoute.edit_task />,
		exact: true,
	},

	{
		path: 'project/task-log/:id',
		element: <ProjectRoute.log_task />,
		exact: true,
	},

	{
		path: 'project/user-task/:id',
		element: <ProjectRoute.user_task />,
		exact: true,
	},

	// Master ===

	
	{
		path: dashboardMenu4.masters.subMenu.profile.path,
		element: <ProjectRoute.Profile />,
		exact: true,
	},

	// Reports --
	{
		path: dashboardMenu4.reports.subMenu.report1.path,
		element: <ProjectRoute.TaskStatusSummery />,
		exact: true,
	},
	{
		path: dashboardMenu4.reports.subMenu.report2.path,
		element: <ProjectRoute.TaskDeadlineSummery />,
		exact: true,
	},
	{
		path: dashboardMenu4.reports.subMenu.report3.path,
		element: <ProjectRoute.TaskOwnerSummery />,
		exact: true,
	},
	{
		path: dashboardMenu4.reports.subMenu.report4.path,
		element: <ProjectRoute.TaskAssigneeSummery />,
		exact: true,
	},
	{
		path: dashboardMenu4.reports.subMenu.report5.path,
		element: <ProjectRoute.TaskCompletedReports />,
		exact: true,
	},
	{
		path: dashboardMenu4.reports.subMenu.report6.path,
		element: <ProjectRoute.DelayOneDay />,
		exact: true,
	},
	{
		path: dashboardMenu4.reports.subMenu.report7.path,
		element: <ProjectRoute.DelayTwoDays />,
		exact: true,
	},
	{
		path: dashboardMenu4.reports.subMenu.report8.path,
		element: <ProjectRoute.DelayTreeDays />,
		exact: true,
	},
	{
		path: dashboardMenu4.reports.subMenu.report9.path,
		element: <ProjectRoute.DelayAWeek />,
		exact: true,
	},
	{
		path: dashboardMenu4.reports.subMenu.report10.path,
		element: <ProjectRoute.DelayAMonth />,
		exact: true,
	},
	{
		path: dashboardMenu4.reports.subMenu.report11.path,
		element: <ProjectRoute.TodayUpdatedTask />,
		exact: true,
	},
	

	/** ************************************************** */
	
	{
		path: '/',
		element: <Login />,
		exact: true,
	},


	//======== Department Menu........
	{
		path: dashboardMenu1.dashboard.path,
		element: <Department.DASHBOARD />,
		exact: true,
	},

	// Leads
	{
		path: dashboardMenu1.manageAstrologer.subMenu.AddAstro.path,
		element: <Department.AddLead />,
		exact: true,
	}, 
	{
		path: dashboardMenu1.manageAstrologer.subMenu.ManageAstro.path,
		element: <Department.ManageLead />,
		exact: true,
	},
	{
		path: dashboardMenu1.manageAstrologer.subMenu.SchoolLead.path,
		element: <Department.SchoolLead />,
		exact: true,
	}, 

	{
		path: dashboardMenu1.manageAstrologer.subMenu.CoachingLead.path,
		element: <Department.CoachingLead />,
		exact: true,
	}, 

	{
		path: dashboardMenu1.masters.subMenu.profile.path,
		element: <Department.Profile />,
		exact: true,
	}, 

	


	//======== Agent Menu........
	{
		path: dashboardMenu2.dashboard.path,
		element: <AgentLogin.DASHBOARD />,
		exact: true,
	},

	
	// manage Lead
	{
		path: dashboardMenu2.manageAstrologer.subMenu.AddAstro.path,
		element: <AgentLogin.manage_task />,
		exact: true,
	},
	{
		path: dashboardMenu2.manageAstrologer.subMenu.ManageAstro.path,
		element: <AgentLogin.todo_task />,
		exact: true,
	},
	{
		path: dashboardMenu2.manageAstrologer.subMenu.grouptask.path,
		element: <AgentLogin.group_task />,
		exact: true,
	},
	{
		path: dashboardMenu2.manageAstrologer.subMenu.pendingtask.path,
		element: <AgentLogin.pending_task />,
		exact: true,
	}, 
	{
		path: dashboardMenu2.manageAstrologer.subMenu.inProgresstask.path,
		element: <AgentLogin.inprogress_task />,
		exact: true,
	},
	{
		path: dashboardMenu2.manageAstrologer.subMenu.duesoontask.path,
		element: <AgentLogin.duesoon_task />,
		exact: true,
	},
	{
		path: dashboardMenu2.manageAstrologer.subMenu.completetask.path,
		element: <AgentLogin.completed_task />,
		exact: true,
	},


	{
		path: 'agent/edit-task/:id',
		element: <AgentLogin.edit_task />,
		exact: true,
	},

	{
		path: 'agent/task-log/:id',
		element: <AgentLogin.log_task />,
		exact: true,
	},

	// Master ===

	
	{
		path: dashboardMenu2.masters.subMenu.profile.path,
		element: <AgentLogin.Profile />,
		exact: true,
	},

	// Reports --
	{
		path: dashboardMenu2.reports.subMenu.report1.path,
		element: <AgentLogin.TaskStatusSummery />,
		exact: true,
	},
	{
		path: dashboardMenu2.reports.subMenu.report2.path,
		element: <AgentLogin.TaskDeadlineSummery />,
		exact: true,
	},
	{
		path: dashboardMenu2.reports.subMenu.report3.path,
		element: <AgentLogin.TaskOwnerSummery />,
		exact: true,
	},
	{
		path: dashboardMenu2.reports.subMenu.report4.path,
		element: <AgentLogin.TaskAssigneeSummery />,
		exact: true,
	},
	{
		path: dashboardMenu2.reports.subMenu.report5.path,
		element: <AgentLogin.TaskCompletedReports />,
		exact: true,
	},
	{
		path: dashboardMenu2.reports.subMenu.report6.path,
		element: <AgentLogin.DelayOneDay />,
		exact: true,
	},
	{
		path: dashboardMenu2.reports.subMenu.report7.path,
		element: <AgentLogin.DelayTwoDays />,
		exact: true,
	},
	{
		path: dashboardMenu2.reports.subMenu.report8.path,
		element: <AgentLogin.DelayTreeDays />,
		exact: true,
	},
	{
		path: dashboardMenu2.reports.subMenu.report9.path,
		element: <AgentLogin.DelayAWeek />,
		exact: true,
	},
	{
		path: dashboardMenu2.reports.subMenu.report10.path,
		element: <AgentLogin.DelayAMonth />,
		exact: true,
	},
	{
		path: dashboardMenu2.reports.subMenu.report11.path,
		element: <AgentLogin.TodayUpdatedTask />,
		exact: true,
	},

	// === Chat
	{
		path: dashboardMenu2.chat.path,
		element: <AgentLogin.Chat />,
		exact: true,
	},
	
	


];
const documentation = [];
const contents = [...presentation];
export default contents;
