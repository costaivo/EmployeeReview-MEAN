
function checkPasswordMatch() 
                    {
                        var password1=document.getElementById('password').value;
                        var password2=document.getElementById('confirmpassword').value;

                        if(password1!=password2)
                        {   document.getElementById('errormessage').innerHTML="Passwords do not match";
                            return false;
                        }
                        else
                        {   document.getElementById('errormessage').innerHTML="Passwords match!";
                            return true;
                        }
                    }
                    
document.ready(function(){
                            document.getElementById('confirmpassword').keyup(checkPasswordMatch);
                    });
function authenticate1(){
	return true;
}

function authenticate()
                    {   var username=document.getElementById("user").value;
                        var userpass=document.getElementById("password").value;
						{% for usr in employee %}
							if(username==usr.username)
							{	if(userpass==usr.password)
								{	document.getElementById("loginform").action = "home.html";
									return true;
								}
								else
								{	window.alert("invalid password");
									return false;									
								}
							}
							else
							{	window.alert("invalid username and password\nCreating new user");                            
								document.getElementById("loginform").action = "registration.html";
								return true;								
							}
						{%endfor%}	
                    }					
					