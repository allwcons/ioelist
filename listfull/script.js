// Parse the CSV file
function parseCSV(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  const rows = lines.slice(1);

  return rows.map((row) => {
    const data = row.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = data[index];
    });
    return obj;
  });
}

// Read the CSV file from an input element
const input = document.getElementById('csv-input');
input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (e) => {
    const csv = e.target.result;
    const data = parseCSV(csv);
    console.log(data)

    // Iterate through the students and create an array of students who have chosen computer as a priority subject
    const computerStudents = data.filter((row) => {
      const p1 = parseInt(row.p1);
      const p2 = parseInt(row.p2);
      const p3 = parseInt(row.p3);
      const p4 = parseInt(row.p4);
      const p5 = parseInt(row.p5);
      const p6 = parseInt(row.p6);
      const p7 = parseInt(row.p7);
      const p8 = parseInt(row.p8);
      const p9 = parseInt(row.p9);
      const p10 = parseInt(row.p10);
      return p1 === 11 || p1 == 12 ||p2 == 11 || p2 == 12
    });

    computerStudents.sort((a, b) => {
      return parseInt(a.Rank) - parseInt(b.Rank);
    });

    const quotaComputerStudents = computerStudents.filter(row => {
      const quotaGroup = row["QuotaGroup"];
      return quotaGroup !== "open";
    })

    const eligibleOpenFreeStudents = computerStudents.filter((row, i) => {
      const rank = parseInt(row.Rank);
      const quotaGroup = row["QuotaGroup"];
      if (i <= 30) {
        if (quotaGroup !== "open") {
          quotaComputerStudents.splice(i, 1)
        }
        return true
      }
    });

    const eligibleQuotaFreeStudent = quotaComputerStudents.filter((row, i) => {
      if (i <= 6) {
        return true
      }
    })
    const eligibleFullFeeStudent = computerStudents.filter((row, i) => {
      return i > 36 && i <= 96;
    });


    // Take the top 96 students from the array and print their names
    eligibleOpenFreeStudents.forEach((row) => {
      console.log(row["Applicant Name"], row.Rank);
    });
    eligibleQuotaFreeStudent.forEach((row) => {
      console.log(row["Applicant Name"], row.Rank);
    });
    eligibleFullFeeStudent.forEach((row) => {
      console.log(row["Applicant Name"], row.Rank);
    });
  };
});