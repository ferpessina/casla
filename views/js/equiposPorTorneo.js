$("#elegirEquipo1").hide();
$("#elegirEquipo2").hide();

$("#torneoSelect").change(function(){
	if($("#torneoSelect").val()=="none"){
		$("#elegirEquipo1").hide();
		$("#elegirEquipo2").hide();
	} else {
		$('#equipo1Select').empty();
		$('#equipo2Select').empty();
		$("#elegirEquipo1").show();
		$("#elegirEquipo1").css("visibility","visible");
		$("#elegirEquipo2").show();
		$("#elegirEquipo2").css("visibility","visible");
		var idTorneo = $("#torneoSelect").val();
		$.get('http://localhost:3000/torneo/'+idTorneo+'/equipos', function(data) {
		  	for (var i = 0; i < data.equipos.length; i++) {
		  		$("#equipo1Select").append('<option value='+data.equipos[i]._id+'>'+data.equipos[i].nombre+'</option>');
		  		$("#equipo2Select").append('<option value='+data.equipos[i]._id+'>'+data.equipos[i].nombre+'</option>');
		  	};
		});
	}

});
