# **FoodVision – AI Powered Diet Planner**

FoodVision is a mobile application that provides personalized diet planning using AI.
It helps users plan meals, track macros, and get nutrition guidance based on their goals, preferences, and restrictions.

The app focuses on **practical, personalized nutrition** instead of generic diet advice.

---

## **Features**

* AI-generated personalized diet plans
* Daily calorie and macro tracking
* Smart meal recommendations based on goals and history
* AI nutrition chat for food and diet queries
* Secure user authentication

---

## **Tech Stack**

* **React Native (Expo)**
* **Expo Router** for navigation
* **Firebase Authentication** (auth only)
* **Convex** for database and backend logic
* **OpenRouter** for AI-powered nutrition responses
* **TypeScript**

---

## **Setup & Installation**

### **Prerequisites**

Make sure you have:

* Node.js (v18 or higher)
* A Firebase project (Authentication enabled)
* A Convex project
* An OpenRouter API key

> Expo CLI is **not required globally**.
> The project runs using `npx expo`, which is the recommended approach.

---

### **1. Clone the Repository**

```bash
git clone https://github.com/shivamEr/FoodVision-App.git
cd FoodVision-App
```

---

### **2. Install Dependencies**

```bash
npm install
```

---

### **3. Environment Variables**

Create an `example.env` (or `.env`) file in the root directory:

```env
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=get from convex dashboard

EXPO_PUBLIC_CONVEX_URL=get from convex dashboard

EXPO_PUBLIC_FIREBASE_API_KEY=apikey(from firebase)

EXPO_PUBLIC_OPENROUTER_API_KEY=apikey (from openrouter)
```

⚠️ Do not commit real environment values to version control.

---

### **4. Firebase Authentication Setup**

1. Create a Firebase project
2. Enable **Email/Password Authentication**
3. Copy the Firebase API key into the env file
4. Firebase is used **only for user authentication**

---

### **5. Convex Setup**

Run the Convex development server:

```bash
npx convex dev
```

Convex handles:

* Database
* Backend functions
* Real-time updates
* Type-safe queries and mutations

---

### **6. Run the App**

```bash
npx expo start
```

* Open using Expo Go
* Or run on an Android/iOS emulator

---

## **Notes**

* Expo Router is used for file-based routing
* AI responses are generated via OpenRouter
* Backend logic and data storage are managed by Convex
* Firebase is intentionally limited to authentication only

---

## **Contributing**

Pull requests are welcome.
Please keep changes clean and aligned with the existing structure.


