// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = false;
     	this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="http://www.trendingtoplists.com/wp-content/uploads/2015/05/NBA_Logo.jpg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "php",
			img: "http://l.yimg.com/bt/api/res/1.2/cKmQKqkRP_CvqLJZSf75HA--/YXBwaWQ9eW5ld3NfbGVnbztmaT1maWxsO2g9MjMwO3E9NzU7dz0zNDU-/https://s.yimg.com/xe/i/us/sp/v/nba_cutout/players_l/20151027/4612.png",
			id: 1,
		},
		{
			name: "css3",
			img: "http://www.gannett-cdn.com/-mm-/ac1394dbdcca6a36cbf486633b129cd813095ac3/r=x404&c=534x401/local/-/media/USATODAY/gameon/2012/10/15/10-15-2012-michael-jordan-dribble-4_3.jpg",
			id: 2
		},
		{
			name: "html5",
			img: "http://videos.usatoday.net/Brightcove2/29906170001/2014/09/29906170001_3809140616001_Screen-Shot-2014-09-26-at-10-43-09-PM.jpg?pubId=29906170001",
			id: 3
		},
		{
			name: "jquery",
			img: "https://bradleysjohns.files.wordpress.com/2014/08/kareem-abdul-jabbar.jpg",
			id: 4
		}, 
		{
			name: "javascript",
			img: "http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/110.png&w=350&h=254",
			id: 5
		},
		{
			name: "node",
			img: "http://i.ytimg.com/vi/1wvJm485yQY/maxresdefault.jpg",
			id: 6
		},
		{
			name: "photoshop",
			img: "http://cdn2-b.examiner.com/sites/default/files/styles/image_content_width/hash/9f/ae/shaquilleoneal_1.jpg?itok=tiMYw1zk",
			id: 7
		},
		{
			name: "python",
			img: "http://www.basketballinsiders.com/wp-content/uploads/2014/01/Tim_Duncan_Spurs_2014_USAT3.jpg",
			id: 8
		},
		{
			name: "rails",
			img: "http://vignette4.wikia.nocookie.net/nba/images/a/af/Larry_Bird_33.jpg/revision/latest?cb=20120914230835",
			id: 9
		},
		{
			name: "sass",
			img: "https://blog-blogmediainc.netdna-ssl.com/upload/SportsBlogcom/1719308/0438573001438446906_filepicker.jpg",
			id: 10
		},
		{
			name: "sublime",
			img: "http://www.23yy.com/upload/2015/03/20/5fa7d66a-d46b-40a8-b1cb-998b4c373778.jpg",
			id: 11
		},
		{
			name: "wordpress",
			img: "https://s-media-cache-ak0.pinimg.com/736x/be/64/0b/be640bab642b2b7b190cfa189d3f70c4.jpg",
			id: 12
		},
	];
    
	Memory.init(cards);


})();