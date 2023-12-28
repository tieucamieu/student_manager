let studentListBase = [
    {
        id: "STUDENT_JS231130_" + Math.ceil(Date.now() * Math.random()),
        name: "NTBPhuoc",
        phoneNumber: "0329577177",
        sex: true // true => Name, false => Nữ
    },
    {
        id: "STUDENT_JS231130_" + Math.ceil(Date.now() * Math.random()),
        name: "Mai",
        phoneNumber: "123",
        sex: false // true => Name, false => Nữ
    }
]

if (!localStorage.getItem("students")) localStorage.setItem("students", JSON.stringify(studentListBase));


function printDataDom(students) {
    let studentManagerTableBodyEl = document.querySelector(".studentManagerTableBody");
    if (!studentManagerTableBodyEl) return
    try {
        let tableDataString = ``;
        for (let i in students) {
            console.log("students", students[i])
            tableDataString += `
            <tr>
                    <th scope="row">${Number(i) + 1}</th>
                    <td>${students[i].name}</td>
                    <td>${students[i].phoneNumber}</td>
                    <td>    
                    </td>
                    <td>
                        <button onclick="deleteStudent('${students[i].id}')" class="btn btn-danger">Delete</button>
                        <button onclick="updateStudent('${students[i].id}')" class="btn btn-success">Update</button>
                    </td>
                </tr>
           `
        }
        studentManagerTableBodyEl.innerHTML = tableDataString;
    } catch (err) {
        localStorage.setItem("students", JSON.stringify(studentListBase))
        printDataDom(JSON.parse(localStorage.getItem("students")))
    }
}

/* First Load */
printDataDom(JSON.parse(localStorage.getItem("students")))


function addStudent() {
    let newStudent = {
        id: "STUDENT_JS231130_" + Math.ceil(Date.now() * Math.random()),
        name: prompt("Nhập tên sinh viên"),
        phoneNumber: prompt("Nhập số điện thoại sinh viên"),
        sex:  Number(prompt("Nhập giới tính sinh viên")) == 1 ? true : false
    }

    let students = JSON.parse(localStorage.getItem("students"));
    students.push(newStudent)
    localStorage.setItem("students", JSON.stringify(students))
    printDataDom(students)
}

function deleteStudent(studentId) {
    if(!confirm("Chắc chưa?")) return
    let students = JSON.parse(localStorage.getItem("students"));
    students = students.filter(student => student.id != studentId)
    localStorage.setItem("students", JSON.stringify(students))
    printDataDom(students)
}


function updateStudent(studentId) {
    let students = JSON.parse(localStorage.getItem("students"));
    let student = students.find(item => item.id == studentId);

    student.name =  prompt("Nhập tên sinh viên", student.name);
    student.phoneNumber =   prompt("Nhập số điện thoại sinh viên", student.phoneNumber);
    student.sex = Number(prompt("Nhập giới tính sinh viên", student.sex ? "1" : "nữ")) == 1 ? true : false;

    localStorage.setItem("students", JSON.stringify(students))
    printDataDom(students)
}

function setDefaultData() {
    if(!confirm("Chắc chưa?")) return
    localStorage.setItem("students", JSON.stringify(studentListBase))
    printDataDom(studentListBase)
}

function search() {
    let students = JSON.parse(localStorage.getItem("students"));
    let searchInforEl = document.querySelector(".search_infor");

    if(searchInforEl.value == "")  {
        printDataDom(students)
        return
    }

    let result = [];
    for(let i in students) {
        if(format(students[i].name).includes(format(searchInforEl.value))) {
            result.push(students[i])
        }
    }
    printDataDom(result)
}



function format(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
}