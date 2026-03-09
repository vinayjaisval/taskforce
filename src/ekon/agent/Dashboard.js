import React from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import useMinimizeAside from '../../hooks/useMinimizeAside';
import { dashboardMenu } from '../../menu';
import Card, { CardBody, CardHeader } from '../../components/bootstrap/Card';

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
								title: 'Dashboard',
								to: '#',
							},
						]}
					/>
				</SubHeaderLeft>
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


