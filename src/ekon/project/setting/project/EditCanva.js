import React, { useState } from 'react';

import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import axios from 'axios';
import Alert, { AlertHeading } from '../../../../components/bootstrap/Alert';

import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../../components/bootstrap/OffCanvas';

import BASE_URL from "../../../../config/api";

const EditCanva = (props) => {
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
		getDepartments();
	};

	const [departments, setDepartments] = useState({
		name: '',
		userid: '',
		email: '',
		phone: '',
		user_pass: '',
		total_task: '',
	});

	async function getDepartments() {
		try {
			const departmentApi = await axios.get(`${BASE_URL}/admin/edit-project/${userId}`);
			setDepartments(departmentApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	function onTextFieldChange(e) {
		setDepartments({
			...departments,
			[e.target.name]: e.target.value,
		});
	}

	async function onFormSubmit(e) {
		e.preventDefault();
		try {
			axios.put(`${BASE_URL}/admin/update-project/${userId}`, departments).then((res) => {
				document.getElementById('succ_message2').style.display = 'block';
				document.getElementById('alert_message2').innerHTML = res.data;
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});
			//history.push("/")
		} catch (error) {
			//console.log("Something is Wrong");
			document.getElementById('succ_message2').style.display = 'block';
			document.getElementById('alert_message2').innerHTML = error;
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
					<OffCanvasTitle id='offcanvasExampleLabel'>Update Projects</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div id='succ_message2'>
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
							<span id='alert_message2'></span>
						</Alert>
					</div>

					<form className='row g-4'>
						<input type='hidden' name='id' value={userId} />
						<div className='col-12'>
							<FormGroup id='signup-name' isFloating label='Name'>
								<Input
									type='text'
									autoComplete='name'
									name='name'
									id='name'
									value={departments.name}
									onChange={(e) => onTextFieldChange(e)}
								/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='signup-userid' isFloating label='User Id'>
								<Input
									type='text'
									autoComplete='userid'
									name='userid'
									id='userid'
									value={departments.userid}
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
									value={departments.email}
									onChange={(e) => onTextFieldChange(e)}
								/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='signup-phone' isFloating label='Phone Number'>
								<Input
									type='number'
									autoComplete='phone'
									name='phone'
									id='phone'
									value={departments.phone}
									onChange={(e) => onTextFieldChange(e)}
								/>
							</FormGroup>
						</div>

						<div className='col-12'>
							<FormGroup id='signup-user_pass' isFloating label='Password'>
								<Input
									type='password'
									autoComplete='user_pass'
									name='user_pass'
									id='user_pass'
									value={departments.user_pass}
									onChange={(e) => onTextFieldChange(e)}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='signup-total_task' isFloating label='Total Task'>
								<Input
									type='text'
									autoComplete='total_task'
									name='total_task'
									id='total_task'
									value={departments.total_task}
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

export default EditCanva;
