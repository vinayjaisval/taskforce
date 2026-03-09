import React, { useState, useEffect } from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Breadcrumb from '../../components/bootstrap/Breadcrumb';
import useMinimizeAside from '../../hooks/useMinimizeAside';
import { dashboardMenu } from '../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../components/bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BASE_URL from "../../config/api";
// == Status

const Dashboard = () => {
	const id = localStorage.getItem('sess_id');

	const [users, setUsers] = useState([]);
	const [categoryCount, setCategoryCount] = useState([]);
	const [departmentCount, setDepartmentCount] = useState([]);
	const [statusCount, setStatusCount] = useState([]);

	useEffect(() => {
		getUsers();
		getCategoryCount();
		getDepartmentCount();
		getStatusCount();
	}, [id]);

	async function getUsers() {
		try {
			const userApi = await axios.get(`${BASE_URL}/admin/all-agent-list-data`);
			setUsers(userApi.data);
		} catch (error) {
			console.log('Something is Wrong 1');
		}
	}

	async function getCategoryCount() {
		try {
			const categoryCountApi = await axios.get(`${BASE_URL}/admin/all-category-count`);
			setCategoryCount(categoryCountApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	async function getStatusCount() {
		try {
			const statusCountApi = await axios.get(`${BASE_URL}/admin/all-status-count`);
			setStatusCount(statusCountApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	async function getDepartmentCount() {
		try {
			const departmentCountApi = await axios.get(
				`${BASE_URL}/admin/all-department-count/${id}`,
			);
			setDepartmentCount(departmentCountApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	function resizeIframe(obj) {
		obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
	}

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
					<div className='col-md-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Users Task Status</h4>
							</CardHeader>
							<CardBody className=''>
								<iframe
									height={500}
									width='100%'
									onLoad={(e) => resizeIframe(e, this)}
									src='https://task.mycrmdesk.com/report'></iframe>
							</CardBody>
						</Card>

						<Card stretch>
							<CardHeader className=''>
								<h4>User Wise Task</h4>
							</CardHeader>
							<CardBody className='row'>
								{users && users.length > 0
									? users.map((item, index) => (
											<div className='col-md-2 col-xs-12' key={index}>
												<Card stretch>
													<CardHeader className=''>
														<b>{item.name}</b>
													</CardHeader>
													<CardBody className=''>
														Users Task <br />
													</CardBody>
													<CardFooter className=''>
														<Link
															to={'/superadmin/user-task/' + item.id}>
															Task List
														</Link>
													</CardFooter>
												</Card>
											</div>
									  ))
									: ''}
							</CardBody>
						</Card>

						<Card stretch>
							<CardHeader className=''>
								<h4>Project Status</h4>
							</CardHeader>
							<CardBody className='row'>
								{departmentCount && departmentCount.length > 0
									? departmentCount.map((item, index) => (
											<div className='col-md-2 col-xs-12' key={index}>
												<Card stretch>
													<CardHeader className=''>
														<b>{item.userid}</b>
														{parseFloat(
															(item.countID / item.total_task) * 100,
														).toFixed(2)}
														%
													</CardHeader>
													<CardBody className=''>
														Total Task:- <b>{item.total_task}</b> <br />
														Task Created:- <b>{item.countID}</b> <br />
													</CardBody>
													<CardFooter className=''>
														<Link
															to={
																'/superadmin/project-task/' +
																item.project
															}>
															Task List
														</Link>
													</CardFooter>
												</Card>
											</div>
									  ))
									: ''}
							</CardBody>
						</Card>

						<Card stretch>
							<CardHeader className=''>
								<h4>Task Status</h4>
							</CardHeader>
							<CardBody className='row'>
								{statusCount && statusCount.length > 0
									? statusCount.map((item, index) => (
											<div className='col-md-2 col-xs-6' key={index}>
												<Card stretch>
													<CardHeader className=''>
														<b>{item.name}</b>
													</CardHeader>
													<CardBody className=''>
														<h4>{item.countID}</h4>
													</CardBody>
													<CardFooter className=''>
														<Link
															to={
																'/superadmin/status-task/' +
																item.status
															}>
															Task List
														</Link>
													</CardFooter>
												</Card>
											</div>
									  ))
									: ''}
							</CardBody>
						</Card>

						<Card stretch>
							<CardHeader className=''>
								<h4>Task Category</h4>
							</CardHeader>
							<CardBody className='row'>
								{categoryCount && categoryCount.length > 0
									? categoryCount.map((item, index) => (
											<div className='col-md-2 col-xs-6' key={index}>
												<Card stretch>
													<CardHeader className=''>
														<b>{item.name}</b>
													</CardHeader>
													<CardBody className=''>
														<h4>{item.countID}</h4>
													</CardBody>
													<CardFooter className=''>
														<Link
															to={
																'/superadmin/category-task/' +
																item.category
															}>
															Task List
														</Link>
													</CardFooter>
												</Card>
											</div>
									  ))
									: ''}
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Dashboard;
