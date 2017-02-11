$("#roleSelect").change(function(){
	if($("#roleSelect").val()=="ADMIN")
		$('#formRegistro').attr('action', '/signupadmin');
	else {
		if($("#roleSelect").val()=="PLANILLERO")
			$('#formRegistro').attr('action', '/signupplanillero');
		else
			$('#formRegistro').attr('action', '/signup');
	}
});

$("#buscadorUsuario").keyup(function(){
	$("#datosUsers").empty();
	var username = $("#buscadorUsuario").val();
	if(username){
		$.get('http://localhost:3000/user/username/'+username, function(users) {
			showUsers(users);
		});
	} else {
		$.get('http://localhost:3000/user/notAdmins', function(users) {
			showUsers(users);
		});
	}
	

});

$(document).on( "click", ".deleteUser", function(e){
	e.preventDefault();
	var id = $(this).attr("id");
	if (confirm("Seguro que desea eliminar al usuario?")) {
        $("#"+id).submit();
    }
});

function showUsers(users){
			var html = "";
			for (var i = 0; i < users.length; i++) {
				html += '<li class="clearfix">'+
					'<div class="subPoint_table">'+
	                   '<div class="headline01 largepoint1">'+users[i].email+'</div>'+
	                   '<div class="headline01 largepoint1">'+users[i].role+'</div>'+
	                   '<div class="headline01 smallpoint1">';
	            if (users[i].role == "ADMIN") {
	            	html += "No disponible";
	            } else {
	            	html += '<form class="deleteUser" id="'+users[i]._id+'" action="/deleteUser" method="post">'+
	                		  	'<button type="submit" id='+users[i]._id+'>Eliminar</button>'+
	                			'<input type="hidden" value='+users[i]._id+' name="userid"/></form>';
	            }
	            html += '</div></div></li>';
			};
			$("#datosUsers").append(html);
}
