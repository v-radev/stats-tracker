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
        clicked: [],
        mouse: []
    };

    this.mouseoverData = [];

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
    //Mouse movements
    if ( self.mouseEnabled ){
        self.summarizeMouseOvers();
        self.data.mouse = self.mouseoverData;
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
        elmntData,
        elmnt;

    jQuery(document).on('mouseover', function(e) {

        elmntData = {};

        elmnt = jQuery(e.target);
        elmntData.id = elmnt.attr('id');
        elmntData.class = elmnt.attr('class');
        elmntData.tag = elmnt.prop('tagName');

        //If element has no id
        if ( typeof elmntData.id == 'undefined' ){ return; }

        //Record move
        self.recordMouseOver( elmntData );
    });
};

Stats.prototype.recordMouseOver = function( data ){

    var self = this;

    //Ignore
    if ( self.ignoreMouseClasses.length || self.ignoreMouseElements.length ){
        //Ignore by type or by class
        if (
            self.ignoreMouseClasses.indexOf(data.class) > -1 ||
            self.ignoreMouseElements.indexOf(data.tag) > -1
        ){ return; }
    }

    if (typeof(data.class) == 'undefined'){ data.class = ''; }
    if (typeof(data.id) == 'undefined'){ data.id = ''; }

    //Track
    if ( self.whitelistMouseClasses.length || self.whitelistMouseElements.length ){
        //If link is in tracked
        if (
            self.whitelistMouseClasses.indexOf(data.class) > -1 ||
            self.whitelistMouseElements.indexOf(data.tag) > -1
        ){
            self.mouseoverData.push(data);
        }
    } else {
        self.mouseoverData.push(data);
    }
};

Stats.prototype.summarizeMouseOvers = function(){

    var self = this,
        data = {},
        i,
        obj,
        keyName;

    for (i = 0; i < self.mouseoverData.length; i++) {
        obj = self.mouseoverData[i];

        if ( !obj.id ){
            keyName = obj.tag +'.'+ obj.class;
        } else if ( !obj.class ) {
            keyName = obj.tag +'#'+ obj.id;
        } else {
            keyName = obj.tag +'#'+ obj.id +'.'+ obj.class;
        }

        if ( data.hasOwnProperty(keyName) ){
            data[keyName] += 1;
        } else {
            data[keyName] = 1;
        }
    }

    self.mouseoverData = data;
};
