var navbarItems = document.getElementsByClassName("navbar-item");

for (var i = 0; i < navbarItems.length; i++) {
    navbarItems[i].addEventListener("click", function (event) {
        var sectionToGo = this.getElementsByTagName("a")[0].href.split("#");

        deleteActiveClass();
        this.classList.add("active");

        if(sectionToGo.length === 2) {
            event.preventDefault();  
            var goTo = sectionToGo[sectionToGo.length - 1];
            getElementByIdAndScroll(goTo);
        }
    });
}

function getElementByIdAndScroll(id) {
    var elem; 
    if (id === "") { 
        elem = document.getElementsByClassName("header")[0];
    } else {
        elem = document.getElementById(id);
    };
    scrollToElement(elem);
}

function scrollToElement (element) {
    var jump = parseInt(element.getBoundingClientRect().top * 0.15); 
                                                            

    if (!element.lastJump || element.lastJump > Math.abs(jump)) {
        setTimeout(function() {
            element.lastJump = Math.abs(jump);
                scrollToElement(element);
        }, 30); 
    } else {
        element.lastJump = null;
    }
}

function deleteActiveClass() {
    for (var i = 0; i < navbarItems.length; i++) {
        navbarItems[i].classList.remove("active");
    }
}

var acumulativeOffset = function (element) {
    var top = 0;

    do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
    } while (element);

    return top;
}

var offsetWhoAmI = acumulativeOffset(document.getElementById("who-am-I"));
var offsetAcademic = acumulativeOffset(document.getElementById("academic"));
var offsetWorkExperience = acumulativeOffset(document.getElementById("work-experience"));
var offsetAboutMe = acumulativeOffset(document.getElementById("about-me"));
var navbar = document.getElementsByClassName("navbar")[0];

window.addEventListener("scroll", changeMenuStyle);

var previous;
function changeMenuStyle(event) {
    var pageOffset = window.pageYOffset;

    if (pageOffset >= 0 && pageOffset < offsetWhoAmI) {
        if (!previous || previous !== 1) {
            previous = 1;
        } else if (previous === 1){
            return false;
        }
        
        deleteActiveClass();
        document.querySelector("a[href='#']").parentNode.classList.add("active");
    } else if (pageOffset >= offsetWhoAmI && pageOffset < offsetAcademic) {
        if (!previous || previous !== 2) {
            previous = 2;
        } else if (previous === 2){
            return false;
        }
        
        deleteActiveClass();
        document.querySelector("a[href$='who-am-I']").parentNode.classList.add("active");
    } else if (pageOffset >= offsetAcademic &&  pageOffset < offsetWorkExperience) {
        if (!previous || previous !== 3) {
            previous = 3;
        } else if (previous === 3){
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href$='academic']").parentNode.classList.add("active");
    } else if (pageOffset >= offsetWorkExperience &&  pageOffset < offsetAboutMe) {
        if (!previous || previous !== 4) {
            previous = 4;
        } else if (previous === 4){
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href$='work-experience']").parentNode.classList.add("active");
    } else if (pageOffset >= offsetAboutMe) {
        if (!previous || previous !== 5) {
            previous = 5;
        } else if (previous === 5){
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href$='about-me']").parentNode.classList.add("active");
    }   
}