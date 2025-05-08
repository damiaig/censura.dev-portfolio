import { db, auth } from './firebase-config.js';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const container = document.querySelector('.received-container');
const filterSelect = document.getElementById('filter');

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Redirect unauthenticated users
    sessionStorage.clear();
    window.location.href = "admin-login.html";
    return;
  }

  // If user is logged in, check admin validation
  const sessionCode = sessionStorage.getItem("adminCode");
  if (!sessionCode) {
    sessionStorage.clear();
    window.location.href = "admin-login.html";
    return;
  }

  const adminDocRef = doc(db, "adminAccess", user.uid);
  const adminDocSnap = await getDoc(adminDocRef);

  // If user is not an admin or the code doesn't match, log them out
  if (!adminDocSnap.exists() || adminDocSnap.data().code !== sessionCode) {
    sessionStorage.clear();
    window.location.href = "admin-login.html";
    return;
  }

  // Admin validated, now load messages
  loadMessages();
  filterSelect.addEventListener('change', () => {
    loadMessages(filterSelect.value);
  });
});


async function loadMessages(filter = 'all') {
  const wrapper = document.querySelectorAll('.message-wrapper');
  wrapper.forEach(w => w.remove());

  // Query Firestore for messages
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy("timestamp", "desc"));

  try {
    const snapshot = await getDocs(q);

    snapshot.forEach(docSnap => {
      const msg = docSnap.data();
      const isRead = msg.read === 'read';

      // Filter messages based on status
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
        loadMessages(filterSelect.value);
      });

      const label = document.createElement('label');
      label.htmlFor = docSnap.id;
      label.className = 'message';
      label.innerHTML = `
        <div class="message-row"><strong>Name:</strong> ${msg.name}</div>
        <div class="message-row"><strong>Email:</strong> ${msg.email}</div>
        <div class="message-comment"><p>Comment: ${msg.message}</p></div>
      `;

      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });
  } catch (error) {
    console.error("Error loading messages: ", error);
  }
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log("User is not authenticated.");
    sessionStorage.clear();
    window.location.href = "admin-login.html";
    return;
  }
  console.log("User is authenticated:", user);
  // Continue with admin validation...
});
