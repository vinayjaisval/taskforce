import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../../layout/SubHeader/SubHeader';
import Page from '../../../../layout/Page/Page';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import { dashboardMenu } from '../../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
import PaginationComponent from '../../PaginationComponent';
import useMinimizeAside from '../../../../hooks/useMinimizeAside';
import Alert, { AlertHeading } from '../../../../components/bootstrap/Alert';
import EditCanva from './EditCanva';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import BASE_URL from "../../../../config/api";

const Category = () => {
	useMinimizeAside();

	const id = localStorage.getItem('sess_id');

	const [categoryList, setCategoryList] = useState([]);
	const [totalRecords, setTotalRecords] = useState([]);
	const [limit, setLimit] = useState([]);
	const [offset, setOffset] = useState([]);

	// Form Submit ---
	const [categoryName, setCategoryName] = useState({
		name: '',
		status: '',
	});

	async function onTextFieldChange(e) {
		setCategoryName({
			...categoryName,
			[e.target.name]: e.target.value,
		});
	}

	async function onFormSubmit(e) {
		e.preventDefault();
		document.getElementById('signup-name').style.borderColor = '#f8f9fa';
		document.getElementById('signup-status').style.borderColor = '#f8f9fa';

		if (categoryName.name == '') {
			document.getElementById('signup-name').style.borderColor = 'red';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if (categoryName.status == '') {
			document.getElementById('signup-status').style.borderColor = 'red';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			try {
				axios.post(`${BASE_URL}/admin/add-category`, categoryName).then((res) => {
					console.log(res);
					document.getElementById('succ_message1').style.display = 'block';
					document.getElementById('alert_message1').innerHTML = res.data;
					window.scrollTo({ top: 0, behavior: 'smooth' });
					getPaginatedData(1);
				});
			} catch (error) {
				alert('Something is Wrong');
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
	}

	useEffect(() => {
		async function getCategoryList(page) {
			page = page;
			try {
				const categoryListApi = await axios.get(`${BASE_URL}/admin/category?page=` + page);
				setCategoryList(categoryListApi.data.data);
				setTotalRecords(categoryListApi.data.total);
				setLimit(categoryListApi.data.limit);
				setOffset(categoryListApi.data.offset);
			} catch (error) {
				console.log('Something is Wrong -question');
			}
		}

		getCategoryList(1);
	}, [id]);

	async function getPaginatedData(page) {
		try {
			const categoryListApi = await axios.get(`${BASE_URL}/admin/category?page=` + page);
			setCategoryList(categoryListApi.data.data);
			setTotalRecords(categoryListApi.data.total);
			setLimit(categoryListApi.data.limit);
		} catch (error) {
			console.log('Something is Wrong -question Pagination');
		}
	}

	async function handleClick(e, delId) {
		axios.get(`${BASE_URL}/admin/category_delete/${delId}`).then((res) => {
			getPaginatedData(1);
			document.getElementById('succ_message').style.display = 'block';
			document.getElementById('alert_message').innerHTML = res.data;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	return (
		<PageWrapper title={dashboardMenu.masters.subMenu.category.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/superadmin/dashboard.html' },
							{
								title: 'Settings',
								to: '#',
							},
							{
								title: 'Category Management',
								to: '#',
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
					<div className='col-md-4 col-xs-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Add New Category</h4>
							</CardHeader>
							<CardBody isScrollable>
								<div id='succ_message1'>
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
										<span id='alert_message1'></span>
									</Alert>
								</div>
								<form className='row' id='interviewForm'>
									<div className='row g-4'>
										<div className='col-12'>
											<FormGroup id='signup-name' isFloating label='Name'>
												<Input
													type='text'
													autoComplete='name'
													name='name'
													id='name'
													value={categoryName.name}
													onChange={(e) => onTextFieldChange(e)}
												/>
											</FormGroup>
										</div>

										<div className='col-12'>
											<FormGroup id='signup-status' isFloating label='Status'>
												<select
													name='status'
													id='status'
													className='form-control select2'
													onChange={(e) => onTextFieldChange(e)}>
													<option value={categoryName.name}>
														Select
													</option>
													<option value='Active'>Active</option>
													<option value='InActive'>InActive</option>
												</select>
											</FormGroup>
										</div>

										<div className='col-12'>
											<Button
												color='info'
												className=' py-6'
												onClick={(e) => onFormSubmit(e)}>
												Submit
											</Button>
										</div>
									</div>
								</form>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-8 col-xs-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Manage Category</h4>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th width='1'>SNo</th>
											<th>Name</th>
											<th width='100'>Status</th>
											<th width='120'></th>
											<th width='1'></th>
										</tr>
									</thead>
									<tbody>
										{categoryList && categoryList.length > 0 ? (
											categoryList.map((item, index) => (
												<tr key={index + 1}>
													<td scope='col'>{index + 1 + offset}</td>
													<td scope='col'>{item.name}</td>
													<td scope='col'>{item.status}</td>
													<td>
														<EditCanva id={item.id} />
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
																			Delete Category
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
												<td colSpan={5}>
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

export default Category;
