function startSpel(){
	const holes = document.querySelectorAll(".hole");
	const popover = document.getElementById("popover"); 
	const startButton = document.getElementById("startButton"); 
	const endButton = document.getElementById("endButton"); 
	const popStats = document.getElementById("popstats"); 
	const popText = document.getElementById("poptext"); 	
	const scoreDisplay = document.getElementById("score"); 
	const timerDisplay = document.getElementById("timer"); 

	let timer; 
	let countdown; 
	let moleInterval; 

	let score = 0; 
	let pointsplus=0;
	
	//als het een mobile is met touchscreen werkt touchstart event veel sneller dan click:
	let touchEvent;
	if('ontouchstart' in window){
		touchEvent="touchstart";
	}else{
		touchEvent="mousedown";
	}

	//functie wordt opgeroepen na click op startbutton
	function startGame() { 
		//reset game stats
		score = 0; 
		timer = 30; 
		scoreDisplay.textContent = `Score: ${score}`; 
		popStats.textContent = `Score: ${score}`; 
		timerDisplay.textContent = `Time: ${timer}s`; 

		// setInterval([functie], [tijd in ms])
		// laat de tijd aflopen:
		countdown = setInterval( function(){ 
			timer--; //timer=timer-1; 
			//update de tekst timer
			timerDisplay.textContent = `Time: ${timer}s`; 
			// is tijd verstreken?
			if (timer <= 0) { 
				clearInterval(countdown); 
				endGame();
			} 
		} , 1000); 

		// laat de eerste verschijnen
		moleInterval = setTimeout( function(){ 
			comeout(); 
		}, (700-(score*10) + Math.random() * 700)); 

		popover.style.visibility="hidden";
		endButton.style.visibility="visible";
		
	} 

	function clearholes(){
		holes.forEach(hole => {
			/// haal image weg, kid of dynamite beide
			hole.style.backgroundImage = "url('')";
			// en remove de click/touch handling
			hole.removeEventListener( touchEvent, handleMole); 
		}); 
	}

	// functie wordt aangeroepen an timeout
	function comeout() { 
		clearholes();
		
		// pak een van de posities
		let rndhole=Math.floor( Math.random() * 7 );
		let htmlhole = holes[rndhole]; 
		
		// 70% kans op heks
		if(Math.floor(Math.random() * 10) > 3){
			// we hebben een heks
			pointsplus=1;
			htmlhole.style.backgroundImage = "url('./img/no_"+rndhole+".png')";
		}else{
			//en anders is het de Kid
			pointsplus=-1;
			htmlhole.style.backgroundImage = "url('./img/ye_"+rndhole+".png')";
		}
		htmlhole.addEventListener(touchEvent, handleMole);
		//roep nog een keer de comeOut aan op een iets andere tijd interval 
		moleInterval = setTimeout( function(){ 
			comeout(); 
		}, (700-(score*10) + Math.random() * 700));
	} 

	// functie wordt opgeroepen na whack
	function handleMole() { 
		score+=pointsplus; 
		scoreDisplay.textContent = `Score: ${score}`; 
		this.style.backgroundImage = "url('')";
	} 

	//functie wordt opgeroepen na click op stopknop
	function endGame() {
		clearInterval(countdown); 
		clearInterval(moleInterval); 

		popStats.textContent = `Score: ${score}`

		endButton.style.visibility="hidden";
		if(score < 10 ){
			popText.textContent = `Prima hoor...`;
		}else  { 
			popText.textContent = `Goed gedaan!`;
		}
		if(score < 0 ){
			popText.textContent = `Niet zo goed!`;
		}

		clearholes();
		popover.style.visibility="visible";
	} 
	
	
	// start code

	startButton.addEventListener(touchEvent, startGame); 
	endButton.addEventListener(touchEvent, endGame); 

}