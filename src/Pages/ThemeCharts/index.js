import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Charts from '../../Components/Charts';


function ThemeCharts() {
    const search = useLocation().search;
    const slug = new URLSearchParams(search).get('q');

    useEffect(() => {
        const listPageBtn = document.querySelectorAll('#list-page-btn-link li');
        for(const pageBtn of listPageBtn) {
            if(pageBtn.style.color === 'var(--btn-link-page-color)')
                pageBtn.style.color = 'var(--black-color)';
            if(pageBtn.id === 'Theme-page-btn-link')
                pageBtn.style.color = 'var(--btn-link-page-color)';
        }
    }, []);

    return (
        <main className='wrapper'>
            {console.log('ThemeCharts-page')}
            <div className='content'>
                <Charts 
                    slug={'listMusic/theme?q=' + slug}
                    string={slug}
                />
            </div>
        </main>
    )
}

export default ThemeCharts;
