

function agecategory(catlow){
var category;
switch(catlow.toString()){
    case '18':
        category="18-24";
        break;
    case '25':
        category="25-29";
        break;
    case '30':
        category="30-34";
        break;
    case '35':
        category="35-39";
        break;
    case '40':
        category="40-44";
        break;
    case '45':
        category="45-49";
        break;
    case '50':
        category="50-54";
        break;
    case '55':
        category="55-59";
        break;
    case '60':
        category="60+";
        break;
}
    return category;

}


function pace1(velocity){

          var velf=parseFloat(velocity);
          var finishTime = 5000/velf ;
          var minutes = Math.floor(finishTime / 60);
          var seconds = Math.floor(finishTime - minutes * 60);
          var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
          var pace=  finishTime/5; //velocity m/s -> pace min/km   => finishTime/5 = seconds/km 
          minutes = Math.floor(pace / 60);
          seconds = Math.floor(pace - minutes * 60);
          var finalPace = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
          return finalPace;
}

function finishtime1(velocity){

          var velf=parseFloat(velocity);
          var finishTime = 5000/velf ;
          var minutes = Math.floor(finishTime / 60);
          var seconds = Math.floor(finishTime - minutes * 60);
          var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
          return finalTime; 
}



function pad(number, length) {

  var str = '' + number;
  while (str.length < length) {
      str = '0' + str;
  }
  return str;
}

function str_pad_left(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}


function racetype(race_type){
var category;
switch(race_type){
    case 'N':
        category="5K SOCIAL";
        break;
    case 'C':
        category="5K RACE";
        break;
}
    return category;
}
