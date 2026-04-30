$(document).ready(function(){
    let worldX = 0;
    const world = document.getElementById('world');
    const overlay = document.querySelector('.fade-overlay');
    const oakText = document.querySelector('.oak-text-overlay');
    // Reset position on load just to be safe
    world.style.transform = `translateX(0px)`;

    window.panRight = function(){
        // Prevent double-clicking issues
        if (world.classList.contains('blur')) return;

        world.classList.add('blur');
        setTimeout(() => overlay.classList.add('active'), 150);

        setTimeout(() => {
            worldX = -1530; // Move to the Grass (View 2)
            world.style.transform = `translateX(${worldX}px)`;
        }, 600);

        setTimeout(() => overlay.classList.remove('active'), 1000);
        setTimeout(() => world.classList.remove('blur'), 1600);
    };

    window.panLeft = function(){
        if (world.classList.contains('blur')) return;

        world.classList.add('blur');
        setTimeout(() => overlay.classList.add('active'), 150);

        setTimeout(() => {
            worldX = 1530; // Move to the Dog (View 3)
            world.style.transform = `translateX(${worldX}px)`;
        }, 600);

        setTimeout(() => overlay.classList.remove('active'), 1000);
        setTimeout(() => world.classList.remove('blur'), 1600);
    };




    //Whenever the user clicks the go back button, return to the first view
    document.querySelectorAll('.view2 h5, .view3 h5').forEach(button => {
        button.addEventListener('click', () => {
            if (world.classList.contains('blur')) return;
            world.classList.add('blur');
            setTimeout(() => overlay.classList.add('active'), 150);

            setTimeout(() => {
                worldX = 0;
                world.style.transform = `translateX(${worldX}px)`;

                // show overlay text once back in view1
                oakText.classList.remove('force-hide');
            }, 600);

            setTimeout(() => overlay.classList.remove('active'), 1000);
            setTimeout(() => world.classList.remove('blur'), 1600);
        });
    });

    // When the user clicks on the northeast arrow in view 2, zoom in the direction of trees 1, 2, and 3 (staying in view 2 but zooming in on the trees))
    document.querySelector('.northwest_arrow').addEventListener('click', () => {
        if (world.classList.contains('blur')) return;

        // Start the transition effects
        world.classList.add('blur');
        overlay.classList.add('active');

        setTimeout(() => {
      
            // FOR ZOOMING IN
            // MUST include translateX(${worldX}px) or the world will snap back to center
            world.style.transformOrigin = "0% 40%"; //target top left trees and sidewalk
            world.style.transform = `translateX(${worldX}px) scale(4)`; 

            // REVEAL THE PEOPLE
            const people = document.querySelector('.people_container');
            people.style.opacity = "1";
            document.querySelectorAll('.person').forEach(p => p.classList.add('walking'));
            // Remove the oak-text-overlay when zoomed in on the tres
            oakText.classList.add('force-hide');


            // Clear the blur to see the zoomed trees
            world.classList.remove('blur');
            overlay.classList.remove('active');
        }, 600);

    });

//REVEAL THE DOG TALKING IN VIEW 3
$(document).ready(function(){
    // Find the box and the view3 container
    const box = document.querySelector('.magic-box');
    const view3 = document.querySelector('.view3');

    box.addEventListener('click', function(e) {
        // Stop the click from "bubbling up" to the rest of the page
        e.stopPropagation(); 
        
        // Toggle the background swap on the parent container
        view3.classList.toggle('swapped');
        
        // Change the text of the box based on the state
        if (view3.classList.contains('swapped')) {
            this.innerText = "RESTORE";
        } else {
            this.innerText = "CLICK ME";
        }
    });

});

//FOR ZOOMING OUT FROM THE TREES AND PEOPLE
document.querySelector('.zoom-back').addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent clicking through to the world



    const world = document.getElementById('world');
    const people = document.querySelector('.people_container');

    // Zoom back out
    world.style.transform = `translateX(0px) scale(1)`;
    
    // Hide the people and the button
    people.style.opacity = "0";
    oakText.classList.remove('force-hide'); // show the oak text again

    // Reset the transform origin after the animation finishes
    setTimeout(() => {
        world.style.transformOrigin = "50% 50%";
        // Stop the walking animation
        document.querySelectorAll('.person').forEach(p => p.classList.remove('walking'));
    }, 1200);
});



});

