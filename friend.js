const resultSection = document.querySelector('.result-section');
const lstorage = window.localStorage;
const storageKey = 'prevFriends'
const shufflebtn = document.querySelector('button');
const numInput = document.querySelector('input');

let all14 = ['김정식', '김태현', '김병준', '김기용', '박영준', '김영환', '정현석', '공주민', '안혜수', '김영주', '박승제', '심원두', '김현지', '신세원', '백승찬', '류지혜', '장규석', '박현재'
            ,'엄문주','백승진','안상혁','강두연','고수희','김민구','이민영','고은정','이승윤','김민서','장재원','이영주','신재훈','김동하','장호철','이성보'];
let prev_friends = lstorage.getItem(storageKey);

function shuffleFriends(){
    let next_friends = [];
    const member_count = numInput.value;
    if(!member_count){
        alert('팀 멤버 수를 입력해주세요');
        return;
    }
    else if(member_count <= 0){
        alert('양의 정수를 입력해주세요');
        return;
    }
    else if(member_count > all14.length){
        alert('팀원의 수가 너무 많습니다.');
        return;
    }
    //shuffle
    all14.sort(()=>{
        return .5 - Math.random();
    });
    
    //팀원 수가 과반일경우
    if(member_count >= all14.length/2){
        let idx = all14.length/2;
        for(let j = 0; j < 2; j++){
            let tmparr = [];
            for(let i = j * idx; i < (j+1)*idx; i++){
                tmparr.push(all14[i]);
            }
            next_friends.push(tmparr);
        }
    }
    else{
        let idx = 0;
        for(let i = 0; i < Math.floor(all14.length/member_count); i++){
            let tmparr = [];
            for(let j = i * (member_count-1); j < (i+1) * (member_count-1); j++){
                tmparr.push(all14[idx]);
                idx+=1;
            }
            next_friends.push(tmparr);
        }
        console.log('idx : ' + idx);
        console.log(next_friends);
        for(let i = 0; i < next_friends.length; i++){
            if(idx >= all14.length) break;
            next_friends[i].push(all14[idx]);
            idx+=1;
        }
        console.log(next_friends);
    }
    addFriendTab(next_friends);
}

function addFriendTab(new_friends){
    while(resultSection.firstChild) resultSection.removeChild(resultSection.firstChild);
    //add data
    for(let i = 0; i < new_friends.length; i++){
        let tabhead = document.createElement('div');
        let tabbody = document.createElement('div');
        let tabcontainer = document.createElement('div');
        for(let j = 0; j < new_friends[i].length; j++){
            if(j == new_friends[i].length-1) tabbody.innerHTML += new_friends[i][j];
            else tabbody.innerHTML += `${new_friends[i][j]}, `;
        }
        tabhead.innerHTML = `Team ${i+1}`;
        tabhead.classList.add('tab-name');
        tabbody.classList.add('tab-content');
        tabcontainer.classList.add('friend-tab');
        tabcontainer.appendChild(tabhead);
        tabcontainer.appendChild(tabbody);
        resultSection.appendChild(tabcontainer);
    }
}

function addbtnEventlistener(){
    shufflebtn.addEventListener('click', ()=>{
        shuffleFriends();
    });
}

function init(){
    addbtnEventlistener();
}

init();