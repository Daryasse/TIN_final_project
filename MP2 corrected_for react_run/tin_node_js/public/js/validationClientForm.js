function validateForm(){
  const nameInput = document.getElementById('name');
  const surnameInput = document.getElementById('surname');
  const birthdateInput = document.getElementById('birthdate')
  const emailInput = document.getElementById('email');

  const errorName = document.getElementById('errorName');
  const errorSurname = document.getElementById('errorSurname');
  const errorBirthdate = document.getElementById('errorBirthdate');
  const errorEmail = document.getElementById('errorEmail');
  const errorSummary = document.getElementById('errorSummary');

  resetErrors([nameInput, surnameInput, birthdateInput, emailInput], 
    [errorName, errorSurname, errorBirthdate, errorEmail], errorSummary);
  
  let valid = true;
  let nowDate = new Date(),
  month = '' + (nowDate.getMonth() + 1),
  day = '' + nowDate.getDay(),
  year = nowDate.getFullYear();
    if(month.length < 2){
      month = '0' + month;
    }
    if(day.length < 2){
      day = '0' + day;
    }
    const nowString = [year, month, day].join('-');

  if (!checkRequired(nameInput.value)){
    valid = false;
    nameInput.classList.add("error-type");
    errorName.innerText = "The field is required."; 
  }else if (!checkTextLengthRange(nameInput.value, 2, 30)){
    valid = false;
    nameInput.classList.add("error-type");
    errorName.innerText = "The field should contain 2 to 30 characters."; 
  }

  if (!checkRequired(surnameInput.value)){
    valid = false;
    surnameInput.classList.add("error-type");
    errorSurname.innerText = "The field is required.";
  }else if (!checkTextLengthRange(surnameInput.value, 2, 30)){
    valid = false;
    surnameInput.classList.add("error-type");
    errorSurname.innerText = "The field should contain 2 to 30 characters.";
  }

  if (!checkRequired(birthdateInput.value)){
    valid = false;
    birthdateInput.classList.add("error-type");
    errorBirthdate.innerText = "The field is required.";
  }else if(!checkDate(birthdateInput.value)){
    valid = false;
    birthdateInput.classList.add("error-type");
    errorBirthdate.innerText = "The field should contain date yyyy-MM-dd.";
  }else if (checkDateIfAfter(birthdateInput.value, nowString)){
    valid = false;
    birthdateInput.classList.add("error-type");
    errorBirthdate.innerText = "The date cannot be from the future and this month.";
  }

  if (!checkRequired(emailInput.value)) {
    valid = false;
    emailInput.classList.add("error-type");
    errorEmail.innerText = "The field is required.";
  }else if (!checkEmail(emailInput.value)) {
    valid = false;
    emailInput.classList.add("error-type");
    errorEmail.innerText = "Email is not valid name@dom.com";
  }
  
  if(!valid) {
    errorSummary.innerText = "Form contains errors."
  }

  return valid;
}