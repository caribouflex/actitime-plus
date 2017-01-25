var date;
var idsTask = [];
var commentTask = [];
var timeTask = [];
var tab;
var tabID;
var dayIncr;


chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
	date = message.date;
	if(date == "")
	{
		date = getDate($("#ext-gen10").text());
	}else{
		date = date.replace(/-/g ,"");
	}



	$.get('http://actitime.distech-controls.com/user/submit_tt.do?dateStr='+date, function(result){
	 
		$(result).find('tbody#actualTTRows').children("tr").each(function() {
			tabID = $(this).attr("id");
			var number = tabID.substring(7);
			idsTask.push(number);
			var i = 0;
			
			$(this).find("td.calendarWorkingDayNormal").each(function() {
				
				var tempVal = $(this).find("input[name='timeTrack["+number+"].comment["+i+"]']").attr("value");
				if(tempVal == "")
				{
					commentTask.push(" ");
				}else
				{
					commentTask.push(tempVal);
				}
				//var tempVal2 = $(this).find("input[name='timeTrack["+number+"].spentStr["+i+"]']").val();
				var tempVal2 = $(this).find("#spent_"+number+"_"+i).val();
				if(tempVal2 == "")
				{
					timeTask.push("00:00");
				}else
				{
					timeTask.push(tempVal2);
				}
				tempVal2 = "";
				tempVal = "";
				i=i+1;
			});
			$(this).find("td.calendarWeekendDayNormal").each(function() {
				
				var tempVal = $(this).find("input[name='timeTrack["+number+"].comment["+i+"]']").attr("value");
				if(tempVal == "")
				{
					commentTask.push(" ");
				}else
				{
					commentTask.push(tempVal);
				}
				//var tempVal2 = $(this).find("input[name='timeTrack["+number+"].spentStr["+i+"]']").val();
				var tempVal2 = $(this).find("#spent_"+number+"_"+i).val();
				if(tempVal2 == "")
				{
					timeTask.push("00:00");
				}else
				{
					timeTask.push(tempVal2);
				}
				tempVal2 = "";
				tempVal = "";
				i=i+1;
			});
		});;
		
		for (var i = 0; i<idsTask.length; i++) {
			dayIncr = 0;
			for(var j = i*7; j<i*7+7; j++)
			{
				if(commentTask[j] != " ")
					$("input[name='timeTrack["+idsTask[i]+"].comment["+dayIncr+"]']").attr("value",commentTask[j]);
				
				if(timeTask[j] != "00:00")
					$("input[name='timeTrack["+idsTask[i]+"].spentStr["+dayIncr+"]']").val(timeTask[j]);
					
				dayIncr = dayIncr + 1;
			}
		}
	});

});


	
function getDate(value){
	var res = value.split(" ");
	var year = res[5];
	var month = getMonthNumber(res[0]);
	var day = res[1]-1;
	
	if(month > 0 && month < 10)
	{
		month = "0".concat(month);
	}
	
	if(day > 0 && day < 10)
	{
		day = "0".concat(day);
	}
	
	var value = year.concat(month).concat(day);
	
	return value;
}

function getMonthNumber(month){
	var retour=0;
	if(month == "Jan")
		retour = 01;
	else
		if(month == "Feb")
			retour = 02;
		else
			if(month == "Mar")
				retour = 03;
			else
				if(month == "Apr")
					retour = 04;
				else
					if(month == "May")
						retour = 05;
					else
						if(month == "Jun")
							retour = 06;
						else
							if(month == "Jul")
								retour = 07;
							else
								if(month == "Aug")
									retour = 08;
								else
									if(month == "Sep")
										retour = 09;
									else
										if(month == "Oct")
											retour = 10;
										else
											if(month == "Nov")
												retour = 11;
											else
												if(month == "Dec")
													retour = 12;
	return retour;
}