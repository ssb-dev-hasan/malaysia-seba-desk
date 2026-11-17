importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// ফায়ারবেজ কনফিগারেশন (আপনার কনফিগারেশন এখানেও দিতে হবে)
const firebaseConfig = {
  apiKey: "AIzaSyC0Bdfcw2qf3pGXgvWCJtNOFGV4fJJt34s",
  authDomain: "probashi-seba-desk.firebaseapp.com",
  databaseURL: "https://probashi-seba-desk-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "probashi-seba-desk",
  storageBucket: "probashi-seba-desk.firebasestorage.app",
  messagingSenderId: "450175481492",
  appId: "1:450175481492:web:f63eae5a3336fffb452681",
  measurementId: "G-8KNM1F5JNM"
};

const messaging = firebase.messaging();

// Background Notification Handler
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/manifest.json'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

const CACHE_NAME = 'probashi-seba-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
