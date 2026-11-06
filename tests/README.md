# Tests

`firestore-rules.test.mjs` checks the Community security rules in `../firestore.rules` against the Firestore emulator (24 checks: publishing, editing, likes, plays and deleting). You need Node 18+ and Java 11+.

```bash
cd tests
npm init -y && npm i --legacy-peer-deps firebase-tools @firebase/rules-unit-testing firebase
echo '{ "firestore": { "rules": "../firestore.rules" }, "emulators": { "firestore": { "port": 8089 } } }' > firebase.json
npx firebase emulators:exec --only firestore --project demo-tinytees "node firestore-rules.test.mjs"
```
