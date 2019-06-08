var myApp = angular
            .module("myModule",[])
            .factory('simplefactory',function(){    //here factory is used as a custom service  
              //A service is a singleton. Instantiated only once. That is same instance is maintained throughout the lifetime of application
              //factory is a simple function which allows us to add some logic before creating the object. It returns the created object. 
              var students = [
                    {name: "Hrishikesh", age: "25", roll_no:"1"},
                    {name: "Aditya", age: "21", roll_no:"2"},
                    {name: "Swarupa", age: "23", roll_no:"3"},
                    {name: "Varun", age: "25", roll_no:"4"},
                    {name: "Shweta", age: "23", roll_no:"5"}
              ];
              var factory = {}; //creating an empty object. 
              factory.getStudents = function(){ //function to get a particular student
                return students;
              };
              factory.deleteStudents = function(){ //function to delete a student
                return students;
              }
              factory.postStudents = function(student){ //function to update a student
                return students;
              };
              return factory;
            })
            .controller("myController",function($scope,simplefactory){  //I have used reference to the factory by writing simplefactory in the controller
              //used a controller over here. Which basically reponsible for a model for a particular view
               //A controller is also responsible for controlling the data. 
               //A code for localStorage of the data in the browser is  written.
                
               if (localStorage.getItem("students")===null){   //This condition is for getting an item from the local storage that is from the browser. 
              //   $scope.students=[                                     //JSON object 
              //       {name: "Hrishikesh", age: "25", roll_no:"1"},
              //       {name: "Aditya", age: "21", roll_no:"2"},
              //       {name: "Swarupa", age: "23", roll_no:"3"},
              //       {name: "Varun", age: "25", roll_no:"4"},
              //       {name: "Shweta", age: "23", roll_no:"5"}

              //  ];
              $scope.students = []; 
              init();
              function init(){ //Initialization function for injecting the service into the controller. 
                $scope.students = simplefactory.getStudents();
                $scope.students = simplefactory.postStudents();
                $scope.students = simplefactory.deleteStudents();
              }
              localStorage.setItem("items",JSON.stringify($scope.students)); //setitem() when passed a key name and value will add that key to the given storage object
            //Json.Stringify: This is used to convert javascript object to string
            //JSON is used to exchange data to/from a web server. So to create $scope.students object into String this is used   
            }
            else{
                $scope.students = JSON.parse(localStorage.getItem("students")); // by using JSON.parse() object is achieved from the data
                //getItem returns the key's value that is students in this case. 
            }
            $scope.add = function(){    //this is the  CRUD  operation function written for adding the student name age and roll no
                var newStudent = {name:"test",age:"test",roll_no:false}; //newStudent is added using this
                $scope.students.push(newStudent); //pushing the new student into the local storage
                localStorage.setItem("students", JSON.stringify($scope.students)); //making it a string 
              }
              $scope.change = function(ind) {  //Update in CRUD operation is performed using this function
                $scope.students[ind].show = !($scope.students[ind].show); //
                localStorage.setItem("students", JSON.stringify($scope.students)); //again creating object to the string
              }
              $scope.delete = function(ind) { //this function in CRUD operations is used to delete a particular student
                $scope.students.splice($scope.students.indexOf(ind), 1); //the .splice is used for removing the elements from the array
                localStorage.setItem("students", JSON.stringify($scope.students)); //again converting into the string. 
              }
              
            });