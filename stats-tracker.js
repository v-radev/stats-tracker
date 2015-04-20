/**
 * Statistics tracking functions
 * @author V.Radev <mail@radev.info>
 */
var Stats = function(){
    this.timeEnabled = true;
    this.linksEnabled = true;
    return this;
};

Stats.prototype.write = function(){
    //TODO add data to object, with default values and overwrite them in the methods and then send this object with ajax
    console.log( 'Record statistics' );//TODO
};

Stats.prototype.track = function(){

    var self = this;

    if ( self.linksEnabled ){
        self.trackLinks();
    }

    if ( self.timeEnabled ){
        self.trackTime();
    }


    //TODO time, areas, links, hovers, mouse x and y, elements hovered, track custom elements hover, etc.
};

Stats.prototype.trackLinks = function(){

    $(document).on('click', 'a', function(e) {
        //TODO add this link to array of clicked

        //Make some way of whitelist or blacklist with class
        console.log($(this).attr('id'));//TODO
        console.log($(this).attr('class'));//TODO
    });
};


Stats.prototype.trackTime = function(){
    //TODO track time
};


//TODO check these
//{"id":"4216729","module":"frontend","controller":"index","action":"index","params":"a:3:{s:6:\"module\";s:8:\"frontend\";s:10:\"controller\";s:5:\"index\";s:6:\"action\";s:5:\"index\";}","url":"/frontend/","session_id":"jjpdcqtganeg1jvk0hjit0lc36","visitor_id":"1","user_id":null,"visual_id":null,"content_id":null,"invitation_id":null,"basket_id":null,"entered":"2015-04-20 11:27:28","left":null,"duration":"0","os":"Ubuntu","browser":"Firefox 33.0","resolution":"1920x1080"}

//{"id":"4216730","module":"frontend","controller":"view","action":"info-press","params":"a:4:{s:6:\"module\";s:8:\"frontend\";s:10:\"controller\";s:4:\"view\";s:6:\"action\";s:10:\"info-press\";s:2:\"id\";s:4:\"1822\";}","url":"/frontend/view/info-press/id/1822/","session_id":"jjpdcqtganeg1jvk0hjit0lc36","visitor_id":"1","user_id":null,"visual_id":null,"content_id":null,"invitation_id":null,"basket_id":null,"entered":"2015-04-20 11:27:44","left":null,"duration":"0","os":"Ubuntu","browser":"Firefox 33.0","resolution":"1920x1080"}