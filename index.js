/* Your Code Here */
function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeArray) {
  // Returns a new array of employee records
  return employeeArray.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return this;
}
function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return this;
}

function hoursWorkedOnDate(dateStamp) {
  const timeIn = this.timeInEvents.find((event) => event.date === dateStamp);
  const timeOut = this.timeOutEvents.find((event) => event.date === dateStamp);
  return (timeOut.hour - timeIn.hour) / 100;
  // Time in 1400
  // Time out 2300
  // 2300 - 1400 = 900
  // 900 / 100 = 9
}

function wagesEarnedOnDate(dateStamp) {
  return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
};

function calculatePayroll(employeeArray) {
  return employeeArray.reduce((total, employee) => total + allWagesFor.call(employee), 0);
}