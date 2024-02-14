//info relative to what the user selected as barber and service
let servicePicked;
let barberPicked;

//Info relative to the appointment
let serviceName="";
let barberName="";
let cardHolderName;
let cardNumber;
let cvc;
let date;
let time;
let firstName;
let lastName;
let phoneNumber;
let cardValidated;

//All srevices
let allServices=[
    {
        name:"short cut",
        description:["A short haircut"],
        price:20,
        picture:"images/shorthair.jpg",
    },

    {
        name:"medium cut",
        description:["A medium haircut"],
        price:24,
        picture:"images/medhair.jpg",
    },

    {
        name:"long cut",
        description:["A long haircut"],
        price:28,
        picture:"images/longhair.jpg",
    },
    {
        name:"Dye Hair",
        description:["A service to dye hair"],
        price:32,
        picture:"images/dyedhair.jpg",
    },


];


//All barbers
let allBarbers=[
    {
        name:"Adrian Hayes",
        description:["Barber specializing in Men's cuts"],
        picture:"images/barberA.jpg",
    },

    {
        name:"Gavin Thompson",
        description:["Barber specializing in dying hair"],
        picture:"images/barberB.png",
    },

    {
        name:"Ethan Marshall",
        description:["Barber specializing in styling long hair"],
        picture:"images/barberC.jpeg",
    },
    {
        name:"Marcus Rodriguez",
        description:["Barber specializing in women's cuts"],
        picture:"images/barberD.jpg",
    },

];

function renderCards(){
    renderServiceCards();
    renderBarberCards();
}
// Render service cards
function renderServiceCards() {
    let servicesContainer = document.getElementById("services");
    let serviceRow;

    // Assuming each card has a maximum width of 300px
    let cardWidth = 200;

    // Calculate the number of columns based on the width of each card
    let numCols = Math.floor(window.innerWidth / cardWidth);

    for(let i = 0; i < allServices.length; i++) {
        if (i % numCols === 0) { // Start a new row if the current index is a multiple of numCols
            serviceRow = document.createElement("div");
            serviceRow.classList.add("row");
            servicesContainer.appendChild(serviceRow);
            servicesContainer.appendChild(serviceRow);
        }

        const serviceColumn = document.createElement("div");
        serviceColumn.classList.add("col-md-3");

        const card = createServiceCard(allServices[i], i);
        serviceColumn.appendChild(card);
        serviceRow.appendChild(serviceColumn);
    }

}

// Create a service card element
function createServiceCard(service, i) {
    const card = document.createElement('div');
    card.classList.add('card','my-3');

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = service.picture;
    img.alt = 'Card image';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h4');
    title.classList.add('card-title');
    title.textContent = service.name;

    const text = document.createElement('p');
    text.classList.add('card-text');
    text.innerHTML = '$' + service.price.toFixed(2)+'<br>'+service.description.join('<br>');

    const link = document.createElement('a');
    link.href = '#barbers';
    link.classList.add('btn', 'btn-primary');
    link.textContent = 'Choose service';
    link.id= "service-button-" + i;
    link.addEventListener("click",()=>{
        serviceName=service.name;
        let appointmentContainer = document.getElementById("serviceDetail");
        appointmentContainer.textContent=serviceName;
    })
    

    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(link);

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
}


//render barber cards
function renderBarberCards() {

    let barbersContainer = document.getElementById("barbers");
    let barberRow;

    // Assuming each card has a maximum width of 300px
    let cardWidth = 300;

    // Calculate the number of columns based on the width of each card
    let numCols = Math.floor(window.innerWidth / cardWidth);

    for(let i = 0; i < allBarbers.length; i++) {
        if (i % numCols === 0) { // Start a new row if the current index is a multiple of numCols
            barberRow = document.createElement("div");
            barberRow.classList.add("row");
            barbersContainer.appendChild(barberRow);
        }

        const barberColumn = document.createElement("div");
        barberColumn.classList.add("col-md-3");

        const card = createBarberCard(allBarbers[i]);
        barberColumn.appendChild(card);
        barberRow.appendChild(barberColumn);
    }

}

// Create a service card element
function createBarberCard(barber) {
    const card = document.createElement('div');
    card.classList.add('card','my-3');

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = barber.picture;
    img.alt = 'Card image';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h4');
    title.classList.add('card-title');
    title.textContent = barber.name;

    const description = document.createElement('p'); // Change variable name to description
    description.classList.add('card-text');
    description.textContent = barber.description; // Use barber.description instead of text


    const link = document.createElement('a');
    link.href = '#appointment';
    link.classList.add('btn', 'btn-primary');
    link.textContent = 'Book now';
    link.addEventListener("click",()=>{
        barberName=barber.name;
        let appointmentContainer = document.getElementById("barberDetail");
        appointmentContainer.textContent=barberName;
    })

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(link);

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
}

window.addEventListener("DOMContentLoaded", renderCards);

//the portion code necessaary to trigger the tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


//Submit appointment by checking payment method and appointment details
function submitAppointment() {

    checkPaymentMethod();
    if(checkPaymentMethod()){
        checkAppointmentDetails();
    }

}

//check the appointment details
function checkAppointmentDetails(){
    if(serviceName=="" || barberName==""){
        $("#errorText").text(" Select a service and a barber");
        $("#errorText").show();
        return;
    }

    firstName=$("#firstName").val();
    lastName=$("#lastName").val();
    date=$("#inputDate4").val();
    time=$("#inputTime4").val();
    phoneNumber=$("#phone").val();

    //patter which the phone number should follow
    const phoneNumberpattern= /^(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/; //3 digits, - or space or nothing(?),3 digits, - or space or nothing(?), 4 digits


    if(firstName=="" || lastName=="" || date=="" || time==""){
        $("#errorText").text("Fill all the appointment details");
        $("#errorText").show();
        return;
    }

    if(!phoneNumberpattern.test(phoneNumber)){
        $("#errorText").text(" Correct the phone format");
        $("#errorText").show();
        return
    }

    //remove the error message 
    $("#errorText").hide();
    //empty all the field
    $("#barberDetail").text("");
    $("#serviceDetail").text("");


    document.querySelector(".modal-body p").innerHTML="Appointment confirmed for "+firstName+" "+lastName+"<br> on "+date+" at "+time ;

    // Clear the form
    document.getElementById("appointmentForm").reset();

    // Show the confirmation modal
    $('#confirmationModal').modal('show');
}

function dismissModal(){
    $('#confirmationModal').modal('hide');
}

$(document).ready(function(){
    $("#paymentButton").click(function(){
        checkPaymentMethod();
    });
})


//check the payment method
function checkPaymentMethod(){
    ///^(\d{16})$/;
    //inputField.value = "xx".repeat(inputField.value.length);
    const cardNumberPattern=/^(\d{4}[ ]?\d{4}[ ]?\d{4}[ ]?\d{4})$/;
    const cardCvcPatterm=/^(\d{3})$/;
    cardHolderName=$("#cardHolder").val();
    cardNumber=$("#cardNumber").val();
    cardCvc=$("#cardCvc").val();

    if(!cardNumberPattern.test(cardNumber)){
        $("#paymentError").text("OOPS!! Wrong card number");
        $("#paymentError").show();
        cardValidated=false;
        return false;
    }
    if(!cardCvcPatterm.test(cardCvc)){
        $("#paymentError").text("OOPS!! Wrong CVC format");
        $("#paymentError").show();
        cardValidated=false;
        return false;
    }
    if(cardHolderName=="" || cardNumber=="" || cardCvc==""){
        $("#paymentError").text("OOPS!! Complete payment method");
        $("#paymentError").show();
        cardValidated=false;
        return false;
    }
    $("#paymentError").hide();
    cardValidated=true;
    //think about creating a green icon for validating payment
    return true;
}



