/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', () =>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}

showMenu('nav-toggle','nav-menu')

/*==================== SWIPER JS ====================*/
let galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 0,
    slidesPerView: 0,
})

let galleryTop = new Swiper('.gallery-top', {
    effect: 'fade',
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    thumbs: {
        swiper: galleryThumbs
    }
})

/*==================== FILTER - ISOTOPE JS ====================*/
const gridCheck = document.querySelector('.grid');

if (gridCheck !== null) { 
	// init Isotope
	var iso = new Isotope( '.grid', {
		itemSelector: '.element-item',
		layoutMode: 'fitRows'
	});

	// bind filter button click
	var filtersElem = document.querySelector('.filters-button-group');
	filtersElem.addEventListener( 'click', function( event ) {
		// only work with buttons
		if ( !matchesSelector( event.target, 'button' ) )  {
			return;
		}
		var filterValue = event.target.getAttribute('data-filter');
		// use matching filter function
		iso.arrange({ filter: filterValue });
	});
	
	// change is-checked class on buttons
	var buttonGroups = document.querySelectorAll('.button-group');
	for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
		var buttonGroup = buttonGroups[i];
		radioButtonGroup( buttonGroup );
	}
	
	function radioButtonGroup( buttonGroup ) {
		buttonGroup.addEventListener( 'click', function( event ) {
			// only work with buttons
			if ( !matchesSelector( event.target, 'button' ) )  {
				return;
			}
			buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
			event.target.classList.add('is-checked');
		});
	}
}

//getting all required elements
const gallery  = document.querySelectorAll(".image"),
previewBox = document.querySelector(".preview-box"),
previewImg = previewBox.querySelector("img"), 
closeIcon = previewBox.querySelector(".icon"),
currentImg = previewBox.querySelector(".current-img"),
totalImg = previewBox.querySelector(".total-img"),
shadow = document.querySelector(".shadow");
window.onload = ()=>{
    for (let i = 0; i < gallery.length; i++) {
        totalImg.textContent = gallery.length; //passing total img length to totalImg variable
        let newIndex = i; //passing i value to newIndex variable
        let clickedImgIndex; //creating new variable
        
        gallery[i].onclick = () =>{
            clickedImgIndex = i; //passing cliked image index to created variable (clickedImgIndex)
            function preview(){
                currentImg.textContent = newIndex + 1; //passing current img index to currentImg varible with adding +1
                let imageURL = gallery[newIndex].querySelector("img").src; //getting user clicked img url
                previewImg.src = imageURL; //passing user clicked img url in previewImg src
            }
            preview(); //calling above function
    
            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");
            if(newIndex == 0){ //if index value is equal to 0 then hide prevBtn
                prevBtn.style.display = "none"; 
            }
            if(newIndex >= gallery.length - 1){ //if index value is greater and equal to gallery length by -1 then hide nextBtn
                nextBtn.style.display = "none"; 
            }
            prevBtn.onclick = ()=>{ 
                newIndex--; //decrement index
                if(newIndex == 0){
                    preview(); 
                    prevBtn.style.display = "none"; 
                }else{
                    preview();
                    nextBtn.style.display = "block";
                } 
            }
            nextBtn.onclick = ()=>{
                newIndex++; //increment index
                if(newIndex >= gallery.length - 1){
                    preview(); 
                    nextBtn.style.display = "none";
                }else{
                    preview(); 
                    prevBtn.style.display = "block";
                }
            }
            document.querySelector("body").style.overflow = "hidden";
            previewBox.classList.add("show"); 
            shadow.style.display = "block"; 
			console.log('tes1');
        }
		
    } 
	closeIcon.addEventListener('click', function(){
			console.log('tes');
			newIndex = clickedImgIndex; //assigning user first clicked img index to newIndex
			prevBtn.style.display = "block"; 
			nextBtn.style.display = "block";
			previewBox.classList.remove("show");
			shadow.style.display = "none";
			document.querySelector("body").style.overflow = "scroll";
		})
}

/*==================== POPUP ====================*/
const btnOpenVideo = document.querySelectorAll('.islands__video-content')
const islandsPopup = document.getElementById('popup')

function poPup(){
    islandsPopup.classList.add('show-popup')
}
btnOpenVideo.forEach(b => b.addEventListener('click', poPup))

const btnCloseVideo = document.getElementById('popup-close')

btnCloseVideo.addEventListener('click', ()=> {
    islandsPopup.classList.remove('show-popup')
})

/*==================== GSAP ANIMATION ====================*/
const controlImg = document.querySelectorAll('.controls__img')
const controlNext = document.querySelectorAll('.swiper-button-next')
const controlPrev = document.querySelectorAll('.swiper-button-prev')

function scrollAnimation(){
    gsap.from('.islands__subtitle', {opacity: 0, duration: .2, delay: .2, y: -20})
    gsap.from('.islands__title', {opacity: 0, duration: .3, delay: .3, y: -20})
    gsap.from('.islands__description', {opacity: 0, duration: .4, delay: .4, y: -20})
    gsap.from('.islands__button', {opacity: 0, duration: .5, delay: .5, y: -20})
    gsap.from('.islands__video-content', {opacity: 0, duration: .6, delay: .6, y: -20})

    islandsPopup.classList.remove('show-popup')
}

controlImg.forEach(c => c.addEventListener('click', scrollAnimation))
controlNext.forEach(c => c.addEventListener('click', scrollAnimation))
controlPrev.forEach(c => c.addEventListener('click', scrollAnimation))
