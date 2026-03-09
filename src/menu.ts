

export const homeMenu = {};

export const dashboardMenu = {

	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/superadmin/dashboard.html',
		icon: 'Dashboard',
		subMenu: null,
	},

	manage_project: { 
		id: 'manage_project',
		text: 'Manage Projects',
		path: '#',
		icon: 'Article',
		subMenu: {
			manageProjects: {
				id: 'manage_project',
				text: 'Manage Projects',
				path: '/superadmin/manage-projects.html',
				icon: 'ViewArray',
			},
			addProjects: {
				id: 'addProject',
				text: 'Add New Project',
				path: '/superadmin/add-project.html',
				icon: 'ViewArray',
			}
		},
	},

	
	add_task: { 
		id: 'add_task',
		text: 'Add New Task',
		path: '#',
		icon: 'Article',
		subMenu: {
			addTask: {
				id: 'addTask',
				text: 'Add New General Task',
				path: '/superadmin/add-task.html',
				icon: 'ViewArray',
			}
		},
	},

	manageAstrologer: { 
		id: 'manageAstrologer',
		text: 'Task Management',
		path: '#',
		icon: 'Article',
		subMenu: {
			AddAstro: {
				id: 'AddAstro',
				text: 'Manage All Task',
				path: '/superadmin/task.html',
				icon: 'ViewArray',
			},
			ManageAstro: {
				id: 'manageAstro',
				text: 'My To Do Task',
				path: '/superadmin/todo-task.html',
				icon: 'ViewDay',
			},
			grouptask: {
				id: 'grouptask',
				text: 'Group Task',
				path: '/superadmin/group-task.html',
				icon: 'ViewDay',
			},
			pendingtask: {
				id: 'pendingtask',
				text: 'Pending Task',
				path: '/superadmin/pending-task.html',
				icon: 'ViewDay',
			},
			inProgresstask: {
				id: 'inProgresstask',
				text: 'In Progress Task',
				path: '/superadmin/inprogress-task.html',
				icon: 'ViewDay',
			},
			duesoontask: {
				id: 'duesoontask',
				text: 'Due Soon Task',
				path: '/superadmin/duesoon-task.html',
				icon: 'ViewDay',
			},
			completetask: {
				id: 'completetask',
				text: 'Completed Task',
				path: '/superadmin/completed-task.html',
				icon: 'ViewDay',
			},
		},
	},
	
	
	masters: { 
		id: 'masters',
		text: 'Masters',
		path: '#',
		icon: 'Article',
		subMenu: {
			
			Projects: {
				id: 'Projects',
				text: 'Projects Management',
				path: '/superadmin/manage-projects.html',
				icon: 'ViewArray',
			},
			status: {
				id: 'status',
				text: 'Status Management',
				path: '/superadmin/status.html',
				icon: 'ViewArray',
			},

			skills: {
				id: 'skills',
				text: 'Skills Management',
				path: '/superadmin/skills.html',
				icon: 'ViewArray',
			},

			category: {
				id: 'category',
				text: 'Category Management',
				path: '/superadmin/category.html',
				icon: 'ViewDay',
			},
			
			teamlead: {
				id: 'teamlead',
				text: 'All Team Leaders',
				path: '/superadmin/teamlead.html',
				icon: 'ViewArray',
			},

			members: {
				id: 'members',
				text: 'All Members',
				path: '/superadmin/members.html',
				icon: 'ViewArray',
			},
			
			profile: {
				id: 'profile',
				text: 'Profile Management',
				path: '/superadmin/profile.html',
				icon: 'ViewDay',
			},
		},
	},
	
	reports: { 
		id: 'reports',
		text: 'Reports',
		path: '#',
		icon: 'Article',
		subMenu: {
			report1: {
				id: 'report1',
				text: 'Task Status Summery',
				path: '/superadmin/task-status-summery.html',
				icon: 'ViewArray',
			},
			report2: {
				id: 'report2',
				text: 'Task Deadline Summery',
				path: '/superadmin/task-deadline-summery.html',
				icon: 'ViewArray',
			},
			report3: {
				id: 'report3',
				text: 'Task Owner Summery',
				path: '/superadmin/task-owner-summery.html',
				icon: 'ViewArray',
			},
			report4: {
				id: 'report4',
				text: 'Task Assignee Summery',
				path: '/superadmin/task-assignee-summery.html',
				icon: 'ViewArray',
			},
			report5: {
				id: 'report5',
				text: 'Task Completed Reports',
				path: '/superadmin/task-completed-reports.html',
				icon: 'ViewArray',
			},
			report6: {
				id: 'report6',
				text: 'Delay One Day',
				path: '/superadmin/delay-one-day.html',
				icon: 'ViewArray',
			},
			report7: {
				id: 'report7',
				text: 'Delay Two Days',
				path: '/superadmin/delay-two-days.html',
				icon: 'ViewArray',
			},
			report8: {
				id: 'report8',
				text: 'Delay Tree Days',
				path: '/superadmin/delay-tree-days.html',
				icon: 'ViewArray',
			},
			report9: {
				id: 'report9',
				text: 'Delay A Week',
				path: '/superadmin/delay-a-week.html',
				icon: 'ViewArray',
			},
			report10: {
				id: 'report10',
				text: 'Delay A Month',
				path: '/superadmin/delay-a-month.html',
				icon: 'ViewArray',
			},
			report11: {
				id: 'report11',
				text: 'Today Updated Task',
				path: '/superadmin/today-updated-task.html',
				icon: 'ViewArray',
			},
		},
	},
};

export const demoPages = {};

export const layoutMenu = {};

export const componentsMenu = {

	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/superadmin/dashboard.html',
		icon: 'Dashboard',
		subMenu: null,
	},

	
	add_task: { 
		id: 'add_task',
		text: 'Add New Task',
		path: '#',
		icon: 'Article',
		subMenu: {
			addTask: {
				id: 'addTask',
				text: 'Add New General Task',
				path: '/superadmin/add-task.html',
				icon: 'ViewArray',
			}
		},
	},

	manageAstrologer: { 
		id: 'manageAstrologer',
		text: 'Task Management',
		path: '#',
		icon: 'Article',
		subMenu: {
			AddAstro: {
				id: 'AddAstro',
				text: 'Manage All Task',
				path: '/superadmin/task.html',
				icon: 'ViewArray',
			},
			ManageAstro: {
				id: 'manageAstro',
				text: 'My To Do Task',
				path: '/superadmin/todo-task.html',
				icon: 'ViewDay',
			},
			grouptask: {
				id: 'grouptask',
				text: 'Group Task',
				path: '/superadmin/group-task.html',
				icon: 'ViewDay',
			},
			pendingtask: {
				id: 'pendingtask',
				text: 'Pending Task',
				path: '/superadmin/pending-task.html',
				icon: 'ViewDay',
			},
			inProgresstask: {
				id: 'inProgresstask',
				text: 'In Progress Task',
				path: '/superadmin/inprogress-task.html',
				icon: 'ViewDay',
			},
			duesoontask: {
				id: 'duesoontask',
				text: 'Due Soon Task',
				path: '/superadmin/duesoon-task.html',
				icon: 'ViewDay',
			},
			completetask: {
				id: 'completetask',
				text: 'Completed Task',
				path: '/superadmin/completed-task.html',
				icon: 'ViewDay',
			},
		},
	},
	
	
	masters: { 
		id: 'masters',
		text: 'Masters',
		path: '#',
		icon: 'Article',
		subMenu: {
			Projects: {
				id: 'Projects',
				text: 'Projects Management',
				path: '/superadmin/manage-projects.html',
				icon: 'ViewArray',
			},
			status: {
				id: 'status',
				text: 'Status Management',
				path: '/superadmin/status.html',
				icon: 'ViewArray',
			},
			category: {
				id: 'category',
				text: 'Category Management',
				path: '/superadmin/category.html',
				icon: 'ViewDay',
			},

			skills: {
				id: 'skills',
				text: 'Skills Management',
				path: '/superadmin/skills.html',
				icon: 'ViewArray',
			},

			teamlead: {
				id: 'teamlead',
				text: 'All Team Leaders',
				path: '/superadmin/teamlead.html',
				icon: 'ViewArray',
			},
			
			members: {
				id: 'members',
				text: 'All Members',
				path: '/superadmin/members.html',
				icon: 'ViewArray',
			},
			
			profile: {
				id: 'profile',
				text: 'Profile Management',
				path: '/superadmin/profile.html',
				icon: 'ViewDay',
			},
		},
	},
	
	reports: { 
		id: 'reports',
		text: 'Reports',
		path: '#',
		icon: 'Article',
		subMenu: {
			report1: {
				id: 'report1',
				text: 'Task Status Summery',
				path: '/superadmin/task-status-summery.html',
				icon: 'ViewArray',
			},
			report2: {
				id: 'report2',
				text: 'Task Deadline Summery',
				path: '/superadmin/task-deadline-summery.html',
				icon: 'ViewArray',
			},
			report3: {
				id: 'report3',
				text: 'Task Owner Summery',
				path: '/superadmin/task-owner-summery.html',
				icon: 'ViewArray',
			},
			report4: {
				id: 'report4',
				text: 'Task Assignee Summery',
				path: '/superadmin/task-assignee-summery.html',
				icon: 'ViewArray',
			},
			report5: {
				id: 'report5',
				text: 'Task Completed Reports',
				path: '/superadmin/task-completed-reports.html',
				icon: 'ViewArray',
			},
			report6: {
				id: 'report6',
				text: 'Delay One Day',
				path: '/superadmin/delay-one-day.html',
				icon: 'ViewArray',
			},
			report7: {
				id: 'report7',
				text: 'Delay Two Days',
				path: '/superadmin/delay-two-days.html',
				icon: 'ViewArray',
			},
			report8: {
				id: 'report8',
				text: 'Delay Tree Days',
				path: '/superadmin/delay-tree-days.html',
				icon: 'ViewArray',
			},
			report9: {
				id: 'report9',
				text: 'Delay A Week',
				path: '/superadmin/delay-a-week.html',
				icon: 'ViewArray',
			},
			report10: {
				id: 'report10',
				text: 'Delay A Month',
				path: '/superadmin/delay-a-month.html',
				icon: 'ViewArray',
			},
			report11: {
				id: 'report11',
				text: 'Today Updated Task',
				path: '/superadmin/today-updated-task.html',
				icon: 'ViewArray',
			},
		},
	},
};

export const productsMenu = {};
