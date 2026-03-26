import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import { dashboardMenu2 } from '../../../menu_agent';
import Card, { CardBody, CardHeader } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import axios from 'axios';
import Editor from './../Editor';
import { format } from 'date-fns';
import BASE_URL from "../../../config/api";

const Chat = () => {
	useMinimizeAside();
	const id = localStorage.getItem('sess_id');

	const [editorLoaded, setEditorLoaded] = useState(false);
	const [editorData, setEditorData] = useState('');
	useEffect(() => {
		setEditorLoaded(true);
	}, []);

	

	const [activeMember, setActiveMember] = useState([]);
	const [activeMemberGroup, setActiveMemberGroup] = useState(false);
	const [activeMemberId, setActiveMemberId] = useState([]);
	const [activeMemberName, setActiveMemberName] = useState([]);
	const [activeGroupChat, setActiveGroupChat] = useState([]);
	const [activeChatList, setActiveChatList] = useState([]);

	useEffect(() => {
		async function getActiveMemberList() {
			try {
				const activeMemApi = await axios.get(`${BASE_URL}/admin/all-agent-list-data`);
				setActiveMember(activeMemApi.data);
			} catch (error) {
				console.log('Something is Wrong -Assignee');
			}
		}

		async function getActiveGroupChatList() {
			try {
				const activeChatApi = await axios.get(
					`${BASE_URL}/admin/all-agent-chat-group/${id}`,
				);
				setActiveGroupChat(activeChatApi.data);
			} catch (error) {
				console.log('Something is Wrong -Assignee');
			}
		}

		getActiveMemberList();
		getActiveGroupChatList();
	}, [id]);

	useEffect(() => {
		bootomReload();
	}, []);

	function bootomReload() {
		const contentContainer = document.querySelector('.msger-chat');
		if (contentContainer) {
			contentContainer.scrollTop = contentContainer.scrollHeight;
		}
	}

	async function onMemeberChat(e, memId, memName) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setActiveMemberGroup(false);
		setActiveMemberId(memId);
		setActiveMemberName(memName);
		getActiveChatList(memId);
	}

	async function onMemeberChatGrp(e, memId, memName) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setActiveMemberGroup(true);
		setActiveMemberId(memId);
		setActiveMemberName(memName);
		getActiveChatListGrp(memId);
	}

	async function getActiveChatList(memId) {
		try {
			const activeChatListApi = await axios.get(
				`${BASE_URL}/admin/chat-list-history/${id}/${memId}`,
			);
			setActiveChatList(activeChatListApi.data.data);
		} catch (error) {
			console.log('Something is Wrong -chat List History');
		}
	}

	async function getActiveChatListGrp(memId) {
		try {
			const activeChatListApi = await axios.get(
				`${BASE_URL}/admin/chat-list-history-group/${id}/${memId}`,
			);
			setActiveChatList(activeChatListApi.data.data);
		} catch (error) {
			console.log('Something is Wrong -chat List History');
		}
	}

	async function onFormSubmit(e) {
		e.preventDefault();

		if (editorData === '' || editorData == null) {
			alert('Fill Message First !!!');
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else if (activeMemberId === '' || activeMemberId == null) {
			alert('Select Member First to Chat !!!');
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			let isGroup = activeMemberGroup ? 1 : 2;

			const formData = new FormData();
			formData.append('message', editorData);

			try {
				axios
					.post(
						`${BASE_URL}/agent/start-chat/${id}/${activeMemberId}?is_group=${isGroup}`,
						formData,
					)
					.then(() => {
						window.scrollTo({ top: 0, behavior: 'smooth' });
						bootomReload();

						if (activeMemberGroup) {
							getActiveChatListGrp(activeMemberId);
						} else {
							getActiveChatList(activeMemberId);
						}

						setEditorData('');
					});
			} catch (error) {
				alert('Something is Wrong');
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
	}

	useEffect(() => {
		const interval = setInterval(() => {
			if (activeMemberGroup) {
				getActiveChatListGrp(activeMemberId);
			} else if (activeMemberId) {
				getActiveChatList(activeMemberId);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [activeMemberId, activeMemberGroup]);

	return (
		<PageWrapper title={dashboardMenu2.chat.text}>
			<Page style={{ marginTop: 0, paddingTop: 0 }}>
				<div id='bootstrap' className='row scroll-margin h-100'>
					
					<div className='col-md-3 col-xs-12'>
						<Card stretch>
							<CardHeader>
								<h4>Chat Group</h4>
							</CardHeader>
							<CardBody>
								{activeGroupChat?.length > 0 ? (
									activeGroupChat.map((item, index) => (
										<span
											key={index}
											onClick={(e) => onMemeberChatGrp(e, item.id, item.name)}
											className='mem_group'>
											{item.name}
										</span>
									))
								) : (
									<h4>No Group Found !!</h4>
								)}
							</CardBody>
						</Card>

						<Card stretch>
							<CardHeader>
								<h4>Members</h4>
							</CardHeader>
							<CardBody>
								{activeMember?.length > 0 ? (
									activeMember.map((item, index) => (
										<span
											key={index}
											onClick={(e) => onMemeberChat(e, item.id, item.name)}
											className='mem_group'>
											{item.name}
										</span>
									))
								) : (
									<h4>No Member Found !!</h4>
								)}
							</CardBody>
						</Card>
					</div>

					<div className='col-md-9 col-xs-12'>
						<Card stretch>
							<CardHeader>
								<h4>Chat with {activeMemberName}</h4>
							</CardHeader>
							<CardBody>
								<section className='msger'>
									<main className='msger-chat' style={{ maxHeight: '300px' }}>
										{activeChatList?.length > 0 ? (
											activeChatList.map((item, index) => (
												<div className='msg left-msg' key={index}>
													<div className='msg-bubble'>
														<div className='msg-info'>
															<div className='msg-info-name'>
																{item.mem_name}
															</div>
															<div className='msg-info-time'>
																{format(new Date(item.created_at), 'yyyy-MM-dd HH:mm:ss')}
															</div>
														</div>
														<div
															className='msg-text'
															dangerouslySetInnerHTML={{ __html: item.message }}
														/>
													</div>
												</div>
											))
										) : (
											<h4>No Chat Found !!</h4>
										)}
									</main>
								</section>
							</CardBody>
						</Card>

						<Card stretch>
							<CardBody>
								<form className='row g-4'>
									<div className='col-12'>
										<Editor
											name='description'
											onChange={(data) => setEditorData(data)}
											editorLoaded={editorLoaded}
											value={editorData}
										/>
									</div>

									<div className='col-12'>
										<Button color='info' onClick={onFormSubmit}>
											Send
										</Button>
									</div>
								</form>
							</CardBody>
						</Card>
					</div>

				</div>
			</Page>
		</PageWrapper>
	);
};

export default Chat;