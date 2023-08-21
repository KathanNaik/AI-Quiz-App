fetch("http://localhost:8080/api/marksList").then((data)=>{
    return data.json();
}).then((objectData)=>{

    let tableData = "";
    objectData.map((values)=>{
        tableData += 
        `<tr>
        <td>${values.email_id}</td>
        <td>${values.name}</td>
        <td>${values.company}</td>
        <td>${values.score}</td>
        </tr>`
    });

    document.getElementById("tb").innerHTML = tableData;

}); 