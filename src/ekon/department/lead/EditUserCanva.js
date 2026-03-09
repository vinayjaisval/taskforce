import React, { useState } from 'react';

import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import axios from 'axios';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';

import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';

import BASE_URL from "../../../config/api";

const EditUserCanva = (props) => {
	const userId = props.id;

	const [offcanvasStatus, setOffcanvasStatus] = useState(false);
	const [backdropStatus, setBackdropStatus] = useState(true);
	const [bodyScrollStatus, setBodyScrollStatus] = useState(false);
	const [placement, setPlacement] = useState('end');
	const [headerClose, setHeaderClose] = useState(true);
	const initialStatus = () => {
		setBackdropStatus(true);
		setBodyScrollStatus(false);
		setPlacement('end');
		setHeaderClose(true);
		getLead();
		getCountryList();
		getStateList();
		getCityList();
		getSourceList();
	};

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
		intrest: '',
	});
	const [cityList, setCityList] = useState([]);
	const [stateList, setStateList] = useState([]);
	const [countryList, setCountryList] = useState([]);
	const [sourceList, setSourceList] = useState([]);

	async function getLead() {
		try {
			const leadApi = await axios.get(`${BASE_URL}/admin/edit-lead/${userId}`);
			setLead(leadApi.data);
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

	async function getStateList() {
		try {
			const stateListApi = await axios.get(
				`${BASE_URL}/admin/all-state-list?country=${lead.country}`,
			);
			setStateList(stateListApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	async function getCityList() {
		try {
			const cityListApi = await axios.get(
				`${BASE_URL}/admin/all-city-list?state=${lead.state}`,
			);
			setCityList(cityListApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	async function getSourceList() {
		try {
			const sourceListApi = await axios.get(`${BASE_URL}/admin/all-source-list`);
			setSourceList(sourceListApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	async function onTextFieldChange(e) {
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
		try {
			axios.put(`${BASE_URL}/admin/update-lead/${userId}`, lead).then((res) => {
				document.getElementById('succ_message1').style.display = 'block';
				document.getElementById('alert_message1').innerHTML = res.data;
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});
			//history.push("/")
		} catch (error) {
			//console.log("Something is Wrong");
			document.getElementById('succ_message1').style.display = 'block';
			document.getElementById('alert_message1').innerHTML = error;
			//document.getElementById("succ_message").style.display = "block";
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	return (
		<>
			<Button
				color='primary'
				isLight
				icon='Send'
				onClick={() => {
					initialStatus();
					setOffcanvasStatus(true);
				}}
				aria-controls='exampleOffcanvas'>
				Edit
			</Button>

			<OffCanvas
				id='exampleOffcanvas'
				titleId='offcanvasExampleLabel'
				isOpen={offcanvasStatus}
				setOpen={setOffcanvasStatus}
				isBackdrop={backdropStatus}
				isBodyScroll={bodyScrollStatus}
				placement={placement}>
				<OffCanvasHeader setOpen={headerClose ? setOffcanvasStatus : undefined}>
					<OffCanvasTitle id='offcanvasExampleLabel'>Update Lead</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div id='succ_message1'>
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
							<span id='alert_message1'></span>
						</Alert>
					</div>

					<form className='row g-4' id='leadForm'>
						<input type='hidden' name='id' value={userId} />
						<div className='col-12'>
							<FormGroup id='signup-source' isFloating label='Source'>
								<select
									name='source'
									id='source'
									className='form-control select2'
									onChange={(e) => onTextFieldChange(e)}>
									<option value={lead.source}>Select</option>
									{sourceList && sourceList.length > 0 ? (
										sourceList.map((item, index) =>
											lead.source == item.id ? (
												<option selected key={index + 1} value={item.id}>
													{item.name}
												</option>
											) : (
												<option key={index + 1} value={item.id}>
													{item.name}
												</option>
											),
										)
									) : (
										<option value=''>Not Available</option>
									)}
								</select>
							</FormGroup>
						</div>
						<div className='col-12'>
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

						<div className='col-12'>
							<FormGroup id='signup-contact' isFloating label='Contact No'>
								<Input
									type='number'
									autoComplete='contact'
									name='phone'
									id='phone'
									value={lead.phone}
									onChange={(e) => onTextFieldChange(e)}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
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

						<div className='col-12'>
							<FormGroup id='signup-father_name' isFloating label='Father Name'>
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

						<div className='col-12'>
							<FormGroup id='signup-category_name' isFloating label='Category'>
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

						<div className='col-12'>
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

						<div className='col-12'>
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

						<div className='col-12'>
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

						<div className='col-12'>
							<FormGroup id='signup-country' isFloating label='Country'>
								<select
									className='form-control'
									name='country'
									id='country'
									onChange={(e) => onTextFieldChange(e)}>
									<option value={lead.country}>Select</option>
									{countryList && countryList.length > 0 ? (
										countryList.map((item, index) =>
											lead.country == item.id ? (
												<option key={index + 1} selected value={item.id}>
													{item.name}
												</option>
											) : (
												<option key={index + 1} value={item.id}>
													{item.name}
												</option>
											),
										)
									) : (
										<option value=''>Select</option>
									)}
								</select>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='signup-state' isFloating label='State'>
								<select
									name='state'
									id='state'
									className='form-control select2'
									onChange={(e) => onTextFieldChange(e)}>
									<option value={lead.state}>Select</option>
									{stateList && stateList.length > 0 ? (
										stateList.map((item, index) =>
											lead.state == item.id ? (
												<option selected key={index + 1} value={item.id}>
													{item.name}
												</option>
											) : (
												<option key={index + 1} value={item.id}>
													{item.name}
												</option>
											),
										)
									) : (
										<option value=''>Not Available</option>
									)}
								</select>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='signup-city' isFloating label='City'>
								<select
									name='city'
									id='city'
									className='form-control select2'
									onChange={(e) => onTextFieldChange(e)}>
									<option value={lead.city}>Select</option>
									{cityList && cityList.length > 0 ? (
										cityList.map((item, index) =>
											lead.city == item.id ? (
												<option selected key={index + 1} value={item.id}>
													{item.name}
												</option>
											) : (
												<option key={index + 1} value={item.id}>
													{item.name}
												</option>
											),
										)
									) : (
										<option value=''>Not Available</option>
									)}
								</select>
							</FormGroup>
						</div>

						<div className='col-12'>
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

						<div className='col-md-12 col-xs-12'>
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

						<div className='col-12'>
							<Button
								color='info'
								className='btn-sm py-6'
								onClick={(e) => onFormSubmit(e)}>
								Update
							</Button>
						</div>
					</form>
				</OffCanvasBody>
			</OffCanvas>
		</>
	);
};

export default EditUserCanva;
