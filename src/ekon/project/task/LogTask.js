import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardHeader } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';

import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import axios from 'axios';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';
import Multiselect from 'multiselect-react-dropdown';
import { useParams } from 'react-router-dom';
import BASE_URL from "../../../config/api";

const LogTask = () => {
	useMinimizeAside();

	const userIds = localStorage.getItem('sess_id');
	const { id } = useParams();

	const [lead, setLead] = useState({
		name: '',
		status: '',
		category: '',
		dedline: '',
		assignee: [],
		remarks: '',
		newremarks: '',
	});

	const [sourceList, setSourceList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [assigneeList, setAssigneeList] = useState([]);
	const [selAssigneeList, setSelAssigneeList] = useState([]);
	const [logList, setLogList] = useState([]);
	const [departmentList, setDepartmentList] = useState([]);

	async function onTextFieldChange(e) {
		setLead({
			...lead,
			[e.target.name]: e.target.value,
		});
	}

	async function onFormSubmit(e) {
		e.preventDefault();
		document.getElementById('signup-newremarks1').style.borderColor = '#f8f9fa';

		if (lead.newremarks == '' || lead.newremarks == null) {
			document.getElementById('signup-newremarks1').style.borderColor = 'red';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			try {
				axios
					.post(`${BASE_URL}/admin/update-lead-followup/${id}/${userIds}`, lead)
					.then((res) => {
						document.getElementById('succ_message').style.display = 'block';
						document.getElementById('alert_message').innerHTML = res.data;
						window.scrollTo({ top: 0, behavior: 'smooth' });
					});
			} catch (error) {
				alert('Something is Wrong');
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}

		// Get instant Log
		try {
			const logApi = await axios.get(`${BASE_URL}/admin/leads-log/${id}`);
			setLogList(logApi.data.data);
		} catch (error) {
			console.log('Something is Wrong -taskLog 1');
		}
	}

	useEffect(() => {
		async function getSourceList() {
			try {
				const sourceListApi = await axios.get(`${BASE_URL}/admin/all-source-list`);
				setSourceList(sourceListApi.data);
			} catch (error) {
				console.log('Something is Wrong');
			}
		}

		async function getCategoryList() {
			try {
				const categoryApi = await axios.get(`${BASE_URL}/admin/all-category-list`);
				setCategoryList(categoryApi.data);
			} catch (error) {
				console.log('Something is Wrong');
			}
		}

		async function getAssigneeList() {
			try {
				const assigneeListApi = await axios.get(`${BASE_URL}/admin/all-agent-list`);
				setAssigneeList(assigneeListApi.data);
			} catch (error) {
				console.log('Something is Wrong -Assignee');
			}
		}

		async function getDepartmentList() {
			try {
				const depApi = await axios.get(`${BASE_URL}/admin/all-project-list`);
				setDepartmentList(depApi.data);
			} catch (error) {
				console.log('Something is Wrong');
			}
		}

		getSourceList();
		getCategoryList();
		getAssigneeList();
		getDepartmentList();
	}, [userIds]);

	var onSelect = (e) => {
		var assignee = Array.isArray(e) ? e.map((x) => x.id) : [];
		setLead({ ...lead, assignee });
	};

	var onRemove = (e) => {
		var assignee = Array.isArray(e) ? e.map((x) => x.id) : [];
		setLead({ ...lead, assignee });
	};

	useEffect(() => {
		async function getLeadList() {
			try {
				const allLeadsApi = await axios.get(`${BASE_URL}/admin/edit-lead/${id}`);
				setLead(allLeadsApi.data);

				// Sel Subject list
				try {
					const selSubjectListApi = await axios.get(
						`${BASE_URL}/admin/get_sel_assignee/${allLeadsApi.data.assignee}`,
					);
					setSelAssigneeList(selSubjectListApi.data.data);
				} catch (error) {
					console.log('Something is Wrong -Sel Subject List');
				}
			} catch (error) {
				console.log('Something is Wrong');
			}
		}
		getLeadList();
	}, [id]);

	useEffect(() => {
		async function getTaskLog() {
			try {
				const logApi = await axios.get(`${BASE_URL}/admin/leads-log/${id}`);
				setLogList(logApi.data.data);
			} catch (error) {
				console.log('Something is Wrong -taskLog');
			}
		}

		getTaskLog();
	}, [id]);

	async function onTimerCal(e, leadIds) {
		e.preventDefault();

		try {
			await axios.get(`${BASE_URL}/admin/timer-calculation/${userIds}/${leadIds}`);

			document.getElementById('succ_message1').style.display = 'block';
			document.getElementById('alert_message1').innerHTML =
				'Your Time Updated. Please Refrese Page to see the Changes!!';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {}
	}

	return (
		<PageWrapper title={dashboardMenu.manageAstrologer.subMenu.AddAstro.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/superadmin/dashboard.html' },
							{
								title: 'Manage Task',
								to: '/superadmin/task.html',
							},
							{
								title: 'Update Task',
								to: '/superadmin/add-task.html',
							},
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				<div id='bootstrap' className='row scroll-margin h-100'>
					<div className='col-md-4 col-xs-12 '>
						<Card stretch>
							<CardHeader className=''>
								<h4>Start/End Task</h4>
							</CardHeader>
							<CardBody className='row g-4'>
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
								<br />

								<h6
									className={
										lead.total_working_time > lead.total_time_assign
											? 'text-danger'
											: 'text-primary'
									}>
									Task Time:- <b>{lead.total_time_assign} Min</b>
									<br />
									Working Time:- <b>{lead.total_working_time} Min</b>
								</h6>

								<br />

								{lead.time_status == 1 ? (
									<Button
										color='warning'
										className='py-6'
										onClick={(e) => onTimerCal(e, lead.id)}>
										End Timer
									</Button>
								) : (
									<Button
										color='info'
										className='py-6'
										onClick={(e) => onTimerCal(e, lead.id)}>
										Start Timer
									</Button>
								)}

								<br />
							</CardBody>
						</Card>

						<Card stretch>
							<CardHeader className=''>
								<h4>Task Details</h4>
							</CardHeader>
							<CardBody className='row g-4'>
								<div className='col-md-12 col-xs-12'>
									<b>Task Headline</b>
									<p>{lead.name}</p>
								</div>

								<div className='col-md-6 col-xs-12'>
									<b>Task Start Time</b>
									<p>{lead.start_task}</p>
								</div>

								<div className='col-md-6 col-xs-12'>
									<b>Task End Time</b>
									<p>{lead.dedline}</p>
								</div>

								<div className='col-md-6 col-xs-12'>
									<b>Task Project</b>
									<p>
										{departmentList && departmentList.length > 0
											? departmentList.map((item) =>
													lead.project == item.id ? item.name : '',
											  )
											: ''}
									</p>
								</div>

								<div className='col-md-6 col-xs-12'>
									<b>Task Status</b>
									<p>
										{sourceList && sourceList.length > 0
											? sourceList.map((item) =>
													lead.status == item.id ? item.name : '',
											  )
											: ''}
									</p>
								</div>

								<div className='col-md-6 col-xs-12'>
									<b>Task Category</b>
									<p>
										{categoryList && categoryList.length > 0
											? categoryList.map((item) =>
													lead.category == item.id ? item.name : '',
											  )
											: ''}
									</p>
								</div>

								<div className='col-12 label-hide'>
									<b>Task Assignee</b>
									<FormGroup id='lead-assignee' isFloating label='--Assignee--'>
										<Multiselect
											options={assigneeList}
											selectedValues={selAssigneeList}
											className='form-control'
											displayValue='name'
											isObject={true}
											value='id'
											placeholder=''
											closeOnSelect={true}
											id='assignee'
											onSelect={onSelect}
											onRemove={onRemove}
										/>
									</FormGroup>
								</div>

								<div className='col-md-12 col-xs-12'>
									<b>Task Remarks</b>
									<div dangerouslySetInnerHTML={{ __html: lead.remarks }} />
								</div>

								<div className='col-md-12 col-xs-12'>&nbsp;</div>
							</CardBody>
						</Card>
					</div>

					<div className='col-md-8 col-xs-12 '>
						<Card stretch>
							<CardHeader className=''>
								<h4>Add Task Log</h4>
							</CardHeader>
							<CardBody className=''>
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

								<form className='row g-4' id='leadForm'>
									<div className='col-md-6 col-xs-12'>
										<FormGroup id='signup-status' isFloating label='Status'>
											<select
												className='form-control'
												name='status'
												id='status'
												onChange={(e) => onTextFieldChange(e)}
												required>
												<option value={lead.status}>Select</option>
												{sourceList && sourceList.length > 0 ? (
													sourceList.map((item, index) =>
														lead.status == item.id ? (
															<option
																key={index + 1}
																selected
																value={item.id}>
																{item.name}
															</option>
														) : (
															<option key={index + 1} value={item.id}>
																{item.name}
															</option>
														),
													)
												) : (
													<option value=''>Select</option>
												)}
											</select>
										</FormGroup>
									</div>

									<div className='col-md-6 col-xs-12'>
										<FormGroup id='signup-category' isFloating label='Category'>
											<select
												className='form-control'
												name='category'
												id='category'
												onChange={(e) => onTextFieldChange(e)}
												required>
												<option value={lead.category}>Select</option>
												{categoryList && categoryList.length > 0 ? (
													categoryList.map((item, index) =>
														lead.category == item.id ? (
															<option
																key={index + 1}
																selected
																value={item.id}>
																{item.name}
															</option>
														) : (
															<option key={index + 1} value={item.id}>
																{item.name}
															</option>
														),
													)
												) : (
													<option value=''>Select</option>
												)}
											</select>
										</FormGroup>
									</div>

									<div className='col-md-12 col-xs-12'>
										<FormGroup
											id='signup-newremarks1'
											isFloating
											label='Remarks'>
											<textarea
												name='newremarks'
												className='form-control'
												value={lead.newremarks}
												onChange={(e) => onTextFieldChange(e)}></textarea>
										</FormGroup>
									</div>

									<div className='col-md-12 col-xs-12'>
										<Button
											color='info'
											className=' py-6'
											onClick={(e) => onFormSubmit(e)}>
											Submit
										</Button>
									</div>
								</form>
							</CardBody>
						</Card>

						<Card stretch>
							<CardHeader className=''>
								<h4>Log History</h4>
							</CardHeader>
							<CardBody style={{ maxHeight: '500px', overflow: 'auto' }}>
								{logList && logList.length > 0 ? (
									logList.map((item, index) => (
										<>
											<div className='abc' key={index + 1}>
												<h6>
													<b>{item.name}</b> change to{' '}
													<b>{item.status_name}</b> at{' '}
													<b>{item.created_at}</b>{' '}
												</h6>
												<p>{item.remarks}</p>
											</div>
										</>
									))
								) : (
									<div className='text-center'>
										<div className='loader'></div>
									</div>
								)}

								<div className='col-md-12 col-xs-12'>&nbsp;</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default LogTask;
