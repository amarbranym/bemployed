import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
 key_id: "rzp_test_9jlIesdHxBZJx8",
 key_secret: "5V8m8NDdqWA7TRoG9Udt15G3",
});

export async function POST(request: NextRequest) {

//  const { amount, currency } = await request.json()

//  console.log(amount, currency)

 var options = {
  amount: 500,
  currency: "INR",
  receipt: 'rcp1',
 };

 console.log(options)

 const order = await razorpay.orders.create(options);
 console.log(order);
 return NextResponse.json(order, { status: 200 });
}


