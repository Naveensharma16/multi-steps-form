// objects for holding values

const package = {
   name: "",
   price:00,
   tenure:"mo"
}


const addonsservice = [
  {
    name: "Online service",
    price:{
       yr:10,
       mo:1
    },
    tenure: package.tenure,
    status: false
  },
  {
    name: "Large storage",
    price:{
       yr:20,
       mo:2
    },
    tenure: package.tenure,
    status: false
  },
  {
    name: "Customizable profile",
    price:{
       yr:20,
       mo:2
    },
    tenure: package.tenure,
    status: false
  }
]


// next step function
const nextStep = () =>{
    const children = document.querySelector(".multi-forms-container").children;
   
    for (let index = 0; index < children.length-1; index++) {    
    if(children[index].classList.contains("active")){
        children[index].classList.remove("active")
        children[index+1].classList.add("active")
        break;
    }
    }
}


// previous step function
const previousStep = () =>{
  const children = document.querySelector(".multi-forms-container").children;

  for (let index = children.length-1; index > 0; index--) {    
  if(children[index].classList.contains("active")){
      children[index].classList.remove("active")
      children[index-1].classList.add("active")
      break;
  }
  }
}






// monthly/yearly switch button function
const switchPackageTime = () =>{
 
   if(document.querySelector(".toggle-button").classList.contains("month")){
    document.querySelector(".toggle-button").classList.remove("month");
    document.querySelector(".toggle-button").classList.add("year");


    document.querySelector(".month-year-mode-switch").children[0].classList.remove("active-time");
    document.querySelector(".month-year-mode-switch").children[2].classList.add("active-time");


    const plans = document.querySelector(".plan-types").children;

    const yearprice = [90,120,150];

     for (let index = 0; index < plans.length; index++) {
       plans[index].querySelector(".amount").innerText = `$${yearprice[index]}/yr`;  

       const free = document.createElement("p");
       free.style.color="hsl(213, 96%, 18%)";
       free.style.marginTop="8px";
       free.style.fontSize="0.9rem";
       free.innerText = "2 months free";

       plans[index].appendChild(free);
     }


     const addonyearprice = [10,20,20];

     const addonplan =  document.querySelector(".additional-serivce-container").children;


     for (let index = 0; index < addonplan.length; index++) { 
      addonplan[index].querySelector(".extra-charge").innerText = `$${addonyearprice[index]}/yr`;  
    
     }


     package.name = document.querySelector(".single-plan-card.active h4").innerText;
     const price = document.querySelector(".single-plan-card.active .amount").innerText.match(/(\d+)/);
     package.price = price[0];
 
     if(document.querySelector(".single-plan-card .amount").innerText.search("yr") > 0){
       package.tenure = "yr";
     }
     else{
       package.tenure = "mo";
     }

     addonsservice.forEach(element =>{
          element.tenure = package.tenure;
     })

   }
   else{
    document.querySelector(".toggle-button").classList.remove("year");
    document.querySelector(".toggle-button").classList.add("month");

    document.querySelector(".month-year-mode-switch").children[0].classList.add("active-time");
    document.querySelector(".month-year-mode-switch").children[2].classList.remove("active-time");


    const plans = document.querySelector(".plan-types").children;
    const monthprice = [9,12,15];
    for (let index = 0; index < plans.length; index++) {
      plans[index].querySelector(".amount").innerText = `$${monthprice[index]}/mo`;  

      plans[index].lastChild.remove();
    }

    const addonmonprice = [1,2,2];

    const addonplan =  document.querySelector(".additional-serivce-container").children;;

    for (let index = 0; index < addonplan.length; index++) { 
     addonplan[index].querySelector(".extra-charge").innerText = `$${addonmonprice[index]}/mo`;  

    }



    package.name = document.querySelector(".single-plan-card.active h4").innerText;
    const price = document.querySelector(".single-plan-card.active .amount").innerText.match(/(\d+)/);
    package.price = price[0];

    if(document.querySelector(".single-plan-card .amount").innerText.search("yr") > 0){
      package.tenure = "yr";
    }
    else{
      package.tenure = "mo";
    }


   }
}



document.querySelector(".toggle-switch").addEventListener('click',() =>{
 switchPackageTime();
})






// function for form validation

const formValidate = (e) =>{
  e.preventDefault();

 const name = document.querySelector(".personal-info-form input[type='text']");
 const email = document.querySelector(".personal-info-form input[type='email']");
 const phonenumber = document.querySelector(".personal-info-form input[type='tel']");




 const createErrorElement = (appender) =>{

    const mainelement = document.createElement("p");
    mainelement.innerText = "This field is required";
    mainelement.classList.add("error");
    if(appender.children.length > 1){
      appender.lastChild.remove();
    }
   
    appender.appendChild(mainelement);
 }


 const removeElement = () =>{
  const removerror=  document.querySelectorAll(".input-label-contain");
  removerror.forEach((element) =>{

    if(element.querySelector(".error") !== null){
        element.querySelector(".error").remove();
    }   
   
  })

 }

//  checking for epmty value
 if(name.value === ""){
   
    createErrorElement(document.querySelectorAll(".input-label-contain")[0])
    return;
 }
 if(email.value === ""){  
    createErrorElement(document.querySelectorAll(".input-label-contain")[1])
    return;
 }
 if(phonenumber.value === ""){
   
    createErrorElement(document.querySelectorAll(".input-label-contain")[2])
    return;
 }

  
  removeElement();

  nextStep();
}

// calling  the form validation function on submit eventlistner
document.querySelector(".personal-info-form form").addEventListener("submit",(e) =>{
    formValidate(e);
})










// select plan function

const planlist = document.querySelectorAll(".single-plan-card");

const selectPlan = (element) =>{
    planlist.forEach((element) =>{
        element.classList.remove("active");
    })

    element.classList.add("active");

    
    package.name = element.querySelector(".single-plan-card h4").innerText;
    const price = element.querySelector(".single-plan-card .amount").innerText.match(/(\d+)/);
    package.price = price[0];

    if(element.querySelector(".single-plan-card .amount").innerText.search("yr") > 0){
      package.tenure = "yr";
    }
    else{
      package.tenure = "mo";
    }


    document.querySelector(".selected-package p").innerText = `${package.name}/${package.tenure =="mo" ? "month" : "year"}`;
    document.querySelector(".package-price p").innerText = `$${package.price}/${package.tenure}`;


    totalcalculate();
}


planlist.forEach((element) =>{
     element.addEventListener('click',() =>{
        selectPlan(element);
     })
})




const planSubmit = () =>{

  let callnext = false;
  planlist.forEach((element) =>{
    if(element.classList.contains("active")){
      callnext = true; 
    }
  })

  callnext  ? nextStep() : "";
  
}


document.querySelector(".select-plan-form .form-backward-forward button").addEventListener("click",() =>{
  planSubmit();
})






document.querySelector(".pick-addon-selections .form-backward-forward button").addEventListener("click",() =>{
  nextStep();
})





// finish-up-form

document.querySelector(".finish-up-form .form-backward-forward button").addEventListener("click",() =>{
  nextStep();
})




// go back function

const back = document.querySelectorAll(".form-backward-forward p");


back.forEach((element) =>{
  element.addEventListener('click',() =>{
    previousStep();
  })
})





// addon functions

const addonlist = document.querySelectorAll(".additional-serivce-container .additional-service")


for (let index = 0; index < addonlist.length; index++) {
  
  addonlist[index].addEventListener('click',() =>{


      if(addonlist[index].querySelector(".add-pckge input[type='checkbox']").checked){
        addonlist[index].querySelector(".add-pckge input[type='checkbox']").checked = false;
        addonsservice[index].status = false;
        removingIetemsFromAddonlist(addonsservice[index].name);
        totalcalculate();
      }
      else{
        addonlist[index].querySelector(".add-pckge input[type='checkbox']").checked = true;
        addonsservice[index].status = true;
        addingIetemsInAddonlist();
        totalcalculate();
      }
  })
  
}






// udating the addons list in final bill

const addonlistcontainer = document.querySelector(".additional-services");


const addingIetemsInAddonlist = () =>{
  addonlistcontainer.innerHTML ="";
    addonsservice.forEach((element) =>{
      if(element.status == true){
        const listsingleitem = document.createElement("div");
        listsingleitem.classList.add("single-add-service");
        listsingleitem.innerHTML = `
        <div class="selected-package">
        <p>${element.name}</p>
        </div>
        <div class="package-price">
            <p>+$${element.tenure == "yr" ? element.price.yr : element.price.mo}/${element.tenure}</p>
        </div>
        `;
      
        addonlistcontainer.appendChild(listsingleitem);
      }
  })

}


const removingIetemsFromAddonlist = (item) =>{

  document.querySelectorAll(".single-add-service").forEach((element) =>{


          if(element.querySelector(".selected-package p").innerText == item){
          
              element.remove();
          }
  })
}







// calculating total

const totalcalculate = () =>{
  let  total = Number.parseInt(package.price);
   addonsservice.forEach(element =>{
        if(element.status == true){
           total += (element.tenure == "yr" ? Number.parseInt(element.price.yr)  : Number.parseInt(element.price.mo));
        }
   })

   document.querySelector(".total-package-price p").innerText = `+$${total}/ ${addonsservice[0].tenure}`


}