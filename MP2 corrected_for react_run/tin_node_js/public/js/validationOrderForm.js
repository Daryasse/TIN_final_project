function validateForm(){
  const dateInput = document.getElementById('date');
  const clientInput = document.getElementById('client');
  const bookInput = document.getElementById('book');

  const errorDate = document.getElementById('errorDate');
  const errorClient = document.getElementById('errorClient');
  const errorBook = document.getElementById('errorBook');
  const errorSummary = document.getElementById('errorSummary');

  resetErrors([dateInput, clientInput, bookInput], 
    [errorDate, errorClient, errorBook], errorSummary);

  let valid = true;

  let nowDate = new Date(),
  month = '' + (nowDate.getMonth() + 2),
  day = '' + nowDate.getDay(),
  year = nowDate.getFullYear();
    if(month.length < 2){
      month = '0' + month;
    }
    if(day.length < 2){
      day = '0' + day;
    }
    const nowString = [year, month, day].join('-');

  if (!checkRequired(clientInput.value)){
    valid = false;
    clientInput.classList.add("error-type");
    errorClient.innerText = "The field is required.";
  }

  if (!checkRequired(bookInput.value)){
    valid = false;
    bookInput.classList.add("error-type");
    errorBook.innerText = "The field is required.";
  }

  if (!checkRequired(dateInput.value)){
    valid = false;
    dateInput.classList.add("error-type");
    errorDate.innerText = "The field is required.";
  }else if(!checkDate(dateInput.value)){
    valid = false;
    dateInput.classList.add("error-type");
    errorDate.innerText = "The field should contain date yyyy-MM-dd.";
  }else if (checkDateIfAfter(dateInput.value, nowString)){
    valid = false;
    dateInput.classList.add("error-type");
    errorDate.innerText = "The date cannot be from so far future.";
  }
  
  if(!valid) {
    errorSummary.innerText = "Form contains errors."
  }

  return valid;
}