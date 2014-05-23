// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// to use ACS Cloud Service
var Cloud = require('ti.cloud');
// A flag to check if any operation is performed
var isButtonClicked = false;


// to create a main window
var win = Ti.UI.createWindow({
	title : 'Simple Calculator',
	backgroundColor : '#fff',
	layout : 'horizontal'
});

// create text field 1
var operand1Text = Ti.UI.createTextField({
	width : Ti.UI.SIZE/2,
	height : '45dp',
	top : '20dp',
	hintText : 'Operand 1',
	keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	returnKeyType : Ti.UI.RETURNKEY_DONE
});

// create text field 2
var operand2Text = Ti.UI.createTextField({
	width : Ti.UI.SIZE/2,
	height : '45dp',
	top : '20dp',
	hintText : 'Operand 2',
	keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	returnKeyType : Ti.UI.RETURNKEY_DONE
});

// to create an add button
var addButton = Ti.UI.createButton({
	title : '+',
	width : '90dp',
	height : '50dp',
	top : '20dp'
});

// to associate the button to a buttonClick event
addButton.addEventListener('click', function() {
	// to hide keyboard in iOS
	operand1Text.blur;
	operand2Text.blur;
	// to hide keyboard in Android
	Ti.UI.Android.hideSoftKeyboard();
	calculateResult('a');
});

// to create a subtract button
var subButton = Ti.UI.createButton({
	title : '-',
	width : '90dp',
	height : '50dp',
	top : '20dp'
});

// to associate the button to a  event
subButton.addEventListener('click', function() {
	// to hide keyboard in iphone
	operand1Text.blur;
	operand2Text.blur;
	// to hide keyboard in Android
	Ti.UI.Android.hideSoftKeyboard();
	calculateResult('s');
});

// to create a multiply button
var multButton = Ti.UI.createButton({
	title : 'X',
	width : '90dp',
	height : '50dp',
	top : '20dp'
});

// to associate the button to a buttonClick event
multButton.addEventListener('click', function() {
	// to hide keyboard in iphone
	operand1Text.blur;
	operand2Text.blur;
	// to hide keyboard in Android
	Ti.UI.Android.hideSoftKeyboard();
	calculateResult('m');
});

// to create a divide button
var divButton = Ti.UI.createButton({
	title : '/',
	width : '90dp',
	height : '50dp',
	top : '20dp'
});

// to associate the button to a buttonClick event
divButton.addEventListener('click', function() {
	// to hide keyboard in iphone
	operand1Text.blur;
	operand2Text.blur;
	// to hide keyboard in Android
	Ti.UI.Android.hideSoftKeyboard();
	calculateResult('d');
});

// to create a result button
var resultLabel = Ti.UI.createLabel({
	color : '#900',
	font : {
		fontSize : 48
	},
	shadowColor : '#aaa',
	shadowRadius : 3,
	text : '0',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : '360dp',
	height : '55dp',
	top : '50dp'
});

// text field to get the search name
var searchNameText = Ti.UI.createTextField({
	width : '360dp',
	height : '45dp',
	top : '20dp',
	hintText : 'Name',
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	returnKeyType : Ti.UI.RETURNKEY_DONE
});

/**
 * Code to work on both iOS and Android begins
 */
// popup window
var popup = Ti.UI.createWindow({
	backgroundColor : 'grey',
	top : 0,
	left : 0,
	opacity : 1,
	zIndex : 100,
	layout : 'horizontal'
});

// Save button in popup
savePopupButton = Ti.UI.createButton({
	title : 'Save',
	top : 10,
	width : 180,
	height : 50
});

// to save details to ACS
savePopupButton.addEventListener('click', function() {
	loginUser();
	popup.close();
});

// Cancel button in popup
cancelPopupButton = Ti.UI.createButton({
	title : 'Cancel',
	top : 10,
	width : 180,
	height : 50
});

// to return to main window on Cancel
cancelPopupButton.addEventListener('click', function() {
	popup.close();
});
// Adding UI elements to popup window
popup.add(searchNameText);
popup.add(savePopupButton);
popup.add(cancelPopupButton);


/**
 * Code to work on both iOS and Android ends
 */

/**
 *  Code specific to a platform begins

var popupAlert = Ti.UI.createAlertDialog({
	cancel: 1,
	buttonNames:['Save','Cancel'],
	// for iOS
	//style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
	
	//for Android
	androidView: searchNameText
});

popupAlert.addEventListener('click',function(e){
	if(e.index === 2){
		Ti.API.info(">>>>>>>>>>>>>>>>>>>Inside popup alert save");
		storeResult();
	}
});

/**
 * Code specific to a platform ends.
 */

// to create a button in main window for popup
var saveButton = Ti.UI.createButton({
	title : 'Save to ACS',
	width : '360dp',
	height : '50dp',
	top : '20dp'
});

// to popup on click event
saveButton.addEventListener('click', function() {
	// to check if any arithmetic operation is performed
	if(!isButtonClicked){
		alert('Please perform an operation.');
		return;
	}
	popup.open();
	//popupAlert.show();
});

// to create a button in main window to list results
var listButton = Ti.UI.createButton({
	title : 'List results',
	width : '360dp',
	height : '50dp',
	top : '20dp'
});

// to list results on button click
listButton.addEventListener('click',function(){
	//loginUser('l');
	listResults();
});

// adding all UI elements to the main window
win.add(operand1Text);
win.add(operand2Text);
win.add(addButton);
win.add(subButton);
win.add(multButton);
win.add(divButton);
win.add(resultLabel);
win.add(saveButton);
win.add(listButton);

// to open window
win.open();

/**
 * Function to perform arithmatic operations
 * Results are rounded to its nearest 2 decimal places
 */

var calculateResult = function(value) {
	var operand1 = parseFloat(operand1Text.value);
	var operand2 = parseFloat(operand2Text.value);
	var operation;
	isButtonClicked = true;
	//Ti.API.info("inside calculate fn");
	// default value to be displayed 0
	var result = 0;
	switch(value) {
		case 'a':
			result = (operand1 + operand2).toFixed(2);
			operation = '+';
			break;
		case 's':
			result = (operand1 - operand2).toFixed(2);
			operation = '-';
			break;
		case 'm':
			result = (operand1 * operand2).toFixed(2);
			operation = 'x';
			break;
		case 'd':
			if (operand2 == 0) {
				alert('Operand 2 cannot be zero');
			} else {
				result = (operand1 / operand2).toFixed(2);
				operation = '/';
			}
			break;
	}
	resultLabel.setText(result);
	// to set values into properties inorder to get these values from popup window
	Ti.App.Properties.setString('operand1', operand1);
	Ti.App.Properties.setString('operand2', operand2);
	Ti.App.Properties.setString('operation',operation);
	Ti.App.Properties.setString('result', result);
};

/**
 * Function to store the results onto the cloud
 */

var storeResult = function() {
	//loginUser();
	var timestamp = (new Date());
	var tempOperand1 = Ti.App.Properties.getString('operand1');
	var tempOperand2 = Ti.App.Properties.getString('operand2');
	var tempOperation = Ti.App.Properties.getString('operation');
	var tempResult = Ti.App.Properties.getString('result');
	
	Ti.API.info(">>>>>>>>>>>>> name = "+searchNameText.value +" "+tempOperand1+" "+tempOperation+" "+tempOperand2+" = "+tempResult);
	
	Cloud.Objects.create({
		classname : 'arithmeticResult',
		fields : {
			// search name is time stamped with date to generate unique strings.
			searchName : searchNameText.value,
			operand1 : tempOperand1,
			operand2 : tempOperand2,
			operation : tempOperation,
			result : tempResult
		}
	}, function(e) {
		if (e.success) {
			Ti.API.info('Parameters passed to ACS');
		} else {
			Ti.API.info('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
		//logoutUser();
	});
	
};

/**
 * Function to get current date and time
 */
/*
function getDate() {
	var currentTime = new Date();
	return currentTime.UTC();
}*/


/**
 * Function to list all the saved results
 */
var listResults = function(){
	var listResultsBaseWin = Ti.UI.createWindow({
		backgroundColor : 'grey',
		top : 0,
		left : 0,
		opacity : 1,
		zIndex : 100,
		layout : 'horizontal'
	});
	var listResultsWin =Ti.UI.createScrollView({
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE,
		layout: 'vertical'
	});
	// creating labels for displaying parameters
	var nameLabel = createLabel('80dp','55dp','20dp');
	var operand1Label = createLabel('70dp','55dp','20dp');
	var operationLabel = createLabel('70dp','55dp','20dp');
	var operand2Label = createLabel('70dp','55dp','20dp');
	var resultLabel = createLabel('70dp','55dp','20dp');
	
	// Initial column headings
	nameLabel.text = 'Name';
	operand1Label.text = 'Operand1';
	operationLabel.text = 'Operation';
	operand2Label.text = 'Operand2';
	resultLabel.text = 'Result';
	
	nameLabel.backgroundColor = 'white';
	operand1Label.backgroundColor = 'white';
	operationLabel.backgroundColor = 'white';
	operand2Label.backgroundColor = 'white';
	resultLabel.backgroundColor = 'white';
	
	// creating a container to store all labels
	var containerWin = Ti.UI.createView({layout:'horizontal',height:Ti.UI.SIZE,width:Ti.UI.SIZE});
	
	// Adding labels to container
	containerWin.add(nameLabel);
	containerWin.add(operand1Label);
	containerWin.add(operationLabel);
	containerWin.add(operand2Label);
	containerWin.add(resultLabel);
	listResultsWin.add(containerWin);
	listResultsBaseWin.add(listResultsWin);
	
	Cloud.Objects.query({
		classname: 'arithmeticResult',
		page: 1,
		per_page: 10
	},function (e){
		if(e.success){
			Ti.API.info("!!!!!!!!!!!>>>>>>>>> e.arithmeticResult = "+e.arithmeticResult);
			if (e.arithmeticResult != undefined && e.arithmeticResult.length > 0) {
				for (var i = 0; i < e.arithmeticResult.length; i++) {
					Ti.API.info("!!!!!!!!!!!>>>>>>>>> i value = "+i);
					var resultObj = e.arithmeticResult[i];
					
					// create new labels
					var nameLabel = createLabel('80dp','40dp','20dp');
					var operand1Label = createLabel('70dp','40dp','20dp');
					var operationLabel = createLabel('70dp','40dp','20dp');
					var operand2Label = createLabel('70dp','40dp','20dp');
					var resultLabel = createLabel('70dp','40dp','20dp');
					
					// assigning text value to new labels
					nameLabel.text = resultObj.searchName;
					operand1Label.text = resultObj.operand1;
					operationLabel.text = resultObj.operation;
					operand2Label.text = resultObj.operand2;
					resultLabel.text = resultObj.result;
					var containerWin = Ti.UI.createView({layout:'horizontal',height:Ti.UI.SIZE,width:Ti.UI.SIZE});	
					
					// Adding labels to window
					containerWin.add(nameLabel);
					containerWin.add(operand1Label);
					containerWin.add(operationLabel);
					containerWin.add(operand2Label);
					containerWin.add(resultLabel);
					listResultsWin.add(containerWin);
				}
			}
			listResultsWin.add(listWinButton);

		}else {
        	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
    	}	
	});

	// to create a button to return to main page
	var listWinButton = Ti.UI.createButton({
		title : 'OK',
		width : '360dp',
		height : '50dp',
		top : '20dp'
	});
	// to close list window
	listWinButton.addEventListener('click', function() {
		listResultsBaseWin.close();
	}); 

		listResultsBaseWin.open();
};

/**
 * Function to create a user to access ACS
 */
var createUser = function() {
	Cloud.Users.create({
		username : "anoopthomas",
		password : "anoop123",
		password_confirmation : "anoop123",
		first_name : "Anoop",
		last_name : "Thomas"
	}, function(e) {
		if (e.success) {
			// user created successfully
			Ti.API.info("!!!!!!!!!!!!!!!!!>>>>>>>>>>>>>> User created succesfully");
		} else {
			// oops, something went wrong
			Ti.API.info("!!!!!!!!!!!!!!!!!>>>>>>>>>>>>>> User not created");
		}
	});
};


/**
 * Function to log into ACS
 */

var loginUser = function() {
	Cloud.Users.login({
		login : "anoopthomas",
		password : "anoop123"
	}, function(e) {
		if (e.success) {
			Ti.API.info("!!!!!!!!!!!!!!!!!>>>>>>>>>>>>>> Logged in as user Anoop");
			storeResult();
		} else {
			// if not logged in, create a user and then login
			createUser();
			loginUser();
			error(e);
		}
	});
};

/**
 * Function to logout of ACS
 */
var logoutUser = function() {
	Cloud.Users.logout(function(e) {
		if (e.success) {
			Ti.API.info("!!!!!!!!!!!>>>>>>>>> User logged out succesfully");
		} else {
			//status.text = (e.error && e.message) || e;
			Ti.API.info("!!!!!!!!!!!>>>>>>>>> User not logged out");
		}
	});
}; 


/**
 * Function to create a label
 */

var createLabel = function(width,height,top){
		var label = Ti.UI.createLabel({
		color : 'black',
		backgroundColor : 'white',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : width,
		height : height,
		top : top
	});
	return label;
};
