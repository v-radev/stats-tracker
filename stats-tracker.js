/**
 * Statistics tracking functions
 * @author V.Radev <mail@radev.info>
 */

//TODO have to able to pass custom params to this.data like user_id, category, etc.

var Stats = function(){
    this.startTime = null;
    this.mouseoverTime = null;

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

    this.whitelistMouseElements = [];
    this.ignoreMouseElements = [];

    this.whitelistMouseClasses = [];
    this.ignoreMouseClasses = [];

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

    var self = this,
        moveCounter = 0,
        summarizeMoves = 10,
        elmnt,
        elmntId,
        elmntTag;

    //TODO
    self.mouseoverTime = new Date().getTime();

    jQuery(document).on('mouseover', function(e) {

        moveCounter++;

        elmnt = jQuery(e.target);
        elmntId = elmnt.attr('id');
        elmntTag = elmnt.prop('tagName');

        //If element has no id
        if ( typeof elmntId == 'undefined' ){
            moveCounter--;
            return;
        }

        //Maybe track the time the user is on the element?
        //And in the summarizing delete below 2s?

        //Record move
        self.recordMouseOver(elmnt.attr('class'), elmntTag);

        //Summarize data by element
        if ( moveCounter >= summarizeMoves ){
            self.summarizeMouseOvers();
            moveCounter = 0;
        }
    });
};

Stats.prototype.recordMouseOver = function( itemClass, itemType ){

    var self = this;

    //Ignore
    if ( self.ignoreMouseClasses.length || self.ignoreMouseElements.length ){
        //Ignore by type or by class
        if (
            self.ignoreMouseClasses.indexOf(itemClass) > -1 ||
            self.ignoreMouseElements.indexOf(itemType) > -1
        ){ return; }
    }

    //Track
    if ( self.whitelistMouseClasses.length || self.whitelistMouseElements ){
        //If link is in tracked
        if (
            self.whitelistMouseClasses.indexOf(itemClass) > -1 ||
            self.whitelistMouseElements.indexOf(itemType) > -1
        ){
            //TODO track
        }
    } else {
        //TODO track
    }
};

Stats.prototype.summarizeMouseOvers = function(){

    //TODO summarize by element id then by class where the id is undefined
    //But when you summarize the ids there would only be left classes

    //I should have an object where I record and one where I summarize
    //The trick will be to handle the first time when the sumObj is empty
    //Also when I sum after the first I should add to the num mouseovers in the sumObj
    //And if an element is not there I should add it

};
