const resultSection = document.querySelector('.result-section');
const lstorage = window.localStorage;
const storageKey = 'prevFriends'
const shufflebtn = document.querySelector('button');
const numInput = document.querySelector('input');

// let all14 = ['김정식', '김태현', '김병준', '김기용', '박영준', '김영환', '정현석', '공주민', '안혜수', '김영주', '박승제', '심원두', '김현지', '신세원', '백승찬', '류지혜', '장규석', '박현재'
            // ,'엄문주','백승진','안상혁','강두연','고수희','김민구','이민영','고은정','이승윤','김민서','장재원','이영주','신재훈','김동하','장호철','이성보'];
let all14 = ['엄문주', '김현지', '김태현', '장호철', '장재원', '안상혁', '신세원', '김동하', '안혜수', '류지혜'];

let prev_friends = lstorage.getItem(storageKey);

const shuffleArr = (prevarr) => {
    for(let i = prevarr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [prevarr[i], prevarr[j]] = [prevarr[j], prevarr[i]];
    }
    return prevarr;
}

function shuffleFriends(){
    let next_friends = [];
    const member_count = numInput.value;
    if(!member_count || member_count <= 0 || member_count > all14.length){
        alert('입력이 올바르지 않습니다!');
        return;
    }
    //shuffle
    all14 = shuffleArr(all14);
    
    //입력한 팀원 수가 과반일경우 그냥 반으로 나눔..ㅎㅎ
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
        //팀 별 팀원 차이가 2명 이상인 경우 밸런스에 맞게 팀원 배분
        if(member_count - (all14.length % member_count) <= 1){
            const teamcnt = Math.floor(all14.length / member_count) + 1;
            for(let i = 0; i < teamcnt-1; i++){
                let tmparr = all14.slice(i * member_count, (i+1) * member_count);
                next_friends.push(tmparr);
            }
            let tmparr = [];
            for(let i = member_count * (teamcnt-1); i < all14.length; i++){
                tmparr.push(all14[i]);
            }
            next_friends.push(tmparr);
        }
        else{
            const teamcnt = Math.floor(all14.length / member_count);
            let index = 0;
            for(let tidx = 0; tidx < teamcnt; tidx++){
                let tmparr = [];
                for(let i = 0; i < member_count-1; i++){
                    tmparr.push(all14[index]);
                    index++;
                }
                next_friends.push(tmparr);
            }
            while(index < all14.length){
                for(let tidx = 0; tidx < teamcnt; tidx++){
                    next_friends[tidx].push(all14[index]);
                    index++;
                    if(index >= all14.length) break;
                }
            }
        }
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

//To do : 
//1. 균등분배 말고 그냥 자르는 것도 선택하도록 하기
//2. 로컬스토리지 이용해서 이전에 나온결과 저장하기
//3. input에 focus된 상태에서 엔터 눌렀을때 버튼클릭이벤트처럼 작동하도록 하기

init();