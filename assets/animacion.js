document.getElementById("myBtn").onclick = function() {myFunction()};
// para desplegar las opciones
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById('style1').classList.add('nule');
    document.getElementById('style2').classList.add('nule');
}
// para hacer aparecer el tutorial
document.getElementById('tutorial').onclick = function(){

    document.getElementById('guia1').classList.add('guia1x');
    document.getElementById('guia1').classList.remove('guia1');
    document.getElementById('paragraph').classList.add('paragraph');
    document.getElementById('paragraph').classList.remove('paragraphx');
    document.getElementById('img').classList.add('img');
    document.getElementById('img').classList.remove('imgx');
    document.getElementById('tutorial').classList.add('tutorialx');
    document.getElementById('tutorial').classList.remove('tutorial');
    document.getElementById('stop').classList.add('stop');
    document.getElementById('stop').classList.remove('stopx');


}
// para hacer desaparecer el tutorial
document.getElementById('stop').onclick = function(){
   
    document.getElementById('guia1').classList.add('guia1');
    document.getElementById('guia1').classList.remove('guia1x');
    document.getElementById('paragraph').classList.add('paragraphx');
    document.getElementById('paragraph').classList.remove('paragraph');
    document.getElementById('img').classList.add('imgx');
    document.getElementById('img').classList.remove('img');
    document.getElementById('tutorial').classList.add('tutorial');
    document.getElementById('tutorial').classList.remove('tutorialx');
    document.getElementById('stop').classList.add('stopx');
    document.getElementById('stop').classList.remove('stop');


}
// para desplegar los botones "vertical" y "horizontal"
document.getElementById('style').onclick = function(){
    document.getElementById('style1').classList.remove('nule');
    document.getElementById('style2').classList.remove('nule');
}
// para hacer que el boton vertical funcione
document.getElementById('style1').onclick = function(){
    document.getElementById('todos-container').classList.add('todos')
    document.getElementById('todos-container').classList.remove('todos1')
}
// para hacer que el boton horizontal funcione
document.getElementById('style2').onclick = function(){
    document.getElementById('todos-container').classList.add('todos1')
    document.getElementById('todos-container').classList.remove('todos')
}

