import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import Navigation from '../../../layout/Navigation/Navigation';
import { componentsMenu, layoutMenu } from '../../../menu';
import { componentsMenu1 } from '../../../menu_department';
import { componentsMenu2 } from '../../../menu_agent';
import { componentsMenu3 } from '../../../menu_admin';
import { componentsMenu4 } from '../../../menu_project';
import useDeviceScreen from '../../../hooks/useDeviceScreen';
import CommonHeaderRight from './CommonHeaderRight';
import { emit } from 'process';

const sessUserType = localStorage.getItem('sess_user_type');
var currentUrl = window.location.pathname;
currentUrl = currentUrl.slice(1);
var abcs = currentUrl.substring(0, currentUrl.indexOf('/'));
if(sessUserType != ''){
	if(sessUserType != abcs){
		localStorage.removeItem("sess_user_type");
		localStorage.clear();
	}
}

const DefaultHeader = () => {
	const { width } = useDeviceScreen();
	return (
		<Header>
			<HeaderLeft>
				{ sessUserType == "superadmin" && (
					<Navigation
						menu={{ ...layoutMenu, ...componentsMenu }}
						id='header-top-menu'
						horizontal={
							!!width && width >= Number(process.env.REACT_APP_MOBILE_BREAKPOINT_SIZE)
						}
					/>
				)}
				
				{ sessUserType == "department" && (
					<Navigation
						menu={{ ...layoutMenu, ...componentsMenu1 }}
						id='header-top-menu'
						horizontal={
							!!width && width >= Number(process.env.REACT_APP_MOBILE_BREAKPOINT_SIZE)
						}
					/>
				)}

				{ sessUserType == "agent" && (
					<Navigation
						menu={{ ...layoutMenu, ...componentsMenu2 }}
						id='header-top-menu'
						horizontal={
							!!width && width >= Number(process.env.REACT_APP_MOBILE_BREAKPOINT_SIZE)
						}
					/>
				)}

				{ sessUserType == "admin" && (
					<Navigation
						menu={{ ...layoutMenu, ...componentsMenu3 }}
						id='header-top-menu'
						horizontal={
							!!width && width >= Number(process.env.REACT_APP_MOBILE_BREAKPOINT_SIZE)
						}
					/>
				)}

				{ sessUserType == "project" && (
					<Navigation
						menu={{ ...layoutMenu, ...componentsMenu4 }}
						id='header-top-menu'
						horizontal={
							!!width && width >= Number(process.env.REACT_APP_MOBILE_BREAKPOINT_SIZE)
						}
					/>
				)}
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default DefaultHeader;
