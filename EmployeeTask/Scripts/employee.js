$(document).ready(function () {
    GetPaggedData(1);
    });
  
//Load Data function  
function GetPaggedData(pageNum, pageSize) {
    $.getJSON("/Employees/GetPaggedData", { pageNumber: pageNum, pageSize: pageSize }, function (response) {
        //After every trigger remove previous data and paging
        $("#tblData").empty();
        $("#paged").empty();
        var rowData = "";
        if (!response.Data.length > 0) {
            rowData = rowData + '<tr><td class="text-center" colspan="5">' + "No Data Available" + '</td>';
        }
    
        for (var i = 0; i < response.Data.length; i++) {
            rowData = rowData + '<tr><td>' + response.Data[i].EmpID + '</td><td>' + response.Data[i].Name + '</td>' + '<td>' + response.Data[i].Address + '</td>' + '<td>' + response.Data[i].Mobile + '</td>' + '<td><a href="#" onclick="return getbyID(' + response.Data[i].EmpID + ')">Edit</a> | <a href="#" onclick="Delele(' + response.Data[i].EmpID + ')">Delete</a></td>' + '</tr>';
        }
        $("#tblData").append(rowData);
        PaggingTemplate(response.TotalPages, response.CurrentPage);
    });
}

//This is paging temlpate ,you should just copy paste
function PaggingTemplate(totalPage, currentPage) {
    var template = "";
    var TotalPages = totalPage;
    var CurrentPage = currentPage;
    var PageNumberArray = Array();


    var countIncr = 1;
    for (var i = currentPage; i <= totalPage; i++) {
        PageNumberArray[0] = currentPage;
        if (totalPage != currentPage && PageNumberArray[countIncr - 1] != totalPage) {
            PageNumberArray[countIncr] = i + 1;
        }
        countIncr++;
    };
    PageNumberArray = PageNumberArray.slice(0, 5);
    var FirstPage = 1;
    var LastPage = totalPage;
    if (totalPage != currentPage) {
        var ForwardOne = currentPage + 1;
    }
    var BackwardOne = 1;
    if (currentPage > 1) {
        BackwardOne = currentPage - 1;
    }

    template = "<p>" + CurrentPage + " of " + TotalPages + " pages</p>"
    template = template + '<ul class="pager">' +
        '<li class="previous"><a href="#" onclick="GetPaggedData(' + FirstPage + ')"><i class="fa fa-fast-backward"></i>&nbsp;First</a></li>' +
        '' +
        '<li><a href="#" onclick="GetPaggedData(' + BackwardOne + ')"><i class="glyphicon glyphicon-backward"></i></a>';

    var numberingLoop = "";
    for (var i = 0; i < PageNumberArray.length; i++) {
        numberingLoop = numberingLoop + '<a class="page-number active" onclick="GetPaggedData(' + PageNumberArray[i] + ')" href="#">' + PageNumberArray[i] + ' &nbsp;&nbsp;</a>'
    }
    template = template + numberingLoop + '<a href="#" onclick="GetPaggedData(' + ForwardOne + ')" ><i class="glyphicon glyphicon-forward"></i></a></li>' +
        '<li class="next"><a href="#" onclick="GetPaggedData(' + LastPage + ')">Last&nbsp;<i class="fa fa-fast-forward"></i></a></li></ul>';
    $("#paged").append(template);
   
}
  

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmpID: $('#EmployeeID').val(),
        Name: $('#Name').val(),
        Address: $('#Address').val(),
        Mobile: $('#Mobile').val(),
    };
    $.ajax({
        url: "/Employees/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            GetPaggedData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID  
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#Mobile').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Employees/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#EmployeeID').val(result.EmpID);
            $('#Name').val(result.Name);
            $('#Address').val(result.Address);
            $('#Mobile').val(result.Mobile);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmpID: $('#EmployeeID').val(),
        Name: $('#Name').val(),
        Address: $('#Address').val(),
        Mobile: $('#Mobile').val(),
    };
    $.ajax({
        url: "/Employees/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            GetPaggedData();

            $('#myModal').modal('hide');
            $('#EmployeeID').val("");
            $('#Name').val("");
            $('#Address').val("");
            $('#Mobile').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record  
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Employees/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                GetPaggedData();

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes  
function clearTextBox() {
    $('#EmployeeID').val("");
    $('#Name').val("");
    $('#Address').val("");
    $('#Mobile').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#Mobile').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    var $regexname = /^([07][1-9]{9})$/;

    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Age').css('border-color', 'lightgrey');
    }
    if ($('#Mobile').val().trim() == "" || !$('#Mobile').val().match($regexname)) {
        $('#Mobile').css('border-color', 'Red');

        isValid = false;
    }
   
    else {
        $('#Mobile').css('border-color', 'lightgrey');

    }

 
    return isValid;
}  