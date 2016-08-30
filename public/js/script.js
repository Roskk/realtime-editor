$(document).ready(function () {
        var socket = io.connect('http://localhost:3000');

        socket.on('updateTextbox',function(data) {
            $('#editor').val(data.textbox);
            // console.log(data.textbox);
        });

        $('#editor').on('input',function(){
            var textbox = $('#editor').val();
            socket.emit('textbox',{textbox: textbox});
            // console.log(textbox);
        });
// Add user
        $(function(){
            var socket = io.connect();
            var $userForm = $('#userForm');
            var $userFormArea = $('#userFormArea');
            var $users = $('#users');
            var $username = $('#username');
            var $editor = $('#editor');

            $userForm.submit(function(e){
                e.preventDefault();
                socket.emit('new user', $username.val(), function(data){
                    if(data){  
                        $userFormArea.hide();
                        $editor.show();

                    }
                });
                $username.val('');
            });

            socket.on('get users', function(data){
                var html = '';
                for(i = 0; i < data.length; i++){
                    html += '<li class="list-group-item">'+data[i]+'</li>'
                        ;
                }
                $users.html(html);
            });
        });
    }); 





// Save content to localStorage
var editor = document;

editor.addEventListener('DOMContentLoaded', function(){
  var savedContent = localStorage.getItem("editorcontent");
  if(savedContent != null){
    editor.getElementById("editor").value = savedContent;
  }
 
 
 editor.getElementById("editor").onkeyup = function(){
  var data = editor.getElementById("editor").value;  localStorage.setItem("editorcontent", data);
  }
});
// Save content to localStorage

