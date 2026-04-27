import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import PaginationComponent from '../PaginationComponent';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import { Link, useParams } from 'react-router-dom';

import BASE_URL from "../../../config/api";

const ProjectDetails = () => {

    useMinimizeAside();
    const { pId, id } = useParams();

    const [loading, setLoading] = useState(true);
    const [astroList, setAstroList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [limit, setLimit] = useState(12);

    const [assigneeMap, setAssigneeMap] = useState({});
    const [search, setSearch] = useState({ keywords: '' });

    const debounceRef = useRef(null);

    // ✅ BULK ASSIGNEE API (NO 429)
    const fetchAssignees = async (projectIds) => {
        try {
            const uniqueIds = [...new Set(projectIds)].filter(Boolean);

            if (uniqueIds.length === 0) return;

            const res = await axios.get(
                `${BASE_URL}/admin/assignee_bulk?ids=${uniqueIds.join(',')}`
            );

            setAssigneeMap(res.data || {});
        } catch (error) {
            console.log('Assignee bulk error');
        }
    };

    // ✅ MAIN API
    const fetchData = async (page = 1, keyword = '') => {
        setLoading(true);

        try {
            const res = await axios.get(
                `${BASE_URL}/admin/project_tasks/${pId}/${id}?page=${page}&keywords=${keyword}`
            );

            const data = res.data.data || [];

            setAstroList(data);
            setTotalRecords(res.data.total || 0);
            setLimit(res.data.limit || 12);

            // ✅ only ONE API call
            const projectIds = data.map(item => item.project);
            fetchAssignees(projectIds);

        } catch (error) {
            console.log('API Error', error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ FIRST LOAD
    useEffect(() => {
        fetchData(1);
    }, [pId, id]);

    // ✅ PAGINATION
    const getPaginatedData = (page) => {
        fetchData(page, search.keywords);
    };

    // ✅ DELETE
    const handleClick = async (delId) => {
        try {
            await axios.get(`${BASE_URL}/admin/lead_delete/${delId}`);
            fetchData(1);
        } catch (error) {
            console.log('Delete Error');
        }
    };

    // ✅ DEBOUNCE SEARCH
    const onTextFieldChange = (e) => {
        const value = e.target.value;

        setSearch({ keywords: value });

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            fetchData(1, value);
        }, 500);
    };

    return (
        <PageWrapper title={dashboardMenu.manageAstrologer.subMenu.ManageAstro.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <Breadcrumb
                        list={[
                            { title: 'Home', to: '/admin/dashboard.html' },
                            { title: 'Manage User Task', to: '/admin/task.html' },
                        ]}
                    />
                </SubHeaderLeft>
            </SubHeader>

            <Page>
                <div className='row h-100'>

                    <div className='col-12'>
                        <Card stretch>

                            <CardHeader>
                                <h4>Manage User Task</h4>

                                <div className='d-flex'>
                                    <Icon icon='Search' color='primary' size='2x' />
                                    <input
                                        type='search'
                                        className='form-control'
                                        placeholder='Search...'
                                        value={search.keywords}
                                        onChange={onTextFieldChange}
                                    />
                                </div>
                            </CardHeader>

                            <CardBody isScrollable className='table-responsive'>
                                <table className='table table-modern table-hover'>
                                    <thead>
                                        <tr>
                                            <th>TaskID</th>
                                            <th>Heading</th>
                                            <th>Status</th>
                                            <th>Category</th>
                                            <th>Deadline</th>
                                            <th>Project</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan={9} className='text-center'>
                                                    Loading...
                                                </td>
                                            </tr>
                                        ) : astroList.length === 0 ? (
                                            <tr>
                                                <td colSpan={9} className='text-center'>
                                                    NOT FOUND
                                                </td>
                                            </tr>
                                        ) : (
                                            astroList.map((item, index) => (
                                                <tr key={index}>
                                                    <td>#{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.source_name}</td>
                                                    <td>{item.category_name}</td>
                                                    <td>{item.dedline}</td>

                                                    <td>
                                                        {assigneeMap[item.project] || 'N/A'}
                                                    </td>

                                                    <td>
                                                        <Link to={`/admin/task-log/${item.id}`}>
                                                            <Button color='primary' isLight>
                                                                Follow
                                                            </Button>
                                                        </Link>
                                                    </td>

                                                    <td>
                                                        <Link to={`/admin/edit-task/${item.id}`}>
                                                            <Button color='primary' isLight>
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                    </td>

                                                    <td>
                                                        <Button
                                                            color='danger'
                                                            isLight
                                                            onClick={() => handleClick(item.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
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

export default ProjectDetails;