// =====================================================================
//  Tiny Tees — Community maps (optional)
//
//  Public maps are stored in Google Firebase (Cloud Firestore). Players sign in
//  anonymously in the background, so nobody needs an account. Each map remembers
//  who published it, and only that person can update or remove it.
//  Security is enforced by the rules in firestore.rules.
//
//  To turn this on, fill in firebase-config.js (see README → "Community maps").
//  If there's no config, the game works as normal and the Community tab explains
//  how to set it up.
//
//  For testing without Firebase, open the game with ?community=local. That
//  swaps in a fake backend stored in this browser's localStorage.
// =====================================================================
const FIREBASE_VERSION = "13.2.0";

const C = window.TTCommunity = { status:"off", error:null, uid:null, mock:false };
const cfg = window.FIREBASE_CONFIG;
const useMock = new URLSearchParams(location.search).get("community") === "local";

function mockBackend(){
  const KEY = "tt2-mock-community";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; } };
  const saveAll = d => localStorage.setItem(KEY, JSON.stringify(d));
  const uid = "local-user";
  const wait = v => new Promise(r => setTimeout(() => r(v), 150));
  return {
    uid, mock:true,
    async list(sort = "new"){
      const all = Object.entries(load()).map(([id, v]) => ({ id, ...v }));
      const f = sort === "top" ? "likes" : sort === "played" ? "plays" : "createdAt";
      return wait(all.sort((a, b) => (b[f] || 0) - (a[f] || 0)).slice(0, 60));
    },
    async get(id){ const v = load()[id]; return wait(v ? { id, ...v } : null); },
    async publish(p){
      const d = load(), id = Math.random().toString(36).slice(2, 12);
      d[id] = { ...p, uid, likes:0, plays:0, createdAt:Date.now(), updatedAt:Date.now() }; saveAll(d); return wait(id);
    },
    async update(id, p){
      const d = load(); if (!d[id] || d[id].uid !== uid) throw new Error("Not allowed");
      d[id] = { ...d[id], ...p, updatedAt:Date.now() }; saveAll(d); return wait();
    },
    async remove(id){ const d = load(); if (d[id] && d[id].uid !== uid) throw new Error("Not allowed"); delete d[id]; saveAll(d); return wait(); },
    async like(id){ const d = load(); if (d[id]){ d[id].likes = (d[id].likes || 0) + 1; saveAll(d); } return wait(); },
    async play(id){ const d = load(); if (d[id]){ d[id].plays = (d[id].plays || 0) + 1; saveAll(d); } return wait(); },
  };
}

async function firebaseBackend(){
  const base = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/`;
  const [{ initializeApp }, A, F] = await Promise.all([
    import(base + "firebase-app.js"), import(base + "firebase-auth.js"), import(base + "firebase-firestore.js"),
  ]);
  const app = initializeApp(cfg);
  const auth = A.getAuth(app);
  const db = F.getFirestore(app);
  if (cfg.useEmulators){   // local development against the Firebase emulators
    A.connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings:true });
    F.connectFirestoreEmulator(db, "127.0.0.1", 8089);
  }
  if (!auth.currentUser) await A.signInAnonymously(auth);
  const uid = auth.currentUser.uid;
  const maps = F.collection(db, "maps");
  const ms = v => (v && typeof v.toMillis === "function") ? v.toMillis() : 0;
  const toItem = d => { const v = d.data(); return { id:d.id, ...v, createdAt:ms(v.createdAt), updatedAt:ms(v.updatedAt) }; };

  return {
    uid,
    async list(sort = "new"){
      const field = sort === "top" ? "likes" : sort === "played" ? "plays" : "createdAt";
      const snap = await F.getDocs(F.query(maps, F.orderBy(field, "desc"), F.limit(60)));
      return snap.docs.map(toItem);
    },
    async get(id){
      const d = await F.getDoc(F.doc(db, "maps", id));
      return d.exists() ? toItem(d) : null;
    },
    async publish(p){
      const ref = await F.addDoc(maps, { ...p, uid, likes:0, plays:0, createdAt:F.serverTimestamp(), updatedAt:F.serverTimestamp() });
      return ref.id;
    },
    async update(id, p){
      await F.updateDoc(F.doc(db, "maps", id), { ...p, updatedAt:F.serverTimestamp() });
    },
    async remove(id){
      await F.deleteDoc(F.doc(db, "maps", id));
    },
    async like(id){
      // The like marker and the +1 must be written together; the rules check both.
      const b = F.writeBatch(db);
      b.set(F.doc(db, "maps", id, "likes", uid), { at:F.serverTimestamp() });
      b.update(F.doc(db, "maps", id), { likes:F.increment(1) });
      await b.commit();
    },
    async play(id){
      await F.updateDoc(F.doc(db, "maps", id), { plays:F.increment(1) });
    },
  };
}

C.ready = (async () => {
  try {
    if (useMock){
      Object.assign(C, mockBackend()); C.status = "ready";
    } else if (cfg && cfg.apiKey && cfg.projectId){
      C.status = "loading";
      Object.assign(C, await firebaseBackend());
      C.status = "ready";
    }
  } catch (e){
    C.status = "error";
    C.error = e && e.code === "auth/admin-restricted-operation"
      ? "Anonymous sign-in is turned off in the Firebase console (Authentication → Sign-in method)."
      : e && e.code === "auth/configuration-not-found"
        ? "Firebase Authentication isn't set up yet for this project (Authentication → Get started)."
        : (e && e.message) || String(e);
    console.warn("[Tiny Tees] Community maps unavailable:", e);
  }
  window.dispatchEvent(new Event("tt-community"));
})();
