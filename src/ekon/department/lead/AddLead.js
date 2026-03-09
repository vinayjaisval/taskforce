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
import BASE_URL from "../../../config/api";

const AddLead = () => {
	useMinimizeAside();

	const id = localStorage.getItem('sess_id');

	const [lead, setLead] = useState({
		source: '',
		name: '',
		phone: '',
		email: '',
		father_name: '',
		category_name: '',
		subjects: '',
		stream: '',
		country: '',
		state: '',
		city: '',
		pincode: '',
		school: '',
		type: '',
		contact_person: '',
		intrest: '',
		remarks: '',
		category: '',
	});
	const [cityList, setCityList] = useState([]);
	const [stateList, setStateList] = useState([]);
	const [countryList, setCountryList] = useState([]);
	const [sourceList, setSourceList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);

	async function onTextFieldChange(e) {
		if (e.target.name == 'type') {
			if (e.target.value == 'Student') {
				var myClasses = document.querySelectorAll('.for_student'),
					i = 0,
					l = myClasses.length;

				for (i; i < l; i++) {
					myClasses[i].style.display = 'block';
				}
				document.getElementById('for_school').style.display = 'none';
			} else {
				var myClasses2 = document.querySelectorAll('.for_student'),
					i2 = 0,
					l2 = myClasses2.length;

				for (i2; i2 < l2; i2++) {
					myClasses2[i2].style.display = 'none';
				}
				document.getElementById('for_school').style.display = 'block';
			}
		}

		if (e.target.name == 'country') {
			try {
				const stateListApi = await axios.get(
					`${BASE_URL}/admin/all-state-list?country=` + e.target.value,
				);
				setStateList(stateListApi.data);
			} catch (error) {
				console.log('Something is Wrong');
			}
		}

		if (e.target.name == 'state') {
			try {
				const cityListApi = await axios.get(
					`${BASE_URL}/admin/all-city-list?state=` + e.target.value,
				);
				setCityList(cityListApi.data);
			} catch (error) {
				console.log('Something is Wrong');
			}
		}

		setLead({
			...lead,
			[e.target.name]: e.target.value,
		});
	}

	async function onFormSubmit(e) {
		e.preventDefault();
		document.getElementById('signup-name').style.borderColor = '#f8f9fa';

		if (lead.name == '') {
			document.getElementById('signup-name').style.borderColor = 'red';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			try {
				axios.post(`${BASE_URL}/department/add-lead/${id}`, lead).then((res) => {
					document.getElementById('succ_message').style.display = 'block';
					document.getElementById('alert_message').innerHTML = res.data;
					window.scrollTo({ top: 0, behavior: 'smooth' });
					//document.getElementById("leadForm").reset();
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

		async function getCountryList() {
			try {
				const countryListApi = await axios.get(`${BASE_URL}/admin/all-country-list`);
				setCountryList(countryListApi.data);
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

		getCountryList();
		getSourceList();
		getCategoryList();
	}, [id]);

	return (
		<PageWrapper title={dashboardMenu.manageAstrologer.subMenu.AddAstro.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/department/dashboard.html' },
							{
								title: 'Manage Lead',
								to: '/department/leads.html',
							},
							{
								title: 'Add Lead',
								to: '/department/add-lead.html',
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
								<h4>Add New Lead</h4>
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
									<div className='col-md-4 col-xs-12'>
										<FormGroup id='signup-type' isFloating label='Type'>
											<select
												className='form-control'
												name='type'
												id='type'
												onChange={(e) => onTextFieldChange(e)}
												required>
												<option value={lead.type}>--Select--</option>
												<option value='Student'>Student</option>
												<option value='School'>School</option>
												<option value='Coaching Center'>
													Coaching Center
												</option>
											</select>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup id='signup-source' isFloating label='Source'>
											<select
												className='form-control'
												name='source'
												id='source'
												onChange={(e) => onTextFieldChange(e)}>
												<option value={lead.source}>Select</option>
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

									<div className='col-md-4 col-xs-12'>
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

									<div className='col-md-4 col-xs-12'>
										<FormGroup id='signup-name' isFloating label='Name'>
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

									<div className='col-md-4 col-xs-12'>
										<FormGroup id='signup-phone' isFloating label='Phone No'>
											<Input
												type='number'
												autoComplete='phone'
												name='phone'
												id='phone'
												value={lead.phone}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>
									<div className='col-md-4 col-xs-12'>
										<FormGroup id='signup-email' isFloating label='Email'>
											<Input
												type='email'
												autoComplete='email'
												name='email'
												id='email'
												value={lead.email}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12 for_school' id='for_school'>
										<FormGroup
											id='signup-contact_person'
											isFloating
											label='Contact Person Name'>
											<Input
												type='text'
												autoComplete='contact_person'
												name='contact_person'
												id='contact_person'
												value={lead.contact_person}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12 for_student'>
										<FormGroup
											id='signup-father_name'
											isFloating
											label='Father Name'>
											<Input
												type='text'
												autoComplete='father_name'
												name='father_name'
												id='father_name'
												value={lead.father_name}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12 for_student'>
										<FormGroup
											id='signup-category_name'
											isFloating
											label='Category'>
											<Input
												type='text'
												autoComplete='category_name'
												name='category_name'
												id='category_name'
												value={lead.category_name}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12 for_student'>
										<FormGroup id='signup-subjects' isFloating label='Subjects'>
											<Input
												type='text'
												autoComplete='subjects'
												name='subjects'
												id='subjects'
												value={lead.subjects}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12 for_student'>
										<FormGroup id='signup-stream' isFloating label='Stream'>
											<Input
												type='text'
												autoComplete='stream'
												name='stream'
												id='stream'
												value={lead.stream}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12 for_student'>
										<FormGroup id='signup-school' isFloating label='School'>
											<Input
												type='text'
												autoComplete='school'
												name='school'
												id='school'
												value={lead.school}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup id='signup-country' isFloating label='Country'>
											<select
												className='form-control'
												name='country'
												id='country'
												onChange={(e) => onTextFieldChange(e)}>
												<option value={lead.country}>Select</option>
												{countryList && countryList.length > 0 ? (
													countryList.map((item, index) => (
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

									<div className='col-md-4 col-xs-12'>
										<FormGroup id='signup-state' isFloating label='State'>
											<select
												name='state'
												id='state'
												className='form-control select2'
												onChange={(e) => onTextFieldChange(e)}>
												<option value={lead.state}>Select</option>
												{stateList && stateList.length > 0 ? (
													stateList.map((item, index) => (
														<option key={index + 1} value={item.id}>
															{item.name}
														</option>
													))
												) : (
													<option value=''>Not Available</option>
												)}
											</select>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup id='signup-city' isFloating label='City'>
											<select
												name='city'
												id='city'
												className='form-control select2'
												onChange={(e) => onTextFieldChange(e)}>
												<option value={lead.city}>Select</option>
												{cityList && cityList.length > 0 ? (
													cityList.map((item, index) => (
														<option key={index + 1} value={item.id}>
															{item.name}
														</option>
													))
												) : (
													<option value=''>Not Available</option>
												)}
											</select>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup id='signup-pincode' isFloating label='Pincode'>
											<Input
												type='text'
												autoComplete='pincode'
												name='pincode'
												id='pincode'
												value={lead.pincode}
												onChange={(e) => onTextFieldChange(e)}
											/>
										</FormGroup>
									</div>

									<div className='col-md-4 col-xs-12'>
										<FormGroup id='signup-intrest' isFloating label='Intrest'>
											<Input
												type='text'
												autoComplete='intrest'
												name='intrest'
												id='intrest'
												value={lead.intrest}
												onChange={(e) => onTextFieldChange(e)}
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

									<div className='col-12'>
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

export default AddLead;
