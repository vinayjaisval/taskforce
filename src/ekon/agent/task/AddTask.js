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
import Input from '../../../components/bootstrap/forms/Input';
import axios from 'axios';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';
import Multiselect from 'multiselect-react-dropdown';
import BASE_URL from "../../../config/api";

const AddTask = () => {
	useMinimizeAside();

	const id = localStorage.getItem('sess_id');

	const [lead, setLead] = useState({
		name: '',
		status: '',
		category: '',
		dedline: '',
		start_task: '',
		assignee: [],
		remarks: '',
		project: '',
	});

	const [sourceList, setSourceList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [departmentList, setDepartmentList] = useState([]);

	const [assigneeList, setAssigneeList] = useState([]);
	const selAssigneeList = '';

	async function onTextFieldChange(e) {
		setLead({
			...lead,
			[e.target.name]: e.target.value,
		});
	}

	async function onFormSubmit(e) {
		e.preventDefault();
		document.getElementById('signup-project').style.borderColor = '#f8f9fa';
		document.getElementById('signup-name').style.borderColor = '#f8f9fa';
		document.getElementById('signup-start_task').style.borderColor = '#f8f9fa';
		document.getElementById('signup-deadline').style.borderColor = '#f8f9fa';
		document.getElementById('signup-status').style.borderColor = '#f8f9fa';

		if (lead.name == '') {
			document.getElementById('signup-name').style.borderColor = 'red';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if (lead.start_task == '') {
			document.getElementById('signup-start_task').style.borderColor = 'red';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if (lead.deadline == '') {
			document.getElementById('signup-deadline').style.borderColor = 'red';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if (lead.project == '') {
			document.getElementById('signup-project').style.borderColor = 'red';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if (lead.status == '') {
			document.getElementById('signup-status').style.borderColor = 'red';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			try {
				axios.post(`${BASE_URL}/admin/add-lead/${id}`, lead).then((res) => {
					document.getElementById('succ_message').style.display = 'block';
					document.getElementById('alert_message').innerHTML = res.data;
					window.scrollTo({ top: 0, behavior: 'smooth' });
					setLead({ lead: '' });
				});
			} catch (error) {
				alert('Something is Wrong');
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
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
				const assigneeListApi = await axios.get(`${BASE_URL}/agent/all-agent-list/${id}`);
				setAssigneeList(assigneeListApi.data);
				console.log(assigneeListApi.data);
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
	}, [id]);

	var onSelect = (e) => {
		var assignee = Array.isArray(e) ? e.map((x) => x.id) : [];
		setLead({ ...lead, assignee });
	};

	var onRemove = (e) => {
		var assignee = Array.isArray(e) ? e.map((x) => x.id) : [];
		setLead({ ...lead, assignee });
	};

	return (
		<PageWrapper title={dashboardMenu.manageAstrologer.subMenu.AddAstro.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/agent/dashboard.html' },
							{
								title: 'Manage Task',
								to: '/agent/manage-task.html',
							},
							{
								title: 'Add Task',
								to: '/agent/add-task.html',
							},
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
				<div id='bootstrap' className='row scroll-margin h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Add New Task</h4>
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
									<div className='col-md-12 col-xs-12'>
										<FormGroup
											id='signup-name'
											isFloating
											label='Task Headline'>
											<Input
												type='text'
												autoComplete='name'
												name='name'
												id='name'
												value={lead.name}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-6 col-xs-12'>
										<FormGroup
											id='signup-start_task'
											isFloating
											label='Task Start Time'>
											<Input
												type='datetime-local'
												autoComplete='start_task'
												name='start_task'
												id='start_task'
												value={lead.start_task}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-6 col-xs-12'>
										<FormGroup
											id='signup-deadline'
											isFloating
											label='Task End Time'>
											<Input
												type='datetime-local'
												autoComplete='dedline'
												name='dedline'
												id='dedline'
												value={lead.dedline}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-6 col-xs-12'>
										<FormGroup id='signup-project' isFloating label='Project'>
											<select
												className='form-control'
												name='project'
												id='project'
												onChange={(e) => onTextFieldChange(e)}
												required>
												<option value={lead.project}>Select</option>
												{departmentList && departmentList.length > 0 ? (
													departmentList.map((item, index) => (
														<option key={index + 1} value={item.id}>
															{item.name}
														</option>
													))
												) : (
													<option value=''>Select</option>
												)}
											</select>
										</FormGroup>
									</div>

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
													sourceList.map((item, index) => (
														<option key={index + 1} value={item.id}>
															{item.name}
														</option>
													))
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
													categoryList.map((item, index) => (
														<option key={index + 1} value={item.id}>
															{item.name}
														</option>
													))
												) : (
													<option value=''>Select</option>
												)}
											</select>
										</FormGroup>
									</div>

									<div className='col-12 label-hide'>
										<FormGroup
											id='lead-assignee'
											isFloating
											label='--Assignee--'>
											<Multiselect
												options={assigneeList}
												selectedValues={selAssigneeList}
												className='form-control'
												name='assignee'
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
										<FormGroup id='signup-remarks' isFloating label='Remarks'>
											<textarea
												name='remarks'
												className='form-control'
												value={lead.remarks}
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
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default AddTask;
