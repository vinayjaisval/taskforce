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

const AddProject = () => {
	useMinimizeAside();

	const id = localStorage.getItem('sess_id');

	const [lead, setLead] = useState({
		name: "",
		userid: "",
		email: "",
		phone: "",
		password: "",
		total_task: "",
		start_date: "",
		end_date: "",
		lead_by: "",
		status: "",
		skills: [],
		assignee: [],
		remarks: ""
	});
	
	
	const [teamLeadList, setTeamLeadList] = useState([]);
	const [assigneeList, setAssigneeList] = useState([]);
	const [sourceList, setSourceList] = useState([]);
	const selAssigneeList = "";

	const [skillsList, setSkillsList] = useState([]);
	const selSkillsList = "";

	async function onTextFieldChange(e) {
		setLead({
		 ...lead,
		 [e.target.name]: e.target.value
		})
	}

	async function onFormSubmit(e) {
		e.preventDefault()
		document.getElementById("signup-name").style.borderColor = "#f8f9fa";
		document.getElementById("signup-userid").style.borderColor = "#f8f9fa";
		document.getElementById("signup-email").style.borderColor = "#f8f9fa";
		document.getElementById("signup-phone").style.borderColor = "#f8f9fa";
		document.getElementById("signup-start_date").style.borderColor = "#f8f9fa";
		document.getElementById("signup-end_date").style.borderColor = "#f8f9fa";
		document.getElementById("signup-total_task").style.borderColor = "#f8f9fa";
		document.getElementById("signup-lead_by").style.borderColor = "#f8f9fa";
		document.getElementById("signup-status").style.borderColor = "#f8f9fa";


		
		if(lead.name == ''){
			document.getElementById("signup-name").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(lead.userid == ''){
			document.getElementById("signup-userid").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(lead.email == ''){
			document.getElementById("signup-email").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(lead.phone == ''){
			document.getElementById("signup-phone").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(lead.start_date == ''){
			document.getElementById("signup-start_date").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(lead.end_date == ''){
			document.getElementById("signup-end_date").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(lead.total_task == ''){
			document.getElementById("signup-total_task").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(lead.lead_by == ''){
			document.getElementById("signup-lead_by").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(lead.status == ''){
			document.getElementById("signup-status").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			
			try {
			axios.post(`https://task.mycrmdesk.com/backend/api/admin/add-project`, lead)
			.then((res) => {
				document.getElementById("succ_message").style.display = "block";
				document.getElementById("alert_message").innerHTML = res.data;
				window.scrollTo({ top: 0, behavior: 'smooth' });
				//window.location.reload();
			});
			} catch (error) {
				alert("Something is Wrong");
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
		 
	}


	useEffect(() => {
		/*
		async function getAssigneeList() {
			try {
				const assigneeListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/all-agent-list`)
				setAssigneeList(assigneeListApi.data);
			} catch (error) {
				console.log("Something is Wrong -Assignee");
			}
		}
		*/

		async function getSkillsList() {
			try {
				const skillListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/all-skills-list`)
				setSkillsList(skillListApi.data);
			} catch (error) {
				console.log("Something is Wrong -Skills");
			}
		}

		async function getTeamLeadList() {
			
			try {
				const teamLeadApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/all-teamlead-list`)
				setTeamLeadList(teamLeadApi.data);
			} catch (error) {
				console.log("Something is Wrong -Team");
			}
		}

		async function getSourceList() {
			try {
				const sourceListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/all-source-list`)
				setSourceList(sourceListApi.data);
			} catch (error) {
				console.log("Something is Wrong");
			}
		}
		
		//getAssigneeList();
		getSkillsList();
		getTeamLeadList();
		getSourceList();
	}, [id]);


	var onSelect = async (e) => {
		var skills = (Array.isArray(e) ? e.map((x) => x.id) : []);
		setLead({...lead,  skills})

		// Sel Assignee list
		if(skills != null){
			try {
				const selAssApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/get_sel_assignee_by_skills/${skills}`)
				setAssigneeList(selAssApi.data.data);
				console.log(selAssApi.data.data);
				
			} catch (error) {
				console.log("Something is Wrong -Sel Skills List");
			}
		}
	};

	var onRemove = async (e) => {
		var skills = (Array.isArray(e) ? e.map((x) => x.id) : []);
		setLead({...lead,  skills})

		// Sel Assignee list
		if(skills != null){
			try {
				const selAssApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/get_sel_assignee_by_skills/${skills}`)
				setAssigneeList(selAssApi.data.data);
				console.log(selAssApi.data.data);
				
			} catch (error) {
				console.log("Something is Wrong -Sel Skills List");
			}
		}
	};

	var onSelect1 = (e) => {
		var assignee = (Array.isArray(e) ? e.map((x) => x.id) : []);
		setLead({...lead,  assignee})
	};

	var onRemove1 = (e) => {
		var assignee = (Array.isArray(e) ? e.map((x) => x.id) : []);
		setLead({...lead,  assignee})
	};


	return (
		<PageWrapper title={dashboardMenu.manageAstrologer.subMenu.AddAstro.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/superadmin/dashboard.html' },
							{
								title: 'Manage Projects',
								to: '/superadmin/manage-projects.html',
							},
							{
								title: 'Add Project',
								to: '#',
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
								<h4>Add New Project</h4>
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

									<div className='col-md-4 col-xs-12'>
										<FormGroup
											id='signup-name'
											isFloating
											label='Project Name'>
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

									<div className='col-md-4 col-xs-12'>
										<FormGroup
											id='signup-userid'
											isFloating
											label='User Id'>
											<Input 
												type='text' 
												autoComplete='userid' 
												name='userid'
												id='userid'
												value={lead.userid} 
												onChange={e => onTextFieldChange(e)} 
												/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup
											id='signup-email'
											isFloating
											label='Email Id'>
											<Input 
												type='text' 
												autoComplete='email' 
												name='email'
												id='email'
												value={lead.email} 
												onChange={e => onTextFieldChange(e)} 
												/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup
											id='signup-phone'
											isFloating
											label='Phone Number'>
											<Input 
												type='text' 
												autoComplete='phone' 
												name='phone'
												id='phone'
												value={lead.phone} 
												onChange={e => onTextFieldChange(e)} 
												/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup
											id='signup-password'
											isFloating
											label='Password'>
											<Input 
												type='password' 
												autoComplete='password' 
												name='password'
												id='password'
												value={lead.password} 
												onChange={e => onTextFieldChange(e)} 
												/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup
											id='signup-total_task'
											isFloating
											label='Total Task'>
											<Input 
												type='text' 
												autoComplete='total_task' 
												name='total_task'
												id='total_task'
												value={lead.total_task} 
												onChange={e => onTextFieldChange(e)} 
												/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup
											id='signup-start_date'
											isFloating
											label='Projcet Start Date'>
											<Input 
												type='date' 
												autoComplete='start_date' 
												name='start_date'
												id='start_date'
												value={lead.start_date} 
												onChange={e => onTextFieldChange(e)} 
												/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup
											id='signup-end_date'
											isFloating
											label='Project End Date'>
											<Input 
												type='date' 
												autoComplete='end_date' 
												name='end_date'
												id='end_date'
												value={lead.end_date} 
												onChange={e => onTextFieldChange(e)} 
												/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup
											id='signup-lead_by'
											isFloating
											label='Team Leader'>
											<select className="form-control" name="lead_by" id="lead_by" onChange={e => onTextFieldChange(e)} required>
												<option value={lead.lead_by}>Select</option>
												{
												teamLeadList && teamLeadList.length > 0 ?
												teamLeadList.map((item,index)=>(
													<option key={index+1} value={item.id}>{item.name}</option>
												)) :
													<option value="">Select</option>
												}
											</select>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup
											id='signup-status'
											isFloating
											label='Status'>
											<select className="form-control" name="status" id="status" onChange={e => onTextFieldChange(e)} required>
												<option value={lead.status}>Select</option>
												{
												sourceList && sourceList.length > 0 ?
												sourceList.map((item,index)=>(
												<option key={index+1} value={item.id}>{item.name}</option>
												)) :
												<option value="">Select</option>
												}
											</select>
										</FormGroup>
									</div>

									

									<div className='col-12'></div>

									<div className='col-md-6 col-xs-12 label-hide'>
										<FormGroup
											id='lead-skills'
											isFloating
											label='--Skills--'>
											<Multiselect
												options={skillsList}
												selectedValues={selSkillsList}
												className="form-control"
												name="skills" 
												displayValue="name" 
												isObject={true}
												value="id"
												placeholder=""
												closeOnSelect={true}
												id="skills"
												onSelect={onSelect}
												onRemove={onRemove}
											/>
										</FormGroup>
									</div>


									<div className='col-md-6 col-xs-12 label-hide'>
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
												onSelect={onSelect1}
												onRemove={onRemove1}
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

export default AddProject;


