/**
 * Statistics tracking functions
 * @author V.Radev <mail@radev.info>
 */

//TODO have to able to pass custom params to this.data like user_id, category, etc.

var Stats = function(){
    this.startTime = null;

    this.data = {
        date: Date(),
        time: null,
        clicked: []
    };

    this.timeEnabled = true;
    this.linksEnabled = true;
    this.mouseEnabled = true;

    this.ignoreLinks = [];
    this.trackOnlyLinks = [];

    return this;
};

Stats.prototype.write = function(){
    //TODO add data to object, with default values and overwrite them in the methods and then send this object with ajax

    var self = this;

    //Measure time on page in seconds
    if ( self.timeEnabled ){
        self.data.time = parseInt( (new Date().getTime() - self.startTime) / 1000 );
    }

    console.log( self.data );//TODO
};

Stats.prototype.track = function(){

    var self = this;

    if ( self.linksEnabled ){
        self.trackLinks();
    }

    if ( self.timeEnabled ){
        self.trackTime();
    }

    if ( self.mouseEnabled ){
        self.trackMouse();
    }

    //TODO areas, hovers, mouse x and y, elements hovered, track custom elements hover, etc.
};

Stats.prototype.addData = function( data ){
    //TODO this data should be array? or json?
    //And I should validate it somehow that is a valid json or array or object
    //And add to the this.data object
};

Stats.prototype.trackLinks = function(){

    var self = this;

    jQuery(document).on('click', 'a', function(e) {

        var $this     = jQuery(this),
            linkClass = $this.attr('class'),
            linkData  = {
                linkId:    $this.attr('id'),
                linkClass: linkClass,
                url:       $this.attr('href'),
                text:      $this.text()
            };

        if ( self.trackOnlyLinks.length ){
            //If link is in tracked
            if ( self.trackOnlyLinks.indexOf(linkClass) > -1 ){
                self.data.clicked.push(linkData);
            }
            return;//Do not track other links

        } else if ( self.ignoreLinks.length ) {
            //If link has to be ignored
            if ( self.ignoreLinks.indexOf(linkClass) > -1 ){ return; }
        }

        self.data.clicked.push(linkData);
    });
};

Stats.prototype.trackTime = function(){
    this.startTime = new Date().getTime();
};

Stats.prototype.trackMouse = function(){
    //TODO on mouse move add pageX and pageY to an object or array the +-5 summarize

    //TODO add some divs for test
    //Get only the id and the class of the element alto the element type
    //Make some array of ignored classes

    var moveCounter = 0,
        summarizeMoves = 10;

    jQuery(document).on('mouseover', function(e) {

        moveCounter++;

        console.log( $(e.target).attr('class') );//TODO

        //If class and id is undefined do not log this mouseover
        //And decrease the counter

        if ( moveCounter >= summarizeMoves ){
            //TODO summarize by element id then by class where the id is undefined
            //But when you summarize the ids there would only be left classes
            moveCounter = 0;
        }
    });
};
