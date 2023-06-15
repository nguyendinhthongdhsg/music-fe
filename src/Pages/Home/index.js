import { useEffect } from "react";
import Charts from "../../Components/Charts";

function Home() {

    useEffect(() => {
        const listPageBtn = document.querySelectorAll('#list-page-btn-link li');
        for(const pageBtn of listPageBtn) {
            if(pageBtn.style.color === 'var(--btn-link-page-color)')
                pageBtn.style.color = 'var(--black-color)';
            if(pageBtn.id === 'Home-page-btn-link')
                pageBtn.style.color = 'var(--btn-link-page-color)';
        }
    }, [])

    return (
        <div className="Home-page">
            { console.log('Home-page') }
            <Charts slug={'listMusic/bxh'} string={'bài hát'} />
        </div>
    )
}

export default Home;
