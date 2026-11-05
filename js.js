var app = angular.module("studentApp", []);

app.controller("StudentController", function ($scope, $http) {

    var API_URL = "https://msnnavaeultebofqyoom.supabase.co/rest/v1/student";
    var API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zbm5hdmFldWx0ZWJvZnF5b29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4MzE3NDAsImV4cCI6MjEwOTQwNzc0MH0.N8GobW2WROZCbOl6F_CVUK6Melrz9ttTJ7sj6DmC-JA";

    var config = {
        headers: {
            "apikey": API_KEY,
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
    };

    $scope.students = [];
    $scope.student = {};

    // READ: Fetch all students
    $scope.getStudents = function () {
        $http.get(API_URL + "?select=*", config)
            .then(function (response) {
                $scope.students = response.data;
            });
    };

    // CREATE: Add a student
    // UPDATE: Edit an existing student
    $scope.saveStudent = function () {

        if ($scope.student.id) {

            $http.patch(
                API_URL + "?id=eq." + $scope.student.id,
                {
                    name: $scope.student.name,
                    department: $scope.student.department
                },
                config
            ).then(function () {
                $scope.student = {};
                $scope.getStudents();
            });

        } else {

            $http.post(API_URL, $scope.student, config)
                .then(function () {
                    $scope.student = {};
                    $scope.getStudents();
                });

        }
    };

    // Select a student for editing
    $scope.editStudent = function (student) {
        $scope.student = angular.copy(student);
    };

    // Cancel editing
    $scope.cancelEdit = function () {
        $scope.student = {};
    };

    // DELETE: Remove a student
    $scope.deleteStudent = function (id) {
        $http.delete(API_URL + "?id=eq." + id, config)
            .then(function () {
                $scope.getStudents();
            });
    };

    // Load students when the application starts
    $scope.getStudents();

});