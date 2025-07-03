 
  import { db } from './firebase-config.js';
  import {
    collection,
    addDoc,
    serverTimestamp
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function() {
    const pierce = document.getElementById("p-by-e");
    const commerce = document.getElementById("e-commerce")



       if (commerce) {
      pierce.commerce("click", function() {
        window.open("https://damiaig.github.io/e-commerce/", "_blank");
      });
    }
   
    if (pierce) {
      pierce.addEventListener("click", function() {
        window.open("https://piercingsbye.com/", "_blank");
      });
    }
   
    const messageEl = document.getElementById("message");
    const charCountEl = document.getElementById("charCount");






   
    messageEl.addEventListener("input", () => {
      charCountEl.textContent = `${messageEl.value.length}/500`;
    });

    document.getElementById('contactScrollBtn').addEventListener('click', function() {
        const targetSection = document.getElementById('mimi');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
 
  });
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');

  function validateForm() {
    const isNameValid = nameInput.value.trim().length > 0;
    const isEmailValid = emailInput.value.includes('@') && emailInput.value.includes('.') && emailInput.value.length >= 3;
    const isMessageValid = messageInput.value.trim().length > 0;
  
    return isNameValid && isEmailValid && isMessageValid;
  }
  

  // Attach validation to each input
  nameInput.addEventListener('input', validateForm);
  emailInput.addEventListener('input', validateForm);
  messageInput.addEventListener('input', validateForm);



 
  const form = document.querySelector('.form-wrapper');
  const charCount = document.getElementById('charCount');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      alert('Please fill out all fields correctly.');
      return;
    }
  
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
  
    try {
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        message,
        read: 'unread', // Add the 'read' field with 'unread' value
        timestamp: serverTimestamp()
      });
  
      alert('Message sent successfully!');
      form.reset();
      charCount.textContent = '0 / 500';
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send. Try again.');
    }
  });
  
