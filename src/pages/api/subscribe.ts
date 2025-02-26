import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email } = data;
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please provide a valid email address',
        }),
        { status: 400 }
      );
    }
    
    // SendGrid API integration
    const SENDGRID_API_KEY = import.meta.env.SENDGRID_API_KEY;
    const SENDGRID_LIST_ID = import.meta.env.SENDGRID_LIST_ID;
    
    // Add contact to SendGrid
    const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        list_ids: [SENDGRID_LIST_ID],
        contacts: [
          {
            email: email
          }
        ]
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message || 'Failed to subscribe');
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully subscribed!',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      }),
      { status: 500 }
    );
  }
}