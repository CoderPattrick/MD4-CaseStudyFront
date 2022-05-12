function getAllWeek(){
    $.ajax({
        type: "GET",
        url:"http://localhost:8080/week",
        success:function (data){
            let content ="";
            for (let i = 0; i < data.length; i++) {
                content+=`<option value="${data[i].id}">${data[i].first_day_of_the_week}</option>`
            }
            $('#week').html(content);
        }
    })
}
function createNewWeek(){
    event.preventDefault();
    let a = prompt("Input first day of the week");
    let newWeek ={
        first_day_of_the_week: a
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newWeek),
        //tên API
        url: "http://localhost:8080/week",
        //xử lý khi thành công
        success: function (){
            window.alert("New Week created!");
            getAllWeek();
        }
    })
}