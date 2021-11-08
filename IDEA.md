# Phosphor Feature Ideas

- Users can host their own Database locally or on their own server
   - If the Database cant be reached, Users can fall back to the Phosphor Database and migrate their data later
   - Hosting of in-app database?
   - Automatic sync between local device storage and personal database
- Contacts are added by sharing a unique contact ID
   - Contact IDs have an anti spam code
- Users can opt out of storing messages in a database
- Users can opt out of storing messages locally
- Users can setup their own, seperate Phosphor Server.
- Phospor Servers can be linked, allowing communication between users in them
   - Users log into their original Server
   - Contacts from a different server will be stored with their server ID prefixed
   - They will then be loaded from their server
   - If a link is undone, contacts will be marked as such
- E2E Encryption
- P2P communication

# How it works

- Phosphor is a Peer to Peer chat with a centralized user directory
- Phosphor Database main purpose is as user directory and to ensure username uniqueness
   - It can optionally store received messages and contacts
   - Contacts and messages can also be stored in a self hosted database
- Phosphor server acts as middleman for P2P communication in browsers
- Users authenticate by signing their username with their private key
- Upon authentification users have access to their contacts

# Cross Platform

- Port to Electron.js
- Mobile App?
