import React, { useState, useEffect } from 'react';
import axios from 'axios';	
	
	const Skills = (props) => {

		const id = props.id;
		const [taskHistory, setTaskHistory] = useState([]);

		useEffect(() => {

			async function getTaskHistory() {
				
				try {
					const taskHistoryApi = await axios.get(`https://task.mycrmdesk.com/backend/api/admin/skills_details/${id}`)
					setTaskHistory(taskHistoryApi.data);
				} catch (error) {
					console.log("Something is Wrong -taskHistory");
				}
			}
	
			getTaskHistory();
		}, [id]);
		
		return (

			<div>
			{
				
				taskHistory && taskHistory.length > 0 ?
				taskHistory.map((item,index)=>(
					<div key={index+1}>
						{item.name}
						<hr style={{padding: 0, margin:0, width: '20px' }} />
					</div>
				)) :
				'No Skills!!'
			}
			</div>
		);
 	}

  	export default Skills;