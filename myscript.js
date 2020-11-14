//listen for a form submit
//calculateResults
document.getElementById('loan-form').addEventListener('submit', function (e) {
    //hide results
    document.getElementById('results').style.display = 'none';
    //hide loader
    document.getElementById('loading').style.display = 'block';

    //set timeout to show reults after 2 seconds
    setTimeout(calculateResults, 1500);

    e.preventDefault();
});

//calculate results
function calculateResults () {
    console.log('Calculating...')

    //ui variables
    const amount =  document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //calculation
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //calculate monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
        
        //show results
        document.getElementById('results').style.display = 'block';
        //hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers and try again...');
    }

    // e.preventDefault();
}

//display errors
function showError (error) {
    //hide results
    document.getElementById('results').style.display = 'none';

    //hide loader
    document.getElementById('loading').style.display = 'none';

    //create div element
    const alert = document.createElement('div');

    //set classname
    alert.className = 'alert alert-danger';

    //set error message
    alert.appendChild(document.createTextNode(error));

    //get elements
    const card =  document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //create text node
    card.insertBefore(alert, heading);

    //set a timeout of 2 seconds and then remove the warning
    setTimeout(clearError, 2000);

}

//clear errors
function clearError () {
    document.querySelector('.alert').remove();
}