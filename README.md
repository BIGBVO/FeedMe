## Overview

Allergy is one of the world leading causes of chronic illness that affects more than 50 million people annually in America alone (Allergy Facts | AAFA.org, n.d.). On the other hand, it can be extremely frustrating for one who has an allergy to always have to check the product that they are buying, by reading on the small and hard to read ingredients column of the product, to ensure that the product is safe for them to consume. Having seen this problem as well as the opportunities that arise from it, we have decided to partner up with G’day Consulting to develop a mobile application, “FeedMe”, to help address this issue. The vision of the project is to provide a more convenient way for our user to detect their food allergen in a product by simply scanning the product’s barcode.​

## Developers
* Hao Wu : Manager, Backend Developer, Backend Tester 
* Vincent Onasis: Negotiator, Coach, Frontend Developer and, Frontend Tester 
* Ruoru Huang (Lica): Tracker, UI Designer, Frontend Developer and, Frontend Tester 
* Xinran Yuan (Joyce): UI Designer and, Frontend Developer 
* Yongkun Deng: ExtremeProgramming Expert, Frontend Developer and, Frontend Tester 
* Zhuang Miao (Arthur): Backend Developer and, Backend Tester

## RESTful API

### localhost:PORT/api/admin      ---all the admin related functions  
* __GET__ ('/', show all the user)   
* __GET__ ('/getFood', show all the food stored in the database)
* __GET__ ('/showNutrition', show the nutrition list in the database)
* __POST__ ('/show', user's profile with userID) 
* __POST__ ('/store', create a new user)  
* __POST__ ('/update', update a user's info) 
* __POST__ ('/storeNutrition', add a nutrition to the database) 
* __POST__ ('/addNutritionToFood', add a nutrition to the food in the database) 
* __DELETE__ ('/delete', delete a user)  
* __DELETE__ ('/deleteFood/:foodID', delete a food using foodID)  
  
### localhost:PORT/api            ---all the login/register functions  
* __POST__ ('/register', register)  
* __POST__ ('/login', login)  
* __POST__ ('/verify', verify the phone number)
* __POST__ ('/check', check the verification with phone number and the code)
* __POST__ ('/cancel', user cancel the verification)
  
### localhost:PORT/api/user       ---all the user related functions  
* __GET__ ('/profile', check the profile of that user)  
* __GET__ ('/profile/add', add a preference)  
* __GET__ ('/list_nutrition', list user's nutrition's id, then you can use a for-loop  
and nutrition/show_id to get all information of user's preference)
* __POST__ ('/add_nutrition', add a nutrition to user's preference list)
* __POST__ ('/remove_nutrition', remove a nutrition from user's preference list)
  
### localhost:PORT/api/nutrition  ---all the nutrition related functions  
* __GET__ ('/', show all nutrition)  
* __GET__ ('/search', search a set of nutrition according to the keyword provided. The 
_keyword_ is passed through the URL parameters. E.g. /search?keyword=g means search nutrition with 
'g' in their description. The keyword is capital insensitive)
* __GET__ ('/show_id', show nutrition information with specific nutrition ID. The _id_ is passed 
through the URL parameters. E.g. /show_id?id=0 means retrieving the nutrition with _id 0)  
* __GET__ ('/show_description', show nutrition information with specific nutrition description. 
The _description_ is passed through the URL parameters. E.g. /show_description?description=Fish 
means retrieving the nutrition with Description "Fish")  
* __GET__ ('/load_icon', load nutrition icon with Icon_path, the image file will be sent back. The 
_path_ is passed through the URL parameters. E.g. /load_icon?path=fish.png means retrieving load 
the image fish.png from preference_icon folder in the res directory)

### localhost:PORT/api/food  ---all the nutrition related functions  
* __GET__ ('/', show all food infos)  
* __GET__ ('/getFoodIcon/:uniqueID', get the food icon using barcode or id of the food)  
* __GET__ ('/showFood/:barcode', show the food with the barcode that has been passed)  

---above 4 api don't require authorization  
---below 3 api can only be accessed by Admin  

* __DELETE__ ('/delete', delete nutrition with nutrition ID)  
* __POST__ ('/add', add a new nutrition)  
* __POST__ ('/update', update a nutrition's information)
* __POST__ ('/assign', assign an exist nutrition to a category)

### localhost:PORT/api/category   ---all the nutrition categories related functions
* __GET__ ('/', show all categories)
* __POST__ ('/show', show the information of one category)
* __POST__ ('/create', create a new category, admin login is required)
