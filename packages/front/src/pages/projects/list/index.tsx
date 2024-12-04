import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { getProjectsApi, getProjectDocCountApi } from '../api';
import ProjectList from '../components/ProjectList';

function Project(): React.ReactNode {
    const [projects, setProjects] = useState<any[]>([])

    const [loading, setLoading] = useState(true);

    const getProjects = async () => {
        try {
            setLoading(true);
            const res = await getProjectsApi<{ [key: string]: any }[]>();
            if (res.code === 200) {
                const documentsCount: any = await Promise.all(res.data.map(({ id }) => getProjectDocCountApi<any>(id)));
                const data = res.data.map((project, index) => ({
                    ...project,
                    count: documentsCount[index].data
                }));
                console.log(data)
                setProjects(data)
            }
            setLoading(false);
        } catch (error) {}
    }


    useEffect(() => {
        getProjects()
    }, [])

    return (
        <>
            {
                loading ?
                <div className='w-full h-full flex items-center justify-center'>
                    <Spin />
                </div>
                :
                <ProjectList data={projects} onOk={getProjects} />
                }
        </>
    )
}

export default Project;