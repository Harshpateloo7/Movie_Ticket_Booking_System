// variable declaration 
let count = document.querySelector('.countChair');
let totalPrice = document.querySelector('.totalPrice');
let countSeat = 1;
let executive = 10;
let club = 12;
let royal = 15;
let total = 0;
let availanleChair = document.querySelector('.chairAvailable');
let toNumber = Number(availanleChair.textContent)

// This function is use for to create a chairs
function createSeats() {
    let seatSection = document.getElementsByClassName("row")
    for (i = 0; i < seatSection.length; i++) {
        for (j = 0; j < 10; j++) {
            const seat = document.createElement("span")
            seat.classList.add("chair")
            console.log(seatSection[i])
            seatSection[i].append(seat)
        }
    }
}
//calling function
createSeats()
let changeColor = document.querySelectorAll('.chair');

// Get All chairs using querySelectorAll to do some operation
for (let i = 0; i < changeColor.length; i++) {
    //on each chair clicked
    changeColor[i].addEventListener('click', function (event) {
        //to Stop some unstable behaviour on page
        event.preventDefault();
        // let val = helper(count,countSeat,i);

        //If else condition for the chairs and their price to 
        //calculate
        if (i >= 0 && i <= 10) {
            helper(count, countSeat, i)
        } else if (i >= 11 && i <= 20) {
            helper(count, countSeat, i)
        } else {
            helper(count, countSeat, i)
        }
        //change the color when chair gets selected
        changeColor[i].classList.add('selectedSeat');
        //store the values in localstorage to each page render
        //gets same result
        //used key task and store the Array of objects when each chair 
        //gets selected
        let tasksString = localStorage.getItem("task");
        //Array of Object
        let taskArr = JSON.parse(tasksString) || []
        let taskObj = {
            id: i,
            allTotal: total,
            totalSeat: countSeat
        }
        taskArr.push(taskObj)
        localStorage.setItem('task', JSON.stringify(taskArr));

    })
}

//this helper function to calculate the chair values 
// at each categories ex- executive,royal,etc..
function helper(count, countSeat, idx) {
    //for seat increment it is common for all chairs
    let convert = Number(count.textContent);
    countSeat += convert
    count.textContent = countSeat;
    //To calculate the first row
    if (idx >= 0 && idx <= 10) {
        availanleChair.textContent = --toNumber;
        total += executive;
        totalPrice.textContent = total;
        //To calculate the second row  
    } else if (idx >= 11 && idx <= 20) {
        total += club;
        totalPrice.textContent = total;
        availanleChair.textContent = --toNumber;
        //To calculate the third row  
    } else {
        total += royal;
        totalPrice.textContent = total;
        availanleChair.textContent = --toNumber;
    }

    return countSeat

}

//Instead of use window.onload, Used Immediate Invoke the function
// and get all the result from the localstorage
function createAllTasks() {
    let allTasks = JSON.parse(localStorage.getItem('task'));
    if (allTasks != null) {
        for (let i = 0; i < allTasks.length; i++) {
            let { id, allTotal, totalSeat } = allTasks[i];
            //    let getLastItem = allTasks[allTasks.length - 1].totalSeat
            createTask(id, allTotal, totalSeat);
        }
    }

}
createAllTasks()

//This create task for shows in UI
function createTask(id, allTotal, totalSeat) {
    let getId = id;
    changeColor[getId].classList.add('selectedSeat')

    helper(count, totalSeat, id)
}