import React, { useState } from 'react';

import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import axios from 'axios';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';

import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import BASE_URL from "../../../config/api";

const FollowCanva = (props) => {
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
		getUsers();
		getCategory();
		getDepartment();
	};

	const [lead, setLead] = useState({
		name: '',
		email: '',
		phone: '',
		category: '',
		department: '',
		assign_to: '',
		remarks: '',
	});
	const [category, setCategory] = useState([]);
	const [users, setUsers] = useState([]);
	const [department, setDepartment] = useState([]);

	async function getLead() {
		try {
			const leadApi = await axios.get(`${BASE_URL}/admin/edit-lead/${userId}`);
			setLead(leadApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	async function getUsers() {
		try {
			const userApi = await axios.get(`${BASE_URL}/admin/all-agent-list`);
			setUsers(userApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	async function getCategory() {
		try {
			const categoryApi = await axios.get(`${BASE_URL}/admin/all-category-list`);
			setCategory(categoryApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	async function getDepartment() {
		try {
			const departmentApi = await axios.get(`${BASE_URL}/admin/all-department-list`);
			setDepartment(departmentApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	function onTextFieldChange(e) {
		setLead({
			...lead,
			[e.target.name]: e.target.value,
		});
	}

	async function onFormSubmit(e) {
		e.preventDefault();
		try {
			axios.put(`${BASE_URL}/admin/update-lead-followup/${userId}`, lead).then((res) => {
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
				icon='FollowTheSigns'
				onClick={() => {
					initialStatus();
					setOffcanvasStatus(true);
				}}
				aria-controls='exampleOffcanvas'>
				Follow
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
					<OffCanvasTitle id='offcanvasExampleLabel'>
						Followup <span className='text-primary'>{lead.name}</span>
					</OffCanvasTitle>
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
							<FormGroup id='lead-assign_to' isFloating label='Assigned To'>
								<select
									className='form-control'
									name='assign_to'
									onChange={(e) => onTextFieldChange(e)}>
									<option value={lead.assign_to}>--Select--</option>
									{users && users.length > 0
										? users.map((item, index) =>
												item.id == lead.assign_to ? (
													<option selected key={index} value={item.id}>
														{item.name}
													</option>
												) : (
													<option key={index} value={item.id}>
														{item.name}
													</option>
												),
										  )
										: ''}
								</select>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='lead-department' isFloating label='Department'>
								<select
									className='form-control'
									name='department'
									onChange={(e) => onTextFieldChange(e)}>
									<option value={lead.department}>--Select--</option>
									{department && department.length > 0
										? department.map((item, index) =>
												item.id == lead.department ? (
													<option selected key={index} value={item.id}>
														{item.name}
													</option>
												) : (
													<option key={index} value={item.id}>
														{item.name}
													</option>
												),
										  )
										: ''}
								</select>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='lead-category' isFloating label='Category'>
								<select
									className='form-control'
									name='category'
									onChange={(e) => onTextFieldChange(e)}>
									<option value={lead.category}>--Select--</option>
									{category && category.length > 0
										? category.map((item, index) =>
												item.id == lead.category ? (
													<option selected key={index} value={item.id}>
														{item.name}
													</option>
												) : (
													<option key={index} value={item.id}>
														{item.name}
													</option>
												),
										  )
										: ''}
								</select>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='signup-remarks' isFloating label='Remarks'>
								<Textarea
									type='text'
									autoComplete='remarks'
									name='remarks'
									rows={10}
									id='remarks'
									value={lead.remarks}
									onChange={(e) => onTextFieldChange(e)}
								/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<Button
								color='info'
								className='btn-sm py-3'
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

export default FollowCanva;
