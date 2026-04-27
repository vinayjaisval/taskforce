import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import PaginationComponent from '../PaginationComponent';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';
import { Link, useParams } from 'react-router-dom';

import BASE_URL from "../../../config/api";

const UserTask = () => {

	useMinimizeAside();
	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [astroList, setAstroList] = useState([]);
	const [totalRecords, setTotalRecords] = useState(0);
	const [limit, setLimit] = useState(12);

	const [assigneeMap, setAssigneeMap] = useState({}); // ✅ cache

	const [search, setSearch] = useState({ keywords: '' });
	const debounceRef = useRef(null);

	// ✅ Assignee bulk fetch (fix 429)
	const fetchAssignees = async (projects) => {
		try {
			const uniqueIds = [...new Set(projects)];

			const requests = uniqueIds.map(pid =>
				axios.get(`${BASE_URL}/admin/assignee_details/${pid}`)
			);

			const responses = await Promise.all(requests);

			const map = {};
			responses.forEach((res, index) => {
				map[uniqueIds[index]] = res.data[0]?.name || 'N/A';
			});

			setAssigneeMap(map);

		} catch (error) {
			console.log('Assignee fetch error');
		}
	};

	// ✅ Main API
	const fetchData = async (page = 1, keyword = '') => {
		setLoading(true);
		try {
			const res = await axios.get(
				`${BASE_URL}/admin/leads_users_list/${id}?page=${page}&keywords=${keyword}`
			);

			const data = res.data.data || [];

			setAstroList(data);
			setTotalRecords(res.data.total || 0);
			setLimit(res.data.limit || 12);

			// ✅ assignee fetch once
			const projectIds = data.map(item => item.project);
			fetchAssignees(projectIds);

		} catch (error) {
			console.log('API Error', error);
		} finally {
			setLoading(false);
		}
	};

	// ✅ first load
	useEffect(() => {
		fetchData(1);
	}, [id]);

	// ✅ pagination
	const getPaginatedData = (page) => {
		fetchData(page, search.keywords);
	};

	// ✅ search debounce
	const onTextFieldChange = (e) => {
		const value = e.target.value;

		setSearch({ keywords: value });

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			fetchData(1, value);
		}, 500);
	};

	return (
		<PageWrapper title={dashboardMenu.manageAstrologer.subMenu.ManageAstro.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/admin/dashboard.html' },
							{ title: 'Manage User Task', to: '/admin/task.html' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				<div className='row h-100'>

					<div id='succ_message' style={{ display: 'none' }}>
						<Alert icon='Verified' isLight color='primary'>
							<AlertHeading tag='h2'>Alert! 🎉</AlertHeading>
							<span id='alert_message'></span>
						</Alert>
					</div>

					<div className='col-12'>
						<Card stretch>

							<CardHeader>
								<h4>Manage User Task</h4>

								<div className='d-flex'>
									<Icon icon='Search' color='primary' size='2x' />
									<input
										type='search'
										className='form-control'
										placeholder='Search...'
										value={search.keywords}
										onChange={onTextFieldChange}
									/>
								</div>
							</CardHeader>

							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th>TaskID</th>
											<th>Project</th>
											<th>Team Leader</th>
											<th>Team Member</th>
											<th>Total Task</th>
										</tr>
									</thead>

									<tbody>
										{loading ? (
											<tr>
												<td colSpan={5} className='text-center'>
													Loading...
												</td>
											</tr>
										) : astroList.length === 0 ? (
											<tr>
												<td colSpan={5} className='text-center'>
													NOT FOUND
												</td>
											</tr>
										) : (
											astroList.map((item, index) => (
												<tr key={index}>
													<td>#{item.id}</td>

													<td>
														<Link to={`/admin/project/${item.project}/${id}`}>
															{assigneeMap[item.project] || 'Loading...'}
														</Link>
													</td>

													<td>{item.team_lead}</td>
													<td>{item.team_members}</td>
													<td>{item.total_tasks}</td>
												</tr>
											))
										)}
									</tbody>
								</table>
							</CardBody>

							<CardFooter>
								{totalRecords > limit && (
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