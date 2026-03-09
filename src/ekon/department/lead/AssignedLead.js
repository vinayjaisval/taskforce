import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import Icon from '../../../components/icon/Icon';
import PaginationComponent from '../PaginationComponent';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';
import EditUserCanva from './EditUserCanva';
import FollowCanva from './FollowCanva';


const AssignedLead = () => {
	useMinimizeAside();

	const id = localStorage.getItem('sess_id');
	
	const [astroList, setAstroList] = useState([]);
	const [totalRecords, setTotalRecords] = useState([]);
	const [limit, setLimit] = useState([]);
	const [offset, setOffset] = useState([]);
	
	useEffect(() => {

		async function getAstroList(page) {
			page = page;
			try {
				const astroListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/leads_assign?page=`+page)
				setAstroList(astroListApi.data.data);
				setTotalRecords(astroListApi.data.total);
				setLimit(astroListApi.data.limit);
				setOffset(astroListApi.data.offset);
			} catch (error) {
				console.log("Something is Wrong -astroList");
			}
		}

		getAstroList(1);
	}, [id]);

	

	async function getPaginatedData(page){

		const keywordVal = document.getElementById("searchInput1").value;

		try {
			const astroListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/leads_assign?page=`+page+`&keywords=`+keywordVal)
			setAstroList(astroListApi.data.data);
			setTotalRecords(astroListApi.data.total);
			setLimit(astroListApi.data.limit);
			setOffset(astroListApi.data.offset);
		} catch (error) {
			console.log("Something is Wrong -astroList Pagination");
		}

	}

	async function handleClick(e, delId){

		axios.get(`https://task.mycrmdesk.com/backend/api/admin/lead_delete/${delId}`)
		.then((res) => {
			getPaginatedData(1);
		  document.getElementById("succ_message").style.display = "block";
		  document.getElementById("alert_message").innerHTML = res.data;
		  window.scrollTo({ top: 0, behavior: 'smooth' });
		})

	}

	const [search, setSearch] = useState({
		keywords: ""
	});

	async function onTextFieldChange(e) {

		setSearch({
			...search,
			[e.target.name]: e.target.value
		})
		try {
			const astroListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/leads_assign?page=1&keywords=`+e.target.value)
			setAstroList(astroListApi.data.data);
			setTotalRecords(astroListApi.data.total);
			setLimit(astroListApi.data.limit);
			setOffset(astroListApi.data.offset);
		} catch (error) {
			console.log("Something is Wrong -allLeads");
		}
	}

	

	return (
		<PageWrapper title={dashboardMenu.manageAstrologer.subMenu.ManageAstro.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/superadmin/dashboard.html' },
							{
								title: 'Manage Leads',
								to: '/superadmin/leads.html',
							},
							{
								title: 'Add Lead',
								to: '/superadmin/add-lead.html',
							},
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<ButtonGroup>
						<Dropdown>
							<DropdownToggle>
								<Button color='primary' isLight>
									Actions
								</Button>
							</DropdownToggle>
							<DropdownMenu isAlignmentEnd>
								<DropdownItem>
									<NavLink to='/superadmin/leads.html'>
										<Icon icon='LayoutTopPanel5' />
										Manage Lead
									</NavLink>
								</DropdownItem>
								<DropdownItem>
									<NavLink to='/superadmin/add-lead.html'>
										<Icon icon='LayoutTopPanel2' />
										Add New Lead
									</NavLink>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</ButtonGroup>
				</SubHeaderRight>
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
					<div className='col-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Manage Lead</h4>
								<div className="d-flex" data-tour="search">
									<label className="border-0 bg-transparent cursor-pointer mar-t-5" htmlFor="searchInput1">
									<Icon
										icon='Search'
										className='Search'
										color='primary' 
										size='2x' 
										forceFamily={ null }
									/>
									</label>
									<input 
										id="searchInput1" 
										type="search" 
										className="form-control border-0 shadow-none bg-transparent" 
										placeholder="Search..." 
										autoComplete="off" 
										value={search.keywords} 
										name="keywords"
										onChange={e => onTextFieldChange(e)}
									/>
								</div>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
									<tr>
										<th width="1">SNo </th>
										<th>AssignedTo</th>
										<th>Name</th>
										<th>Email</th>
										<th>Phone</th>
										<th width="120"></th>
										<th width="120"></th>
										<th width="1"></th>
									</tr>
									</thead>
									<tbody>
									{
										astroList && astroList.length > 0 ?
										astroList.map((item,index)=>(
											<tr key={index+1}>
												<td scope="col">{index+ 1 + offset}</td>
												<td scope="col">{item.assigned_to}</td>
												<td scope="col">{item.name}</td>
												<td scope="col">{item.email}</td>
												<td scope="col">{item.phone}</td>
												<td><FollowCanva id={item.id} /></td>
												<td><EditUserCanva id={item.id} /></td>
												
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
																	<span onClick={e => handleClick(e, item.id)} > <i className="fa fa-trash"></i> Delete Lead</span>
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

export default AssignedLead;








