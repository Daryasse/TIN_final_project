function validateForm(){
  const nameInput = document.getElementById('name');
  const surnameInput = document.getElementById('surname');
  const nicknameInput = document.getElementById('nickname');

  const errorFirstName = document.getElementById('errorFirstName');
  const errorLastName = document.getElementById('errorLastName');
  const errorNickname = document.getElementById('errorNickname');
  const errorSummary = document.getElementById('errorSummary');

  resetErrors ([nameInput, surnameInput, nicknameInput], [errorFirstName, errorLastName, errorNickname], errorSummary);
  let valid = true;
  if (!checkRequired(nameInput.value)){
    valid = false;
    nameInput.classList.add("error-type");
    errorFirstName.innerText = "The field is required.";
  }else if (!checkTextLengthRange(nameInput.value, 2, 30)){
    valid = false;
    nameInput.classList.add("error-type");
    errorFirstName.innerText = "The field should contain 2 to 30 characters.";
  }

  if (!checkRequired(surnameInput.value)){
    valid = false;
    surnameInput.classList.add("error-type");
    errorLastName.innerText = "The field is required.";
  }else if (!checkTextLengthRange(surnameInput.value, 2, 30)){
    valid = false;
    surnameInput.classList.add("error-type");
    errorLastName.innerText = "The field should contain 2 to 30 characters.";
  }

  if (!checkTextLengthRange(nicknameInput.value, 0, 60)){
    valid = false;
    nicknameInput.classList.add("error-type");
    errorNickname.innerText = "The field should contain maximum 60 characters.";
  }


  if(!valid) {
    errorSummary.innerText = "Form contains errors.";
  }

  return valid;
}