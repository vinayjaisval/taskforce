import React from 'react';
import { demoPages, layoutMenu } from '../menu';
import DefaultAside from '../pages/_layout/_asides/DefaultAside';

const asides = [
	{ path: '/', element: null, exact: true },
	{ path: '*', element: <DefaultAside />, exact: true },
];

export default asides;
