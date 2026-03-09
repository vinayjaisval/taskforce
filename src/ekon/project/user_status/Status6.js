import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from "../../../config/api";

const Status6 = (props) => {
	const id = props.id;
	const [taskHistory, setTaskHistory] = useState([]);

	useEffect(() => {
		async function getTaskHistory() {
			try {
				const taskHistoryApi = await axios.get(`${BASE_URL}/admin/get_user_tot_task/${id}`);
				setTaskHistory(taskHistoryApi.data);
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
							{item.countID}
						</div>
				  ))
				: 'No Task!!'}
		</div>
	);
};

export default Status6;
