var studentName;
var studentNumber;
var numberOfSubjects;
var subjectsWithGrade = [["Subject Name", "Marks Obtained"]]
var marks_obtained,percentage_obtained,grade_obtained



console.log("Iniaital " + studentName + " second is  " + studentNumber + "and sub " + numberOfSubjects)

// empty table so that it does not keep on apending same values
var marksheetTable = document.getElementById("marksheet_table")
var defaultValue = marksheetTable.outerHTML



// document.getElementById()
document.querySelector("#test_btn").addEventListener("click", function (event) {
    event.preventDefault()
    var showAddedCourse = document.getElementById("added_course")

    var form = document.getElementById("course-form")
    var subjectName = form.elements.subjects.value
    var marks_obatained = Number(form.elements.marks.value)



    // add validation to stop subjects added to the array if its empty
    if (subjectName && marks_obatained) {

        subjectsWithGrade.push([subjectName, marks_obatained])
        form.elements.subjects.value = ""
        form.elements.marks.value = ""
        showAddedCourse.textContent = ""

        for (var i = 1; i < subjectsWithGrade.length; i++) {
            // showAddedCourse.innerHTML += `${subjectsWithGrade[i][0]} ${subjectsWithGrade[i][1]}/100 </br>`
            let html = '<table>';


            for (let i = 0; i < subjectsWithGrade.length; i++) {
                let subject = subjectsWithGrade[i][0];
                let grade = subjectsWithGrade[i][1];

                html += `
                <tr>
                  <td style="font-size: 12px;">${subject}&emsp;</td>
                  <td style="font-size: 12px;">${grade}/100&emsp;</td>
                </tr>
              `;
            }

            html += '</table>';
            showAddedCourse.innerHTML = html;
        }
    } else {
        showAddedCourse.textContent = 'Please enter a course name and grade, then click the "Add Course" button to add the course to your marksheet.'
    }


})

// Create a funcion for Generate Marksheet Button
document.getElementById("generate_btn").addEventListener("click", function (event) {
    event.preventDefault()

    // update values
    studentName = document.getElementById("studentName").value
    studentNumber = document.getElementById("studentNumber").value;
    numberOfSubjects = subjectsWithGrade.length - 1;


    marksheetTable.innerHTML = defaultValue

    marks_obtained = total_subject_marks(subjectsWithGrade)
    percentage_obtained = percentageCalculator(marks_obtained, numberOfSubjects).toFixed(2)
    grade_obtained = gradeCalculator(percentage_obtained)



    // generateMarksheet(studentName, studentNumber)
    generateMarksheet(studentName, studentNumber)
    // calling functions to store their values



})


// validation related
document.getElementById("studentName").addEventListener("keydown", function () {
    document.getElementById("error-message").innerHTML = "";
    this.style.borderColor = "";
});

document.getElementById("studentNumber").addEventListener("keydown", function () {
    document.getElementById("error-message").innerHTML = "";
    this.style.borderColor = "";
});

// document.getElementById("subjects").addEventListener("keydown", function () {
//     document.getElementById("error-message").innerHTML = ""
//     this.style.borderColor = ""
// })

// document.getElementById("marks").addEventListener("keydown", function () {
//     document.getElementById("error-message").innerHTML = "";
//     this.style.borderColor = "";
// });


// *************Function Defining Area**********

// total subjects marks function
function total_subject_marks(marks) {

    var marks_obtained = 0
    console.log("Hey its marks.length 1 " + marks.length)
    console.log("Hey its marks 1" + marks)
    //iterate over the marks loop and add them up 
    for (var i = 1; i < marks.length; i++) {
        marks_obtained += marks[i][1]

    }
    console.log("Hey its marks.length 2 " + marks.length)
    console.log("Hey its marks 2" + marks)
    console.log("Hey its marks_obtained" + marks_obtained)

    return marks_obtained
}
// Percentage function
function percentageCalculator(marks_obtained, numberOfSubjects) {
    return marks_obtained / numberOfSubjects
}

// grade calculator
function gradeCalculator(percentage) {
    if (percentage >= 85 && percentage <= 100) {
        return "A+";
    } else if (percentage >= 75 && percentage <= 84) {
        return "A";
    } else if (percentage >= 65 && percentage <= 74) {
        return "B+";
    } else if (percentage >= 60 && percentage <= 73) {
        return "B";
    } else if (percentage >= 55 && percentage <= 60) {
        return "C";
    } else if (percentage >= 50 && percentage <= 54) {
        return "D";
    } else if (percentage < 50) {
        return "F";
    }
}

// This function will generate final marksheet in the end
function generateMarksheet(studentName, studentNumber) {


    // set the values in HTML marksheet form
    document.getElementById("sheet_studentName").textContent = studentName
    document.getElementById("sheet_studentNumber").textContent = studentNumber

    // subjects part

    renderCourseInfo();


}

function renderCourseInfo() {

    for (var i = 1; i < subjectsWithGrade.length; i++) {
        // add columns depending on courses
        var coursePercentage = (subjectsWithGrade[i][1] / 100) * 100
        document.getElementById("marksheet_table").innerHTML += ` 
            <tr class="subject${i}">
            <td class="name2">${subjectsWithGrade[i][0]}</td>
            <td class="obtained_marks">${subjectsWithGrade[i][1]}</td>
            <td class="total_marks">100</td>
            <td class="grade">${gradeCalculator(coursePercentage)}</td>
            </tr>`
    }

    // render final row with calculations
    document.getElementById("marksheet_table").innerHTML += `
    <tr class="total-row">
        <td colspan="1">Total</td>
        <td class="final_marksObtained">${marks_obtained}</td>
        <td class="final_totalMarks">${(numberOfSubjects) * 100}</td>
        <td class="grade">${grade_obtained}</td>

    </tr>
    <tr class="total-row">
        <td colspan="2"></td>
        <td>Percentage:</td>
        <td class="final_percentage">${percentage_obtained}%</td>
    </tr>
    `
}


// form Validation 

function validateForm() {
    var form = document.getElementById("course-form");
    var studentName = form.elements.studentName.value;
    var studentNumber = form.elements.studentNumber.value;
    var subjectName = form.elements.subjects.value;
    var marks = form.elements.marks.value;
    let isValid = true;

    if (!studentName) {
        form.elements.studentName.style.borderColor = "red";
        document.getElementById("error-message").innerHTML = "Please enter a student name.";
        isValid = false;
    } else {
        form.elements.studentName.style.borderColor = "";
    }

    if (!studentNumber || !/^[A-Z]\d{4}$/.test(studentNumber)) {
        form.elements.studentNumber.style.borderColor = "red";
        document.getElementById("error-message").innerHTML = "Please enter a valid student number in the format A1234.";
        isValid = false;
    } else {
        form.elements.studentNumber.style.borderColor = "";
    }

    // if (!subjectName) {
    //     form.elements.subjects.style.borderColor = "red";
    //     document.getElementById("error-message").innerHTML = "Please enter a valid course name: ";
    //     isValid = false;
    // } else {
    //     form.elements.subjects.style.borderColor = "";
    // }

    // if (!marks || marks < 0 || marks > 100) {
    //     form.elements.marks.style.borderColor = "red";
    //     document.getElementById("error-message").innerHTML = "Please enter a valid mark between 0 and 100.";
    //     isValid = false;
    // } else {
    //     form.elements.marks.style.borderColor = "";
    // }

    return isValid;
}
