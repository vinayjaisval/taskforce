import React, { useState, useEffect } from 'react';
import axios from 'axios';	
import { Link } from 'react-router-dom';
	
	const Status5 = (props) => {

		const id = props.id;
		const [counter, setCounter] = useState(0);
		const [taskHistory, setTaskHistory] = useState([]);

		useEffect(() => {

			setCounter(counter+1);
			if(counter == 0){
				getTaskHistory();
			}
		}, [id]);

		async function getTaskHistory() {
				
			try {
				const taskHistoryApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/task_dashboard_history/${id}/status5`)
				setTaskHistory(taskHistoryApi.data.data);
			} catch (error) {
				console.log("Something is Wrong -taskHistory");
			}
		}
		
		return (

			<div className='text-danger'>
			{
				
				taskHistory && taskHistory.length > 0 ?
				taskHistory.map((item,index)=>(
					<div key={index+1} className='text-primary'>
						<Link to={'/superadmin/task-log/'+item.lead_id}><b>{item.name}</b></Link> <br />
						WT:- {item.total_working_time} <br />
						AT:- {item.total_time_assign}
					</div>
				)) :
				'No Task!!'
			}
			</div>
		);
 	}

  	export default Status5;