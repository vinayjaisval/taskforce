import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import PaginationComponent from '../PaginationComponent';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';
import { Link, useParams } from 'react-router-dom';

import Assignee from '../user_status/Assignee';
import BASE_URL from "../../../config/api";

const UserTask = () => {

    useMinimizeAside();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [astroList, setAstroList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [limit, setLimit] = useState(12);

    const [search, setSearch] = useState({
        keywords: '',
    });

    const debounceRef = useRef(null);

    const getAstroList = async (page = 1, keyword = '') => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${BASE_URL}/admin/leads_users_list/${id}?page=${page}&keywords=${keyword}`
            );

            setAstroList(res.data.data || []);
            setTotalRecords(res.data.total_projects || 0);
            setLimit(res.data.per_page || 12);

        } catch (error) {
            console.log('API Error', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAstroList(1);
    }, [id]);

    const getPaginatedData = (page) => {
        getAstroList(page, search.keywords);
    };

    const onTextFieldChange = (e) => {
        const value = e.target.value;

        setSearch((prev) => ({
            ...prev,
            [e.target.name]: value,
        }));

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            getAstroList(1, value);
        }, 500);
    };

    return (
        <PageWrapper title={dashboardMenu.manageAstrologer.subMenu.ManageAstro.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <Breadcrumb
                        list={[
                            { title: 'Home', to: '/superadmin/dashboard.html' },
                            { title: 'Manage User Task', to: '/superadmin/task.html' },
                        ]}
                    />
                </SubHeaderLeft>
            </SubHeader>

            <Page>
                <div className='row h-100'>

                    <div id='succ_message' style={{ display: 'none' }}>
                        <Alert icon='Verified' isLight color='primary'>
                            <AlertHeading tag='h2'>Alert! 🎉</AlertHeading>
                            <span id='alert_message'></span>
                        </Alert>
                    </div>

                    <div className='col-12'>
                        <Card stretch>

                            <CardHeader>
                                <h4>Manage User Task</h4>

                                <div className='d-flex'>
                                    <input
                                        type='search'
                                        className='form-control'
                                        placeholder='Search...'
                                        value={search.keywords}
                                        name='keywords'
                                        onChange={onTextFieldChange}
                                    />
                                </div>
                            </CardHeader>

                            <CardBody isScrollable className='table-responsive'>
                                <table className='table table-modern table-hover'>
                                    <thead>
                                        <tr>
                                            <th>TaskID</th>
                                            <th>Project</th>
                                            <th>Team Leader</th>
                                            <th>Total Task</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan={4} className='text-center'>
                                                    Loading...
                                                </td>
                                            </tr>
                                        ) : astroList.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className='text-center'>
                                                    NOT FOUND
                                                </td>
                                            </tr>
                                        ) : (
                                            astroList.map((item, index) => (
                                                <tr key={index}>
                                                    <td>#{index + 1}</td>

                                                    <td>
                                                        <Link to={`/superadmin/project/${item.project}/${id}`}>
                                                            <Assignee id={item.project} />
                                                        </Link>
                                                    </td>

                                                    <td>{item.team_lead || 'N/A'}</td>
                                                    <td>{item.total_tasks || 0}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>

                            <CardFooter>
                                {totalRecords > limit && (
                                    <PaginationComponent
                                        getAllData={getPaginatedData}
                                        totalRecords={totalRecords}
                                        itemsCountPerPage={limit}
                                    />
                                )}
                            </CardFooter>

                        </Card>
                    </div>
                </div>
            </Page>
        </PageWrapper>
    );
};

export default UserTask;