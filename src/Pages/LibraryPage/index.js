import { useEffect } from "react";
import Library from "../../Components/Library";

function LibraryPage() {

    useEffect(() => {
        const listPageBtn = document.querySelectorAll('#list-page-btn-link li');
        for(const pageBtn of listPageBtn) {
            if(pageBtn.style.color === 'var(--btn-link-page-color)')
                pageBtn.style.color = 'var(--black-color)';
            if(pageBtn.id === 'Library-page-btn-link')
                pageBtn.style.color = 'var(--btn-link-page-color)';
        }
    }, [])

    return (
        <div className="Library-page">
            {console.log('library-page')}
            <Library />
        </div>
    )
}

export default LibraryPage;

