/*DRAW USER TABLE*/
function ajaxDrawTable() {
    $.ajax ({
        type: "GET",
        url: "get-all-users",
        success: function (result) {
            $('#user').empty();
            $.each(result, function (e, us) {
                let user =`<tr><td>${us.id}</td>
                           <td id="f${us.id}">${us.firstName}</td>
                           <td id="l${us.id}">${us.lastName}</td>
                           <td id="a${us.id}">${us.age}</td>
                           <td id="e${us.id}">${us.email}</td>
                           <td id="p${us.id}">${us.password}</td>
                      
                           <td id="r${us.id}">${getStringFromRoles(us.roles)}</td>
                           
                           <td><button type="button" onclick="setDeleteModalWindow(${us.id})" class="btn btn-danger"
                           data-toggle="modal" data-target="#exampleModalDelete">Delete</td>
                           <td><button type="button" onclick="setUpdateModalWindow(${us.id})" class="btn btn-info" 
                           data-toggle="modal" data-target="#exampleModalUpdate">Update</td></tr>`;

                $('#user').append(user);
            })
        }
    })
}

/*CREATE*/
function ajaxCreateUser() {
    //PREPARE FORM DATA
    let formData = {
        id : $("#id").val(),
        firstName : $("#firstName").val(),
        lastName : $("#lastName").val(),
        age : $("#age").val(),
        email : $("#email").val(),
        password : $("#password").val(),
        roles :getRolesfromString($("#roles").val())
    }

    $.ajax ({
        type: "POST",
        contentType: "application/json",
        url: "create-user",
        data:JSON.stringify(formData),
        dataType: 'json',
        success: function () {
            ajaxDrawTable();
            $("#user-table-but").click();
            $("#userForm")[0].reset();

        }
    })
}

/*UPDATE FUNCTIONS*/
function setUpdateModalWindow(id) {
    $("#upId").attr("value", id);
    $("#upFirstName").attr("value", $("#f"+id)[0].innerHTML);
    $("#upLastName").attr("value", $("#l"+id)[0].innerHTML);
    $("#upAge").attr("value", $("#a"+id)[0].innerHTML);
    $("#upEmail").attr("value", $("#e"+id)[0].innerHTML);
    $("#upPassword").attr("value", $("#p"+id)[0].innerHTML);
    $("#upRoles").attr("value", $("#r"+id)[0].innerHTML);
}

function ajaxUpdateUser() {
    let formData = {
        id : $("#upId").val(),
        firstName : $("#upFirstName").val(),
        lastName : $("#upLastName").val(),
        age : $("#upAge").val(),
        email : $("#upEmail").val(),
        password : $("#upPassword").val(),
        roles : getRolesfromString($("#upRoles").val())
    }
    $.ajax ({
        type: "POST",
        contentType: "application/json",
        url: "/update-user/",
        data:JSON.stringify(formData),
        dataType: 'json',
        success: function () {
            $('.cl').empty();
            ajaxDrawTable();

        }
    })
}



/*DELETE FUNCTIONS*/
function setDeleteModalWindow(id) {
    $("#delId").attr("value", id);
    $("#delFirstName").attr("value", $("#f"+id)[0].innerHTML);
    $("#delLastName").attr("value", $("#l"+id)[0].innerHTML);
    $("#delAge").attr("value", $("#a"+id)[0].innerHTML);
    $("#delEmail").attr("value", $("#e"+id)[0].innerHTML);
    $("#delPassword").attr("value", $("#p"+id)[0].innerHTML);
    $("#delRoles").attr("value", $("#r"+id)[0].innerHTML);
}

function ajaxDeleteUser(id) {
    $.ajax({
        type: "DELETE",
        url: "/delete-user/"+id,
        success: function () {
            ajaxDrawTable();
        },
        error: function () {
            alert("error");
            ajaxDrawTable();
        }
    })
}

/*FOR CORRECT ROLE IMAGING*/
function getStringFromRoles (array) {
    console.log(array)
    return array.map(item => item.name.replace("ROLE_","")).join(',');
}
function getRolesfromString (string) {
        let ar = new Array();
        if (string.indexOf('ROLE_USER')>=0) {
            ar.push({'id': 1, 'name': 'ROLE_USER'});
        }
        if (string.indexOf('ROLE_ADMIN')>=0) {
            ar.push({'id': 2, 'name': 'ROLE_ADMIN'});
        }
        return ar;


}



/*FOR CURRENT USER*/
function ajaxCurrentUser() {
    $.ajax ({
        type: "GET",
        url: "get-current-user",
        success: function (us) {
            $('#cuser').empty();
            let forNav =`<p>${us.email} with roles: ${getStringFromRoles(us.roles)}</p>`;
            $('#userForNav').append(forNav);
            let curUser = `<tr><td>${us.id}</td>
                           <td>${us.firstName}</td>
                           <td>${us.lastName}</td>
                           <td>${us.age}</td>
                           <td>${us.email}</td>
                           <td>${us.password}</td>
                           <td>${getStringFromRoles(us.roles)}</td></tr>`;
            $('#currentUser').append(curUser);

        }
    })
}




$(document).ready(
    function () {
        ajaxDrawTable();
        ajaxCurrentUser();

        $("#userForm").submit(function (event) {
            event.preventDefault();
            ajaxCreateUser();
        })

        $("#deleteButton").click(function (event) {
            event.preventDefault();
            ajaxDeleteUser($("#delId").val());
            $('#exampleModalDelete').modal('hide');
        })

        $("#updateButton").click(function (event) {
            event.preventDefault();
            ajaxUpdateUser();
            $('#exampleModalUpdate').modal('hide');
        })
    }
)