$("#dataPartidosConFecha").hide();

$("#fechaSelect").change(function(){
	if($("#fechaSelect").val()=="none"){
		$("#dataPartidosConFecha").hide();
		$("#dataPartidosConFecha").empty();
	} else {
		$("#dataPartidosConFecha").show();
		$("#dataPartidosConFecha").css("visibility","visible");
		$("#dataPartidosConFecha").empty();

		var fecha_numero = $("#fechaSelect").val();
		$.get('http://localhost:3000/partido/fecha_numero/'+fecha_numero, function(partidos) {
			$.get('http://localhost:3000/equipo', function(equipos) {
				$.get('http://localhost:3000/torneo', function(torneos) {

					var equiposMap =  {};
	                for (var i = 0; i < equipos.length; i++) {
	                    equiposMap[equipos[i]._id] = equipos[i].nombre;
	                };
	                var torneosMap =  {};
                    for (var i = 0; i < torneos.length; i++) {
                        torneosMap[torneos[i]._id] = torneos[i].nombre;
                    };

					var html = "";
				  	for (var i = 0; i < partidos.length; i++) {
				  		html += '<li class="clearfix">';
				  		html += '<div class="subPoint_table">';
				  		html += '<div class="headline01 largepoint1">'+partidos[i].estado+'</div>';
				  		html += '<div class="headline01 largepoint1">'+equiposMap[partidos[i].equipo1]+'</div>';
				  		html += '<div class="headline01 largepoint1">';
				  		if(partidos[i].marcador_equipo_1 == undefined ){
				  			html += "0";
				  		} else {
				  			html += partidos[i].marcador_equipo_1;
				  		}
				  		html += "</div>";
				  		html += '<div class="headline01 largepoint1">';
				  		if(partidos[i].marcador_equipo_2 == undefined ){
				  			html += "0";
				  		} else {
				  			html += partidos[i].marcador_equipo_2;
				  		}
				  		html += "</div>";
				  		html += '<div class="headline01 largepoint1">'+equiposMap[partidos[i].equipo2]+'</div>';
				  		html += '<div class="headline01 largepoint1">'+partidos[i].fecha_numero+'</div>';

				  		html += '<div class="headline01 largepoint1">'+partidos[i].amonestados+'</div>';
				  		html += '<div class="headline01 largepoint1">'+partidos[i].expulsados+'</div>';
				  		html += '<div class="headline01 largepoint1">'+partidos[i].cambios+'</div>';
				  		html += '<div class="headline01 largepoint1">'+partidos[i].cambios+'</div>';
				  		html += '<div class="headline01 largepoint1">'+formatDate(partidos[i].fecha)+'</div>';
				  		html += '<div class="headline01 largepoint1">'+torneosMap[partidos[i].torneo]+'</div>';

				  		html += '<div class="headline01 largepoint1 row row">'+
				  				'<div class="headline01 smallpoint1"><span>';
				  				'<form onsubmit="return confirm("Seguro que desea eliminar al partido '+ equiposMap[partidos[i].equipo1] +' VS '+ equiposMap[partidos[i].equipo2] +'?"");" action="/deletePartido" method="post">'+
				  					'<button type="submit">Eliminar</button>'+
				  					'<input type="hidden" value='+ partidos[i]._id +' name="partidoid"/>'+
				  				'</form></span></div></div></div></li>';
				  	}
				  	$("#dataPartidosConFecha").append(html);
				});
			});
		});
	}
});


function formatDate(date){
	dteSplit = date.split("-");
	year = dteSplit[0];
	month = dteSplit[1];
	day = dteSplit[2][0] + dteSplit[0][1];
	return day+"/"+month+"/"+year;
}

//CODIGO QUE IRIA SI LA LOGICA FUERA EN LA VISTA
// <% for(var i=0; i < partidos.length; i++) { %> 
//       					             <li class="clearfix">
//                               <div class="subPoint_table">
//                                 <div class="headline01 largepoint1"><%= partidos[i].estado %></div>
//                                 <div class="headline01 largepoint1"><%= equipos[partidos[i].equipo1] %></div>
//                                 <div class="headline01 largepoint1">
//                                   <% if (partidos[i].marcador_equipo_1 == undefined )  { %>
//                                       0
//                                 <% } else { %>
//                                     <%= partidos[i].marcador_equipo_1 %>
//                                 <% } %>
//                                 </div>
//                                 <div class="headline01 largepoint1">
//                                   <% if (partidos[i].marcador_equipo_2 == undefined )  { %>
//                                       0
//                                 <% } else { %>
//                                     <%= partidos[i].marcador_equipo_2 %>
//                                 <% } %>
//                                 </div>
//                                 <div class="headline01 largepoint1"><%= equipos[partidos[i].equipo2] %></div>
//                                 <div class="headline01 largepoint1"><%= partidos[i].fecha_numero %></div>
//                                 <div class="headline01 largepoint1"><%= moment(partidos[i].fecha).format( 'DD MMM, YYYY') %></div>
//                                 <div class="headline01 largepoint1"><%= torneos[partidos[i].torneo] %></div>
//                                 <div class="headline01 largepoint1"><%= partidos[i].amonestados %></div>
//                                 <div class="headline01 largepoint1"><%= partidos[i].expulsados %></div>
//                                 <div class="headline01 largepoint1"><%= partidos[i].goles %></div>
//                                 <div class="headline01 largepoint1"><%= partidos[i].cambios %></div>


//                                 <div class="headline01 largepoint1 row row">
//                   							<div class="headline01 smallpoint1"><span>
//                   								<form onsubmit="return confirm('Seguro que desea eliminar al partido <%= equipos[partidos[i].equipo1] %> VS <%= equipos[partidos[i].equipo2] %>?');" action="/deletePartido" method="post">
//                   					                <button type="submit">Eliminar</button>
//                   					                <input type="hidden" value=<%= partidos[i]._id %> name="partidoid"/>
//                   					            </form>
//                   							</span></div>
//                   						  </div>
//                   						</div>
//                             </li>
//                             <% } %>