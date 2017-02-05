$("#elegirEquipo1").hide();
$("#elegirEquipo2").hide();

$( "#fecha" ).datepicker({
      dateFormat: 'yy-mm-dd',
      timezone: "UTC−4"
});

$("#torneoSelect").change(function(){
	if($("#torneoSelect").val()=="none"){
		$("#elegirEquipo1").hide();
		$("#elegirEquipo2").hide();
		$("#submitForm").prop('disabled', true);
	} else {
		$("#submitForm").prop('disabled', false);
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

$( "#submitForm" ).click(function(e){
	e.preventDefault();
	var equipo1 = $("#equipo1Select").val();
	var equipo2 = $("#equipo2Select").val();
	if (equipo1 == equipo2){
		alert("Los equipos deben ser distintos");
		return false;
	}
	var fecha = $("#fecha").val();
	if (!fecha){
		alert("Debe ingresar la fecha del partido");
		return false;
	}
	$( "#formAgregarPartido" ).submit();
});

