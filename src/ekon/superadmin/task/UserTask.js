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
import { useParams } from 'react-router-dom';

import BASE_URL from "../../../config/api";

const UserTask = () => {
	useMinimizeAside();

	const { id } = useParams();

	const [astroList, setAstroList] = useState([]);
	const [totalRecords, setTotalRecords] = useState([]);
	const [limit, setLimit] = useState([]);

	useEffect(() => {
		async function getAstroList(page) {
			page = page;
			try {
				const astroListApi = await axios.get(
					`${BASE_URL}/admin/leads_users_list/${id}?page=` + page,
				);
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
				`${BASE_URL}/admin/leads_users_list/${id}?page=` + page + `&keywords=` + keywordVal,
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
				`${BASE_URL}/admin/leads_users_list/${id}?page=1&keywords=` + e.target.value,
			);
			setAstroList(astroListApi.data.data);
			setTotalRecords(astroListApi.data.total);
			setLimit(astroListApi.data.limit);
		} catch (error) {
			console.log('Something is Wrong -allLeads');
		}
	}

	return (
		<PageWrapper title={dashboardMenu.manageAstrologer.subMenu.ManageAstro.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/superadmin/dashboard.html' },
							{
								title: 'Manage User Task',
								to: '/superadmin/task.html',
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
								<h4>Manage User Task</h4>
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
											<th width='1'>TaskID </th>
											<th>Heading</th>
											<th>Status</th>
											<th>Category</th>
											<th>Deadline</th>
											<th>Assignee</th>
											<th width='120'></th>
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
													<td scope='col'>{item.source_name}</td>
													<td scope='col'>{item.category_id_name}</td>
													<td scope='col'>{item.dedline}</td>
													<td scope='col'>
														<Assignee id={item.assignee} />
													</td>
													<td>
														<Link
															to={'/superadmin/task-log/' + item.id}>
															<Button
																color='primary'
																isLight
																icon='FollowTheSigns'>
																Follow
															</Button>
														</Link>
													</td>
													<td>
														<Link
															to={'/superadmin/edit-task/' + item.id}>
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
																			Delete Task
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
												<td colSpan={9}>
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

export default UserTask;
