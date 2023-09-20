
//header banner 영역

//hover 될 변수
var hoverS = document.querySelectorAll('.hoverS');
//console.log(hoverS);

// hover시 on/off 기능 가질 변수 주면 됌
var banner = document.querySelectorAll('.sub');
var bg = document.querySelector('.bg');
//console.log(banner);

//

hoverS.forEach(function (element, index) {
  // 마우스가 요소에 들어왓을때
  element.addEventListener('mouseenter', function () {
    banner[index].style.display = " block"
    bg.style.display = "block"
    console.log(index);
  });
  // 마우스가 요소에서 떠났을 때 none
  element.addEventListener('mouseleave', function () {
    banner[index].style.display = "none";
    bg.style.display = "none"
  });
});







//배너 슬라이드 영역


let span = document.querySelector('#spans');
let count = 1;
const left = document.querySelector('#left');
const right = document.querySelector('#right');

const banner_desk = document.querySelector('.banner_desk');
let desk_child = banner_desk.querySelectorAll('a');
const banner_tablet = document.querySelector('.banner_tablet');
let tablet_child = banner_desk.querySelectorAll('a');
const banner_mobile = document.querySelector('.banner_mobile');
let mobile_child = banner_desk.querySelectorAll('a');


let isAnimating = false; // 애니메이션이 진행 중인지를 나타내는 변수- 광클 이슈를 해결위함
let checkPoint; // 왼쪽 오른쪽,
const view_w = window.innerWidth; //화면 넓이 조건 셋업
console.log(view_w);

// const span_N = Number(span);
// console.log(typeof(span_N), span_N);

//이동함수
function banner_slide(element, distance, duration, callback) {
  //시작시간 초기화
  let startTime = null;
  //시작 포제션
  const startPosition = element.offsetLeft;

  function animation(currentTime) {
    // 시작시간 기록, 
    if (startTime === null) startTime = currentTime;
    // 경과시간 체크
    const elapsedTime = currentTime - startTime;
    // 진행상태
    const progress = Math.min(elapsedTime / duration, 1);
    // 진행 포제션
    const newPosition = startPosition + distance * progress;
    // 실제 이동
    element.style.marginLeft = newPosition + 'px';
    if (elapsedTime < duration) {
      requestAnimationFrame(animation);
    } else {
      callback(); // 애니메이션 종료 후 콜백 실행
    }
  }
  // animation을 첫번째 실행 하기 위함
  requestAnimationFrame(animation);
}

//임시 모듈 1개 작성  
function kk() {
  //테스트 용 임시
  let last_desk = banner_desk.querySelector('a:last-child');
  banner_desk.insertBefore(last_desk, banner_desk.firstElementChild);
  banner_desk.style.marginLeft = '-1440px';
  console.log('kk입니다')
}


//버튼 클릭 이벤트
left.addEventListener('click', function () {
  //이게 갱신을 하려고 하면, let 을 쓰면 안되는거네;;
  checkPoint = 0;
  // console.log(checkPoint);
  if (!isAnimating) { //false 에만 시작을하고
    isAnimating = true; // 값을 true로 바꿔주고, click event 실행시, 방어를 함
    //이제 click 이벤트에 if 문 걸어서,
    count--;
    if (count == 0) {
      count = 5;
    }
    span.innerText = count + "/5";
    if (view_w > 1024) {
      trace();
      banner_slide(banner_desk, 1440, 1000, () => {//banner함수가 진행되고 진행하고 
        isAnimating = false; // callback 함수에서 맨마지막에 false로 값을 바
      });
    }

    else if (640 < view_w && view_w < 1024) {
      trace();
      banner_slide(banner_tablet, 1024, 1000, () => {//banner함수가 진행되고 진행하고 
        isAnimating = false; // callback 함수에서 맨마지막에 false로 값을 바꿈
      });
    }
    else {
      trace();
      banner_slide(banner_mobile, view_w, 1000, () => {//banner함수가 진행되고 진행하고 
        isAnimating = false; // callback 함수에서 맨마지막에 false로 값을 바꿈
      });
    }

  }
});
right.addEventListener('click', function () {
  checkPoint = -1;
  // console.log(checkPoint);
  if (!isAnimating) {
    isAnimating = true;
    count++;
    if (count == 6) {
      count = 1;
    }
    span.innerText = count + "/5";
    // banner_slide(banner_desk, -1440, 500, () => { 
    //   isAnimating = false; 
    if (view_w > 1024) {
      banner_slide(banner_desk, -1440, 1000, () => {//banner함수가 진행되고 진행하고 
        isAnimating = false; // callback 함수에서 맨마지막에 false로 값을 바꿈

        // console.log('배너함수입니다');
        //콜백 펑션으로 진행해야... banner_slide끝나고 실행을 해서 이렇게 해야하네
        trace();
      });
    }
    else if (640 < view_w && view_w < 1024) {
      banner_slide(banner_tablet, -1024, 1000, () => {
        isAnimating = false;
        trace();
      });
    }
    else {
      banner_slide(banner_mobile, -view_w, 1000, () => {
        isAnimating = false;
        trace();
      });

    }
  }
});


//배열 이동함수에 쓰일 함수, 마지막 요소의 다음꺼 앞으로 삽입, 
function insertAfter(newNode, backNode) {
  backNode.parentNode.insertBefore(newNode, backNode.nextSibling);
}

//배열 이동 함수
function trace() {
  //데스크탑
  if (view_w > 1024) {
    //왼쪽
    if (checkPoint == 0) {
      let last_desk = banner_desk.querySelector('a:last-child');
      banner_desk.insertBefore(last_desk, banner_desk.firstElementChild);
      banner_desk.style.marginLeft = '-1440px';
      // banner_desk.style.marginLeft = '-1440px';
      // console.log('왼쪽');
    }
    //오른쪽
    else if (checkPoint == -1) {
      let first_desk = banner_desk.querySelector('a:first-child');
      //After가 없어서 만듬
      insertAfter(first_desk, banner_desk.lastElementChild);
      banner_desk.style.marginLeft = '0px';
      // banner_desk.style.transform = `translateX(-1440px)`;
      // console.log('오른쪽');
    }

    // let desk_child2 = banner_desk.querySelectorAll('a');
    // console.log(desk_child2);
    //내가 이걸 왜 만들엇더라 콘솔용?
  }

  //태블릿
  else if (640 < view_w && view_w < 1024) {
    //왼쪽
    if (checkPoint == 0) {
      let last_tablet = banner_tablet.querySelector('a:last-child');
      banner_tablet.insertBefore(last_tablet, banner_tablet.firstElementChild);
      banner_tablet.style.marginLeft = `-1024px`;
    }
    //오른쪽
    else {
      let first_tablet = banner_tablet.querySelector('a:first-child');
      insertAfter(first_tablet, banner_tablet.lastElementChild);
      banner_tablet.style.marginLeft = `0px`;
    }
    // let tablet_child2 = banner_tablet.querySelectorAll('a');
    // console.log(tablet_child2);
  }

  //모바일
  else {
    //왼쪽
    if (checkPoint == 0) {
      let last_mobile = banner_mobile.querySelector('a:last-child');
      banner_mobile.insertBefore(last_mobile, banner_mobile.firstElementChild);
      banner_mobile.style.marginLeft = `${-view_w}px`;
    }
    //오른쪽
    else {
      let first_mobile = banner_mobile.querySelector('a:first-child');
      insertAfter(first_mobile, banner_mobile.lastElementChild);
      banner_mobile.style.marginLeft = `0px`;
    }
    // let mobile_child2 = banner_mobile.querySelectorAll('a');
    // console.log(mobile_child2); 확인용

  }
}


//rotate_product
// 문제가 2개임, 하나는 배열 값 비교, 두번째는 1번더 클릭해야 버튼 사라짐. 왓다갔다하면서 하면 버튼 사라짐



const rotate_products = document.querySelectorAll('.rotate_product .product_box .pro_menu ul li');
const ul_wraps = document.querySelectorAll('.rotate_product .product_box .ul_wrap > li');

const btn_left = document.querySelector('.btns2 .btns_left')
const btn_right = document.querySelector('.btns2 .btns_right')

console.log(btn_left);
// const click_points = [0, 0, 0, 0, 0];
// 각 슬라이드의 click_point 값

let click_points = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0
};
//초기상태 
btn_left.style.opacity = "0";

//스타일
let index_flow = 0;
rotate_products.forEach(function (rotate_product, index) {
  rotate_product.addEventListener("click", function (e) {
    ul_wraps.forEach(function (ul_wrap) {
      ul_wrap.style.display = "none"; // 원하는 스타일을 설정
    });
    ul_wraps[index].style.display = 'block'
    index_flow = index;

    //  index_flow = index; 업데이트 된다음 실행
    trans_menu();
    console.log(rotate_product, index, ul_wraps);
  })
})

//text클릭시 내부함수_button opacity연동
function trans_menu() {
  if (click_points[index_flow] <= 0) {
    btn_left.style.opacity = "0";
    btn_right.style.opacity = "1";
    console.log('작음', click_points[index_flow], 'rig2@' + right_check2, 'rig1@' + right_check)
  }
  // 끝에 도착
  else if (click_points[index_flow] == right_check2 - right_check) {
    btn_right.style.opacity = "0";
    btn_left.style.opacity = "1";
    console.log('큼', click_points[index_flow], 'rig2@' + right_check2, 'rig1@' + right_check)
  }
  else {
    btn_right.style.opacity = "1";
    btn_left.style.opacity = "1";
    console.log('중간', click_points[index_flow], 'rig2@' + right_check2, 'rig1@' + right_check)
  }
}

// 좌측 버튼 클릭 이벤트
btn_left.addEventListener("click", function (e) {
  let uc = ul_wraps[index_flow].querySelectorAll('.rotate_product .product_box .ul_wrap > li >ul >li').length;
  right_check2 = uc;
  // ul의 자식(현재 보여지고 있는index된) 자식요소
  let first_child = ul_wraps[index_flow]

  //HTMLCollection요소라서 forEach사용을 위해 Array 로 바꿈
  let con = Array.from(first_child.children)
  con.forEach(function (childElement) {
    function left_add() {
      // 0부터 ~ 양수
      if (click_points[index_flow] > -1) {
        click_points[index_flow] -= 1;
        childElement.style.transform = `translateX(-${click_points[index_flow] * 243}px)`; // 이동할 거리 적용
        // 0일때
        if (click_points[index_flow] <= 0) {
          btn_left.style.opacity = "0";
        }
        else {
          btn_right.style.opacity = "1";
        }
      }
    }
    left_add()
    console.log(click_points, uc);
  });
});

let right_check = 0;
let right_check2;

btn_right.addEventListener("click", function (e) {

  let uc = ul_wraps[index_flow].querySelectorAll('.rotate_product .product_box .ul_wrap > li >ul >li').length;
  //전역변수에 대입
  right_check2 = uc;

  // console.log('케이' + index_flow);
  // ul의 자식(현재 보여지고 있는index된) 자식요소
  let first_child = ul_wraps[index_flow]

  //HTMLCollection요소라서 forEach사용을 위해 Array 로 바꿈

  let con = Array.from(first_child.children)
  con.forEach(function (childElement) {
    //view 에 따른 click_point값 다르게 1291이상
    //내부함수
    function right_add(uc_count) {
      //전역변수로 써먹게
      right_check = uc_count
      if (click_points[index_flow] < uc - uc_count) {
        click_points[index_flow] += 1;
        childElement.style.transform = `translateX(-${click_points[index_flow] * 243}px)`; // 이동할 거리 적용
        if (click_points[index_flow] == uc - uc_count) {
          btn_right.style.opacity = "0";
        }
        else {
          btn_left.style.opacity = "1";
        }
      }
    }

    if (window.innerWidth >= 1291) {
      // if (click_points[index_flow] < uc - @@5@@) 이부분이 바뀌는거임 
      right_add(5)
    }
    else if (window.innerWidth <= 1290 && window.innerWidth >= 1041) {
      right_add(4)
    }
    else if (window.innerWidth <= 1040 && window.innerWidth >= 820) {
      right_add(3)
    }
    else if (window.innerWidth <= 819 && window.innerWidth >= 641) {
      right_add(2)
    }

  });
  console.log(click_points, uc, click_points[index_flow], 'uc- rignt', uc - right_check);
  // console.log(con, first_child.children, first_child, click_points[index_flow])

  // 이동할 거리 누적
  // 이거 체크 포인트 값을 {}따위로 저장해둔다음, 불러와야 하겠는데..음.. 아니면 뭐 if 5개쓰고, 변수 5개써서 해결해야지 index_flow가 0일때,~4일때,
});









