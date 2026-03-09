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
		getCategorys();
	};

	const [categorys, setCategorys] = useState({
		name: '',
		status: '',
	});

	async function getCategorys() {
		try {
			const categorysApi = await axios.get(`${BASE_URL}/admin/edit-category/${userId}`);
			setCategorys(categorysApi.data);
		} catch (error) {
			console.log('Something is Wrong');
		}
	}

	function onTextFieldChange(e) {
		setCategorys({
			...categorys,
			[e.target.name]: e.target.value,
		});
	}

	async function onFormSubmit(e) {
		e.preventDefault();
		try {
			axios.put(`${BASE_URL}/admin/update-category/${userId}`, categorys).then((res) => {
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
					<OffCanvasTitle id='offcanvasExampleLabel'>Update Category</OffCanvasTitle>
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
									value={categorys.name}
									onChange={(e) => onTextFieldChange(e)}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='signup-status' isFloating label='Status'>
								<select
									name='status'
									id='status'
									className='form-control select2'
									onChange={(e) => onTextFieldChange(e)}>
									<option value={categorys.status}>Select</option>
									{categorys.status == 'Active' ? (
										<option selected value='Active'>
											Active
										</option>
									) : (
										<option value='Active'>Active</option>
									)}
									{categorys.status == 'InActive' ? (
										<option selected value='InActive'>
											InActive
										</option>
									) : (
										<option value='InActive'>InActive</option>
									)}
								</select>
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
