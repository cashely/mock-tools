import { useEffect, useState } from 'react';
import { useMatches, Link } from "react-router-dom";
import { Breadcrumb } from 'antd';

function NavBar() {

    const [paths, setPaths] = useState<any>([]);
    const matches = useMatches();
    useEffect(() => {
        
        if (!matches) {
            return;
        }
        setPaths(() => {
            return matches.map((match: any, index) => {

                const path: any = {
                    title: match.handle?.title || '首页'
                }

                if (index !== matches.length - 1) {
                    path.href = `/#${match.pathname}`;
                }

                return path;
                return <Link key={match.id} to={match.pathname}>{match.handle?.title || '首页'}</Link>
            });
        })
    }, matches);
    return (
        <div className='border-b p-2'>
            <Breadcrumb
                items={paths}
            />
        </div>
    )
}

export default NavBar;