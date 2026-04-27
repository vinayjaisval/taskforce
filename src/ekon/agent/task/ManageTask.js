import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import PaginationComponent from '../PaginationComponent';
import useMinimizeAside from '../../../hooks/useMinimizeAside';

import { Link } from 'react-router-dom';

import BASE_URL from "../../../config/api";

const ManageTask = () => {
	useMinimizeAside();

	const id = localStorage.getItem('sess_id');

	const [loading, setLoading] = useState(true);
	const [astroList, setAstroList] = useState([]);
	const [totalRecords, setTotalRecords] = useState(0);
	const [limit, setLimit] = useState(12);

	const [search, setSearch] = useState({ keywords: '' });
	const debounceRef = useRef(null);

	// ✅ Common API
	const fetchData = async (page = 1, keyword = '') => {
		setLoading(true);
		try {
			const res = await axios.get(
				`${BASE_URL}/admin/leads/${id}?page=${page}&keywords=${keyword}`
			);

			setAstroList(res.data.data || []);
			setTotalRecords(res.data.total || 0);
			setLimit(res.data.per_page || 12);

		} catch (error) {
			console.log('API Error');
		} finally {
			setLoading(false);
		}
	};

	// ✅ First Load
	useEffect(() => {
		fetchData(1);
	}, [id]);

	// ✅ Pagination
	const getPaginatedData = (page) => {
		fetchData(page, search.keywords);
	};

	// ✅ Debounce Search
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
							{ title: 'Home', to: '/agent/dashboard.html' },
							{ title: 'Manage Task', to: '/agent/task.html' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				<div className='row h-100'>

					<div className='col-12'>
						<Card stretch>

							<CardHeader>
								<h4>Manage Task</h4>

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
											<th>Heading</th>
											<th>Status</th>
											<th>Category</th>
											<th>Deadline</th>
											<th>Assignee</th>
											<th></th>
										</tr>
									</thead>

									<tbody>
										{loading ? (
											<tr>
												<td colSpan={7} className='text-center'>
													Loading...
												</td>
											</tr>
										) : astroList.length === 0 ? (
											<tr>
												<td colSpan={7} className='text-center'>
													NOT FOUND
												</td>
											</tr>
										) : (
											astroList.map((item, index) => (
												<tr key={index}>
													<td>#{item.id}</td>
													<td>{item.name}</td>
													<td>{item.source_name}</td>
													<td>{item.category_id_name}</td>
													<td>{item.dedline}</td>

													{/* ✅ DIRECT FROM BACKEND */}
													<td>{item.user_name || 'N/A'}</td>

													<td>
														<Link to={`/agent/task-log/${item.id}`}>
															<Button color='primary' isLight>
																Follow
															</Button>
														</Link>
													</td>
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

export default ManageTask;