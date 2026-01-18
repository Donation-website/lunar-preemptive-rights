import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req,res){
  if(req.method==='POST'){
    try{
      const { parcel } = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data:{
              currency:'usd',
              product_data:{name:`Lunar Parcel #${parcel.id}`},
              unit_amount: parcel.price*100
            },
            quantity: 1
          }
        ],
        mode:'payment',
        success_url: `${req.headers.origin}/success?parcel=${parcel.id}`,
        cancel_url: `${req.headers.origin}/`
      });
      res.status(200).json({ url: session.url });
    } catch(e){
      res.status(500).json({ error: e.message });
    }
  } else res.setHeader('Allow','POST').status(405).end('Method Not Allowed');
}
