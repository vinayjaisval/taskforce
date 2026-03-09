import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BASE_URL from "../../../config/api";

const Status2 = (props) => {
	const userIds = localStorage.getItem('sess_id');
	const id = props.id;
	const [taskHistory, setTaskHistory] = useState([]);

	useEffect(() => {
		async function getTaskHistory() {
			try {
				const taskHistoryApi = await axios.get(
					`${BASE_URL}/admin/task_dashboard_history/${id}/status2`,
				);
				setTaskHistory(taskHistoryApi.data.data);
				console.log(taskHistoryApi.data.data);
			} catch (error) {
				console.log('Something is Wrong -taskHistory');
			}
		}

		getTaskHistory();
	}, [id]);

	return (
		<div className='text-danger'>
			{taskHistory && taskHistory.length > 0
				? taskHistory.map((item, index) => (
						<div key={index + 1} className='text-primary'>
							<Link to={'/agent/task-log/' + item.lead_id}>
								<b>{item.name}</b>
							</Link>{' '}
							<br />
							WT:- {item.total_working_time} <br />
							AT:- {item.total_time_assign}
						</div>
				  ))
				: 'No Task!!'}
		</div>
	);
};

export default Status2;
