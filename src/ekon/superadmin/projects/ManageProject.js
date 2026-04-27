import React, { useState, useEffect, useRef } from 'react';
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
import { Link } from 'react-router-dom';

import BASE_URL from "../../../config/api";

const ManageProject = () => {

	useMinimizeAside();

	const [loading, setLoading] = useState(true);
	const [astroList, setAstroList] = useState([]);
	const [totalRecords, setTotalRecords] = useState(0);
	const [limit, setLimit] = useState(12);

	const [search, setSearch] = useState({ keywords: '' });
	const debounceRef = useRef(null);

	// ✅ MAIN API
	const fetchData = async (page = 1, keyword = '') => {
		setLoading(true);
		try {
			const res = await axios.get(
				`${BASE_URL}/admin/projects?page=${page}&keywords=${keyword}`
			);

			setAstroList(res.data.data || []);
			setTotalRecords(res.data.total || 0);
			setLimit(res.data.limit || 12);

		} catch (error) {
			console.log('API Error');
		} finally {
			setLoading(false);
		}
	};

	// ✅ FIRST LOAD
	useEffect(() => {
		fetchData(1);
	}, []);

	// ✅ PAGINATION
	const getPaginatedData = (page) => {
		fetchData(page, search.keywords);
	};

	// ✅ DELETE
	const handleClick = async (delId) => {
		try {
			await axios.get(`${BASE_URL}/admin/lead_delete/${delId}`);
			fetchData(1);
		} catch (error) {
			console.log('Delete Error');
		}
	};

	// ✅ DEBOUNCE SEARCH
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
		<PageWrapper title={dashboardMenu.manage_project.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/superadmin/dashboard.html' },
							{ title: 'Manage Projects', to: '/superadmin/manage-projects.html' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				<div className='row h-100'>

					<div className='col-12'>
						<Card stretch>

							<CardHeader>
								<h4>Manage Projects</h4>

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
											<th>P.Id</th>
											<th>Name</th>
											<th>ProjectManager</th>
											<th>TeamLeader</th>
											<th>Skills</th>
											<th>Employees</th>
											<th>StartDate</th>
											<th>EndDate</th>
											<th>TotalTask</th>
											<th></th>
											<th></th>
										</tr>
									</thead>

									<tbody>
										{loading ? (
											<tr>
												<td colSpan={11} className='text-center'>
													Loading...
												</td>
											</tr>
										) : astroList.length === 0 ? (
											<tr>
												<td colSpan={11} className='text-center'>
													NOT FOUND
												</td>
											</tr>
										) : (
											astroList.map((item, index) => (
												<tr key={index}>
													<td>#{item.id}</td>
													<td>{item.name}</td>
													<td>{item.userid}</td>
													<td>{item.lead_by}</td>
													{/* ⚠️ TEMP FIX (429 avoid) */}
													<td>{item.skill_names || 'No Skills'}</td>
													<td>{item.assignee_names || 'No Assignee'}</td>
													<td>{item.start_date}</td>
													<td>{item.end_date}</td>
													<td>{item.total_task}</td>

													<td>
														<Link to={`/superadmin/edit-project/${item.id}`}>
															<Button color='primary' isLight>
																Edit
															</Button>
														</Link>
													</td>
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button icon='MoreHoriz' color='dark' isLight />
															</DropdownToggle>

															<DropdownMenu isAlignmentEnd>
																<DropdownItem>
																	<Button
																		icon='Delete'
																		onClick={() => handleClick(item.id)}
																	>
																		Delete
																	</Button>
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
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

export default ManageProject;