import React, { FC, useCallback, useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import logos from '../../../assets/logo.png';
import logins from '../../../assets/login.png';
import axios from 'axios';
import BASE_URL from "../../../config/api";

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = () => {
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const [user, setUser] = useState({
		userid: '',
		user_pass: '',
	});

	async function onTextFieldChange(e: any) {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	}

	async function onFormSubmit(e: any) {
		e.preventDefault();
		try {
			axios.post(`${BASE_URL}/login`, user).then((res) => {
				const LoginData = res.data;
				if (LoginData == 'Invalid') {
					alert('Invalid Login Details !!!');
					window.scrollTo({ top: 0, behavior: 'smooth' });
				} else {
					localStorage.setItem('sess_id', LoginData.id);
					localStorage.setItem('sess_name', LoginData.name);
					localStorage.setItem('sess_email', LoginData.email);
					localStorage.setItem('sess_phone', LoginData.phone);
					localStorage.setItem('sess_api_key', LoginData.api_key);
					localStorage.setItem('sess_userid', LoginData.userid);
					localStorage.setItem('sess_userimg', LoginData.userimg);
					localStorage.setItem('sess_user_type', LoginData.user_type);
					window.location.assign(LoginData.user_type + '/dashboard.html');
				}
			});
		} catch (error) {
			alert('Something is Wrong');
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);

	return (
		<PageWrapper isProtected={false} title='Login' className=''>
			<Page className='p-0'>
				<div className='row'>
					<div className='col-md-6 col-xs-12 text-center'>
						<div className='loginLeft'>
							<h5>
								Fast. Reliable. Responsive <br />
								All-In-One AI-Driven Task Engine for
							</h5>
							<h4>Enterprises | Marketers | Developers</h4>
							<img src={logins} />
							<h6>Task Force Application</h6>
							<p>Seamless integration and easy to access. Built for Developers.</p>
						</div>
					</div>
					<div className='col-md-6 col-xs-12 '>
						<div className='loginRight '>
							<img src={logos} />
						</div>
						<form className='row g-4 loginFormss'>
							<h4>User Sign In</h4>
							<div className='col-12'>
								<FormGroup id='signup-userid' isFloating label='Your User Id'>
									<Input
										type='text'
										autoComplete='userid'
										name='userid'
										id='userid'
										value={user.userid}
										onChange={(e) => onTextFieldChange(e)}
									/>
								</FormGroup>
							</div>
							<div className='col-12'>
								<FormGroup id='signup-password' isFloating label='Password'>
									<Input
										type='password'
										autoComplete='password'
										name='user_pass'
										id='user_pass'
										value={user.user_pass}
										onChange={(e) => onTextFieldChange(e)}
									/>
								</FormGroup>
							</div>
							<div className='col-12'>
								<Button
									color='info'
									className=' py-6'
									onClick={(e) => onFormSubmit(e)}>
									Log In
								</Button>
							</div>
						</form>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Login;
