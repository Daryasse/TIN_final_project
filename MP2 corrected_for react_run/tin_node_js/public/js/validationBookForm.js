function validateForm(){
  const nameInput = document.getElementById('title');
  const authorInput = document.getElementById('author_id');
  const priceInput = document.getElementById('price');

  const errorName = document.getElementById('errorName');
  const errorAuthor = document.getElementById('errorAuthor');
  const errorPrice = document.getElementById('errorPrice');
  const errorSummary = document.getElementById('errorSummary');

  resetErrors([nameInput, authorInput, priceInput], [errorName, errorAuthor, errorPrice], errorSummary);
  let valid = true;
  if (!checkRequired(nameInput.value)){
    valid = false;
    nameInput.classList.add("error-type");
    errorName.innerText = "The field is required."; 
  }else if (!checkTextLengthRange(nameInput.value, 2, 30)){
    valid = false;
    nameInput.classList.add("error-type");
    errorName.innerText = "The field should contain 2 to 30 characters."; 
  }

  if(!checkRequired(authorInput.value)){
    valid = false;
    authorInput.classList.add("error-type");
    errorAuthor.innerText = "The field is required.";
  }

  if(!checkRequired(priceInput.value)){
    valid = false;
    priceInput.classList.add("error-type");
    errorPrice.innerText = "The field is required." 
  }else if (!checkNumber(priceInput.value)){
    valid = false;
    priceInput.classList.add("error-type");
    errorPrice.innerText = "The field should be a number."
  }else if (!checkNumberRange(priceInput.value, 1, 200)){
    valid = false;
    priceInput.classList.add("error-type");
    errorPrice.innerText = "The price should be between 1$ and 200$."
  }
  
  if(!valid) {
    errorSummary.innerText = "Form contains errors.";
  }

  return valid;
}