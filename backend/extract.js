var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

var extract = require('pdf-text-extract')


var pdfUtil = require('pdf-to-text');
var pdf_path = "";
var namee = "";

var urlencodedParser = bodyParser.urlencoded({extended:false})

app.use(express.static('public'));					// serve 1st page
app.get('/',function(req,res){
	res.sendFile(__dirname+"/"+"index.html");
})


app.post('/upload',urlencodedParser,function(req,res){		// 2nd page uploading

	var form = new formidable.IncomingForm();
		form.parse(req,function(err,fields,files){
			var oldpath = files.filetoupload.path;
			var newpath = 'C:\Users\hp\Desktop\a\Automated-Resume-Extraction-master'+files.filetoupload.name;
			namee = files.filetoupload.name;

			fs.rename(oldpath,newpath,function(err){
				if(err) throw err;

				res.writeHead(200,{'Content-Type': 'text/html'});

					res.write('<center> <br><br>');
					res.write('<h2 style="color:#BD2E2E;">Resume uploaded successfully!</h2> <br>');
						
								pdf_path=newpath;

					res.write('<form action="extract" method="post">');
					res.write('<input type="submit" value="Start Extraction">');
					res.write('</form>');
					res.write('</center>');
				res.end();
			});			
			
		});
})
															// end uploading



															//3rd page extraction
var str = "";
app.post('/extract',urlencodedParser,function(req,res){		

		 var option = {from: 0, to: 10}

		 extract(pdf_path, { splitPages: false }, function (err, text) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir(text);
  str = text.toString();

  res.writeHead(200,{'Content-Type': 'text/html'});
  res.write(text.toString());


  		res.write('<center>');
  		res.write('<form action="segment" method="post">');
		res.write('<br><br><br><h1>Next</h1>');
		res.write('<input type="submit" value="Do Segments">');
		res.write('</form>');
		res.write('</center>');

  res.end();
})

})															// end 3rd page extr

			


														// 4th page segments

app.post('/segment',urlencodedParser,function(req,res){

	res.writeHead(200,{'Content-Type': 'text/html'});
	//res.write(str);
	res.write('<br>');
	res.write('Total length of Text : '+str.length);
	res.write('<br><br>');


	var ini_arr = [									// All keywords to search 'ini_arr'
	"OBJECTIVE","Objective",
	"CAREER OBJECTIVE","Career Objective",
	"AIM","Aim",

	"EDUCATION","Education",
	"QUALIFICATION","Qualification",
	"QUALIFICATIONS","Qualifications",

	"POSITIONS OF RESPONSIBILITY","Positions of responsibility",
    "CERTIFICATION","Certification",
	"ACOMPLISHMENTS","Acomplishments",
    "VOLUNTEER WORK","Volunteer Work",
    "EXTRA CURRICULAR ACTIVITIES","Extra Curricular Activities",
	"JOBS","Jobs",

	"AREAS OF INTEREST","Areas of interest",

	"TECHNICAL SKILLS","Technical Skills","Technical skills",
	"SKILLS","Skills",
	"SKILL SET","Skill Set",

	"ACHIEVEMENTS","Achievements",
	"ACHIEVMENT","Achievement",

	"STRENGTHS","Strengths",
	"STRENGTH","Strength",

	"INTERNSHIPS","Internships",
	"INTERNSHIP","Internship",

	"TRAININGS","Trainings",
	"TRAINING","Training",

	"PERSONAL INFORMATION","Personal Information","Personal information",
	"PERSONAL DETAILS","Personal Details","Personal details",
	
	"DECLARATION","Declaration",
	
	"HOBBIES","Hobbies",
	"HOBBIE","Hobbie",
	
	"PROJECTS","Projects",
	
	"OFFERS","Offers",
	
	"EXPERIENCES","Expereinces",
	"EXPERIENCE","Expereince",
	
	];

	var ini_arr1 = [];								// 'ini_arr1' holds index of keywrds


	var i=0;
	for(i=0;i<ini_arr.length;i++)
	{
		ini_arr1.push(str.indexOf(ini_arr[i]));			// adding index
	}

	res.write('-------------------------------------------------------------------------------------------------------------------------');
	res.write('<br><br>Show All keywords - <br><br><br>');
	for(i=0;i<ini_arr.length;i++)
	{
		res.write(ini_arr[i]+" : "+ini_arr1[i]);			// show
		res.write('<br>');
	}


	var arr=[];										// got keywords array 'arr'
	for(i=0;i<ini_arr.length;i++)
	{
		if(ini_arr1[i]!=-1)
		{
			arr.push(ini_arr[i]);
		}
	}

	var arr1=[];									// index of got keywords 'arr1'
	for(i=0;i<arr.length;i++)
	{
		arr1.push(str.indexOf(arr[i]));
	}

// changes to be done starts here-suraj

function sortNumber(a,b) {
	return a - b;
}
var myarr=[];
for(i=0;i<arr1.length;i++)
	{
		myarr.push(arr1[i]);
	
	}
	myarr.sort(sortNumber);
var k=0;
var sarr=[];//will keep keywords
var sarr1=[];//will keep index of keywords
for(i=0;i<myarr.length;i++)
	{
		k=arr1.indexOf(myarr[i]);
		sarr.push(arr[k]);
		sarr1.push(arr1[k]);
	
	}
var sarr2=[];//holds segment data
var z=0;var tmp="";
for(i=0;i<myarr.length-1;i++)
	{ z = sarr[i].length;
		tmp = str.slice(sarr1[i]+z,sarr1[i+1]);
		sarr2.push(tmp);
	}
	z = sarr[myarr.length-1].length;
	tmp=str.slice(sarr1[myarr.length-1]+z,str.length);
	sarr2.push(tmp);
	res.write('------------------------------------------------------------------------------------------------------------------------');
	res.write('<br><br>');
	res.write('Segments -');
	res.write('<br><br><br>');
	for(i=0;i<arr.length;i++)
	{
		res.write(i+") "+sarr[i]+" : <br>");				// showing segments sequentially
		res.write(sarr2[i]);
		res.write('<br><br><br>');
	}

//ends here-suraj
	res.write('------------------------------------------------------------------------------------------------------------------------');
	res.write('<br><br>');
	res.write('Got keywords -');
	res.write('<br><br><br>');
	for(i=0;i<arr.length;i++)
	{
		res.write(arr[i]+" : "+arr1[i]);			// show
		res.write('<br>');
	}



	var lasti=0;									// search for last index
	for(i=0;i<arr1.length;i++)
	{
		if(arr1[i]>lasti)
		{
			lasti=arr1[i];
		}
	}



	var arr2 = [];									// 'arr2' holds segment data

													// creating segments
	for(i=0;i<arr.length;i++)
	{
	

		var nxt;									// nxt for holding jst next index 
		var max=str.length;
		var cind = arr1[i];
		var j=0;
		for(j=0;j<arr.length;j++)
		{
			if(i!=j)
			{
				var min = arr1[j]-cind;
				if(min>0)
				{
					if(min<max)
					{
						max=min;
						nxt=arr1[j];
					}
				}
			}
		}


		var tmp ="";
		var z = arr[i].length;

		if(arr1[i]!=lasti)									// filling arr2 (segments)
		{
		tmp = str.slice(arr1[i]+z,nxt);
		arr2.push(tmp);
		}
		else
		{
		tmp = str.slice(arr1[i]+z,str.length);
		arr2.push(tmp);
		}
	}






	res.write('------------------------------------------------------------------------------------------------------------------------');
	res.write('<br><br>');
	res.write('Segments -');
	res.write('<br><br><br>');
	for(i=0;i<arr.length;i++)
	{
		res.write(i+") "+arr[i]+" : <br>");				// showing segments sequentially
		res.write(arr2[i]);
		res.write('<br><br><br>');
	}

	res.end();

})														// end of segments 4th page

	



														//listen to port

var server = app.listen(8080,function(){
	var port = server.address().port

	console.log("Listening at http://localhost:%s",port)
})