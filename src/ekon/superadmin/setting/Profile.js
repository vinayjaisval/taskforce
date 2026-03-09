
import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Card, { CardBody, CardHeader } from '../../../components/bootstrap/Card';
import axios from 'axios';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';
import useMinimizeAside from '../../../hooks/useMinimizeAside';

const Profile = () => {

  useMinimizeAside();

  const [id, setId] = useState([]);
  const [enduser, setEndUser] = useState({
   name: "",
   email: "",
   phone: "",
   userid: "",
   password: ""
  });
  
  useEffect(() => {
    const idSess = JSON.parse(localStorage.getItem('sess_id'));
    if (idSess) {
      setId(idSess);
    }

   async function getEndUser() {
    try {
     const enduserApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/edit-enduser/${id}`)
     setEndUser(enduserApi.data);
    } catch (error) {
     console.log("Something is Wrong 1");
    }
   }
   getEndUser();
  }, [id]);
 
  function onTextFieldChange(e) {
   setEndUser({
    ...enduser,
    [e.target.name]: e.target.value
   })
  }
 
  
  async function onFormSubmit(e, idSess) {

   e.preventDefault()

   try {
     axios.put(`https://task.mycrmdesk.com/backend/api/admin/update-profile/`+idSess, enduser)
    .then((res) => {
      document.getElementById("succ_message").style.display = "block";
      document.getElementById("alert_message").innerHTML = res.data;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    //history.push("/")
    
   } catch (error) {
    //console.log("Something is Wrong");
    document.getElementById("succ_message").style.display = "block";
    document.getElementById("alert_message").innerHTML = error;
    //document.getElementById("succ_message").style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
   }
    
  }
  

  return (
   <>

<PageWrapper title='Edit Profile'>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Home', to: '/superadmin/dashboard.html' },
							{
								title: 'Settings',
								to: '#',
							},
							{
								title: 'Edit Profile',
								to: '#',
							},
						]}
					/>
				</SubHeaderLeft>
				
			</SubHeader>
			
			<Page>
				
				
						<Card stretch>
							<CardHeader className=''>
								<h4>Update Profile  </h4>
							</CardHeader>
							<CardBody className=''>

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

                <form className="row" >
                          <input type="hidden" name="id" value={id} />
                          <div className="row">
                            <div className="col-md-4">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" id="name" className="form-control form-control-sm" value={enduser.name} onChange={e => onTextFieldChange(e)} />
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label>User Id</label>
                                <input type="text" name="userid" id="userid" className="form-control form-control-sm" value={enduser.userid} onChange={e => onTextFieldChange(e)} />
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label>Contact No</label>
                                <input type="text" name="phone" id="phone" className="form-control form-control-sm" value={enduser.phone} onChange={e => onTextFieldChange(e)} />
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label>Email Id</label>
                                <input type="email" name="email" id="email" className="form-control form-control-sm" value={enduser.email} onChange={e => onTextFieldChange(e)} />
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" id="password" className="form-control form-control-sm" onChange={e => onTextFieldChange(e)} />
                            </div>
                            </div>
                            <div className="col-md-12">
                              <button type="submit" className="btn btn-primary btn-sm" onClick={e => onFormSubmit(e, id)}>Submit</button>
                            </div>
                          </div>
                          </form>
							</CardBody>
						</Card>
				
			</Page>
		</PageWrapper>


   </>
  )
 }
 
 export default Profile