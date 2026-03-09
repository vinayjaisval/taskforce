

export const homeMenu = {};

export const dashboardMenu3 = {

	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/admin/dashboard.html',
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
				path: '/admin/add-task.html',
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
				path: '/admin/task.html',
				icon: 'ViewArray',
			},
			ManageAstro: {
				id: 'manageAstro',
				text: 'My To Do Task',
				path: '/admin/todo-task.html',
				icon: 'ViewDay',
			},
			grouptask: {
				id: 'grouptask',
				text: 'Group Task',
				path: '/admin/group-task.html',
				icon: 'ViewDay',
			},
			pendingtask: {
				id: 'pendingtask',
				text: 'Pending Task',
				path: '/admin/pending-task.html',
				icon: 'ViewDay',
			},
			inProgresstask: {
				id: 'inProgresstask',
				text: 'In Progress Task',
				path: '/admin/inprogress-task.html',
				icon: 'ViewDay',
			},
			duesoontask: {
				id: 'duesoontask',
				text: 'Due Soon Task',
				path: '/admin/duesoon-task.html',
				icon: 'ViewDay',
			},
			completetask: {
				id: 'completetask',
				text: 'Completed Task',
				path: '/admin/completed-task.html',
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
			
			status: {
				id: 'status',
				text: 'Status Management',
				path: '/admin/status.html',
				icon: 'ViewArray',
			},
			category: {
				id: 'category',
				text: 'Category Management',
				path: '/admin/category.html',
				icon: 'ViewDay',
			},

			members: {
				id: 'members',
				text: 'All Members',
				path: '/admin/members.html',
				icon: 'ViewArray',
			},
			
			profile: {
				id: 'profile',
				text: 'Profile Management',
				path: '/admin/profile.html',
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
				path: '/admin/task-status-summery.html',
				icon: 'ViewArray',
			},
			report2: {
				id: 'report2',
				text: 'Task Deadline Summery',
				path: '/admin/task-deadline-summery.html',
				icon: 'ViewArray',
			},
			report3: {
				id: 'report3',
				text: 'Task Owner Summery',
				path: '/admin/task-owner-summery.html',
				icon: 'ViewArray',
			},
			report4: {
				id: 'report4',
				text: 'Task Assignee Summery',
				path: '/admin/task-assignee-summery.html',
				icon: 'ViewArray',
			},
			report5: {
				id: 'report5',
				text: 'Task Completed Reports',
				path: '/admin/task-completed-reports.html',
				icon: 'ViewArray',
			},
			report6: {
				id: 'report6',
				text: 'Delay One Day',
				path: '/admin/delay-one-day.html',
				icon: 'ViewArray',
			},
			report7: {
				id: 'report7',
				text: 'Delay Two Days',
				path: '/admin/delay-two-days.html',
				icon: 'ViewArray',
			},
			report8: {
				id: 'report8',
				text: 'Delay Tree Days',
				path: '/admin/delay-tree-days.html',
				icon: 'ViewArray',
			},
			report9: {
				id: 'report9',
				text: 'Delay A Week',
				path: '/admin/delay-a-week.html',
				icon: 'ViewArray',
			},
			report10: {
				id: 'report10',
				text: 'Delay A Month',
				path: '/admin/delay-a-month.html',
				icon: 'ViewArray',
			},
			report11: {
				id: 'report11',
				text: 'Today Updated Task',
				path: '/admin/today-updated-task.html',
				icon: 'ViewArray',
			},
		},
	},
};

export const demoPages = {};

export const layoutMenu = {};

export const componentsMenu3 = {

	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/admin/dashboard.html',
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
				path: '/admin/add-task.html',
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
				path: '/admin/task.html',
				icon: 'ViewArray',
			},
			ManageAstro: {
				id: 'manageAstro',
				text: 'My To Do Task',
				path: '/admin/todo-task.html',
				icon: 'ViewDay',
			},
			grouptask: {
				id: 'grouptask',
				text: 'Group Task',
				path: '/admin/group-task.html',
				icon: 'ViewDay',
			},
			pendingtask: {
				id: 'pendingtask',
				text: 'Pending Task',
				path: '/admin/pending-task.html',
				icon: 'ViewDay',
			},
			inProgresstask: {
				id: 'inProgresstask',
				text: 'In Progress Task',
				path: '/admin/inprogress-task.html',
				icon: 'ViewDay',
			},
			duesoontask: {
				id: 'duesoontask',
				text: 'Due Soon Task',
				path: '/admin/duesoon-task.html',
				icon: 'ViewDay',
			},
			completetask: {
				id: 'completetask',
				text: 'Completed Task',
				path: '/admin/completed-task.html',
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
			
			status: {
				id: 'status',
				text: 'Status Management',
				path: '/admin/status.html',
				icon: 'ViewArray',
			},
			category: {
				id: 'category',
				text: 'Category Management',
				path: '/admin/category.html',
				icon: 'ViewDay',
			},
			
			members: {
				id: 'members',
				text: 'All Members',
				path: '/admin/members.html',
				icon: 'ViewArray',
			},
			
			profile: {
				id: 'profile',
				text: 'Profile Management',
				path: '/admin/profile.html',
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
				path: '/admin/task-status-summery.html',
				icon: 'ViewArray',
			},
			report2: {
				id: 'report2',
				text: 'Task Deadline Summery',
				path: '/admin/task-deadline-summery.html',
				icon: 'ViewArray',
			},
			report3: {
				id: 'report3',
				text: 'Task Owner Summery',
				path: '/admin/task-owner-summery.html',
				icon: 'ViewArray',
			},
			report4: {
				id: 'report4',
				text: 'Task Assignee Summery',
				path: '/admin/task-assignee-summery.html',
				icon: 'ViewArray',
			},
			report5: {
				id: 'report5',
				text: 'Task Completed Reports',
				path: '/admin/task-completed-reports.html',
				icon: 'ViewArray',
			},
			report6: {
				id: 'report6',
				text: 'Delay One Day',
				path: '/admin/delay-one-day.html',
				icon: 'ViewArray',
			},
			report7: {
				id: 'report7',
				text: 'Delay Two Days',
				path: '/admin/delay-two-days.html',
				icon: 'ViewArray',
			},
			report8: {
				id: 'report8',
				text: 'Delay Tree Days',
				path: '/admin/delay-tree-days.html',
				icon: 'ViewArray',
			},
			report9: {
				id: 'report9',
				text: 'Delay A Week',
				path: '/admin/delay-a-week.html',
				icon: 'ViewArray',
			},
			report10: {
				id: 'report10',
				text: 'Delay A Month',
				path: '/admin/delay-a-month.html',
				icon: 'ViewArray',
			},
			report11: {
				id: 'report11',
				text: 'Today Updated Task',
				path: '/admin/today-updated-task.html',
				icon: 'ViewArray',
			},
		},
	},
};

export const productsMenu = {};
