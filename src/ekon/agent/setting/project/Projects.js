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


const Projects = () => {
	useMinimizeAside();

	const id = localStorage.getItem('sess_id');
	
	const [departmentList, setDepartmentList] = useState([]);
	const [totalRecords, setTotalRecords] = useState([]);
	const [limit, setLimit] = useState([]);
	const [offset, setOffset] = useState([]);


  // Form Submit ---
  const [departmentName, setDepartmentName] = useState({
		name: "",
		userid: "",
		email: "",
		contact_no : "",
		user_pass: "",
		total_task : 10
	});

	async function onTextFieldChange(e) {
		setDepartmentName({
		 ...departmentName,
		 [e.target.name]: e.target.value
		})
	}

  async function onFormSubmit(e) {
		e.preventDefault()
		document.getElementById("signup-name").style.borderColor = "#f8f9fa";
    	document.getElementById("signup-userid").style.borderColor = "#f8f9fa";
		document.getElementById("signup-email").style.borderColor = "#f8f9fa";
    	document.getElementById("signup-contact_no").style.borderColor = "#f8f9fa";
		document.getElementById("signup-user_pass").style.borderColor = "#f8f9fa";

		
		if(departmentName.name == ''){
			document.getElementById("signup-name").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(departmentName.userid == ''){
			document.getElementById("signup-userid").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(departmentName.email == ''){
			document.getElementById("signup-email").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}else if(departmentName.contact_no == ''){
			document.getElementById("signup-contact_no").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if(departmentName.user_pass == ''){
			document.getElementById("signup-user_pass").style.borderColor = "red";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			
			try {
			axios.post(`https://task.mycrmdesk.com/backend/api/admin/add-project`, departmentName)
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

		async function getDepartmentList(page) {
			page = page;
			try {
				const departmentListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/projects?page=`+page)
				setDepartmentList(departmentListApi.data.data);
				setTotalRecords(departmentListApi.data.total);
				setLimit(departmentListApi.data.limit);
				setOffset(departmentListApi.data.offset);
			} catch (error) {
				console.log("Something is Wrong -question");
			}
		}

		getDepartmentList(1);
	}, [id]);

	

	async function getPaginatedData(page){

		try {
			const departmentListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/projects?page=`+page)
			setDepartmentList(departmentListApi.data.data);
			setTotalRecords(departmentListApi.data.total);
			setLimit(departmentListApi.data.limit);
		} catch (error) {
			console.log("Something is Wrong -question Pagination");
		}

	}

	async function handleClick(e, delId){

		axios.get(`https://task.mycrmdesk.com/backend/api/admin/project_delete/${delId}`)
		.then((res) => {
		  getPaginatedData(1);
		  document.getElementById("succ_message").style.display = "block";
		  document.getElementById("alert_message").innerHTML = res.data;
		  window.scrollTo({ top: 0, behavior: 'smooth' });
		})

	}

  

	

	return (
		<PageWrapper title={dashboardMenu.masters.subMenu.Projects.text}>
			<SubHeader>
        <SubHeaderLeft>
          <Breadcrumb
            list={[
              { title: 'Home', to: '/agent/dashboard.html' },
              {
                title: 'Settings',
                to: '#',
              },
              {
                title: 'Project Management',
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
								<h4>Add New Project</h4>
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
                <form className="row" >
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
									value={departmentName.name} 
									onChange={e => onTextFieldChange(e)} 
									/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup
								id='signup-userid'
								isFloating
								label='User Id'>
								<Input 
									type='text' 
									autoComplete='userid' 
									name='userid'
									id='userid'
									value={departmentName.userid} 
									onChange={e => onTextFieldChange(e)} 
									/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup
								id='signup-email'
								isFloating
								label='Email'>
								<Input 
									type='email' 
									autoComplete='email' 
									name='email'
									id='email'
									value={departmentName.email} 
									onChange={e => onTextFieldChange(e)} 
									/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup
								id='signup-contact_no'
								isFloating
								label='Contact Number'>
								<Input 
									type='number' 
									autoComplete='contact_no' 
									name='contact_no'
									id='contact_no'
									value={departmentName.contact_no} 
									onChange={e => onTextFieldChange(e)} 
									/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup
								id='signup-user_pass'
								isFloating
								label='Password'>
								<Input 
									type='password' 
									autoComplete='user_pass' 
									name='user_pass'
									id='user_pass'
									value={departmentName.user_pass} 
									onChange={e => onTextFieldChange(e)} 
									/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup
								id='signup-total_task'
								isFloating
								label='Total Task Count'>
								<Input 
									type='text' 
									autoComplete='total_task' 
									name='total_task'
									id='total_task'
									value={departmentName.total_task} 
									onChange={e => onTextFieldChange(e)} 
									/>
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
								<h4>Manage Projects</h4>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
									<tr>
                    <th width="1">SNo</th>
                    <th>Name</th>
					<th>UserId</th>
					<th>Email</th>
                    <th>ContactNumber</th>
					<th>TotalTask</th>
                    <th width="120"></th>
                    <th width="1"></th>
									</tr>
									</thead>
									<tbody>
									{
										departmentList && departmentList.length > 0 ?
										departmentList.map((item,index)=>(
											<tr key={index+1}>
												<td scope="col">{index+ 1 + offset}</td>
												<td scope="col">{item.name}</td>
                        						<td scope="col">{item.userid}</td>
												<td scope="col">{item.email}</td>
												<td scope="col">{item.phone}</td>
												<td scope="col">{item.total_task}</td>
												<td><EditCanva id={item.id} /></td>
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
																	<span onClick={e => handleClick(e, item.id)} > <i className="fa fa-trash"></i> Delete Project</span>
																</Button>
															</DropdownItem>
														</DropdownMenu>
													</Dropdown>
												</td>
											</tr>
										)) :
										<tr>
											<td colSpan={8}>
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
										itemsCountPerPage = {limit} />
								}
							</CardFooter>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Projects;








