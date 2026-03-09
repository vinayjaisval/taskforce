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
import BASE_URL from "../../../config/api";

const BulkLead = () => {
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
				const astroListApi = await axios.get(`${BASE_URL}/admin/leads?page=` + page);
				setAstroList(astroListApi.data.data);
				setTotalRecords(astroListApi.data.total);
				setLimit(astroListApi.data.limit);
				setOffset(astroListApi.data.offset);
			} catch (error) {
				console.log('Something is Wrong -astroList');
			}
		}

		getAstroList(1);
	}, [id]);

	async function getPaginatedData(page) {
		const keywordVal = document.getElementById('searchInput1').value;

		try {
			const astroListApi = await axios.get(
				`${BASE_URL}/admin/leads?page=` + page + `&keywords=` + keywordVal,
			);
			setAstroList(astroListApi.data.data);
			setTotalRecords(astroListApi.data.total);
			setLimit(astroListApi.data.limit);
			setOffset(astroListApi.data.offset);
		} catch (error) {
			console.log('Something is Wrong -astroList Pagination');
		}
	}

	async function handleClick(e, delId) {
		axios.get(`${BASE_URL}/admin/lead_delete/${delId}`).then((res) => {
			getPaginatedData(1);
			document.getElementById('succ_message').style.display = 'block';
			document.getElementById('alert_message').innerHTML = res.data;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
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
				`${BASE_URL}/admin/leads?page=1&keywords=` + e.target.value,
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
				<div id='bootstrap' className='row scroll-margin'>
					<div className='col-md-12 col-xs-12'>
						<Card stretch>
							<CardHeader className=''>
								<h4>Bulk Upload</h4>
							</CardHeader>
							<CardBody className=''>
								<br />
								<div className='col-12'>
									<a href='https://www.overseaseducationlane.com/downloadExcel/xls'>
										<button className='btn btn-success'>
											Download Format Excel (.xls)
										</button>
									</a>
								</div>
								<br></br>
								<div className='col-6'>
									<form
										className='onSubmitdisableButton'
										encType='multipart/form-data'>
										<input
											type='hidden'
											name='_token'
											value='ovDhzn4zu64TbzrRQcdCWl55MDpiwWdOBjE7skgy'
										/>
										<div className='row'>
											<div className='col-md-12'>
												<label>
													{' '}
													&nbsp;&nbsp;Upload Excel File :{' '}
													<span className='text-danger'>*</span>
												</label>
												<span className='text-muted'>
													Format: .xls, .xslx
												</span>
												<input
													type='file'
													className='form-control'
													name='select_file'
													value=''
													placeholder='Enter Name'
												/>
												<span className='text-danger'></span>
											</div>

											<div className='col-md-12'>
												<br></br>
												<input
													type='submit'
													name='upload'
													className='btn btn-info'
													value='Upload'
												/>
											</div>
										</div>
									</form>
								</div>
								<div></div>
								<br />
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default BulkLead;
