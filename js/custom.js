/*--------------------
Get Mouse
--------------------*/
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, dir: '' };
const getMouse = (e) => {
  mouse = {
    x: e.clientX || e.pageX || e.touches[0].pageX || 0,
    y: e.clientY || e.pageX || e.touches[0].pageY || 0,
    dir: (getMouse.x > e.clientX) ? 'left' : 'right'
  }
};
['mousemove', 'touchstart', 'touchmove'].forEach(e => {
  window.addEventListener(e, getMouse);
});


/*--------------------
Mouse Follow
--------------------*/
class MouseFollow {
  constructor (options) {
    Object.assign(this, options);
    
    this.pos = {
      x: 0,
      y: 0
    }
  }
  
  follow() {
    this.distX = mouse.x - this.pos.x;
    this.distY = mouse.y - this.pos.y;
    
    this.velX = Math.abs(this.distX / 8);
    this.velY = Math.abs(this.distY / 8);
    
    this.pos.x += this.distX / (10 + (this.ind * gooey));
    this.pos.y += this.distY / (10 + (this.ind * gooey));
    
    this.scaleX = 1; //map(this.velX, 0, 100, 1, 2);
    this.scaleY = 1; // map(this.velY, 0, 100, 1, 2);

    this.el.style.transform = 'translate(' + this.pos.x + 'px, ' + this.pos.y + 'px) scale(' + Math.max(this.scaleX, this.scaleY) + ')';
  }
}


/*--------------------
Map
--------------------*/
function map (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


/*--------------------
Init
--------------------*/
const gooey = 0.5;
const blobs = Array.from(document.querySelectorAll('#cursor .blob'));
const blobFollows = blobs.map((e, i) => new MouseFollow({ el: e, ind: i }));


/*--------------------
Render
--------------------*/
const render = () => {
  requestAnimationFrame(render);
  blobFollows.forEach(e => e.follow());
}
render();


/*---------------------
 Nav 
----------------------*/

 $(document).ready(function() {
  $('.menuBar, .line, a').mouseover(function(){
    if($('#cursor').hasClass('point')){
        $('#cursor').removeClass('point');
        console.log("no")
    } else {
        $('#cursor').addClass('point');
        console.log("yes")
    }  
  });
  $('.menuBar, .line, a').mouseleave(function(){

    if($('#cursor').hasClass('point')){
        $('#cursor').removeClass('point');
        console.log("no")
    }
  
  });

  $('.menuBar').click(function() {
      
      $('header').toggleClass('open');

      if($(this).hasClass('menuOpen')){
          $(this).removeClass('menuOpen');
      } else {
          $(this).addClass('menuOpen');
      }
      let navBar = $('nav');
      if(navBar.hasClass('menuOpen')){
          navBar.removeClass('menuOpen');
      } else {
          navBar.addClass('menuOpen');
      }    

  });

  $('nav').click(function(){
      $('.menuBar').toggleClass('menuOpen');
      $('nav').toggleClass('menuOpen');
      $('header').toggleClass('open');
  });
});

/*---------------------
 Progress Bar 
----------------------*/

let progressWrap = document.querySelectorAll('.progress-wrap');

progressWrap.forEach(item=>{
    numAnimation(item);
});

function numAnimation(item){
  let intialRate =  0;
  let targetRate = item.getAttribute('data-num');
  let progressBar = item.querySelector('.bar');

  let numAni = setInterval(()=>{
    intialRate++;
    if(intialRate == targetRate){
      clearInterval(numAni);
    }
    progressBar.style.width = `${intialRate}%`;
  },20);
}



