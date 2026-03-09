import React, { useState, useEffect } from 'react';
import axios from 'axios';	

	
	const Status7 = (props) => {

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
				const taskHistoryApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/get_user_tot_delay_task/${id}`)
				setTaskHistory(taskHistoryApi.data);
			} catch (error) {
				console.log("Something is Wrong -taskHistory");
			}
		}

		
		return (

			<div className='text-primary'>
			{
				
				taskHistory && taskHistory.length > 0 ?
				taskHistory.map((item,index)=>(
					<div key={index+1} className='text-danger'>
						{item.countID}
					</div>
				)) :
				'No Delay Task!!'
			}
			</div>
		);
 	}

  	export default Status7;