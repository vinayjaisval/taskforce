import React from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import { SubHeaderRight } from '../../layout/SubHeader/SubHeader';
import useMinimizeAside from '../../hooks/useMinimizeAside';
import { dashboardMenu } from '../../menu';
import Card, { CardBody, CardHeader } from '../../components/bootstrap/Card';
import Button, { ButtonGroup } from '../../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import Icon from '../../components/icon/Icon';

const Dashboard = () => {
	useMinimizeAside();
	return (
		<PageWrapper title={dashboardMenu.dashboard.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '#' },
							{
								title: 'Sub Page',
								to: '#',
							},
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<ButtonGroup>
						<Dropdown>
							<DropdownToggle>
								<Button color='primary' isLight>
									Actions
								</Button>
							</DropdownToggle>
							<DropdownMenu isAlignmentEnd>
								<DropdownItem>
									<NavLink to='/page-layouts/header-and-subheader'>
										<Icon icon='LayoutTopPanel5' />
										Add Items
									</NavLink>
								</DropdownItem>
								<DropdownItem>
									<NavLink to='/page-layouts/only-header'>
										<Icon icon='LayoutTopPanel2' />
										Manage Items
									</NavLink>
								</DropdownItem>
								<DropdownItem>
									<NavLink to='/page-layouts/header-and-subheader'>
										<Icon icon='LayoutTopPanel5' />
										Edit Items
									</NavLink>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</ButtonGroup>
				</SubHeaderRight>
			</SubHeader>
			
			<Page>
				
				<div id='bootstrap' className='row scroll-margin'>
					<div className='col-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Welcome in Dashboard</h4>
							</CardHeader>
							<CardBody className=''>
								<div className='row d-flex align-items-center'>
									<div className='col-12'>
										Hi I am Here !!
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Dashboard;


