
//acontinuacion exporto los modulos traidos con npm install {modulo} --save}

var express = require('express');//express me sirve para manejar mas facilmente las solicitudes HTTP y para pasar las variables del controlador app.js a las vistas

var bodyParser = require('body-parser');//bodyparse permite traer el body de una solicitud
var app = express(); 

var request = require("request")

app.use("/public",express.static('public'));//especifico una carpeta estatica para imagenes y css

//habilito el bodyparser para que formatee en texto o json
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.use(express.static(__dirname + '/views'));//sirvo otro archivo estatico para las vistas

app.set('view engine','pug');//como motor de vistas eligo pug, ya que se adapta rapidamente a express


//app.get me permite traer una vista .pug y enmarcararla con una url "/home.html"
//el motor pug tiene unas caracteristicas especiales para anotar html
app.get('/home.html',function(req,res)
{
	var url = "https://jsonplaceholder.typicode.com/posts"; //url con el JSON
	//configuro el modulo request para que funcione con json
	request({url: url,json: true}, function (error, response, body) 
	{
		//cuando no haya error y al traer los post el status code sea exitoso (200), extraiga los titulos
    if (!error && response.statusCode === 200) 
    {
       
    	//se extraen los cinco primeros titulos accediendo a los indices del JSON
        var title1 = body[0].title;
        var title2 = body[1].title;
        var title3 = body[2].title;
        var title4 = body[3].title;
        var title5 = body[4].title;
       	
       	//los paso al motor de vistas a traves del segundo parametro del render
        res.render("home",{msg1:title1,msg2:title2,msg3:title3,msg4:title4,msg5:title5}); //cuando alguien entre a /home.html, automaticamente se renderiza la vista home

    }
})
});

//si en la url se especifica localhost:3333/api/ ,automaticamente se renderizara una vista "hola" que le
app.get('/api/',function(req,res)
	{

		res.render("hola",{mgs:"hola"});
		console.log(JSON.stringify(req.body.name));
		
	});

app.get('/api/user',function(req,res)
	{
		res.render("new"); //renderiza el formulario para ingresar el nombre
	});

//la siguiente funcion es llamada desde el form new.pug, trayendo el name con bodyParser
app.post('/api/result',function(req,res)
	{
		
		console.log(JSON.stringify(req.body.name)); //muestra en consola el nombre
		var mensaje = "Hola "+String(req.body.name); // concatena un mensaje con el nombre recibido en el body
		res.render("user",{msg:mensaje}); //renderiza user.pug y le pasa el mensaje con el nombre recibido.
	});

app.get('',function(req,res)
	{

	});

app.listen(3333); //establece el puerto de escucha en 3333