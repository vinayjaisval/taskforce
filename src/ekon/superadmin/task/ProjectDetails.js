import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { dashboardMenu } from '../../../menu';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Dropdown, {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import PaginationComponent from '../PaginationComponent';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import Alert, { AlertHeading } from '../../../components/bootstrap/Alert';
import { Link, useParams } from 'react-router-dom';

import Assignee from '../user_status/Assignee';
import BASE_URL from "../../../config/api";

const ProjectDetails = () => {

    useMinimizeAside();

    const { pId, id } = useParams();

    const [loading, setLoading] = useState(true);
    const [astroList, setAstroList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [limit, setLimit] = useState(12);

    const [search, setSearch] = useState({
        keywords: '',
    });

    // ✅ Debounce Timer
    let debounceTimer;

    // ✅ API CALL FUNCTION
    const getAstroList = async (page = 1, keyword = '') => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${BASE_URL}/admin/project_tasks/${pId}/${id}?page=${page}&keywords=${keyword}`
            );

            setAstroList(res.data.data);
            setTotalRecords(res.data.total_tasks);
            setLimit(res.data.per_page);

        } catch (error) {
            console.log('API Error');
        } finally {
            setLoading(false);
        }
    };

    // ✅ FIRST LOAD
    useEffect(() => {
        getAstroList(1);
    }, [id, pId]);

    // ✅ PAGINATION
    const getPaginatedData = (page) => {
        getAstroList(page, search.keywords);
    };

    // ✅ SEARCH WITH DEBOUNCE
    const onTextFieldChange = (e) => {
        const value = e.target.value;

        setSearch({
            ...search,
            [e.target.name]: value,
        });

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            getAstroList(1, value);
        }, 500); // ✅ 500ms delay
    };

    // ✅ DELETE
    const handleClick = async (e, delId) => {
        try {
            await axios.get(`${BASE_URL}/admin/lead_delete/${delId}`);
            getAstroList(1);
            document.getElementById('succ_message').style.display = 'block';
            document.getElementById('alert_message').innerHTML = 'Deleted Successfully';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.log('Delete Error');
        }
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

                                {/* 🔍 SEARCH */}
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
                                            <th>Heading</th>
                                            <th>Status</th>
                                            <th>Category</th>
                                            <th>Deadline</th>
                                           
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
                                            astroList.map((item) => (
                                                <tr key={item.id}>
                                                    <td>#{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.source_name}</td>
                                                    <td>{item.category_name}</td>
                                                    <td>{item.dedline}</td>
                                                    
                                                   
                                                    <td>
                                                        <Link to={`/superadmin/task-log/${item.id}`}>
                                                            <Button color='primary' isLight>
                                                                Follow
                                                            </Button>
                                                        </Link>
                                                    </td>

                                                    <td>
                                                        <Link to={`/superadmin/edit-task/${item.id}`}>
                                                            <Button color='primary' isLight>
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                    </td>

                                                    <td>
                                                        <Button
                                                            color='danger'
                                                            isLight
                                                            onClick={(e) => handleClick(e, item.id)}
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