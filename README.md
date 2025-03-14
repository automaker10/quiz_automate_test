## How to run Automate Test Project with Cypress**

### **1. What is this project?**
This is an Automate Test Project for testing a web application UI using [Cypress](https://www.cypress.io/).  
It covers functionality tests, such as:
- Verifying elements on the page
- Filling out and submitting forms
- Managing state and mocking API responses (if needed)

### **2. Preparation**
Before getting started, make sure you have installed the following:
- [Node.js](https://nodejs.org/) (Recommended LTS version)
- npm or yarn for package management
- Cypress (we’ll guide you through installation if you haven’t already)

###  **3. Project Installation**
1. Clone the repository to your machine:
```bash
git clone https://github.com/automaker10/quiz_automate_test
cd your-project-folder
```

2. Install dependencies:
```bash
npm install
```

Or with yarn:

```bash
yarn install
```

###  **4. Running Cypress (UI mode)**
To open the Cypress Test Runner (GUI):
```bash
npx cypress open
```
or with yarn:

```bash
yarn cypress open
```
Choose a browser → Select a test file → Click run

###  **5. Project Structure**

```
├── cypress/
│   ├── e2e/                        # Test cases
│   │   ├── 1-automate-ui/          # Test cases automate ui
│   │   └── 2-automate-api/         # Test cases automate api
│   ├── fixtures/                   # Test data
│   │   ├── apiUserKeyword.json/    # Test data automate ui
│   │   └── userKeyword.json/       # Test data automate api
│   ├── pages/                      # Test function
│   │   └── sauceDemoPages.js/      # Test function automate ui
│   ├── screenshot/                 # Screenshot (Mostly will be screenshot fail case)
│   │   └── 1-automate-ui/          # Screenshot automate ui
│   ├── videos/                     # Test result with video
│   │   ├── 1-automate-ui/          # Video result automate ui
│   │   └── 2-automate-api/         # Video result automate api
│   └── support/            # Custom commands & setup
├── cypress.config.js       # Cypress config file
└── package.json            # npm package info
```

###  **6. Run And Viewing Test Result Video**

To open terminal in project:
```bash
npx cypress run --spec "cypress/e2e/"
```
or with yarn:

```bash
yarn cypress run --spec "cypress/e2e/"
```
Choose a folder in project → videos/ → Check Reult