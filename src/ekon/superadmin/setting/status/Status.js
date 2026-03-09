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


const Status = () => {
	useMinimizeAside();

	const id = localStorage.getItem('sess_id');

	const [sourceList, setSourceList] = useState([]);
	const [totalRecords, setTotalRecords] = useState([]);
	const [limit, setLimit] = useState([]);
	const [offset, setOffset] = useState([]);


	// Form Submit ---
	const [sourceName, setSourceName] = useState({
		name: "",
		status: ""
	});

	async function onTextFieldChange(e) {
		setSourceName({
			...sourceName,
			[e.target.name]: e.target.value
		})
	}

	async function onFormSubmit(e) {
		e.preventDefault()
		document.getElementById("signup-name").style.borderColor = "#f8f9fa";
		document.getElementById("signup-status").style.borderColor = "#f8f9fa";


		if (sourceName.name == '') {
			document.getElementById("signup-name").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if (sourceName.status == '') {
			document.getElementById("signup-status").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {

			try {
				axios.post(`https://task.mycrmdesk.com/backend/api/admin/add-source`, sourceName)
					.then((res) => {
						console.log(res);
						document.getElementById("succ_message1").style.display = "block";
						document.getElementById("alert_message1").innerHTML = res.data;
						window.scrollTo({ top: 0, behavior: 'smooth' });
						getPaginatedData(1);
					});
			} catch (error) {
				alert("Something is Wrong");
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}

	}



	useEffect(() => {

		async function getSourceList(page) {
			page = page;
			try {
				const sourceListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/source?page=` + page)
				setSourceList(sourceListApi.data.data);
				setTotalRecords(sourceListApi.data.total);
				setLimit(sourceListApi.data.limit);
				setOffset(sourceListApi.data.offset);
			} catch (error) {
				console.log("Something is Wrong -question");
			}
		}

		getSourceList(1);
	}, [id]);



	async function getPaginatedData(page) {

		try {
			const sourceListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/source?page=` + page)
			setSourceList(sourceListApi.data.data);
			setTotalRecords(sourceListApi.data.total);
			setLimit(sourceListApi.data.limit);
		} catch (error) {
			console.log("Something is Wrong -question Pagination");
		}

	}

	async function handleClick(e, delId) {

		axios.get(`https://task.mycrmdesk.com/backend/api/admin/source_delete/${delId}`)
			.then((res) => {
				getPaginatedData(1);
				document.getElementById("succ_message").style.display = "block";
				document.getElementById("alert_message").innerHTML = res.data;
				window.scrollTo({ top: 0, behavior: 'smooth' });
			})

	}





	return (
		<PageWrapper title={dashboardMenu.masters.subMenu.status.text}>
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
								title: 'Status Management',
								to: '#',
							}
						]}
					/>
				</SubHeaderLeft>

			</SubHeader>

			<Page>

				<div id='bootstrap' className='row scroll-margin h-100'>
					<div id="succ_message">
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
							<span id="alert_message"></span>
						</Alert>
					</div>
					<div className='col-md-4 col-xs-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Add New Status</h4>
							</CardHeader>
							<CardBody isScrollable>
								<div id="succ_message1">
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
										<span id="alert_message1"></span>
									</Alert>
								</div>
								<form className="row" id="interviewForm" >
									<div className="row g-4">

										<div className='col-12'>
											<FormGroup
												id='signup-name'
												isFloating
												label='Name'>
												<Input
													type='text'
													autoComplete='name'
													name='name'
													id='name'
													value={sourceName.name}
													onChange={e => onTextFieldChange(e)}
												/>
											</FormGroup>
										</div>

										<div className='col-12'>
											<FormGroup
												id='signup-status'
												isFloating
												label='Status'>
												<select name="status" id="status" className="form-control select2" onChange={e => onTextFieldChange(e)}>
													<option value={sourceName.name}>Select</option>
													<option value="Active">Active</option>
													<option value="InActive">InActive</option>
												</select>
											</FormGroup>
										</div>

										<div className='col-12'>
											<Button
												color='info'
												className=' py-6'
												onClick={e => onFormSubmit(e)}>
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
								<h4>Manage Status</h4>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th width="1">SNo</th>
											<th>Name</th>
											<th width="100">Status</th>
											<th width="120"></th>
											<th width="1"></th>
										</tr>
									</thead>
									<tbody>
										{
											sourceList && sourceList.length > 0 ?
												sourceList.map((item, index) => (
													<tr key={index + 1}>
														<td scope="col">{index + 1 + offset}</td>
														<td scope="col">{item.name}</td>
														<td scope="col">{item.status}</td>
														<td>
															{
																item.id == 1 || item.id == 2 || item.id == 3 || item.id == 4 ?
																''
																:
																<EditCanva id={item.id} />
															}
															
														</td>
														<td>
															{
																item.id == 1 || item.id == 2 || item.id == 3 || item.id ==4 ?
																''
																:
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
																				<span onClick={e => handleClick(e, item.id)} > <i className="fa fa-trash"></i> Delete Status</span>
																			</Button>
																		</DropdownItem>
																	</DropdownMenu>
																</Dropdown>
															}
															
														</td>
													</tr>
												)) :
												<tr>
													<td colSpan={5}>
														<div className='text-center'>
															<div className="loader"></div>
														</div>
													</td>
												</tr>
										}

									</tbody>
								</table>
							</CardBody>
							<CardFooter>
								{totalRecords > 12 &&
									<PaginationComponent
										getAllData={getPaginatedData}
										totalRecords={totalRecords}
										itemsCountPerPage={limit} />
								}
							</CardFooter>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Status;








