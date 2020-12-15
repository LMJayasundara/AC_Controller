var socket = io();

$(function() {
    $.get("/data1", function(data1) {
      data1.forEach(function(input1) {
        lineChart1.data.labels.push(input1.time);
        lineChart1.data.datasets.forEach((dataset) => {
                dataset.data.push(input1.temp);
        });
      });
    });
    
    var ctxl1 = document.getElementById('line-chart1')
    ctxl1.height = 300;
    ctxl1.width = 860;
    
    var lineChart1 = new Chart(ctxl1, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{ 
            data: [],
            label: "Temp",
            borderColor: "#eb4d4b",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Server Temperature Data (in °C)'
        }
      }
    });
});

$(function() {
    $.get("/data2", function(data2) {
      data2.forEach(function(input2) {
        lineChart2.data.labels.push(input2.time);
        lineChart2.data.datasets.forEach((dataset) => {
                dataset.data.push(input2.temp);
        });
      });
    });
    
    var ctxl2 = document.getElementById('line-chart2')
    ctxl2.height = 300;
    ctxl2.width = 860;
    
    var lineChart2 = new Chart(ctxl2, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{ 
            data: [],
            label: "Temp",
            borderColor: "#eb4d4b",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Server Temperature Data (in °C)'
        }
      }
    });
});

$(function() {
    $.get("/data3", function(data3) {
      data3.forEach(function(input3) {
        lineChart3.data.labels.push(input3.time);
        lineChart3.data.datasets.forEach((dataset) => {
                dataset.data.push(input3.temp);
        });
      });
    });
    
    var ctxl3 = document.getElementById('line-chart3')
    ctxl3.height = 300;
    ctxl3.width = 860;
    
    var lineChart3 = new Chart(ctxl3, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{ 
            data: [],
            label: "Temp",
            borderColor: "#eb4d4b",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Server Temperature Data (in °C)'
        }
      }
    });
});

$('#downloadPdf').click(function(event) {
	// get size of report page
	var reportPageHeight = $('#reportPage').innerHeight();
	var reportPageWidth = $('#reportPage').innerWidth();
	
	// create a new canvas object that we will populate with all other canvas objects
	var pdfCanvas = $('<canvas />').attr({
	  id: "canvaspdf",
	  width: reportPageWidth,
	  height: reportPageHeight
	});
	
	// keep track canvas position
	var pdfctx = $(pdfCanvas)[0].getContext('2d');
	var pdfctxX = 0;
	var pdfctxY = 0;
	var buffer = 100;
	
	// for each chart.js chart
	$("canvas").each(function(index) {
	  // get the chart height/width
	  var canvasHeight = $(this).innerHeight();
	  var canvasWidth = $(this).innerWidth();
	  
	  // draw the chart into the new canvas
	  pdfctx.drawImage($(this)[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
	  pdfctxX += canvasWidth + buffer;
	  
	  // our report page is in a grid pattern so replicate that in the new canvas
	  if (index % 2 === 1) {
		pdfctxX = 0;
		pdfctxY += canvasHeight + buffer;
	  }
	});
	
	// create new pdf and add our new canvas as an image
	var pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
	pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);
	
	// download the pdf
	pdf.save('server_data.pdf');
});

///////////////////////////////////////////////////////////////////////////////////////////////////

const primaryColor = '#4834d4'
const warningColor = '#f0932b'
const successColor = '#6ab04c'
const dangerColor = '#eb4d4b'

const themeCookieName = 'theme'
const themeDark = 'dark'
const themeLight = 'light'

const body = document.getElementsByTagName('body')[0]

function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = "expires="+d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
  var name = cname + "="
  var ca = document.cookie.split(';')
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

loadTheme()

function loadTheme() {
	var theme = getCookie(themeCookieName)
	body.classList.add(theme === "" ? themeLight : theme)
}

function switchTheme() {
	if (body.classList.contains(themeLight)) {
		body.classList.remove(themeLight)
		body.classList.add(themeDark)
		setCookie(themeCookieName, themeDark)
	} else {
		body.classList.remove(themeDark)
		body.classList.add(themeLight)
		setCookie(themeCookieName, themeLight)
	}
}

function collapseSidebar() {
	body.classList.toggle('sidebar-expand')
}

///////////////////////////////////////////////////////////////////////////////////////////////////

var ctx1 = document.getElementById('myChart1')
ctx1.height = 500
ctx1.width = 500

var lineChart1 = new Chart(ctx1, {
	type: 'line',

	data: {
	labels: [],
	datasets: [{
		label: "Temperature",
		borderColor: dangerColor,
		data: [],
		fill: false,
		pointStyle: 'circle',
		backgroundColor: '#3498DB',
		pointRadius: 5,
		pointHoverRadius: 7,
		borderWidth: 2,
		lineTension: 0,
	}]
	},
 
	options: {
		maintainAspectRatio: false,
		bezierCurve: false,
	}
});

var ctx2 = document.getElementById('myChart2')
ctx2.height = 500
ctx2.width = 500

var lineChart2 = new Chart(ctx2, {
	type: 'line',

	data: {
	labels: [],
	datasets: [{
		label: "Temperature",
		borderColor: dangerColor,
		data: [],
		fill: false,
		pointStyle: 'circle',
		backgroundColor: '#3498DB',
		pointRadius: 5,
		pointHoverRadius: 7,
		borderWidth: 2,
		lineTension: 0,
	}]
	},

	options: {
		maintainAspectRatio: false,
		bezierCurve: false,
	}
});

var ctx3 = document.getElementById('myChart3')
ctx3.height = 500
ctx3.width = 500

var lineChart3 = new Chart(ctx3, {
	type: 'line',

	data: {
	labels: [],
	datasets: [{
		label: "Temperature",
		borderColor: dangerColor,
		data: [],
		fill: false,
		pointStyle: 'circle',
		backgroundColor: '#3498DB',
		pointRadius: 5,
		pointHoverRadius: 7,
		borderWidth: 2,
		lineTension: 0,
	}]
	},

	options: {
		maintainAspectRatio: false,
		bezierCurve: false,
	}
});

socket.on('sensor', function(data) {
	document.getElementById('date').innerHTML = data.date;
	document.getElementById('hum1').innerHTML = data.hum1;
	document.getElementById('hum2').innerHTML = data.hum2;
	document.getElementById('hum3').innerHTML = data.hum3;

	if(lineChart1.data.labels.length != 60) {
		lineChart1.data.labels.push(data.time);
		lineChart1.data.datasets.forEach((dataset) => {
			dataset.data.push(data.temp1);
		});
	}
	else {
		lineChart1.data.labels.shift();
		lineChart1.data.labels.push(data.time);
		lineChart1.data.datasets.forEach((dataset) => {
			dataset.data.shift();
			dataset.data.push(data.temp1);
		});
	}
	lineChart1.update();

	if(lineChart2.data.labels.length != 60) {
		lineChart2.data.labels.push(data.time);
		lineChart2.data.datasets.forEach((dataset) => {
			dataset.data.push(data.temp2);
		});
	}
	else {
		lineChart2.data.labels.shift();
		lineChart2.data.labels.push(data.time);
		lineChart2.data.datasets.forEach((dataset) => {
			dataset.data.shift();
			dataset.data.push(data.temp2);
		});
	}
	lineChart2.update();

	if(lineChart3.data.labels.length != 60) {
		lineChart3.data.labels.push(data.time);
		lineChart3.data.datasets.forEach((dataset) => {
			dataset.data.push(data.temp3); //shoud be temp3
		});
	}
	else {
		lineChart3.data.labels.shift();
		lineChart3.data.labels.push(data.time);
		lineChart3.data.datasets.forEach((dataset) => {
			dataset.data.shift();
			dataset.data.push(data.temp3); //shoud be temp3
		});
	}
	lineChart3.update();
});

/////////////////////////////////////////////////////////////////////////////////////