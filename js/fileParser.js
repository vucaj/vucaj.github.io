function handleFileSelect() {
    jQuery.ajax({
        url: "https://raw.githubusercontent.com/vucaj/vucaj.github.io/master/assets/csv/laps_race_2022_v2.csv",
        type: 'get',
        dataType: 'text',
        success: function(data) {
            let lines = data.split('\n');
            let fields = lines[0].split(',');
            
            let output = [];
            
            for(let i = 1; i < lines.length; i++){
               let current = lines[i].split(',');
               let doc = {};
               for(let j = 0; j < fields.length; j++){
                   doc[fields[j]] = current[j];
               }
               output.push(doc);
            }
            
            filterLaps(output)
        },
        error: function(jqXHR, textStatus, errorThrow){
            console.log(textStatus);
        }
    });
}

function filterLaps(laps) {
    result = laps.filter(lap => lap.Driver == 'LAT' && lap.Name == 'Bahrain Grand Prix')
    console.log(result)
    chart = document.createElement('canvas')
    chart.setAttribute('id', 'myChart')
    chart.setAttribute('style', 'width:auto;max-width:80%') 
    document.getElementById('chart').appendChild(chart)
    
    var xValues = result.map(lap => parseInt(lap.LapNumber));

    // var yValues = result.map(lap => moment.utc(lap.CalculatedLapTime.replace('0 days ', '').slice(0, -3), 'HH:mm:ss.SSS'));
        
    console.log(yValues)
    new Chart("myChart", {
        type: "bar",
        data: {
        labels: xValues,
        datasets: [{ 
            data: yValues,
            borderColor: "red",
            fill: false
        }]
        },
        options: {
        legend: {display: false}
        }
    });
}
