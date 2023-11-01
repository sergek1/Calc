const videos =[
    {
        name:'Замыкания от и до',
        duration: 15,
        id:1,
    },
    {
        name:'Roadmap JS',
        duration: 15,
        id:2,
    },
    {
        name:'Что такое лол?',
        duration: 15,
        id:3,
    },
    {
        name:'Что такое kkk?',
        duration: 15,
        id:4,
    }
]

export function VideoList(){
    return (
    <>
    <h1>VideoList</h1>
    {
        videos.map((video)=>{
            return (
                <div key={video.id}>
                    <p>{video.name}</p>
                    <p>{video.duration}</p>
                    <button>Like!</button>
                </div>
            )
        })
    }
    </>)
}