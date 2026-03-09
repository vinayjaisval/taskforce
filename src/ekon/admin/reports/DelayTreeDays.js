


import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import PaginationComponent from '../PaginationComponent';
import useMinimizeAside from '../../../hooks/useMinimizeAside';



const DelayThreeDay = () => {
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
				const astroListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/leads_rep_del_three_day/${id}?page=`+page)
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
			const astroListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/leads_rep_del_three_day/${id}?page=`+page+`&keywords=`+keywordVal)
			setAstroList(astroListApi.data.data);
			setTotalRecords(astroListApi.data.total);
			setLimit(astroListApi.data.limit);
			setOffset(astroListApi.data.offset);
		} catch (error) {
			console.log("Something is Wrong -astroList Pagination");
		}

	}

	

	const [search, setSearch] = useState({ keywords: "" });

	async function onTextFieldChange(e) {

		setSearch({
			...search,
			[e.target.name]: e.target.value
		})
		
		try {
			const astroListApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/leads_rep_del_three_day/${id}?page=1&keywords=`+e.target.value)
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
								title: 'Task Delay Three Day',
								to: '/superadmin/task.html',
							}
						]}
					/>
				</SubHeaderLeft>
				
			</SubHeader>
			
			<Page>
				
				<div id='bootstrap' className='row scroll-margin h-100'>
					
					<div className='col-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Task Delay Three Day</h4>
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
										<th>Heading</th>
										<th>Status</th>
										<th>Category</th>
										<th>Deadline</th>
										<th>Assignee</th>
										<th>Remarks</th>
									</tr>
									</thead>
									<tbody>
									{
										astroList && astroList.length > 0 ?
										astroList.map((item,index)=>(
											<tr key={index+1}>
												<td scope="col">{index+ 1 + offset}</td>
												<td scope="col">{item.name}</td>
												<td scope="col">{item.source_name}</td>
												<td scope="col">{item.category_id_name}</td>
												<td scope="col">{item.dedline}</td>
												<td scope="col">{item.assignee}</td>
												<td scope="col">{item.remarks}</td>
												
											</tr>
										)) :
										<tr>
											<td colSpan={7}>
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

export default DelayThreeDay;
















