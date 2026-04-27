import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import PaginationComponent from '../PaginationComponent';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Assignee from '../user_status/Assignee';
import BASE_URL from "../../../config/api";

const UserTask = () => {

    useMinimizeAside();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [astroList, setAstroList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [limit, setLimit] = useState(12);

    const [search, setSearch] = useState({
        keywords: '',
    });

    const debounceRef = useRef(null);

    const getAstroList = async (page = 1, keyword = '') => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${BASE_URL}/admin/leads_users_list/${id}?page=${page}&keywords=${keyword}`
            );

            setAstroList(res.data.data || []);
            setTotalRecords(res.data.total_projects || 0);
            setLimit(res.data.per_page || 12);

        } catch (error) {
            console.log('API Error', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAstroList(1);
    }, [id]);

    const getPaginatedData = (page) => {
        getAstroList(page, search.keywords);
    };

    const onTextFieldChange = (e) => {
        const value = e.target.value;

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
											<th>Project</th>
											<th>Team Leader</th>
											{/* <th>Assignee</th> */}
											{/* <th>Deadline</th> */}
											<th>Total Task</th>
											{/* <th width='120'></th>
											<th width='120'></th>
											<th width='1'></th> */}
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<tr>
												<td colSpan={9}>
													<div className='text-center'>
														<div className='loader'></div>
													</div>
												</td>
											</tr>
										) :
											astroList.length === 0 ? (
												<tr>
													<td colSpan={9} className='text-center'>
														NOT FOUND
													</td>
												</tr>
											) : (
												// {astroList && astroList.length > 0 ? (
												astroList.map((item, index) => {
													console.log("items:", item);
													return (
														<tr key={index + 1}>
															<td scope='col'>#{item.id}</td>
															<td scope='col'>
																<Link to={`/superadmin/project/${item.project}/${id}`}>
																	<Assignee id={item.project} />
																</Link>
															</td>
															<td scope='col'>{item.team_lead}</td>
															{/* <td scope='col'>{item.source_name}</td> */}

															{/* <td scope='col'>{item.dedline}</td> */}
															<td scope='col'>{item.total_tasks}</td>
															{/* <td>
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
														</td> */}
														</tr>
													);
												})

												// ) : (
												// 	<tr>
												// 		<td colSpan={9}>
												// 			<div className='text-center'>
												// 				<div className='loader'></div>
												// 			</div>
												// 		</td>
												// 	</tr>
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