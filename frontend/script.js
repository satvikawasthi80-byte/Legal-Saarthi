// ================================
// Legal Saarthi - script.js
// ================================

// Dark / Light Theme Toggle
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.innerHTML = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeBtn.innerHTML = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

// Load Saved Theme
window.onload = () => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
        themeBtn.innerHTML = "☀️";
    }

    // Fade Animation
    document.body.style.opacity = "0";

    setTimeout(() => {
        document.body.style.transition = "0.6s";
        document.body.style.opacity = "1";
    }, 100);

};

// Smooth Scroll
document.querySelectorAll("a[href^='#']").forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

// Navbar Background on Scroll
window.addEventListener("scroll",()=>{

    const nav=document.querySelector("nav");

    if(window.scrollY>50){

        nav.style.background="rgba(15,23,42,.95)";
        nav.style.backdropFilter="blur(20px)";

    }

    else{

        nav.style.background="rgba(255,255,255,.08)";

    }

});

// Reveal Animation
const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0px)";

}

});

},{
threshold:0.2
});

document.querySelectorAll("section").forEach(sec=>{

sec.style.opacity="0";
sec.style.transform="translateY(40px)";
sec.style.transition="0.8s";

observer.observe(sec);

});

// Contact Form
const form=document.querySelector("form");

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("✅ Thank you! Your message has been received.");

form.reset();

});