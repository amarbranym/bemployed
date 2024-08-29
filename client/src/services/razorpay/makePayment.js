import initializeRazorpay from './initialize';

const makePayment = async ({ name, email, contact }, onSuccess) => {
  const res = await initializeRazorpay();

  if (!res) {
    alert('Razorpay SDK Failed to load');
    return;
  }
  

  // Make API call to the serverless API
  const data = await fetch('/api/razorpay', { method: 'POST' }).then((t) =>
    t.json(),
  );
  console.log(data);
  var options = {
    key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
    name: 'Astroansh',
    currency: data.currency,
    amount: data.amount,
    order_id: data.id,
    description: '10 min Consultation',
    image: '/logo.svg',
    handler: function (response) {
      // Validate payment at server - using webhooks is a better idea.
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
      if (onSuccess) onSuccess(response);
    },
    prefill: {
      name: name,
      email: email,
      contact: contact,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

export default makePayment;
