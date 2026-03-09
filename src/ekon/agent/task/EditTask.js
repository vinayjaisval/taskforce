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
import { useParams } from "react-router-dom";

const EditTask = () => {
	useMinimizeAside();

	const userIds = localStorage.getItem('sess_id');
	const { id } = useParams();

	const [lead, setLead] = useState({
		name: "",
		status: "",
		category: "",
		dedline: "",
		assignee: [],
		remarks: "",
		project: ""
	});
	
	const [sourceList, setSourceList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [departmentList, setDepartmentList] = useState([]);

	const [assigneeList, setAssigneeList] = useState([]);
	const [selAssigneeList, setSelAssigneeList] = useState([]);

	async function onTextFieldChange(e) {

		setLead({
		 ...lead,
		 [e.target.name]: e.target.value
		})
	}

	async function onFormSubmit(e) {
		e.preventDefault()
		document.getElementById("signup-category").style.borderColor = "#f8f9fa";
		document.getElementById("signup-name").style.borderColor = "#f8f9fa";

		
		if(lead.name == ''){
			document.getElementById("signup-name").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(lead.category == ''){
			document.getElementById("signup-category").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			
			try {
			axios.post(`https://task.mycrmdesk.com/backend/api/admin/update-lead/${id}`, lead)
			.then((res) => {
				document.getElementById("succ_message").style.display = "block";
				document.getElementById("alert_message").innerHTML = res.data;
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});
			} catch (error) {
				alert("Something is Wrong");
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
		 
	}


	useEffect(() => {

		async function getSourceList() {
			try {
				const sourceListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/all-source-list`)
				setSourceList(sourceListApi.data);
			} catch (error) {
				console.log("Something is Wrong");
			}
		}

		async function getCategoryList() {
			try {
				const categoryApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/all-category-list`)
				setCategoryList(categoryApi.data);
			} catch (error) {
				console.log("Something is Wrong");
			}
		}

		async function getAssigneeList() {
			try {
				const assigneeListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/all-agent-list`)
				setAssigneeList(assigneeListApi.data);
			} catch (error) {
				console.log("Something is Wrong -Assignee");
			}
		}

		async function getDepartmentList() {
			try {
				const depApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/all-project-list`)
				setDepartmentList(depApi.data);
			} catch (error) {
				console.log("Something is Wrong");
			}
		}

		getSourceList();
		getCategoryList();
		getAssigneeList();
		getDepartmentList();
	}, [userIds]);


	var onSelect = (e) => {
		var assignee = (Array.isArray(e) ? e.map((x) => x.id) : []);
		setLead({...lead,  assignee})
	};

	var onRemove = (e) => {
		var assignee = (Array.isArray(e) ? e.map((x) => x.id) : []);
		setLead({...lead,  assignee})
	};

	useEffect(() => {

    	async function getLeadList() {
        	try {
         		const allLeadsApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/edit-lead/${id}`)
         		setLead(allLeadsApi.data);

				// Sel Subject list
				try {
					const selSubjectListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/get_sel_assignee/${allLeadsApi.data.assignee}`)
					setSelAssigneeList(selSubjectListApi.data.data);
					
				} catch (error) {
					console.log("Something is Wrong -Sel Subject List");
				}

     		} catch (error) {
         		console.log("Something is Wrong");
     		}
       	}
       	getLeadList()
    }, [id]);


	return (
		<PageWrapper title={dashboardMenu.manageAstrologer.subMenu.AddAstro.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/agent/dashboard.html' },
							{
								title: 'Manage Task',
								to: '/agent/task.html',
							},
							{
								title: 'Update Task',
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
								<h4>Update New Task</h4>
							</CardHeader>
							<CardBody className=''>

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
												onChange={e => onTextFieldChange(e)} 
												/>
										</FormGroup>
									</div>

									<div className='col-md-6 col-xs-12'>
										<FormGroup
											id='signup-project'
											isFloating
											label='Project'>
											<select className="form-control" name="project" id="project" onChange={e => onTextFieldChange(e)} required>
												<option value={lead.project}>Select</option>
												{
												departmentList && departmentList.length > 0 ?
												departmentList.map((item,index)=>(
													lead.project == item.id ? 
														<option key={index+1} selected value={item.id}>{item.name}</option>
													:
														<option key={index+1} value={item.id}>{item.name}</option>
												)) :
													<option value="">Select</option>
												}
											</select>
										</FormGroup>
									</div>
									

									<div className='col-md-6 col-xs-12'>
										<FormGroup
											id='signup-source'
											isFloating
											label='Status'>
											<select className="form-control" name="status" id="status" onChange={e => onTextFieldChange(e)} required>
												<option value={lead.status}>Select</option>
												{
												sourceList && sourceList.length > 0 ?
												sourceList.map((item,index)=>(
													lead.status == item.id ? 
														<option key={index+1} selected value={item.id}>{item.name}</option>
													:
														<option key={index+1} value={item.id}>{item.name}</option>
												)) :
												<option value="">Select</option>
												}
											</select>
										</FormGroup>
									</div>

									<div className='col-md-6 col-xs-12'>
										<FormGroup
											id='signup-category'
											isFloating
											label='Category'>
											<select className="form-control" name="category" id="category" onChange={e => onTextFieldChange(e)} required>
												<option value={lead.category}>Select</option>
												{
												categoryList && categoryList.length > 0 ?
												categoryList.map((item,index)=>(
													lead.category == item.id ? 
														<option key={index+1} selected value={item.id}>{item.name}</option>
													:
														<option key={index+1} value={item.id}>{item.name}</option>
												)) :
												<option value="">Select</option>
												}
											</select>
										</FormGroup>
									</div>

									<div className='col-md-6 col-xs-12'>
										<FormGroup
											id='signup-deadline'
											isFloating
											label='Task Deadline'>
											<Input 
												type='datetime-local' 
												autoComplete='dedline' 
												name='dedline'
												id='dedline'
												value={lead.dedline} 
												onChange={e => onTextFieldChange(e)} 
												/>
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
												className="form-control"
												name="assignee" 
												displayValue="name" 
												isObject={true}
												value="id"
												placeholder=""
												closeOnSelect={true}
												id="assignee"
												onSelect={onSelect}
												onRemove={onRemove}
											/>
										</FormGroup>
									</div>
									

									<div className='col-md-12 col-xs-12'>
										<FormGroup
											id='signup-remarks'
											isFloating
											label='Remarks'>
												<textarea 
													name="remarks" 
													className='form-control'
													value={lead.remarks} 
													onChange={e => onTextFieldChange(e)} 
												>
												</textarea>
										</FormGroup>
									</div>

									
									
									
									<div className='col-md-12 col-xs-12'>
										<Button
											color='info'
											className=' py-6'
											onClick={e => onFormSubmit(e)}>
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

export default EditTask;


