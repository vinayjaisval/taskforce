import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';

import PaginationComponent from '../PaginationComponent';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';



const Members = () => {
	useMinimizeAside();

	const id = localStorage.getItem('sess_id');
	
	const [memberList, setMemberList] = useState([]);
	const [totalRecords, setTotalRecords] = useState([]);
	const [limit, setLimit] = useState([]);
	const [offset, setOffset] = useState([]);
	
	useEffect(() => {

		async function getMemberList(page) {
			page = page;
			try {
				const memberListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/all_memebr_list?page=`+page)
				setMemberList(memberListApi.data.data);
				setTotalRecords(memberListApi.data.total);
				setLimit(memberListApi.data.limit);
				setOffset(memberListApi.data.offset);
			} catch (error) {
				console.log("Something is Wrong -memberList");
			}
		}

		getMemberList(1);
	}, [id]);

	

	async function getPaginatedData(page){

		try {
			const memberListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/all_memebr_list?page=`+page)
			setMemberList(memberListApi.data.data);
			setTotalRecords(memberListApi.data.total);
			setLimit(memberListApi.data.limit);
		} catch (error) {
			console.log("Something is Wrong -memberList Pagination");
		}

	}

	async function handleBlock(e, itemId){

		axios.get(`https://task.mycrmdesk.com/backend/api/admin/memebr_block/${itemId}`)
		.then((res) => {
			getPaginatedData(1);
		  	document.getElementById("succ_message").style.display = "block";
		  	document.getElementById("alert_message").innerHTML = res.data;
		  	window.scrollTo({ top: 0, behavior: 'smooth' });
		})

	}

	async function handleActive(e, itemId){

		axios.get(`https://task.mycrmdesk.com/backend/api/admin/memebr_active/${itemId}`)
		.then((res) => {
			getPaginatedData(1);
		  	document.getElementById("succ_message").style.display = "block";
		  	document.getElementById("alert_message").innerHTML = res.data;
		  	window.scrollTo({ top: 0, behavior: 'smooth' });
		})

	}

	async function handleLogin(e, itemId){
		alert("Do it Later - "+itemId);
	}
	

	return (
		<PageWrapper title={dashboardMenu.masters.subMenu.Projects.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/superadmin/dashboard.html' },
							{
								title: 'Manage Members',
								to: '/superadmin/members.html',
							}
						]}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					
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
								<h4>All Members List</h4>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
									<tr>
										<th width="1">SNo </th>
										<th>Name</th>
										<th>User Id</th>
										<th>Email</th>
										<th>Phone</th>
										<th width="1">Type</th>
										<th width="140"></th>
										<th width="120"></th>
									</tr>
									</thead>
									<tbody>
									{
										memberList && memberList.length > 0 ?
										memberList.map((item,index)=>(
											<tr key={index+1}>
												<td scope="col">{index+ 1 + offset}</td>
												<td scope="col">{item.name}</td>
												<td scope="col">{item.userid}</td>
												<td scope="col">{item.email}</td>
												<td scope="col">{item.phone}</td>
												<td scope="col">{item.user_type}</td>
												<td scope="col">
													{
													item.status == '1' ?
														<Button
															color='primary'
															isLight
															icon='Send'
															onClick={e => handleBlock(e, item.id)}
														>
															Active
														</Button>
													:
														<Button
															color='danger'
															isLight
															icon='Send'
															onClick={e => handleActive(e, item.id)}
														>
															Blocked
														</Button>
													}
													
												</td>
												<td>
													<Button
														color='warning'
														isLight
														icon='Send'
														onClick={e => handleLogin(e, item.id)}
													>
														Login
													</Button>
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

export default Members;








