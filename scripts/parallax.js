let ground_1 = document.getElementById("ground_1");
        let ground_2 = document.getElementById("ground_2");
        let ground_3 = document.getElementById("ground_3");
        let clouds_1 = document.getElementById("clouds_1");
        let clouds_2 = document.getElementById("clouds_2");

        let rocks = document.getElementById("rocks");
        let center = document.getElementById("center");

        window.addEventListener('scroll', function(){
            var valueY = window.scrollY;

            ground_3.style.top = valueY * 0.15 + 'px';
            ground_2.style.top = valueY * 0.25 + 'px';
            ground_1.style.top = valueY * 0.30 + 'px';
            rocks.style.top = valueY * 0.35 + 'px';

            clouds_1.style.left = -valueY * 0.2 + 'px';
            clouds_2.style.left = valueY * 0.2 + 'px';

            center.style.top = valueY * 0.8 + 'px';
        })