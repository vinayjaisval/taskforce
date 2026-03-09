import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import PaginationComponent from '../PaginationComponent';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';
import { Link } from 'react-router-dom';

import Assignee from '../user_status/Assignee';
import Skills from '../user_status/Skills';

import BASE_URL from "../../../config/api";

const ManageProject = () => {
	useMinimizeAside();

	const id = localStorage.getItem('sess_id');

	const [astroList, setAstroList] = useState([]);
	const [totalRecords, setTotalRecords] = useState([]);
	const [limit, setLimit] = useState([]);

	useEffect(() => {
		async function getAstroList(page) {
			page = page;
			try {
				const astroListApi = await axios.get(`${BASE_URL}/admin/projects?page=` + page);
				setAstroList(astroListApi.data.data);
				setTotalRecords(astroListApi.data.total);
				setLimit(astroListApi.data.limit);
			} catch (error) {
				console.log('Something is Wrong -astroList');
			}
		}

		getAstroList(1);
	}, [id]);

	async function getPaginatedData(page) {
		const keywordVal = document.getElementById('searchInput1').value;

		try {
			const astroListApi = await axios.get(
				`${BASE_URL}/admin/projects?page=` + page + `&keywords=` + keywordVal,
			);
			setAstroList(astroListApi.data.data);
			setTotalRecords(astroListApi.data.total);
			setLimit(astroListApi.data.limit);
		} catch (error) {
			console.log('Something is Wrong -astroList Pagination');
		}
	}

	async function handleClick(e, delId) {
		axios.get(`${BASE_URL}/admin/lead_delete/${delId}`).then((res) => {
			getPaginatedData(1);
			document.getElementById('succ_message').style.display = 'block';
			document.getElementById('alert_message').innerHTML = res.data;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	const [search, setSearch] = useState({
		keywords: '',
	});

	async function onTextFieldChange(e) {
		setSearch({
			...search,
			[e.target.name]: e.target.value,
		});
		try {
			const astroListApi = await axios.get(
				`${BASE_URL}/admin/projects?page=1&keywords=` + e.target.value,
			);
			setAstroList(astroListApi.data.data);
			setTotalRecords(astroListApi.data.total);
			setLimit(astroListApi.data.limit);
		} catch (error) {
			console.log('Something is Wrong -allLeads');
		}
	}

	return (
		<PageWrapper title={dashboardMenu.manage_project.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/superadmin/dashboard.html' },
							{
								title: 'Manage Projects',
								to: '/superadmin/manage-projects.html',
							},
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				<div id='bootstrap' className='row scroll-margin h-100'>
					<div id='succ_message'>
						<Alert
							icon='Verified'
							isLight
							color='primary'
							borderWidth={0}
							className='shadow-3d-primary'
							isDismissible>
							<AlertHeading tag='h2' className='h4'>
								Alert! 🎉
							</AlertHeading>
							<span id='alert_message'></span>
						</Alert>
					</div>
					<div className='col-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Manage Projects</h4>
								<div className='d-flex' data-tour='search'>
									<label
										className='border-0 bg-transparent cursor-pointer mar-t-5'
										htmlFor='searchInput1'>
										<Icon
											icon='Search'
											className='Search'
											color='primary'
											size='2x'
											forceFamily={null}
										/>
									</label>
									<input
										id='searchInput1'
										type='search'
										className='form-control border-0 shadow-none bg-transparent'
										placeholder='Search...'
										autoComplete='off'
										value={search.keywords}
										name='keywords'
										onChange={(e) => onTextFieldChange(e)}
									/>
								</div>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th width='1'>P.Id</th>
											<th>Name</th>
											<th>ProjectManager</th>
											<th>TeamLeader</th>
											<th>Skills</th>
											<th>Employes</th>
											<th>StartDate</th>
											<th>EndDate</th>
											<th>TotalTask</th>
											<th width='120'></th>
											<th width='1'></th>
										</tr>
									</thead>
									<tbody>
										{astroList && astroList.length > 0 ? (
											astroList.map((item, index) => (
												<tr key={index + 1}>
													<td scope='col'>#{item.id}</td>
													<td scope='col'>{item.name}</td>
													<td scope='col'>{item.userid}</td>
													<td scope='col'>{item.lead_by}</td>
													<td scope='col'>
														{item.skills == null ? (
															'No SKils'
														) : (
															<Skills id={item.skills} />
														)}
													</td>
													<td scope='col'>
														{item.assignee == null ? (
															'No Assignee'
														) : (
															<Assignee id={item.assignee} />
														)}
													</td>
													<td scope='col'>{item.start_date}</td>
													<td scope='col'>{item.end_date}</td>
													<td scope='col'>{item.total_task}</td>
													<td>
														<Link
															to={
																'/superadmin/edit-project/' +
																item.id
															}>
															<Button
																color='primary'
																isLight
																icon='Send'>
																Edit
															</Button>
														</Link>
													</td>
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	icon='MoreHoriz'
																	color='dark'
																	isLight
																	shadow='sm'
																/>
															</DropdownToggle>
															<DropdownMenu isAlignmentEnd>
																<DropdownItem>
																	<Button icon='Visibility'>
																		<span
																			onClick={(e) =>
																				handleClick(
																					e,
																					item.id,
																				)
																			}>
																			{' '}
																			<i className='fa fa-trash'></i>{' '}
																			Delete Project
																		</span>
																	</Button>
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
													</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan={11}>
													<div className='text-center'>
														<div className='loader'></div>
													</div>
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</CardBody>
							<CardFooter>
								{totalRecords > 12 && (
									<PaginationComponent
										getAllData={getPaginatedData}
										totalRecords={totalRecords}
										itemsCountPerPage={limit}
									/>
								)}
							</CardFooter>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ManageProject;
