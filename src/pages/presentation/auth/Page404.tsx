import React from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Humans from '../../../assets/img/scene4.png';
import HumansWebp from '../../../assets/img/scene4.webp';
import Button from '../../../components/bootstrap/Button';
import { dashboardMenu } from '../../../menu';
import useMinimizeAside from '../../../hooks/useMinimizeAside';

const Page404 = () => {
	useMinimizeAside();
	return (
		<PageWrapper title={dashboardMenu.dashboard.text}>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div className='col-12 d-flex flex-column justify-content-center align-items-center'>
						<div
							className='text-primary fw-bold'
							style={{ fontSize: 'calc(3rem + 3vw)' }}>
							CS
						</div>
						<div
							className='text-dark fw-bold'
							style={{ fontSize: 'calc(1.5rem + 1.5vw)' }}>
							We are Coming Soon!!
						</div>
					</div>
					<div className='col-12 d-flex align-items-baseline justify-content-center'>
						<img
							srcSet={HumansWebp}
							src={Humans}
							alt='Humans'
							style={{ height: '50vh' }}
						/>
					</div>
					<div className='col-12 d-flex flex-column justify-content-center align-items-center'>
						<Button
							className='px-5 py-3'
							color='primary'
							isLight
							icon='HolidayVillage'
							tag='a'
							href='/'>
							Home
						</Button>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Page404;
