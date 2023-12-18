let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
let title = "Gildware Technologies";
let companyTitle = $(".company-title");
let splittedText = title.split("");

var tl = gsap.timeline();

splittedText.map((item) => {
    companyTitle.innerHTML += `<span>${item}</span>`;
})

tl.from(".company-title span", {
    duration: 1,
    y: "-100",
    opacity: 0,
    stagger: 0.1,
});
tl.from(".presents", {
    duration: .5,
    y: "-100",
    opacity: 0,
})

tl.to(".page-1", {
    duration: 1,
    y: '-100%',
    delay: 1,
})

gsap.to(".page-2", {
    duration: 1,
    y: '-100%',
    opacity: 1,
    delay: 4.5,
    // opacity: 1,
})

let decoration = $(".decoration");
let learningSection = $(".learning-section");

window.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;
    // console.log(x, y);
    decoration.style.left = (x - (decoration.getBoundingClientRect().width / 2)) + "px";
    decoration.style.top = (y - (decoration.getBoundingClientRect().height / 2)) + "px";
});

const magnets = document.querySelectorAll('.magnet');
const sensitivity = 0.1; // Adjust sensitivity for smoother movemen
magnets.forEach(function (magnet) {
    magnet.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const magnetRect = magnet.getBoundingClientRect();
        const magnetX = magnetRect.left + magnet.offsetWidth / 2;
        const magnetY = magnetRect.top + magnet.offsetHeight / 2;

        const distanceX = mouseX - magnetX;
        const distanceY = mouseY - magnetY;

        const maxDistance = 200; // Max distance to affect the magnet

        // Calculate the force based on distance and sensitivity
        const forceX = Math.max(-maxDistance, Math.min(maxDistance, distanceX)) * sensitivity;
        const forceY = Math.max(-maxDistance, Math.min(maxDistance, distanceY)) * sensitivity;
        magnet.style.transform = `translate(${forceX}px, ${forceY}px)`;
    });
});
let spanHeight = document.querySelector(".animate div span").getBoundingClientRect().height;
console.log(spanHeight)
// console.log(document.querySelector(".animate div span").getBoundingClientRect())
tl.to(".animate div", {
    duration: 1,
    y: -spanHeight * 2 + "px",
})


// arr.map(recievesMap);

// function recievesMap(item,index){
//     console.log(item,index);
// }


$(".floating-action-button").addEventListener("mouseenter", () => {
    decoration.style.filter = "blur(0)"
    decoration.style.opacity = "0.9"
    // decoration.style.background = "white"

})
$(".floating-action-button").addEventListener("mouseleave", () => {
    // decoration.style.filter = "blur(20px)"
    decoration.style.opacity = "0.1"
})

$(".floating-action-button").onclick = () => {
    $('.left').scrollIntoView()
    $("input").focus();
    $(".floating-action-button").style.display = "none";
}

window.addEventListener("scroll", () => {
    bottom = window.innerHeight + window.scrollY;
    if (bottom >= document.body.offsetHeight - 100) {
        $(".floating-action-button").style.display = "none";
    }
    else {
        $(".floating-action-button").style.display = "block";
    }
})
// window.addEventListener("scroll", (e)=>{
//     console.log(window.scrollX);

// })

// https://ouff7f2wlk.execute-api.ap-south-1.amazonaws.com/prod

// let url = "https://ouff7f2wlk.execute-api.ap-south-1.amazonaws.com/prod"
let url = "http://127.0.0.1:3000/sms"
$("#form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let phone = e.target.phone.value;

    if (name.length <= 0) {
        $$(".caption")[0].style.display = "block";
        return
    } else if (name.length <= 2) {
        $$(".caption")[0].style.display = "block";
        $$(".caption")[0].innerText = "Please Enter a Valid Name";
        return
    } else {
        $$(".caption")[0].style.display = "none";
    }
    if (phone.length == 0) {
        $$(".caption")[1].innerText = "Please Enter a Phone number";
        $$(".caption")[1].style.display = "block";

    } else if (phone.length != 10) {
        $$(".caption")[1].style.display = "block";
        $$(".caption")[1].innerText = "A Phone Number Should Contain 10 Digits";
    }
    let data = {
        name,
        phone
    }
    let response = await fetch(url, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } })
    let result = await response.json();
    console.log(result);
})

$('#phone').addEventListener("keydown", (e) => {
    if (e.keyCode != 8) {
        if (e.keyCode < 48 || e.keyCode > 57) {
            e.preventDefault();
            $$(".caption")[1].style.display = "block";
            $$(".caption")[1].innerText = "Please Enter Numbers only"
            return;
        }
    }
    $$(".caption")[1].style.display = "none";

    // if ()
})