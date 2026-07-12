# 🔗 Blockchain Simulator

A minimal blockchain implementation in JavaScript using the `elliptic` npm package, showcasing how public/private key cryptography and digital signatures work in a blockchain context.

---

## 🚀 Features

### 🔑 Key Pair Generation
- Generates a secure public/private key pair using Elliptic Curve Cryptography (ECC).
- Uses the `secp256k1` curve via the `elliptic` library.

### 💸 Transaction Creation
- Users can send **Crypto** (simulated currency) to another public key (address).
- Each transaction contains: sender address, recipient address, and amount.

### ✍️ Digital Signatures
- Transactions are hashed using SHA-256.
- Signed with the sender's private key for authenticity and integrity.

### ⏳ Pending Transactions
- New transactions are added to a pool of pending transactions.
- These can later be validated and included in mined blocks (in extended versions).

---

## 📦 Tech Stack

- JavaScript (Node.js)
- [elliptic](https://www.npmjs.com/package/elliptic)
---
