import axios from "axios";

function callMusicAPI(event) {
    axios({
        url: 'http://localhost:8000/fileMusic/' + event.id,
        method: 'GET',
        responseType: 'blob',
    })
        .then(res => res.data)
        .then(res => {
            const src = URL.createObjectURL(res);
            const tool = document.querySelector('#tool-source');
            tool.src = src;
            playMusic();
        })
        .catch(() => console.log('ERROR'))
}

function playMusic() {  
    const btnPlayMusic = document.querySelector('#btn-handler-action');
    btnPlayMusic.setAttribute('action', 'play');
    btnPlayMusic.click();
}

function downloadMusic(event) {
    const loading = document.querySelector('#loading');
    loading.style.display = 'unset';
    while(!event.id)
        event = event.parentElement;
    axios({
        url: 'http://localhost:8000/fileMusic/' + event.id,
        method: 'GET',
        responseType: 'blob',
    })
        .then(res => res.data)
        .then(res => {
            const url = URL.createObjectURL(res);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `${event.id}.mp3`,
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
            loading.style.display = 'none';
        })
        .catch(() => console.log('ERROR'))
}

export { callMusicAPI, playMusic, downloadMusic };
