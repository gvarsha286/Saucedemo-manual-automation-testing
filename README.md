📝 SauceDemo QA Testing Project (Manual + Automation)

This repository contains a complete Manual and Automation Testing project for the SauceDemo E-Commerce web application. The project covers functional validation, UI checks, defect reporting, and automation using Selenium (Python) and Cypress (JavaScript).

🔍 Project Scope

Login functionality

Product listing

Add to cart / Remove from cart

Cart page validation

Checkout flow

End-to-end purchase flow

UI & usability testing

Functional & Smoke testing

🧪 Automation Coverage

Automation has been implemented for the following flows:

✅ Valid Login

✅ Invalid Login

✅ Add Product to Cart

✅ Remove Product from Cart

✅ Cart Badge Validation

Tools & Frameworks Used:

Selenium (Python)

Cypress (JavaScript)

Browser: Chrome

⚠️ Automation Challenge – CAPTCHA Limitation

**During automation of the login flow, the application detected automated behavior and triggered a CAPTCHA upon successful login. Since testing was performed on a production environment, disabling or bypassing the CAPTCHA was not permitted.
As a result, full end-to-end automation after login was limited, and the remaining flows were validated through manual testing.**

📂 Repository Contents
File Name	Description
Add_to_cart.cy.js	                       Cypress automation for Add to Cart
Suace_demo_login.cy.js                   Cypress automation for Login
Sauce_login.py	                         Selenium automation for Login
Sauce Demo Manual Testing.xlsx	         Manual test cases
Full_Defect_Report.xlsx	                 Complete defect report
TEST PLAN.docx	                         Detailed Test Plan
report1.html	                           Automation execution report

🛠 Tools Used

Manual Testing: Test case design & execution

Bug Tracking: Excel

Test Management: Google Sheets / Excel

Automation: Selenium & Cypress

Version Control: GitHub

✅ Test Environment

OS: Windows 11

Browser: Chrome (Latest)

Test URL: https://sauce-demo.myshopify.com/

👩‍💻 Tester Details

Tester: Sapana Gupta
Role: Manual & Automation Tester
Responsibilities:

Test case design & execution

Defect reporting

Automation script creation
