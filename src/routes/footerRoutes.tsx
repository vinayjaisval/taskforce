import React from 'react';
import { demoPages, layoutMenu, dashboardMenu } from '../menu';
import DefaultFooter from '../pages/_layout/_footers/DefaultFooter';

const footers = [
	{ path: '/', element: null, exact: true },
	//{ path: demoPages.signUp.path, element: null, exact: true },
	{ path: dashboardMenu.dashboard.path, element: null, exact: true },
	{ path: '*', element: <DefaultFooter /> },
];

export default footers;
