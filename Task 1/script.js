const myForm = document.querySelector("#myForm")
const userWrap = document.querySelector("#userWrap")
const singleData = document.querySelector("#singleData")

const heads = ["name", "age", "phone"]

const readFromStorage = (key=`tasks`) => JSON.parse(localStorage.getItem(key)) || []
const writeToStorage = (data, key=`tasks`) => localStorage.setItem(key, JSON.stringify(data))

const userObjCreator = (myForm)=>{
    const user = { id:Date.now() , status: "Not Set Yet"}
    heads.forEach( h => user[h] = myForm.elements[h].value )
    return user
}

const addUser = (user)=>{
    const allUsers = readFromStorage("users")
    allUsers.push(user)
    writeToStorage(allUsers, "users")
}

function createMyOwnElement (ele, parent, txt=null, classes=null){
    const myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if(txt) myElement.textContent=txt
    if(classes) myElement.classList=classes
    return myElement
}

if(myForm){
    myForm.addEventListener("submit", function(e){
        e.preventDefault()
        const user = userObjCreator(myForm)
        addUser(user)
        window.location = "index.html"
    })
}
const deleteMyElement = (allUsers, i) =>{
    allUsers.splice(i,1)
    writeToStorage(allUsers, "users")
    drawData()
}

const editMyElement = (allUsers, i)=>{
    let newPhone = prompt("Enter updated phone number");
    allUsers[i].phone = newPhone;
    if(!newPhone == ""){
        allUsers[i].status = "Active"
    }else {
        allUsers[i].status = "In Active"
    }
    writeToStorage(allUsers, "users");
    drawData();
    console.log(allUsers);
}


const drawData = () =>{
    userWrap.innerHTML=""
    const allUsers = readFromStorage("users")
    allUsers.forEach((user, i)=>{
        const tr = createMyOwnElement("tr", userWrap)
        createMyOwnElement("td", tr, user.id)
        createMyOwnElement("td", tr, user.name)
        createMyOwnElement("td", tr, user.phone)
        createMyOwnElement("td", tr, user.age)
        createMyOwnElement("td", tr, user.status);
        const td = createMyOwnElement("td", tr)

        const delBtn = createMyOwnElement("button", td, "Delete","mx-2 btn btn-danger")
        delBtn.addEventListener("click", (e)=> deleteMyElement(allUsers, i))
        const showBtn = createMyOwnElement("button", td, "Show","mx-2 btn btn-primary")
        showBtn.addEventListener("click", ()=>{
            localStorage.setItem("index", i)
            window.location="single.html"
        })
        const editBtn = createMyOwnElement("button", td, "Edit","mx-2 btn btn-warning")
        editBtn.addEventListener("click", (e)=> editMyElement (allUsers,i))
    })
}

// const deleteMyElement = (allUsers, i) =>{
//     allUsers.splice(i,1)
//     writeToStorage(allUsers, "users")
//     drawData()
// }
if(userWrap){
    drawData()
}

if(singleData){
    const index = localStorage.getItem("index")
    const allUsers= readFromStorage("users")
    createMyOwnElement("p", singleData, allUsers[index].name)
    createMyOwnElement("p", singleData, allUsers[index].phone);
    createMyOwnElement("p", singleData, allUsers[index].age);
    createMyOwnElement("p", singleData, allUsers[index].status);

}














