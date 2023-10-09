var guess = 1
var wordGuess, randomWord, wordExists
var playing = true
var $input

function getInput(){    
    wordGuess = $('#word'+guess).val().toLowerCase()
    wordExists = checkWord(wordGuess)
    if (!validator(wordGuess)){return} }

function completeTurn(){
    document.getElementById("word"+guess).outerHTML = checkGuess(wordGuess, guess)
    if(playing != false){
        guess = guess + 1
        $('#word'+guess).prop('disabled', false) } 
    $('#word'+guess).focus(); }

function checkGuess(wordGuess){
  var randomWordCopy = ""
  var clueWord = ""
  if(wordGuess == randomWord){    
    clueWord = "<span class='clue correct'>" + wordGuess + "</span>"; endGame('win')
  }else{
    randomWordCopy = removeMatches(randomWord, wordGuess, randomWordCopy)
    for(var i=0; i<5; i++){
      if(wordGuess[i] == randomWord[i]){
        clueWord = makeTag(clueWord, 'correct', wordGuess[i])
        randomWordCopy = randomWordCopy.replace(wordGuess[i], "_")
        keyColor('green', randomWord[i])
      } else if(randomWordCopy.includes(wordGuess[i])){
        clueWord = makeTag(clueWord, 'almost', wordGuess[i], 'letter'+i)
        randomWordCopy = randomWordCopy.replace(wordGuess[i], "_")
        keyColor('yellow', wordGuess[i])
      }else{
        clueWord = makeTag(clueWord, 'not', wordGuess[i], 'letter'+i)
        keyColor('lightgray', wordGuess[i])
      } } }//end if
  if ((guess == 5) && (wordGuess != randomWord)){endGame('lose')}
  else{
  return "<p class='clue'>" + clueWord + "</p>"} }//end checkGuess

  function makeTag(clueWord, tagClass, letter, randomWordCopy, id=""){
    clueWord = clueWord + "<span class='" + tagClass + "' id='" + id + "'>" + letter + "</span>"
    return clueWord  }

function keyColor(color, key){
  var keyboardLetter = '#' + key
  $(keyboardLetter).css("background-color", color) }

function endGame(outcome){
  $('#guessButton').prop("disabled", true)
  playing = false
  if(outcome == 'win'){$('#feedback').html('Great')}
  else if(outcome == 'lose'){$('#feedback').html('The word was ' + randomWord)}}

function validator(guessWord){
  if((guessWord == "") || (guessWord.length != 5)){
    $('#feedback').html("Invalid word length"); return false;
  } else {$('#feedback').html(""); return true }}

function removeMatches(randomWord, guessWord, unmatchedWord){
  unmatchedWord = randomWord
  for (var i=0; i<5; i++){
    if(guessWord[i] == randomWord[i]){
      unmatchedWord = unmatchedWord.replace(unmatchedWord[i], "_") }
  } return unmatchedWord }

var pressEnter= function(e) {
    if (e.keyCode == 13) {
        getInput()
        return false;}
    else { return true; }}

function getLetter(){
  var letter = $(this).text()
  var inputField = '#word' + guess
  if(letter != 'back'){
      $(inputField).val(function(i, currentValue){return currentValue + letter})
  }else{
      var word = $(inputField).val() 
      word = word.slice(0, -1)
      $(inputField).val(word) }  }
$('.key').click(getLetter);

let endpoint = 'https://random-word-api.vercel.app/api?words=1&length=5'

$.ajax({
  url: endpoint,
  dataType: 'json',
  success : function(result){
    randomWord = result[0]
    randomWord = JSON.stringify(randomWord)
    randomWord = randomWord.replaceAll('"', "")
    console.log(randomWord)  }})

function checkWord(wordGuess){
  let key = 'FAO2WuWh3MNiR55dI69rzQ==7xWHEmvK1dZ20EvC'
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/dictionary?word=' + wordGuess,
    headers: { 'X-Api-Key' : key },
    contentType: 'application/json',
    success: function(result){let isValid = result.valid
                              if (isValid){ $('#feedback').html(""); completeTurn()}
                              else { $('#feedback').html("Not a real word according to api ");}   },
    error: function ajaxError(jqXHR){ console.error ('Error: ', jqXHR.responseText) }  })  }