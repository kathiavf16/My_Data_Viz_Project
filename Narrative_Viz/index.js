const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: ".block1",
    duration: 500,
    triggerHook: 0

})
.setClassToggle(".block1", "show")
//.addIndicators()
.setPin('.block1')
.addTo(controller);

// viz-2

const controller1 = new ScrollMagic.Controller();

const scene1 = new ScrollMagic.Scene({
    triggerElement: ".block2",
    duration: 500,
    triggerHook: 0

})
.setClassToggle(".block2", "show")
//.addIndicators()
.setPin('.block2')
.addTo(controller1);

// viz-3

const controller2 = new ScrollMagic.Controller();

const scene2 = new ScrollMagic.Scene({
    triggerElement: ".block3",
    duration: 500,
    triggerHook: 0

})
.setClassToggle(".block3", "show")
//.addIndicators()
.setPin('.block3')
.addTo(controller2);

// viz-4


const controller3 = new ScrollMagic.Controller();

const scene3 = new ScrollMagic.Scene({
    triggerElement: ".block4",
    duration: 500,
    triggerHook: 0

})
.setClassToggle(".block4", "show")
//.addIndicators()
.setPin('.block4')
.addTo(controller3);

// viz-5

const controller4 = new ScrollMagic.Controller();

const scene4 = new ScrollMagic.Scene({
    triggerElement: ".block5",
    duration: 500,
    triggerHook: 0

})
.setClassToggle(".block5", "show")
//.addIndicators()
.setPin('.block5')
.addTo(controller4);

//footer

const controller5 = new ScrollMagic.Controller();

const scene5 = new ScrollMagic.Scene({
    triggerElement: ".footer",
    duration: 500,
    triggerHook: 0

})
.setClassToggle(".footer", "show")
//.addIndicators()
.setPin('.footer')
.addTo(controller5);