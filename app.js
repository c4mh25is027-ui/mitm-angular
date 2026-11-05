
// Array to store student details
let students = [];

// Function to add a student
function addStudent() {

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let department = document.getElementById("department").value;
    let semester = document.getElementById("semester").value;

    // Check empty fields
    if (name === "" || roll === "" ||
        department === "" || semester === "") {

        alert("Please enter all student details!");
        return;
    }

    // Check duplicate roll number
    if (students.some(student => student.roll === roll)) {
        alert("Roll number already exists!");
        return;
    }

    // Create student object
    let student = {
        name: name,
        roll: roll,
        department: department,
        semester: semester
    };

    // Add student to array
    students.push(student);

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("department").value = "";
    document.getElementById("semester").value = "";

    // Display students
    displayStudents();
}


// Function to display student list
function displayStudents() {

    let list = document.getElementById("studentList");

    list.innerHTML = "";

    students.forEach((student, index) => {

        let div = document.createElement("div");
        div.className = "student";

        let heading = document.createElement("h3");
        heading.textContent = "Student: " + student.name;

        let roll = document.createElement("p");
        roll.textContent = "Roll Number: " + student.roll;

        let details = document.createElement("div");
        details.className = "hidden";
        details.id = "details" + index;

        let department = document.createElement("p");
        department.textContent =
            "Department: " + student.department;

        let semester = document.createElement("p");
        semester.textContent =
            "Semester: " + student.semester;

        details.appendChild(department);
        details.appendChild(semester);

        let button = document.createElement("button");

        button.textContent = "Show Details";

        button.onclick = function() {

            if (details.classList.contains("hidden")) {
                details.classList.remove("hidden");
                button.textContent = "Hide Details";
            } else {
                details.classList.add("hidden");
                button.textContent = "Show Details";
            }
        };

        div.appendChild(heading);
        div.appendChild(roll);
        div.appendChild(button);
        div.appendChild(details);

        list.appendChild(div);
    });
}


// Function to calculate examination result
function showResult() {

    let roll = document.getElementById("resultRoll").value;

    let marks = document.getElementById("marks").value;

    let resultDiv = document.getElementById("result");

    if (roll === "" || marks === "") {
        alert("Please enter Roll Number and Marks!");
        return;
    }

    let student = students.find(s => s.roll === roll);

    if (!student) {
        resultDiv.innerHTML =
            "<p>Student not found!</p>";
        return;
    }

    let score = Number(marks);

    if (!Number.isFinite(score) || score < 0 || score > 100) {
        alert("Please enter marks between 0 and 100!");
        return;
    }

    let percentage = score;

    let status = "";

    if (score >= 35) {
        status = "PASS";
    } else {
        status = "FAIL";
    }

    resultDiv.innerHTML = "";

    let heading = document.createElement("h3");
    heading.textContent = "Examination Result";

    let name = document.createElement("p");
    name.textContent = "Student Name: " + student.name;

    let rollNumber = document.createElement("p");
    rollNumber.textContent = "Roll Number: " + student.roll;

    let marksText = document.createElement("p");
    marksText.textContent = "Marks: " + score + "/100";

    let percentageText = document.createElement("p");
    percentageText.textContent = "Percentage: " + percentage + "%";

    let statusText = document.createElement("p");
    statusText.textContent = "Result: " + status;
    statusText.className =
        score >= 35 ? "pass" : "fail";

    resultDiv.appendChild(heading);
    resultDiv.appendChild(name);
    resultDiv.appendChild(rollNumber);
    resultDiv.appendChild(marksText);
    resultDiv.appendChild(percentageText);
    resultDiv.appendChild(statusText);
}
