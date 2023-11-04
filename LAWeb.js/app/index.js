const slides=document.querySelectorAll('.slider');
const banner=document.querySelector('.historyBanner')

slides.forEach(item=>{
    item.addEventListener('click',()=>{
        console.log('click',item)
        banner.style.backgroundImage=`url(${item.src})`
    })
})
