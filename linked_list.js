class VideoManager {
    constructor() {
        this.head = undefined;
    }
    
    add(targetVideo) {
        let video = this.head;

        if( video === undefined ) {
            this.head = targetVideo;
        }else {
            if( video.next === undefined ) {
                video.next = targetVideo;
            }else {
                while( video.next !== undefined ) {
                    video = video.next;
                }
                video.next = targetVideo;
            }
        }
        
        this.print();
    }

    insert(targetVideo, index) {
        let video = this.head;
        if ( video === undefined ) {
            this.head = targetVideo;
            this.print();
            return
        }
        
        if ( Number(index) === 0 ) {
            targetVideo.next = video;
            this.head = targetVideo;

            this.print();
            return
        }

        while ( --index !== 0 ) {
            video = video.next
            if( video === undefined ) {
                this.add(targetVideo)
                return
            }
        }

        const nextVideo = video.next;
        const addVideo = targetVideo;
        video.next = addVideo
        addVideo.next = nextVideo;
        
        this.print();
    }

    print() {
        let video = this.head;
        let printMsg = `|---[${video.id}, ${video.playTime}sec]`;

        while(video.next !== undefined) {
            video = video.next;
            printMsg += `---[${video.id}, ${video.playTime}sec]`;
        }
        printMsg += `---[end]`;
        console.log(printMsg)
        return
    }
}

function startEditVideo(data) {
    const videoData = data;
    console.log(videoData);
    const videoManager = new VideoManager();

    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function editVideo() {
        rl.question('\n비디오편집 내용(insert, add, delete, 종료)을 입력해주세요.\n>', (answer) => {
            const editInfo = answer.split(' ')
            const targetId = editInfo[1];
            const targetVideo = videoData[targetId];
            const targetIndex = editInfo[2];
            
            switch(editInfo[0]) {
                case 'add' :
                    videoManager.add(targetVideo);
                    editVideo();
                    break
                case 'insert' :
                    if (targetVideo && targetIndex){
                        videoManager.insert(targetVideo, targetIndex)
                    }else {
                        console.log('입력을 다시해주세요')
                    } 
                    editVideo();
                    break
                case 'delete' :
                    console.log('delete')
                    editVideo();
                    break
                case '종료' :
                    rl.close();
                    break
                default :
                    console.log('잘못 입력하셨습니다.')
                    editVideo();
            }
        });
    }
    
    editVideo();
}


const videoData = {
    'dria': { id: 'dria', title: '제목1', playTime: 14, next: undefined },
    'xxsb': { id: 'xxsb', title: '제목2', playTime: 5, next: undefined },
    'xqyc': { id: 'xqyc', title: '제목3', playTime: 4, next: undefined },
    'nqnd': { id: 'nqnd', title: '제목4', playTime: 14, next: undefined },
    'klie': { id: 'klie', title: '제목5', playTime: 13, next: undefined },
    'hjif': { id: 'hjif', title: '제목6', playTime: 6, next: undefined },
    'ejeg': { id: 'ejeg', title: '제목7', playTime: 7, next: undefined },
    'vrmh': { id: 'vrmh', title: '제목8', playTime: 6, next: undefined },
    'tdsi': { id: 'tdsi', title: '제목9', playTime: 1, next: undefined },
    'ttyj': { id: 'ttyj', title: '제목10', playTime: 3, next: undefined }
}

startEditVideo(videoData);