

const flightPath = {
    curvinees: 1.25,
    autoRotate: true,
    values: [
        {x: 100, y: -20}, {x: 300, y: 10}, {x: 500, y: 100},
        {x: 750, y: -100}, {x: 350, y: -50}, {x: 600, y: 100}, {x: 800, y: 0},
        {x: window.innerWidth, y: -350}
    ]
}

//viz-1
const tween = new TimelineLite(); 


tween.add(
    TweenLite.to(".logo-2k", 1, {
        bezier: flightPath,
        ease: Power1.easeInOut

    })
);

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: ".viz-1",
    duration: 4000,
    triggerHook: 0

})
.setTween(tween)
.addIndicators()
.setPin('.viz-1')
.addTo(controller);

// viz-2

const tween1 = new TimelineLite(); 
tween1.add(
    TweenLite.to(".logo-aa", 1, {
        bezier: flightPath,
        ease: Power1.easeInOut

    })
);


const controller1 = new ScrollMagic.Controller();

const scene1 = new ScrollMagic.Scene({
    triggerElement: ".viz-2",
    duration: 4000,
    triggerHook: 0

})
.setTween(tween1)
.addIndicators()
.setPin('.viz-2')
.addTo(controller1);

// viz-3

const tween2 = new TimelineLite(); 
tween2.add(
    TweenLite.to(".logo-ed", 1, {
        bezier: flightPath,
        ease: Power1.easeInOut

    })
);


const controller2 = new ScrollMagic.Controller();

const scene2 = new ScrollMagic.Scene({
    triggerElement: ".viz-3",
    duration: 4000,
    triggerHook: 0

})
.setTween(tween2)
.addIndicators()
.setPin('.viz-3')
.addTo(controller2);

// viz-4

const tween3 = new TimelineLite(); 
tween3.add(
    TweenLite.to(".logo-pic01", 1, {
        bezier: flightPath,
        ease: Power1.easeInOut

    })
);


const controller3 = new ScrollMagic.Controller();

const scene3 = new ScrollMagic.Scene({
    triggerElement: ".viz-4",
    duration: 4000,
    triggerHook: 0

})
.setTween(tween3)
.addIndicators()
.setPin('.viz-4')
.addTo(controller3);