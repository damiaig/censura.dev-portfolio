




import { db } from './firebase-config.js';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const container = document.querySelector('.received-container');
const filterSelect = document.getElementById('filter');

// Function to fetch and display messages
async function loadMessages(filter = 'all') {
    const wrapper = document.querySelectorAll('.message-wrapper');
    wrapper.forEach(w => w.remove());
  
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
  
    snapshot.forEach(docSnap => {
      const msg = docSnap.data();
      const isRead = msg.read === 'read'; // ✅ updated to work with string
  
      // Filtering logic
      if ((filter === 'read' && !isRead) || (filter === 'unread' && isRead)) return;
  
      const wrapper = document.createElement('div');
      wrapper.classList.add('message-wrapper');
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'message-check';
      checkbox.id = docSnap.id;
      checkbox.checked = isRead;
  
      checkbox.addEventListener('change', async () => {
        const newStatus = checkbox.checked ? 'read' : 'unread';
        await updateDoc(doc(db, 'messages', docSnap.id), { read: newStatus });
        loadMessages(filterSelect.value); // reload to apply filter if needed
      });
  
      const label = document.createElement('label');
      label.htmlFor = docSnap.id;
      label.className = 'message';
  
      label.innerHTML = `
        <div class="message-row"><strong>Name:</strong> ${msg.name}</div>
        <div class="message-row"><strong>Email:</strong> ${msg.email}</div>
        <div class="message-comment">
          <p>Comment: ${msg.message}</p>
        </div>
      `;
  
      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });
  }
  

// Initial load
loadMessages();

// Filter handling
filterSelect.addEventListener('change', () => {
  loadMessages(filterSelect.value);
});


const storedCode = sessionStorage.getItem("adminCode");

if (storedCode !== "9876546789876") {
  // Not authorized — clear any session data and redirect
  sessionStorage.clear();
  window.location.href = "admin-login.html";
}
