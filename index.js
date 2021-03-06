//ELEMETNS
var today_date = JSON.parse(localStorage.getItem('today_date')) || [];
var items = JSON.parse(localStorage.getItem('items')) || [];
var week = JSON.parse(localStorage.getItem('weeks')) || [];
week = {
    sun : [
        { content: "독서: 개발 관련 서적", done: false },
        { content: "프로그래밍: 알고리즘 풀이", done: false },
        { content: "프로그래밍: 웹서비스 개발", done: false },
        { content: "동아리: 웹 백엔드 스터디", done: false }
    ],
    mon : [
        { content: "운동: 맨몸운동", done: false },
        { content: "대학: 강의 수강", done: false },
        { content: "대학: 과제/프로젝트 수행", done: false },
        { content: "프로그래밍: 알고리즘 풀이", done: false },
        { content: "프로그래밍: 웹서비스 개발", done: false },
        { content: "독서: 개발 관련 서적", done: false }
    ],
    tue : [
        { content: "대학: 강의 수강", done: false },
        { content: "대학: 과제/프로젝트 수행", done: false },
        { content: "프로그래밍: 알고리즘 풀이", done: false },
        { content: "프로그래밍: 웹서비스 개발", done: false }
    ],
    wed : [
        { content: "운동: 맨몸운동", done: false },
        { content: "대학: 강의 수강", done: false },
        { content: "대학: 과제/프로젝트 수행", done: false },
        { content: "프로그래밍: 알고리즘 풀이", done: false },
        { content: "프로그래밍: 웹서비스 개발", done: false },
        { content: "독서: 개발 관련 서적", done: false }
    ],
    thu : [
        { content: "대학: 강의 수강", done: false },
        { content: "대학: 과제/프로젝트 수행", done: false },
        { content: "프로그래밍: 알고리즘 풀이", done: false },
        { content: "프로그래밍: 웹서비스 개발", done: false }
    ],
    fri : [
        { content: "운동: 맨몸운동", done: false },
        { content: "대학: 강의 수강", done: false },
        { content: "대학: 과제/프로젝트 수행", done: false },
        { content: "프로그래밍: 알고리즘 풀이", done: false },
        { content: "프로그래밍: 웹서비스 개발", done: false },
        { content: "독서: 개발 관련 서적", done: false }
    ],
    sat : [
        { content: "독서: 개발 관련 서적", done: false },
        { content: "프로그래밍: 알고리즘 풀이", done: false },
        { content: "프로그래밍: 웹서비스 개발", done: false }
    ]
}

const toDoList = document.querySelector('.to-do-list');
const addItems = document.querySelector('.add-items');

const dateDisplay = document.querySelector('.date');
const navigators = document.querySelectorAll('.navigator');

const themeToggle = document.querySelector('input[name=theme]');
var dark_theme = false;

const body = document.querySelector('body');
const mains = document.querySelectorAll('.main');
const titles = document.querySelectorAll('.title');
const paragraphs = document.querySelectorAll('.main > p')
const navigation = document.querySelector('.navigation');
const footer = document.querySelector('.footer');

//FUNCTIONS
function updateItems() {
    localStorage.setItem('items', JSON.stringify(items));
}

function addItem(e) {
    e.preventDefault();
    
    const text = (this.querySelector('input[name=item]')).value;
    const item = {
        content : text,
        done : false
    }
    items.push(item);
    updateItems();
    populateList(items, toDoList);
    this.reset();
}  

function populateList(lists, toDoList) {
    if(lists.length === 0) {
        toDoList.innerHTML = '<li>Loading...</li>';
    }
    else {
        toDoList.innerHTML = lists.map((list, i) => {
            return `
            <li>
                <input type="checkbox" data-index="${i}" id="item${i}" ${list.done ? "checked" : ""} />
                <label for="item${i}">${list.content}</label>
                <span class="remove" data-index="${i}">X</span>
            </li>
            `;
        }).join('');
    }
}

function toggle(e) {
    if(e.target.matches('input')) {
        const el = e.target;
        const index = el.dataset.index;
    
        items[index].done = !items[index].done;
    }
    else if(e.target.matches('span')) {
        const el = e.target;
        const index = el.dataset.index;
        
        items.splice(index,1);
    }
    else {
        return;
    }

    updateItems();
    populateList(items, toDoList);
}

function displayDate() {
    var today = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    var day = week[today.getDay()];

    dateDisplay.innerHTML = `오늘은 <br> ${today.getMonth()+1}월 ${today.getDate()}일 ${day}요일`;
}


//ADD WEEK LIST
function listInit() {
    var today = new Date();
    var day = today.getDay();

    switch(day) {
        case 0: //일요일
            for(var i=0; i<week.sun.length; i++) {
                items.push(week.sun[i]);
            }
            break;
        case 1: //월요일
            for(var i=0; i<week.mon.length; i++) {
             items.push(week.mon[i]);
            }
            break;
        case 2: //화요일
            for(var i=0; i<week.tue.length; i++) {
               items.push(week.tue[i]);
            }
             break;
        case 3: //수요일
            for(var i=0; i<week.wed.length; i++) {
                items.push(week.wed[i]);
            }
            break;
        case 4: //목요일
            for(var i=0; i<week.thu.length; i++) {
                items.push(week.thu[i]);
            }
            break;
        case 5: //금요일
            for(var i=0; i<week.fri.length; i++) {
               items.push(week.fri[i]);
            }
            break;
        case 6: //토요일
            for(var i=0; i<week.sat.length; i++) {
                items.push(week.sat[i]);
            }
            break;
    }
}

function initLists() {
    var date = new Date();
    var today = [ date.getFullYear(), date.getMonth(), date.getDate() ];

    if(today_date === [] || (today_date[0] != today[0] || today_date[1] != today[1] || today_date[2] != today[2])) {
        console.log("initialized");
        today_date = today;
        items = [];
        localStorage.setItem('today_date', JSON.stringify(today_date));
        listInit();
        updateItems();
    }
    else {
        //주간 리스트 추가 X
    }
}

function scroll_navigation() {
    if(this.classList.contains("to_today")) {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: 0
        });
    }
    /* else if(this.classList.contains("to_day_setting")) {
        element_to_scroll = document.querySelector('.day_setting');
        scroll_to(element_to_scroll);
    } else if(this.classList.contains("to_weekly")) {
        element_to_scroll = document.querySelector('.weekly');
        scroll_to(element_to_scroll);
        
    } */
    else if(this.classList.contains("to_preference")) {
        element_to_scroll = document.querySelector('.preference');
        scroll_to(element_to_scroll);
    }
}

function scroll_to(element_to_scroll) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element_to_scroll.offsetTop - parseInt(getComputedStyle(element_to_scroll).marginTop)
    });
}

function toggleTheme() {
    dark_theme = !dark_theme;

    if(dark_theme) {
        body.style.backgroundColor = "#121212";
        body.style.color = "#ffffff";
        mains.forEach(main => main.style.backgroundColor = "#1D1D1D" );
        titles.forEach(main => main.style.color = "#ffffff" );
        paragraphs.forEach(paragraph => paragraph.style.borderBottom = "0.1rem solid #ffffff");
        navigation.style.backgroundColor = "rgba(18,18,18,0.7)";
        footer.style.backgroundColor = "#121212";
    } else {
        body.style.backgroundColor = "#FBFBFD";
        body.style.color = "#333333";
        mains.forEach(main => main.style.backgroundColor = "#F6F6F6" );
        titles.forEach(main => main.style.color = "#1D1D1F" );
        paragraphs.forEach(paragraph => paragraph.style.borderBottom = "0.1rem solid #86868B");
        navigation.style.backgroundColor = "#333333";
        footer.style.backgroundColor = "#F2F2F2";
    }
}

//EVENT LISTENERS
addItems.addEventListener('submit',addItem);
toDoList.addEventListener('click',toggle);
navigators.forEach(navigator => navigator.addEventListener('click', scroll_navigation));
themeToggle.addEventListener('click',toggleTheme);

displayDate();
initLists();
populateList(items, toDoList);