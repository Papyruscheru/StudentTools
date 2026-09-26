/* =====================================================
   MODALS
===================================================== */

function openTool(id) {

    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.add("active");
    }
}


function closeTool(id) {

    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.remove("active");
    }
}


/* Close when clicking outside */

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", function(event) {

        if (event.target === modal) {

            modal.classList.remove("active");

        }

    });

});


/* ESCAPE KEY */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        document
            .querySelectorAll(".modal.active")
            .forEach(modal => {

                modal.classList.remove("active");

            });

    }

});


/* =====================================================
   DARK MODE
===================================================== */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});


if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const toolCards =
    document.querySelectorAll(".tool-card");


searchInput.addEventListener("input", function() {

    const search =
        searchInput.value.toLowerCase().trim();


    toolCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();


        if (
            name.includes(search)
            || search === ""
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});


/* =====================================================
   GPA
===================================================== */

function addCourse() {

    const courses =
        document.getElementById("courses");


    const row =
        document.createElement("div");


    row.className = "course-row";


    row.innerHTML = `

        <select class="grade">

            <option value="4">A</option>
            <option value="3">B</option>
            <option value="2">C</option>
            <option value="1">D</option>
            <option value="0">F</option>

        </select>

        <input
            type="number"
            class="credits"
            placeholder="Credits"
            min="1"
        >

    `;


    courses.appendChild(row);
}


function calculateGPA() {

    const grades =
        document.querySelectorAll(".grade");

    const credits =
        document.querySelectorAll(".credits");


    let totalPoints = 0;

    let totalCredits = 0;


    for (let i = 0; i < grades.length; i++) {

        const grade =
            parseFloat(grades[i].value);

        const credit =
            parseFloat(credits[i].value);


        if (
            !isNaN(credit)
            && credit > 0
        ) {

            totalPoints +=
                grade * credit;

            totalCredits += credit;

        }

    }


    const result =
        document.getElementById("gpaResult");


    if (totalCredits === 0) {

        result.textContent =
            "Please enter credit hours.";

        return;

    }


    const gpa =
        totalPoints / totalCredits;


    result.textContent =
        `Your GPA is ${gpa.toFixed(2)} / 4.00`;

}


/* =====================================================
   CGPA
===================================================== */

function addSemester() {

    const semesters =
        document.getElementById("semesters");


    const row =
        document.createElement("div");


    row.className = "course-row";


    row.innerHTML = `

        <input
            type="number"
            class="semesterGpa"
            placeholder="GPA"
            min="0"
            max="4"
            step="0.01"
        >

        <input
            type="number"
            class="semesterCredits"
            placeholder="Credits"
            min="1"
        >

    `;


    semesters.appendChild(row);

}


function calculateCGPA() {

    const gpas =
        document.querySelectorAll(".semesterGpa");

    const credits =
        document.querySelectorAll(".semesterCredits");


    let totalPoints = 0;

    let totalCredits = 0;


    for (let i = 0; i < gpas.length; i++) {

        const gpa =
            parseFloat(gpas[i].value);

        const credit =
            parseFloat(credits[i].value);


        if (
            !isNaN(gpa)
            && !isNaN(credit)
            && credit > 0
        ) {

            totalPoints +=
                gpa * credit;

            totalCredits += credit;

        }

    }


    const result =
        document.getElementById("cgpaResult");


    if (totalCredits === 0) {

        result.textContent =
            "Please enter your semester information.";

        return;

    }


    const cgpa =
        totalPoints / totalCredits;


    result.textContent =
        `Your CGPA is ${cgpa.toFixed(2)} / 4.00`;

}


/* =====================================================
   PERCENTAGE
===================================================== */

function calculatePercentage() {

    const x =
        parseFloat(
            document.getElementById("percentX").value
        );


    const y =
        parseFloat(
            document.getElementById("percentY").value
        );


    const result =
        document.getElementById("percentageResult");


    if (isNaN(x) || isNaN(y)) {

        result.textContent =
            "Please enter both numbers.";

        return;

    }


    const answer =
        (x / 100) * y;


    result.textContent =
        `${x}% of ${y} = ${answer.toFixed(2)}`;

}


/* =====================================================
   WORD COUNTER
===================================================== */

function countWords() {

    const text =
        document.getElementById("counterText").value;


    const words =
        text.trim()
            ? text.trim().split(/\s+/).length
            : 0;


    const characters =
        text.length;


    const sentences =
        text.trim()
            ? text.split(/[.!?]+/)
                .filter(x => x.trim().length > 0)
                .length
            : 0;


    document.getElementById("wordCount")
        .textContent = words;


    document.getElementById("characterCount")
        .textContent = characters;


    document.getElementById("sentenceCount")
        .textContent = sentences;

}


/* =====================================================
   AGE
===================================================== */

function calculateAge() {

    const value =
        document.getElementById("birthDate").value;


    const result =
        document.getElementById("ageResult");


    if (!value) {

        result.textContent =
            "Please select your date of birth.";

        return;

    }


    const birth =
        new Date(value);


    const today =
        new Date();


    if (birth > today) {

        result.textContent =
            "Date of birth cannot be in the future.";

        return;

    }


    let years =
        today.getFullYear()
        - birth.getFullYear();


    let months =
        today.getMonth()
        - birth.getMonth();


    let days =
        today.getDate()
        - birth.getDate();


    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );

        days +=
            previousMonth.getDate();

    }


    if (months < 0) {

        years--;

        months += 12;

    }


    result.textContent =
        `You are ${years} years, ${months} months and ${days} days old.`;

}


/* =====================================================
   UNIT CONVERTER
===================================================== */

function convertUnit() {

    const type =
        document.getElementById("unitType").value;


    const value =
        parseFloat(
            document.getElementById("unitValue").value
        );


    const result =
        document.getElementById("unitResult");


    if (isNaN(value)) {

        result.textContent =
            "Please enter a value.";

        return;

    }


    let answer;


    if (type === "km") {

        answer =
            `${value} km = ${(value * 0.621371).toFixed(4)} miles`;

    }


    else if (type === "miles") {

        answer =
            `${value} miles = ${(value * 1.60934).toFixed(4)} km`;

    }


    else if (type === "kg") {

        answer =
            `${value} kg = ${(value * 2.20462).toFixed(4)} pounds`;

    }


    else if (type === "pounds") {

        answer =
            `${value} pounds = ${(value * 0.453592).toFixed(4)} kg`;

    }


    result.textContent = answer;

}


/* =====================================================
   LOAN
===================================================== */

function calculateLoan() {

    const principal =
        parseFloat(
            document.getElementById("loanAmount").value
        );


    const annualRate =
        parseFloat(
            document.getElementById("loanRate").value
        );


    const years =
        parseFloat(
            document.getElementById("loanYears").value
        );


    const result =
        document.getElementById("loanResult");


    if (
        isNaN(principal)
        || isNaN(annualRate)
        || isNaN(years)
        || principal <= 0
        || years <= 0
    ) {

        result.textContent =
            "Please enter valid loan details.";

        return;

    }


    const monthlyRate =
        annualRate / 100 / 12;


    const months =
        years * 12;


    let payment;


    if (monthlyRate === 0) {

        payment =
            principal / months;

    } else {

        payment =
            principal
            * monthlyRate
            * Math.pow(
                1 + monthlyRate,
                months
            )
            /
            (
                Math.pow(
                    1 + monthlyRate,
                    months
                ) - 1
            );

    }


    const total =
        payment * months;


    const interest =
        total - principal;


    result.innerHTML =
        `Monthly payment: ${payment.toFixed(2)}<br>
         Total payment: ${total.toFixed(2)}<br>
         Total interest: ${interest.toFixed(2)}`;

}


/* =====================================================
   DISCOUNT
===================================================== */

function calculateDiscount() {

    const price =
        parseFloat(
            document.getElementById("originalPrice").value
        );


    const discount =
        parseFloat(
            document.getElementById("discountPercent").value
        );


    const result =
        document.getElementById("discountResult");


    if (
        isNaN(price)
        || isNaN(discount)
    ) {

        result.textContent =
            "Please enter valid values.";

        return;

    }


    const saved =
        price * discount / 100;


    const finalPrice =
        price - saved;


    result.innerHTML =
        `You save: ${saved.toFixed(2)}<br>
         Final price: ${finalPrice.toFixed(2)}`;

}


/* =====================================================
   GRADE
===================================================== */

function calculateGrade() {

    const obtained =
        parseFloat(
            document.getElementById("marksObtained").value
        );


    const total =
        parseFloat(
            document.getElementById("totalMarks").value
        );


    const result =
        document.getElementById("gradeResult");


    if (
        isNaN(obtained)
        || isNaN(total)
        || total <= 0
        || obtained < 0
        || obtained > total
    ) {

        result.textContent =
            "Please enter valid marks.";

        return;

    }


    const percentage =
        (obtained / total) * 100;


    let grade;


    if (percentage >= 80) {

        grade = "A";

    } else if (percentage >= 70) {

        grade = "B";

    } else if (percentage >= 60) {

        grade = "C";

    } else if (percentage >= 50) {

        grade = "D";

    } else {

        grade = "F";

    }


    result.textContent =
        `${percentage.toFixed(2)}% — Grade ${grade}`;

}


/* =====================================================
   TIME
===================================================== */

function calculateTime() {

    const hours =
        parseInt(
            document.getElementById("hours1").value
        ) || 0;


    const minutes =
        parseInt(
            document.getElementById("minutes1").value
        ) || 0;


    const totalMinutes =
        hours * 60 + minutes;


    const finalHours =
        Math.floor(totalMinutes / 60);


    const finalMinutes =
        totalMinutes % 60;


    document.getElementById("timeResult")
        .textContent =
        `${finalHours} hours ${finalMinutes} minutes`;

}


/* =====================================================
   BMI
===================================================== */

function calculateBMI() {

    const weight =
        parseFloat(
            document.getElementById("weight").value
        );


    const heightCm =
        parseFloat(
            document.getElementById("height").value
        );


    const result =
        document.getElementById("bmiResult");


    if (
        isNaN(weight)
        || isNaN(heightCm)
        || weight <= 0
        || heightCm <= 0
    ) {

        result.textContent =
            "Please enter valid measurements.";

        return;

    }


    const height =
        heightCm / 100;


    const bmi =
        weight / (height * height);


    let category;


    if (bmi < 18.5) {

        category = "Underweight";

    } else if (bmi < 25) {

        category = "Normal range";

    } else if (bmi < 30) {

        category = "Overweight";

    } else {

        category = "Obesity range";

    }


    result.textContent =
        `BMI: ${bmi.toFixed(1)} — ${category}`;

}


/* =====================================================
   SIMPLE INTEREST
===================================================== */

function calculateInterest() {

    const principal =
        parseFloat(
            document.getElementById("principal").value
        );


    const rate =
        parseFloat(
            document.getElementById("interestRate").value
        );


    const years =
        parseFloat(
            document.getElementById("interestYears").value
        );


    const result =
        document.getElementById("interestResult");


    if (
        isNaN(principal)
        || isNaN(rate)
        || isNaN(years)
    ) {

        result.textContent =
            "Please enter all values.";

        return;

    }


    const interest =
        principal * rate * years / 100;


    const total =
        principal + interest;


    result.innerHTML =
        `Interest: ${interest.toFixed(2)}<br>
         Total amount: ${total.toFixed(2)}`;

}


/* =====================================================
   TIP
===================================================== */

function calculateTip() {

    const bill =
        parseFloat(
            document.getElementById("billAmount").value
        );


    const tipPercent =
        parseFloat(
            document.getElementById("tipPercent").value
        );


    const people =
        parseInt(
            document.getElementById("people").value
        ) || 1;


    const result =
        document.getElementById("tipResult");


    if (
        isNaN(bill)
        || isNaN(tipPercent)
        || people < 1
    ) {

        result.textContent =
            "Please enter valid values.";

        return;

    }


    const tip =
        bill * tipPercent / 100;


    const total =
        bill + tip;


    const perPerson =
        total / people;


    result.innerHTML =
        `Tip: ${tip.toFixed(2)}<br>
         Total: ${total.toFixed(2)}<br>
         Per person: ${perPerson.toFixed(2)}`;

}


/* =====================================================
   AVERAGE
===================================================== */

function calculateAverage() {

    const input =
        document.getElementById("averageNumbers").value;


    const numbers =
        input
            .split(",")
            .map(Number)
            .filter(n => !isNaN(n));


    const result =
        document.getElementById("averageResult");


    if (numbers.length === 0) {

        result.textContent =
            "Enter numbers separated by commas.";

        return;

    }


    const sum =
        numbers.reduce(
            (total, number) =>
                total + number,
            0
        );


    const average =
        sum / numbers.length;


    result.textContent =
        `Average: ${average.toFixed(2)}`;

}


/* =====================================================
   PASSWORD GENERATOR
===================================================== */

let generatedPassword = "";


function generatePassword() {

    const length =
        parseInt(
            document.getElementById("passwordLength").value
        );


    const result =
        document.getElementById("passwordResult");


    if (
        isNaN(length)
        || length < 6
        || length > 100
    ) {

        result.textContent =
            "Password length must be between 6 and 100.";

        return;

    }


    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*()_+-=[]{}";


    generatedPassword = "";


    const randomArray =
        new Uint32Array(length);


    crypto.getRandomValues(randomArray);


    for (let i = 0; i < length; i++) {

        generatedPassword +=
            characters[
                randomArray[i] %
                characters.length
            ];

    }


    result.textContent =
        generatedPassword;

}


function copyPassword() {

    if (!generatedPassword) {

        alert("Generate a password first.");

        return;

    }


    navigator.clipboard
        .writeText(generatedPassword)
        .then(() => {

            alert("Password copied!");

        })
        .catch(() => {

            alert("Could not copy password.");

        });

}