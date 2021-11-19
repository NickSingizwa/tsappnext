import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

//runs before every page
export function middleware(req,event){
    // const token = req.headers['Authorization'];
    // const isLoggedIn = validateToken(token);

    // if (isLoggedIn){
    //     return new Response('Access granted');
    // }
    // else{
    //     return event.respondWith(NextResponse.redirect('/login'));
    // }
} 