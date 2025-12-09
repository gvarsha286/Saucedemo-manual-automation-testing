import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC 
from selenium.webdriver.chrome.options import Options
import time 
import os

driver = webdriver.Chrome()
# driver.maximize_window()
driver.get("https://sauce-demo.myshopify.com/")
wait = WebDriverWait( driver , 20) 

def valid_login_page():
    print("\n validating login page")
    wait.until(EC.element_to_be_clickable((By.XPATH ,"(//a[@id='customer_login_link'])[1]"))).click()  
    email_feild = wait.until(EC.visibility_of_element_located(( By.XPATH , "//input[@id='customer_email']")))
    password_feild = wait.until(EC.visibility_of_element_located(( By.XPATH , "//input[@id='customer_password']"))) 

    signin_button = wait.until(EC.element_to_be_clickable((By.XPATH , "//input[@value='Sign In']")))

    assert email_feild.is_displayed(), "Email feild is missing!"
    assert password_feild.is_displayed() , "Password feild is missing!"
    assert signin_button.is_displayed(), " sign in button is missing!"

    print("\n login page element is displayed coorectly")


def login ( email , password ): 

    # wait.until(EC.element_to_be_clickable((By.XPATH ,"(//a[@id='customer_login_link'])[1]"))).click()  

    wait.until(EC.visibility_of_element_located(( By.XPATH , "//input[@id='customer_email']"))).clear()
    wait.until(EC.visibility_of_element_located(( By.XPATH , "//input[@id='customer_password']"))).clear()

    wait.until(EC.visibility_of_element_located(( By.XPATH , "//input[@id='customer_email']"))).send_keys(email)
    wait.until(EC.visibility_of_element_located(( By.XPATH , "//input[@id='customer_password']"))).send_keys(password)

    signin_button = wait.until(EC.element_to_be_clickable((By.XPATH , "//input[@value='Sign In']"))).click()


def verify_invalid_login_error():
    print("\n verfiying invalid login error messages")

    try:
        error_msg = wait.until(EC.visibility_of_elements_located((By.XPATH ,"//div[contains(@class,'errors')]")))
        error_msg.is_dsplayed()
        print("✔ Error message displayed:", error_msg.text)

    except:
        print("❌ Error message NOT displayed") 


def verfiy_field_error():
   
   wait.until(EC.visibility_of_element_located(( By.XPATH , "//input[@id='customer_email']"))).clear()
   wait.until(EC.visibility_of_element_located(( By.XPATH , "//input[@id='customer_password']"))).clear()

   wait.until(EC.element_to_be_clickable((By.XPATH ,"//input[@value='Sign In']"))).click()

   try:
       field_err = wait.until(EC.visibility_of_element_located((By.XPATH ,"//div[contains(@class,'errors')]"))) 
       field_err.is_displayed()
       print("✔ Field validation error found:", field_err.text)

   except:
       print("❌ No validation shown for empty fields!")

# Login elements is displayed on login page 
valid_login_page() 

#validae invalid login error
print("\n Testing invalid login : ")
login("gvarsha256@gmail.com" , "12346") 
verify_invalid_login_error()

#validating feild error 
print("\n testing field validation ") 
verfiy_field_error()


time.sleep(5)
driver.quit() 
