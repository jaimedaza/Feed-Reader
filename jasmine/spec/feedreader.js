/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('URL are defined', function(){
            allFeeds.forEach(function(index){
                expect(index.url).toBeDefined();
                expect(index.url.length).not.toBe(0);

            });
         });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('Names are defined', function(){
            allFeeds.forEach(function(index){
                expect(index.name).toBeDefined();
                expect(index.name.length).not.toBe(0);

            });
         });
    });


    /* Test suite for The menu */

    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */

         it('Hidden menu element', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);            
         });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('Menu change on click', function(){
            var menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
            
          });

    });

    /* Test suite named "Initial Entries" */

    describe('Initial Entries', function(){
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done){
            loadFeed(0, done);
         });

         it('1 entry after loadFeed is called', function(done){
            const entry = document.querySelector('.feed').getElementsByClassName('entry');
            expect(entry.length).toBeGreaterThan(0);
            done();
         });
    });

    /* Test suite named "New Feed Selection" */

    describe('New Feed Selection', function(){
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var firstFeed;

         beforeEach(function(done){
            loadFeed(0, function(){
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1 , done);
            });
         });

         it('Feed content change', function(){
            var secondFeed = document.querySelector('.feed').innerHTML;
            expect(firstFeed).not.toBe(secondFeed);
         });
    });
}());
