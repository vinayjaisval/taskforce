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
import EditSLeadCanva from './EditSLeadCanva';
import FollowCanva from './FollowCanva';
import BASE_URL from "../../../config/api";

const SchoolLead = () => {
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
				const astroListApi = await axios.get(
					`${BASE_URL}/department/leads_school/${id}?type=1&page=` + page,
				);
				setAstroList(astroListApi.data.data);
				setTotalRecords(astroListApi.data.total);
				setLimit(astroListApi.data.limit);
				setOffset(astroListApi.data.offset);
			} catch (error) {
				console.log('Something is Wrong ');
			}
		}

		getAstroList(1);
	}, [id]);

	async function getPaginatedData(page) {
		const keywordVal = document.getElementById('searchInput1').value;

		try {
			const astroListApi = await axios.get(
				`${BASE_URL}/department/leads_school/${id}?type=1&page=` +
					page +
					`&keywords=` +
					keywordVal,
			);
			setAstroList(astroListApi.data.data);
			setTotalRecords(astroListApi.data.total);
			setLimit(astroListApi.data.limit);
			setOffset(astroListApi.data.offset);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	const [search, setSearch] = useState({
		keywords: '',
	});

	async function onTextFieldChange(e) {
		setSearch({
			...search,
			[e.target.name]: e.target.value,
		});
		try {
			const astroListApi = await axios.get(
				`${BASE_URL}/department/leads_school/${id}?type=1&page=1&keywords=` +
					e.target.value,
			);
			setAstroList(astroListApi.data.data);
			setTotalRecords(astroListApi.data.total);
			setLimit(astroListApi.data.limit);
			setOffset(astroListApi.data.offset);
		} catch (error) {
			console.log('Something is Wrong -allLeads');
		}
	}

	return (
		<PageWrapper title={dashboardMenu.manageAstrologer.subMenu.SchoolLead.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/department/dashboard.html' },
							{
								title: 'Manage Leads',
								to: '/department/leads.html',
							},
							{
								title: 'Add Lead',
								to: '/department/add-lead.html',
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
									<NavLink to='/department/leads.html'>
										<Icon icon='LayoutTopPanel5' />
										Manage Lead
									</NavLink>
								</DropdownItem>
								<DropdownItem>
									<NavLink to='/department/add-lead.html'>
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
					<div className='col-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Manage School Lead</h4>
								<div className='d-flex' data-tour='search'>
									<label
										className='border-0 bg-transparent cursor-pointer mar-t-5'
										htmlFor='searchInput1'>
										<Icon
											icon='Search'
											className='Search'
											color='primary'
											size='2x'
											forceFamily={null}
										/>
									</label>
									<input
										id='searchInput1'
										type='search'
										className='form-control border-0 shadow-none bg-transparent'
										placeholder='Search...'
										autoComplete='off'
										value={search.keywords}
										name='keywords'
										onChange={(e) => onTextFieldChange(e)}
									/>
								</div>
							</CardHeader>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th width='1'>SNo </th>
											<th>Category</th>
											<th>Source</th>
											<th>Name</th>
											<th>Email</th>
											<th>Phone</th>
											<th>FatherName</th>
											<th>Category</th>
											<th>Subject</th>
											<th>Stream</th>
											<th>Pincode</th>
											<th width='120'></th>
											<th width='120'></th>
										</tr>
									</thead>
									<tbody>
										{astroList && astroList.length > 0 ? (
											astroList.map((item, index) => (
												<tr key={index + 1}>
													<td scope='col'>{index + 1 + offset}</td>
													<td scope='col'>{item.category_id_name}</td>
													<td scope='col'>{item.source_name}</td>
													<td scope='col'>{item.name}</td>
													<td scope='col'>{item.email}</td>
													<td scope='col'>{item.phone}</td>
													<td scope='col'>{item.father_name}</td>
													<td scope='col'>{item.category_name}</td>
													<td scope='col'>{item.subjects}</td>
													<td scope='col'>{item.stream}</td>
													<td scope='col'>{item.pincode}</td>
													<td>
														<FollowCanva id={item.id} />
													</td>
													<td>
														<EditSLeadCanva id={item.id} />
													</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan={13}>
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

export default SchoolLead;
