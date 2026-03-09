import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Brand from '../../../layout/Brand/Brand';
import Navigation, { NavigationLine } from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import ThemeContext from '../../../contexts/themeContext';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Hand from '../../../assets/img/hand.png';
import HandWebp from '../../../assets/img/hand.webp';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import Aside, { AsideBody, AsideFoot, AsideHead } from '../../../layout/Aside/Aside';
import { componentsMenu, dashboardMenu, demoPages, layoutMenu } from '../../../menu';
import { dashboardMenu1, componentsMenu1 } from '../../../menu_department';
import { dashboardMenu2, componentsMenu2 } from '../../../menu_agent';
import { dashboardMenu3, componentsMenu3 } from '../../../menu_admin';
import { dashboardMenu4, componentsMenu4 } from '../../../menu_project';

const sessUserType = localStorage.getItem('sess_user_type');

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const [doc, setDoc] = useState(false);

	const { t } = useTranslation(['translation', 'menu']);

	const { darkModeStatus } = useDarkMode();

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				{sessUserType == "superadmin" ? <Navigation menu={dashboardMenu} id='aside-dashboard' /> : '' }
				{sessUserType == "department" ? <Navigation menu={dashboardMenu1} id='aside-dashboard' /> : '' }
				{sessUserType == "agent" ? <Navigation menu={dashboardMenu2} id='aside-dashboard' /> : '' }
				{sessUserType == "admin" ? <Navigation menu={dashboardMenu3} id='aside-dashboard' /> : '' }
				{sessUserType == "project" ? <Navigation menu={dashboardMenu4} id='aside-dashboard' /> : '' }
				
				{!doc && (
					<>
						<NavigationLine />
						<Navigation menu={demoPages} id='aside-demo-pages' />
						<NavigationLine />
						<Navigation menu={layoutMenu} id='aside-menu' />
					</>
				)}

				{doc && (
					<>
						<NavigationLine />
						<Navigation menu={componentsMenu} id='aside-menu-two' />
						<NavigationLine />
					</>
				)}

				{asideStatus && doc && (
					<Card className='m-3 '>
						<CardBody className='pt-0'>
							<img srcSet={HandWebp} src={Hand} alt='Hand' width={130} height={130} />
							<p
								className={classNames('h4', {
									'text-dark': !darkModeStatus,
									'text-light': darkModeStatus,
								})}>
								{t('Everything is ready!')}
							</p>
							<Button
								color='info'
								isLight
								className='w-100'
								onClick={() => setDoc(false)}>
								{t('Demo Pages')}
							</Button>
						</CardBody>
					</Card>
				)}
			</AsideBody>
			<AsideFoot>
				<User />
			</AsideFoot>
		</Aside>
	);
};

export default DefaultAside;
